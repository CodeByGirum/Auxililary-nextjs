
import { TableData } from '../types/chat';

export const executeSQL = async (query: string, data: TableData): Promise<{ type: 'table' | 'text' | 'error', data: TableData | string }> => {
  return new Promise((resolve) => {
    try {
      // Access alasql from window since it's loaded via CDN
      const alasql = (window as any).alasql;
      
      if (!alasql) {
        resolve({ type: 'error', data: "Analysis Engine (AlaSQL) not loaded." });
        return;
      }

      if (!data || !data.rows) {
        resolve({ type: 'error', data: "No active dataset found for analysis." });
        return;
      }

      // Pre-check for forbidden/unsupported commands
      if (query.trim().toLowerCase().startsWith('pragma')) {
         resolve({ 
            type: 'text', 
            data: "Schema inspection via PRAGMA is not supported. Please refer to the table context provided above for column names." 
         });
         return;
      }

      // Clean the query: Remove quotes around 'data' table name to prevent param substitution failure
      // e.g. FROM "data" -> FROM data
      const cleanQuery = query.replace(/"data"/gi, 'data').replace(/'data'/gi, 'data');

      // Replace 'data' keyword with AlaSQL parameter placeholder '?'
      const executableSql = cleanQuery.replace(/\bdata\b/gi, '?');

      // Count parameters needed (occurrences of ?)
      const paramCount = (executableSql.match(/\?/g) || []).length;
      
      // Pass the rows as the parameter for every occurrence of ?
      const params = paramCount > 0 ? Array(paramCount).fill(data.rows) : [];

      // Create a safe execution environment
      const result = alasql(executableSql, params);

      if (Array.isArray(result) && result.length > 0) {
        // If result is an array of objects, format as TableData
        if (typeof result[0] === 'object') {
           const headers = Object.keys(result[0]);
           const rows = result.map((r: any, i: number) => ({ ...r, id: `res-${i}` }));
           resolve({ 
             type: 'table', 
             data: { headers, rows } 
           });
        } else {
           // Array of primitives?
           resolve({ type: 'text', data: JSON.stringify(result, null, 2) });
        }
      } else if (Array.isArray(result) && result.length === 0) {
        resolve({ type: 'text', data: "No results found." });
      } else {
         // Scalar result or other
         resolve({ type: 'text', data: String(result) });
      }

    } catch (e: any) {
      console.error("SQL Execution Error:", e);
      // Clean up error message for display
      let msg = e.message || "Execution failed";
      if (msg.includes("Parse error")) {
          msg = `Syntax Error: ${msg}. Please ensure keywords are spaced correctly and aliases use snake_case (e.g., AS total_sales).`;
      }
      resolve({ type: 'error', data: msg });
    }
  });
};

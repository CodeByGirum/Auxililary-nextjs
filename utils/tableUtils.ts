
import { TableData } from "../types/chat";

export const parseCSV = (text: string): TableData => {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  
  // Simple CSV parser (does not handle quoted commas for this prototype)
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map((line, idx) => {
    const values = line.split(',');
    const row: any = { id: `row-${idx}` }; // Add internal ID
    headers.forEach((h, i) => {
      let val: string | number = values[i]?.trim();
      // Attempt number conversion
      if (!isNaN(Number(val)) && val !== '') {
        val = Number(val);
      }
      row[h] = val;
    });
    return row;
  });
  
  return { headers, rows };
};

export const parseJSON = (text: string): TableData => {
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data) && data.length > 0) {
      const headers = Object.keys(data[0]);
      const rows = data.map((row: any, idx: number) => ({ ...row, id: `row-${idx}` }));
      return { headers, rows };
    }
  } catch (e) {
    console.error("Failed to parse JSON", e);
  }
  return { headers: [], rows: [] };
};

export const exportToCSV = (data: TableData): string => {
  const headerLine = data.headers.join(',');
  const rowLines = data.rows.map(row => {
    return data.headers.map(h => row[h]).join(',');
  });
  return [headerLine, ...rowLines].join('\n');
};

// Pivot Logic
export interface PivotConfig {
  rows: string[];
  columns: string[];
  values: string[];
  aggregation: 'sum' | 'count' | 'average' | 'min' | 'max';
}

export const generatePivot = (data: any[], config: PivotConfig) => {
  const { rows, columns, values, aggregation } = config;
  
  // Allow generation if at least Rows OR Columns are specified. 
  // If Values are empty, we will just count the occurrences.
  if (rows.length === 0 && columns.length === 0) return null;

  const pivotData: any = {};
  const colKeys = new Set<string>();

  data.forEach(item => {
    const rowKey = rows.length > 0 ? rows.map(r => item[r]).join(' - ') : 'Total';
    const colKey = columns.length > 0 ? columns.map(c => item[c]).join(' - ') : 'Total';
    
    if (columns.length > 0) colKeys.add(colKey);
    else colKeys.add('Total'); // Default column if none selected

    if (!pivotData[rowKey]) pivotData[rowKey] = { name: rowKey };
    if (!pivotData[rowKey][colKey]) pivotData[rowKey][colKey] = [];

    if (values.length > 0) {
        pivotData[rowKey][colKey].push(item[values[0]]);
    } else {
        // If no value column is selected, we treat existence as 1 for counting
        pivotData[rowKey][colKey].push(1);
    }
  });

  const result: any[] = [];
  Object.keys(pivotData).forEach(rowKey => {
    const rowObj: any = { name: rowKey };
    const allColKeys = Array.from(colKeys);
    
    allColKeys.forEach(colKey => {
       const vals = pivotData[rowKey][colKey] || [];
       let aggVal = 0;
       
       // If no values were selected, force aggregation to count (or sum of 1s)
       const effectiveAgg = values.length === 0 ? 'count' : aggregation;

       if (effectiveAgg === 'count') aggVal = vals.length;
       else if (effectiveAgg === 'sum') aggVal = vals.reduce((a: number, b: number) => a + Number(b), 0);
       else if (effectiveAgg === 'average') aggVal = vals.length ? vals.reduce((a: number, b: number) => a + Number(b), 0) / vals.length : 0;
       else if (effectiveAgg === 'min') aggVal = vals.length ? Math.min(...vals) : 0;
       else if (effectiveAgg === 'max') aggVal = vals.length ? Math.max(...vals) : 0;
       
       rowObj[colKey] = parseFloat(aggVal.toFixed(2));
    });
    result.push(rowObj);
  });

  return { data: result, columns: Array.from(colKeys) };
};

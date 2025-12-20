
import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message, ModelOption, Attachment } from '../types/chat';
import { executeSQL } from '../utils/analysisEngine';

interface UseChatProps {
  selectedModel: ModelOption;
  useSearch: boolean;
  isAnalyzeMode: boolean;
}

export const useChatSession = ({ selectedModel, useSearch, isAnalyzeMode }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  // Helper to find the most recent data context in history
  const findActiveData = (history: Message[]) => {
    for (let i = history.length - 1; i >= 0; i--) {
      const att = history[i].attachments?.find(a => a.tableData);
      if (att) return att;
    }
    return null;
  };

  const generateSuggestions = async (history: Message[]) => {
    try {
      setIsSuggestionsLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Lightweight prompt context
      const lastMsgs = history.slice(-4).map(m => `${m.role}: ${m.text}`).join('\n');
      const hasData = !!findActiveData(history);
      
      const prompt = `
        Based on the conversation history below, generate 3 short, proactive, and intelligent follow-up options for the user.
        
        Context:
        - User has data loaded: ${hasData}
        - Conversation:
        ${lastMsgs}

        Rules:
        1. If data is present, suggest specific analysis (e.g., "Visualize sales trends", "Find top performers").
        2. If code was generated, suggest running or optimizing it.
        3. Keep suggestions under 6 words.
        4. Return ONLY a raw JSON array of strings. No markdown blocks.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Use fast model for meta-tasks
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '[]');
      if (Array.isArray(parsed)) {
        setSuggestions(parsed.slice(0, 3));
      }
    } catch (e) {
      console.warn("Failed to generate suggestions", e);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  const generateResponse = async (history: Message[]) => {
    try {
      setIsGenerating(true);
      setSuggestions([]); // Clear old suggestions while generating
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Find data context (either new upload or from history)
      const activeAttachment = findActiveData(history);
      const hasData = !!activeAttachment;

      // Logic for Analysis Mode
      let systemInstruction = isAnalyzeMode 
        ? "You are an expert data analyst. Provide deep, structured analysis." 
        : undefined;
      
      // If in Analysis Mode AND we have a table, force SQL generation
      if (isAnalyzeMode && hasData) {
          const cols = activeAttachment?.tableData?.headers.join(', ');
          systemInstruction = `
You are an expert Data Analyst. The user has uploaded a dataset with columns: [${cols}].
The dataset is available in a table named 'data'.

**CONSULTATIVE PROTOCOL (IMPORTANT):**
If the user has just uploaded the dataset or asks "What can you do?", do NOT run a full analysis immediately.
Instead:
1. Acknowledge the dataset.
2. Based on the column names, determine the domain (e.g., Marketing, Sales, Finance).
3. Propose 4-5 specific, high-value analysis questions you could answer.
   - Example: "Campaign Performance - Which campaigns drive the most ROI?"
   - Example: "Device Analysis - Mobile vs Desktop performance?"
4. Ask the user what they would like to focus on.

**EXECUTION PROTOCOL:**
When the user asks a question that requires reasoning, data work, or multi step logic, create an internal analysis plan first. Do not show the plan.
Based on that plan, decide whether the task needs one code cell or multiple small, focused code cells.
Break the work into human understandable steps, and only include a code cell when it is necessary for that step.
Each code cell must be followed by its result output, and if a visual meaningfully improves clarity, embed it under the matching step.

Explanations must stay short, direct, and clearly outline what was checked and what it means.
The final reply must be concise, structured, and easy for a human to follow.
Code must be readable, simple, and follow good engineering practices.
Reuse existing UI and code patterns instead of inventing new ones, and only run as much analysis as the question requires.

IMPORTANT RULES FOR SQL:
1. Write SQL queries inside markdown blocks like \`\`\`sql ... \`\`\`.
2. Do NOT invent columns that do not exist. Use the provided schema.
3. Use standard SQL syntax (AlaSQL/SQLite compatible).
4. **CRITICAL**: Use \`snake_case\` for aliases. Do **NOT** use spaces, double quotes, or special characters in aliases.
   - CORRECT: \`SELECT count(*) AS customer_count, sum(sales) AS total_sales FROM data\`
   - INCORRECT: \`SELECT count(*) AS "Customer Count" FROM data\`
   - INCORRECT: \`SELECT count(*) AS 'Total Sales' FROM data\`
5. **CRITICAL**: Ensure there is always a space between the alias and the FROM keyword.
   - CORRECT: \`AS my_count FROM\`
   - INCORRECT: \`AS my_countFROM\`
6. Do NOT use \`PRAGMA\` statements. The schema is already provided.
7. Provide a brief explanation before the code.
8. IF the user asks for a VISUALIZATION (chart, graph, plot):
   - Write the SQL to aggregate the data suitable for the chart (e.g., GROUP BY).
   - AFTER the SQL block, add a tag specifying the type: <visual_type>bar</visual_type>, <visual_type>pie</visual_type>, <visual_type>line</visual_type>, or <visual_type>scatter</visual_type>.
`;
      }

      const tools = (useSearch && !hasData) ? [{ googleSearch: {} }] : undefined;
      const modelId = (useSearch && selectedModel.id.includes('lite')) ? 'gemini-2.5-flash' : selectedModel.id;
      
      const aiMsgId = (Date.now() + 1).toString();
      // Temp message placeholder
      const modelMsg: Message = { id: aiMsgId, role: 'model', text: '', isStreaming: true, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);

      const contents = history.map(m => {
        const parts: any[] = [{ text: m.text }];
        if (m.attachments) {
          m.attachments.forEach(a => {
            if (a.mimeType.startsWith('image/')) {
               const base64Data = a.base64.split(',')[1];
               parts.push({ inlineData: { mimeType: a.mimeType, data: base64Data } });
            } else if (a.tableData) {
               // Embed file context so the model always sees it in history
               const headerInfo = a.tableData.headers.join(', ');
               // Limit preview to avoid huge context
               const rowPreview = JSON.stringify(a.tableData.rows.slice(0, 3));
               parts.push({ text: `\n<file_context>\nFilename: ${a.name}\nColumns: ${headerInfo}\nPreview: ${rowPreview}\n</file_context>` });
            }
          });
        }
        return { role: m.role, parts };
      });

      const stream = await ai.models.generateContentStream({
        model: modelId,
        contents,
        config: {
          tools,
          systemInstruction
        }
      });

      let fullText = '';
      let groundingMetadata = null;

      for await (const chunk of stream) {
        fullText += chunk.text || '';
        if (chunk.candidates?.[0]?.groundingMetadata) groundingMetadata = chunk.candidates[0].groundingMetadata;
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullText, groundingMetadata } : m));
      }

      let executionResults: Record<number, any> = {};

      // Post-processing: Check for SQL executions (support multiple blocks)
      if (isAnalyzeMode && hasData) {
          // Use a regex that captures all code blocks to maintain index synchronization with MarkdownRenderer
          // MarkdownRenderer splits by /(```[\s\S]*?```)/g
          const codeBlockRegex = /```(\w*)\s*([\s\S]*?)```/g;
          let match;
          let index = 0;
          
          while ((match = codeBlockRegex.exec(fullText)) !== null) {
              const lang = match[1].toLowerCase();
              const code = match[2].trim();
              
              if (lang === 'sql') {
                  const result = await executeSQL(code, activeAttachment?.tableData!);
                  
                  // Check for visual hint immediately following the block
                  const textAfter = fullText.slice(match.index + match[0].length);
                  const visualMatch = textAfter.match(/^\s*<visual_type>(.*?)<\/visual_type>/);
                  
                  if (result.type === 'table' && visualMatch) {
                     (result as any).visualHint = visualMatch[1];
                  }
                  
                  executionResults[index] = result;
              }
              
              index++;
          }
      }

      // Clean up internal tags from the final text so they don't appear in the UI
      // We remove specific tags that the model might generate or is instructed to generate
      let cleanedText = fullText
          .replace(/<visual_type>.*?<\/visual_type>/g, '')
          .replace(/<div id="sql_results">.*?<\/div>/g, '')
          .replace(/<div id="sql_results"\s*\/>/g, '');

      // Final state update for the message
      const finalModelMsg: Message = { 
        ...modelMsg, 
        text: cleanedText, 
        isStreaming: false, 
        groundingMetadata,
        executionResults // Store all results map
      };

      setMessages(prev => prev.map(m => m.id === aiMsgId ? finalModelMsg : m));
      
      // Trigger suggestion generation based on new history
      generateSuggestions([...history, finalModelMsg]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Error generating response.", timestamp: new Date() }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async (text: string, attachments: Attachment[] = []) => {
    if ((!text.trim() && attachments.length === 0) || isGenerating) return;
    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      text, 
      attachments,
      timestamp: new Date() 
    };
    const newHistory = messages.concat(userMsg);
    setMessages(newHistory);
    await generateResponse(newHistory);
  };

  const handleRerun = async (aiMsgId: string) => {
    if (isGenerating) return;
    const idx = messages.findIndex(m => m.id === aiMsgId);
    if (idx === -1) return;
    const newHistory = messages.slice(0, idx);
    setMessages(newHistory);
    await generateResponse(newHistory);
  };

  const toggleFeedback = (id: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: m.feedback === type ? undefined : type } : m));
  };

  return { messages, isGenerating, suggestions, isSuggestionsLoading, handleSend, handleRerun, toggleFeedback };
};

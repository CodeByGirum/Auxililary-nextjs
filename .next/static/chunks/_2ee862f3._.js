(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/utils/analysisEngine.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "executeSQL": (()=>executeSQL)
});
const executeSQL = async (query, data)=>{
    return new Promise((resolve)=>{
        try {
            // Access alasql from window since it's loaded via CDN
            const alasql = window.alasql;
            if (!alasql) {
                resolve({
                    type: 'error',
                    data: "Analysis Engine (AlaSQL) not loaded."
                });
                return;
            }
            // Polyfill strftime if it doesn't exist (commonly used by models trained on SQLite)
            if (!alasql.fn.strftime) {
                alasql.fn.strftime = (format, dateStr)=>{
                    const date = new Date(dateStr);
                    if (isNaN(date.getTime())) return dateStr;
                    return format.replace('%Y', date.getFullYear().toString()).replace('%m', (date.getMonth() + 1).toString().padStart(2, '0')).replace('%d', date.getDate().toString().padStart(2, '0')).replace('%H', date.getHours().toString().padStart(2, '0')).replace('%M', date.getMinutes().toString().padStart(2, '0')).replace('%S', date.getSeconds().toString().padStart(2, '0')).replace('%j', Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000).toString().padStart(3, '0')).replace('%w', date.getDay().toString());
                };
            }
            // Polyfill string_split (Fix for: alasql.fn.string_split is not a function)
            if (!alasql.fn.string_split) {
                alasql.fn.string_split = (str, delimiter)=>{
                    if (typeof str !== 'string') return [];
                    return str.split(delimiter || ',');
                };
            }
            // Polyfill json_extract (often used by Gemini for complex data)
            if (!alasql.fn.json_extract) {
                alasql.fn.json_extract = (jsonStr, path)=>{
                    try {
                        const obj = JSON.parse(jsonStr);
                        // Very simple path handler: $.key
                        const key = path.replace('$.', '');
                        return obj[key];
                    } catch  {
                        return null;
                    }
                };
            }
            if (!data || !data.rows) {
                resolve({
                    type: 'error',
                    data: "No active dataset found for analysis."
                });
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
                if (typeof result[0] === 'object' && result[0] !== null) {
                    const headers = Object.keys(result[0]);
                    const rows = result.map((r, i)=>({
                            ...r,
                            id: `res-${i}`
                        }));
                    resolve({
                        type: 'table',
                        data: {
                            headers,
                            rows
                        }
                    });
                } else {
                    // Array of primitives?
                    resolve({
                        type: 'text',
                        data: JSON.stringify(result, null, 2)
                    });
                }
            } else if (Array.isArray(result) && result.length === 0) {
                resolve({
                    type: 'text',
                    data: "No results found."
                });
            } else {
                // Scalar result or other
                resolve({
                    type: 'text',
                    data: String(result)
                });
            }
        } catch (e) {
            console.error("SQL Execution Error:", e);
            let msg = e.message || "Execution failed";
            if (msg.includes("Parse error")) {
                msg = `Syntax Error: ${msg}. Please ensure keywords are spaced correctly and aliases use snake_case (e.g., AS total_sales).`;
            }
            resolve({
                type: 'error',
                data: msg
            });
        }
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useChatSession.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useChatSession": (()=>useChatSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$analysisEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/analysisEngine.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const useChatSession = ({ selectedModel, useSearch, isAnalyzeMode })=>{
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const findActiveData = (history)=>{
        for(let i = history.length - 1; i >= 0; i--){
            const att = history[i].attachments?.find((a)=>a.tableData);
            if (att) return att;
        }
        return null;
    };
    const generateSuggestions = async (history)=>{
        try {
            setIsSuggestionsLoading(true);
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
            });
            const lastMsgs = history.slice(-4).map((m)=>`${m.role}: ${m.text}`).join('\n');
            const hasData = !!findActiveData(history);
            const prompt = `
        Based on the conversation history below, generate 3 short, proactive, and intelligent follow-up options for the user.
        Context:
        - User has data loaded: ${hasData}
        - Conversation:
        ${lastMsgs}
        Rules:
        1. If data is present, suggest specific analysis (e.g., "Visualize sales trends", "Find top performers").
        2. Keep suggestions under 6 words.
        4. Return ONLY a raw JSON array of strings.
      `;
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });
            const parsed = JSON.parse(response.text || '[]');
            if (Array.isArray(parsed)) {
                setSuggestions(parsed.slice(0, 3));
            }
        } catch (e) {
            console.warn("Failed to generate suggestions", e);
        } finally{
            setIsSuggestionsLoading(false);
        }
    };
    const generateResponse = async (history)=>{
        try {
            setIsGenerating(true);
            setSuggestions([]);
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
            });
            const activeAttachment = findActiveData(history);
            const hasData = !!activeAttachment;
            // Base instruction
            let systemInstruction = "You are a helpful, intelligent AI assistant.";
            // Data Analysis Instruction (Active whenever data is present, regardless of mode toggle)
            if (hasData) {
                const cols = activeAttachment?.tableData?.headers.join(', ');
                systemInstruction = `
You are an expert Data Analyst. The user has uploaded a dataset with columns: [${cols}].
The dataset is available in a SQL table named 'data'.

**VISUALIZATION LOGIC (STRICT):**
1. **Prioritize Value:** Only generate a chart if it reveals meaningful trends, distributions, or comparisons.
2. **Skip Trivial Charts:** DO NOT generate charts for single values (scalars), simple text lists, or very small datasets (less than 3 data points) unless explicitly requested.
3. **Format:** If a chart is valuable, output <visual_type>bar|line|pie|area</visual_type> immediately after the SQL block.

**OUTPUT FORMATTING:**
- **Scalars:** If the result is a single number (e.g., "Total Sales"), write the SQL to calculate it. The system will display it as a statistic. Do not generate a chart.
- **Tables:** Only imply a table output (by not adding a visual tag) if the user needs to explore raw rows or a detailed list.
- **Text:** Always provide a brief text analysis explaining the result *before* or *after* the code block.

**SQL RULES:**
- Use markdown blocks: \`\`\`sql ... \`\`\`.
- Use snake_case for aliases.
- Use 'data' as the table name.
`;
            } else if (isAnalyzeMode) {
                systemInstruction = "You are an expert data analyst. Provide deep, structured analysis and reasoning.";
            }
            const tools = useSearch && !hasData ? [
                {
                    googleSearch: {}
                }
            ] : undefined;
            const modelId = useSearch && selectedModel.id.includes('lite') ? 'gemini-flash-lite-latest' : selectedModel.id;
            const aiMsgId = (Date.now() + 1).toString();
            const modelMsg = {
                id: aiMsgId,
                role: 'model',
                text: '',
                isStreaming: true,
                timestamp: new Date()
            };
            setMessages((prev)=>[
                    ...prev,
                    modelMsg
                ]);
            const contents = history.map((m)=>{
                const parts = [
                    {
                        text: m.text
                    }
                ];
                if (m.attachments) {
                    m.attachments.forEach((a)=>{
                        if (a.mimeType.startsWith('image/')) {
                            const base64Data = a.base64.split(',')[1];
                            parts.push({
                                inlineData: {
                                    mimeType: a.mimeType,
                                    data: base64Data
                                }
                            });
                        } else if (a.tableData) {
                            const headerInfo = a.tableData.headers.join(', ');
                            const rowPreview = JSON.stringify(a.tableData.rows.slice(0, 3));
                            parts.push({
                                text: `\n<file_context>\nFilename: ${a.name}\nColumns: ${headerInfo}\nPreview: ${rowPreview}\n</file_context>`
                            });
                        }
                    });
                }
                return {
                    role: m.role,
                    parts
                };
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
            for await (const chunk of stream){
                fullText += chunk.text || '';
                if (chunk.candidates?.[0]?.groundingMetadata) groundingMetadata = chunk.candidates[0].groundingMetadata;
                setMessages((prev)=>prev.map((m)=>m.id === aiMsgId ? {
                            ...m,
                            text: fullText,
                            groundingMetadata
                        } : m));
            }
            let executionResults = {};
            if (hasData) {
                const codeBlockRegex = /```(\w*)\s*([\s\S]*?)```/g;
                let match;
                let index = 0;
                while((match = codeBlockRegex.exec(fullText)) !== null){
                    const lang = match[1].toLowerCase();
                    const code = match[2].trim();
                    if (lang === 'sql') {
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$analysisEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["executeSQL"])(code, activeAttachment?.tableData);
                        // Look for visual hint immediately after this block
                        const textAfter = fullText.slice(match.index + match[0].length);
                        const visualMatch = textAfter.match(/^\s*<visual_type>(.*?)<\/visual_type>/);
                        if (result.type === 'table' && visualMatch) {
                            result.visualHint = visualMatch[1].trim();
                        }
                        executionResults[index] = result;
                    }
                    index++;
                }
            }
            let cleanedText = fullText.replace(/<visual_type>.*?<\/visual_type>/g, '').trim();
            const finalModelMsg = {
                ...modelMsg,
                text: cleanedText,
                isStreaming: false,
                groundingMetadata,
                executionResults
            };
            setMessages((prev)=>prev.map((m)=>m.id === aiMsgId ? finalModelMsg : m));
            generateSuggestions([
                ...history,
                finalModelMsg
            ]);
        } catch (error) {
            console.error(error);
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: 'model',
                        text: "Error generating response.",
                        timestamp: new Date()
                    }
                ]);
        } finally{
            setIsGenerating(false);
        }
    };
    const handleSend = async (text, attachments = [])=>{
        if (!text.trim() && attachments.length === 0 || isGenerating) return;
        const userMsg = {
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
    const handleRerun = async (aiMsgId)=>{
        if (isGenerating) return;
        const idx = messages.findIndex((m)=>m.id === aiMsgId);
        if (idx === -1) return;
        const newHistory = messages.slice(0, idx);
        setMessages(newHistory);
        await generateResponse(newHistory);
    };
    const toggleFeedback = (id, type)=>{
        setMessages((prev)=>prev.map((m)=>m.id === id ? {
                    ...m,
                    feedback: m.feedback === type ? undefined : type
                } : m));
    };
    return {
        messages,
        setMessages,
        isGenerating,
        suggestions,
        isSuggestionsLoading,
        handleSend,
        handleRerun,
        toggleFeedback
    };
};
_s(useChatSession, "dk/5ts8/VIpIuMqUt0cuPJmFVgg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/audioHelpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createBlob": (()=>createBlob),
    "decodeAudioData": (()=>decodeAudioData)
});
function createBlob(data) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for(let i = 0; i < l; i++){
        int16[i] = data[i] * 32768;
    }
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for(let i = 0; i < len; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return {
        data: btoa(binary),
        mimeType: 'audio/pcm;rate=16000'
    };
}
async function decodeAudioData(base64, ctx) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for(let i = 0; i < len; i++){
        bytes[i] = binaryString.charCodeAt(i);
    }
    const dataInt16 = new Int16Array(bytes.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for(let i = 0; i < frameCount; i++){
        channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/constants/chat.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MODELS": (()=>MODELS),
    "VOICE_CONFIG": (()=>VOICE_CONFIG)
});
const MODELS = [
    {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3.0 Flash',
        desc: 'Fast & versatile (Default)'
    },
    {
        id: 'gemini-3-pro-preview',
        name: 'Gemini 3.0 Pro',
        desc: 'Complex reasoning & coding'
    },
    {
        id: 'gemini-flash-lite-latest',
        name: 'Gemini Flash Lite',
        desc: 'Lowest latency'
    }
];
const VOICE_CONFIG = {
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    voiceName: 'Kore'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useVoiceSession.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useVoiceSession": (()=>useVoiceSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$audioHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/audioHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/chat.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const useVoiceSession = ()=>{
    _s();
    const [isActive, setIsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('connecting');
    const [audioLevel, setAudioLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        audioCtx: null,
        inputCtx: null,
        stream: null,
        processor: null,
        session: null,
        nextTime: 0,
        sources: new Set()
    });
    const startSession = async ()=>{
        try {
            setIsActive(true);
            setStatus('connecting');
            setAudioLevel(0);
            setIsMuted(false);
            refs.current.nextTime = 0;
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
            });
            const AC = window.AudioContext || window.webkitAudioContext;
            refs.current.inputCtx = new AC({
                sampleRate: 16000
            });
            refs.current.audioCtx = new AC({
                sampleRate: 24000
            });
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            refs.current.stream = stream;
            const sessionPromise = ai.live.connect({
                model: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOICE_CONFIG"].model,
                config: {
                    responseModalities: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modality"].AUDIO
                    ],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOICE_CONFIG"].voiceName
                            }
                        }
                    },
                    systemInstruction: "You are a helpful, concise AI assistant."
                },
                callbacks: {
                    onopen: ()=>{
                        setStatus('listening');
                        setupAudioProcessing(stream, sessionPromise);
                    },
                    onmessage: (msg)=>handleMessage(msg),
                    onclose: ()=>setStatus('connecting'),
                    onerror: (e)=>{
                        console.error(e);
                        setStatus('error');
                    }
                }
            });
            refs.current.session = sessionPromise;
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };
    const setupAudioProcessing = (stream, sessionPromise)=>{
        const ctx = refs.current.inputCtx;
        const source = ctx.createMediaStreamSource(stream);
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        refs.current.processor = processor;
        processor.onaudioprocess = (e)=>{
            const input = e.inputBuffer.getChannelData(0);
            const rms = Math.sqrt(input.reduce((s, v)=>s + v * v, 0) / input.length);
            setAudioLevel((prev)=>prev * 0.8 + rms * 0.4); // Smoothed level
            if (!isMuted) {
                const blob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$audioHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(input);
                sessionPromise.then((s)=>s.sendRealtimeInput({
                        media: blob
                    }));
            }
        };
        source.connect(processor);
        processor.connect(ctx.destination);
    };
    const handleMessage = async (msg)=>{
        const data = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (data && refs.current.audioCtx) {
            setStatus('speaking');
            const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$audioHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAudioData"])(data, refs.current.audioCtx);
            const ctx = refs.current.audioCtx;
            if (refs.current.nextTime < ctx.currentTime) refs.current.nextTime = ctx.currentTime;
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(refs.current.nextTime);
            refs.current.nextTime += buffer.duration;
            refs.current.sources.add(source);
            source.onended = ()=>{
                refs.current.sources.delete(source);
                if (refs.current.sources.size === 0) setStatus('listening');
            };
        }
        if (msg.serverContent?.interrupted) {
            refs.current.sources.forEach((s)=>s.stop());
            refs.current.sources.clear();
            refs.current.nextTime = 0;
            setStatus('listening');
        }
    };
    const stopSession = ()=>{
        setIsActive(false);
        setStatus('connecting');
        refs.current.stream?.getTracks().forEach((t)=>t.stop());
        refs.current.processor?.disconnect();
        refs.current.inputCtx?.close();
        refs.current.audioCtx?.close();
        refs.current.sources.forEach((s)=>s.stop());
        refs.current.session?.then((s)=>s.close?.());
    };
    return {
        isActive,
        status,
        audioLevel,
        isMuted,
        startSession,
        stopSession,
        toggleMic: ()=>setIsMuted(!isMuted)
    };
};
_s(useVoiceSession, "CuzIlCJ+NDIpIHleRozx3IYKcpY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/EmptyState.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "EmptyState": (()=>EmptyState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sidebar$2f$AuxLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sidebar/AuxLogo.tsx [app-client] (ecmascript)");
;
;
;
const EmptyState = ({ onSuggestionClick })=>{
    const suggestions = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"],
            label: 'Code Assistant',
            text: 'Debug, refactor, and optimize.',
            prompt: "Analyze this codebase and suggest performance improvements. Focus on memory leaks and time complexity.",
            color: "bg-blue-50",
            model: "gemini-3-pro-preview"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
            label: 'Data Visualization',
            text: 'Create charts and insights.',
            prompt: "Generate a React component for a sales dashboard chart using Recharts.",
            color: "bg-purple-50",
            model: "gemini-3-pro-preview"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            label: 'Content Writer',
            text: 'Blogs, emails, and docs.',
            prompt: "Write a technical blog post about the future of Generative AI in enterprise software.",
            color: "bg-orange-50",
            model: "gemini-3-pro-preview"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
            label: 'Brainstorming',
            text: 'Generate ideas and strategies.',
            prompt: "Brainstorm 5 creative names for a new fitness app focused on calisthenics.",
            color: "bg-green-50",
            model: "gemini-3-pro-preview"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col items-center justify-center w-full max-w-3xl animate-in fade-in zoom-in-95 duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 text-black dark:text-white flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sidebar$2f$AuxLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuxLogo"], {
                        className: "w-full h-full"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/EmptyState.tsx",
                        lineNumber: 19,
                        columnNumber: 116
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chat/EmptyState.tsx",
                    lineNumber: 19,
                    columnNumber: 29
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chat/EmptyState.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500 dark:text-gray-400 mb-12 text-center max-w-md text-lg",
                children: "Supercharge your workflow. What would you like to achieve today?"
            }, void 0, false, {
                fileName: "[project]/components/chat/EmptyState.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4",
                children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSuggestionClick(s.prompt, s.model),
                        className: "group relative p-6 h-40 rounded-3xl bg-white dark:bg-[#1f1f1f] border border-gray-100 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md text-left flex flex-col justify-between overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute right-0 top-0 p-24 ${s.color} dark:bg-opacity-10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10`
                            }, void 0, false, {
                                fileName: "[project]/components/chat/EmptyState.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-gray-50 dark:bg-[#2a2a2a] flex items-center justify-center text-gray-900 dark:text-white mb-4 z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(s.icon, {
                                    size: 20,
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/EmptyState.tsx",
                                    lineNumber: 25,
                                    columnNumber: 155
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/chat/EmptyState.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium text-gray-900 dark:text-white mb-1",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/EmptyState.tsx",
                                        lineNumber: 26,
                                        columnNumber: 35
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 dark:text-gray-400",
                                        children: s.text
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/EmptyState.tsx",
                                        lineNumber: 26,
                                        columnNumber: 112
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chat/EmptyState.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/chat/EmptyState.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/chat/EmptyState.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/EmptyState.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
};
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/formatHelpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatTime": (()=>formatTime)
});
const formatTime = (date)=>{
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/fileHelpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fileToDataUrl": (()=>fileToDataUrl),
    "formatFileSize": (()=>formatFileSize)
});
const fileToDataUrl = (file)=>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
const formatFileSize = (bytes)=>{
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB'
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/CodeBlock.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CodeBlock": (()=>CodeBlock)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
;
var _s = __turbopack_context__.k.signature();
;
;
const CodeBlock = ({ language, code })=>{
    _s();
    const codeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeBlock.useEffect": ()=>{
            if (window.Prism && codeRef.current) window.Prism.highlightElement(codeRef.current);
        }
    }["CodeBlock.useEffect"], [
        code,
        language
    ]);
    const handleCopy = ()=>{
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group rounded-xl overflow-hidden my-6 border border-gray-200 dark:border-[#333] shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-[#262626] border-b border-gray-200 dark:border-[#333]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5",
                                children: [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"
                                    }, i, false, {
                                        fileName: "[project]/components/chat/CodeBlock.tsx",
                                        lineNumber: 28,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/chat/CodeBlock.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-xs font-mono text-gray-500 dark:text-gray-400 lowercase",
                                children: language || 'text'
                            }, void 0, false, {
                                fileName: "[project]/components/chat/CodeBlock.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/CodeBlock.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCopy,
                        className: "flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
                        children: [
                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/chat/CodeBlock.tsx",
                                lineNumber: 33,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/chat/CodeBlock.tsx",
                                lineNumber: 33,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copied ? 'Copied' : 'Copy'
                            }, void 0, false, {
                                fileName: "[project]/components/chat/CodeBlock.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/CodeBlock.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/CodeBlock.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1e1e1e] overflow-x-auto p-0 custom-scrollbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                    className: "!m-0 !p-4 !bg-transparent text-sm leading-relaxed",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        ref: codeRef,
                        className: `language-${language || 'javascript'}`,
                        children: code
                    }, void 0, false, {
                        fileName: "[project]/components/chat/CodeBlock.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chat/CodeBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chat/CodeBlock.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/CodeBlock.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
};
_s(CodeBlock, "2mwC5M/mofyVP+M3KqlsIcF9yyI=");
_c = CodeBlock;
var _c;
__turbopack_context__.k.register(_c, "CodeBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/MediaRenderer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MediaRenderer": (()=>MediaRenderer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const MediaRenderer = ({ url, type })=>{
    if (type === 'video') {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        if (!match?.[1]) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 w-full max-w-2xl bg-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                className: "w-full aspect-video",
                src: `https://www.youtube.com/embed/${match[1]}`,
                title: "YouTube video player",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowFullScreen: true,
                frameBorder: "0"
            }, void 0, false, {
                fileName: "[project]/components/chat/MediaRenderer.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/chat/MediaRenderer.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 w-full max-w-md bg-gray-50 dark:bg-[#1a1a1a]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: url,
            alt: "Embedded content",
            className: "w-full h-auto object-cover transition-opacity duration-500 ease-out",
            loading: "lazy",
            onError: (e)=>{
                e.target.style.display = 'none';
            }
        }, void 0, false, {
            fileName: "[project]/components/chat/MediaRenderer.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chat/MediaRenderer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
};
_c = MediaRenderer;
var _c;
__turbopack_context__.k.register(_c, "MediaRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/EmbeddedTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "EmbeddedTable": (()=>EmbeddedTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
;
var _s = __turbopack_context__.k.signature();
;
;
const EmbeddedTable = ({ data, fileName, visualHint, source, onExpand })=>{
    _s();
    // Local state for editing and resizing
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [headers, setHeaders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [colWidths, setColWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Interaction State
    const [selectedCell, setSelectedCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Resizing State
    const resizingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmbeddedTable.useEffect": ()=>{
            // Sync with props (e.g. if updated from drawer)
            setRows(data.rows.slice(0, 5)); // Only show first 5 rows in embedded view
            setHeaders(data.headers);
            // Initialize widths
            const initialWidths = {};
            data.headers.forEach({
                "EmbeddedTable.useEffect": (h)=>initialWidths[h] = 120
            }["EmbeddedTable.useEffect"]);
            setColWidths(initialWidths);
        }
    }["EmbeddedTable.useEffect"], [
        data
    ]);
    // --- Resizing Logic ---
    const handleMouseDown = (e, header)=>{
        e.preventDefault();
        resizingRef.current = {
            startX: e.clientX,
            startWidth: colWidths[header] || 120,
            header
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedTable.useCallback[handleMouseMove]": (e)=>{
            if (!resizingRef.current) return;
            const { startX, startWidth, header } = resizingRef.current;
            const diff = e.clientX - startX;
            setColWidths({
                "EmbeddedTable.useCallback[handleMouseMove]": (prev)=>({
                        ...prev,
                        [header]: Math.max(50, startWidth + diff)
                    })
            }["EmbeddedTable.useCallback[handleMouseMove]"]);
        }
    }["EmbeddedTable.useCallback[handleMouseMove]"], []);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedTable.useCallback[handleMouseUp]": ()=>{
            resizingRef.current = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }["EmbeddedTable.useCallback[handleMouseUp]"], [
        handleMouseMove
    ]);
    // --- Interaction Logic ---
    const handleCellClick = (r, c)=>{
        setSelectedCell({
            r,
            c
        });
    };
    // Helper to get column letter (A, B, C...)
    const getColLetter = (index)=>String.fromCharCode(65 + index);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full border border-gray-300 dark:border-[#444] bg-white dark:bg-[#1e1e1e] shadow-sm select-none flex flex-col rounded-xl overflow-hidden font-sans transition-all hover:shadow-md group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-2 bg-[#f8f9fa] dark:bg-[#252525] border-b border-gray-300 dark:border-[#444]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${visualHint ? 'bg-purple-600' : 'bg-[#107c41]'}`,
                                children: visualHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                    size: 16,
                                    className: "text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                    lineNumber: 79,
                                    columnNumber: 28
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                    size: 16,
                                    className: "text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                    lineNumber: 79,
                                    columnNumber: 77
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-gray-900 dark:text-gray-100 truncate",
                                                children: fileName
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this),
                                            source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-[#333] text-[9px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide border border-gray-300 dark:border-[#444]",
                                                children: source
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                                lineNumber: 85,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                        lineNumber: 82,
                                        columnNumber: 14
                                    }, this),
                                    visualHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-purple-600 dark:text-purple-400 uppercase font-bold tracking-wide",
                                        children: "Analysis Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                        lineNumber: 90,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onExpand,
                        className: "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#404040] rounded-full transition-colors shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                size: 12,
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Expand"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto relative no-scrollbar bg-white dark:bg-[#1e1e1e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-block min-w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 flex-shrink-0 bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] h-8"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this),
                                headers.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-shrink-0 flex items-center justify-center bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] h-8 text-[11px] font-bold text-gray-600 dark:text-gray-300",
                                        style: {
                                            width: colWidths[h]
                                        },
                                        children: [
                                            h,
                                            " (",
                                            getColLetter(i),
                                            ")",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#107c41] z-10",
                                                onMouseDown: (e)=>handleMouseDown(e, h)
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                                lineNumber: 117,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, h, true, {
                                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                        lineNumber: 110,
                                        columnNumber: 21
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chat/EmbeddedTable.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this),
                        rows.map((row, rIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 flex-shrink-0 flex items-center justify-center bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] text-[10px] text-gray-500 dark:text-gray-400 font-mono select-none group-hover:bg-[#e1dfdd] dark:group-hover:bg-[#333]",
                                        children: rIdx + 1
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                        lineNumber: 129,
                                        columnNumber: 21
                                    }, this),
                                    headers.map((h)=>{
                                        const isSelected = selectedCell?.r === rIdx && selectedCell?.c === h;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `
                                    relative flex-shrink-0 h-7 text-xs border-r border-b border-gray-200 dark:border-[#444] px-2 flex items-center
                                    ${rIdx % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-[#fafafa] dark:bg-[#232323]'} 
                                    ${isSelected ? 'outline outline-2 outline-[#107c41] z-10' : ''}
                                `,
                                            style: {
                                                width: colWidths[h]
                                            },
                                            onClick: ()=>handleCellClick(rIdx, h),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate w-full text-gray-800 dark:text-gray-200 pointer-events-none",
                                                children: row[h]
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                                lineNumber: 148,
                                                columnNumber: 33
                                            }, this)
                                        }, h, false, {
                                            fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                            lineNumber: 138,
                                            columnNumber: 29
                                        }, this);
                                    })
                                ]
                            }, rIdx, true, {
                                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/EmbeddedTable.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 bg-[#f8f9fa] dark:bg-[#252525] border-t border-gray-300 dark:border-[#444] flex justify-between items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-medium text-gray-500 dark:text-gray-400",
                    children: rows.length < data.rows.length ? `Previewing ${rows.length} of ${data.rows.length} rows` : `${rows.length} rows`
                }, void 0, false, {
                    fileName: "[project]/components/chat/EmbeddedTable.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chat/EmbeddedTable.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/EmbeddedTable.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
};
_s(EmbeddedTable, "4l9jUMKGoC1Itk+DD0zJtEOCNZY=");
_c = EmbeddedTable;
var _c;
__turbopack_context__.k.register(_c, "EmbeddedTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/types.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "COLOR_THEMES": (()=>COLOR_THEMES)
});
const COLOR_THEMES = {
    green: [
        '#107c41',
        '#21a366',
        '#33c481',
        '#185c37',
        '#0b5a2d'
    ],
    blue: [
        '#007AFF',
        '#5856D6',
        '#00C7BE',
        '#32ADE6',
        '#007AFF'
    ],
    purple: [
        '#AF52DE',
        '#BF5AF2',
        '#DA8FFF',
        '#5E5CE6',
        '#7D54DE'
    ],
    orange: [
        '#FF9500',
        '#FF3B30',
        '#FF2D55',
        '#FFCC00',
        '#FF9500'
    ],
    gray: [
        '#8E8E93',
        '#AEAEB2',
        '#C7C7CC',
        '#48484A',
        '#1C1C1E'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/ChatChart.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatChart": (()=>ChatChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const ChatChart = ({ data, type, onExpand })=>{
    _s();
    const { headers, rows } = data;
    const chartInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatChart.useMemo[chartInfo]": ()=>{
            if (!rows || rows.length === 0) return null;
            const firstRow = rows[0];
            const labelKey = headers.find({
                "ChatChart.useMemo[chartInfo]": (h)=>typeof firstRow[h] === 'string'
            }["ChatChart.useMemo[chartInfo]"]) || headers[0];
            const valueKeys = headers.filter({
                "ChatChart.useMemo[chartInfo].valueKeys": (h)=>typeof firstRow[h] === 'number' && h !== labelKey
            }["ChatChart.useMemo[chartInfo].valueKeys"]);
            const finalValueKeys = valueKeys.length > 0 ? valueKeys : headers.filter({
                "ChatChart.useMemo[chartInfo]": (h)=>h !== labelKey
            }["ChatChart.useMemo[chartInfo]"]).slice(0, 1);
            return {
                labelKey,
                valueKeys: finalValueKeys
            };
        }
    }["ChatChart.useMemo[chartInfo]"], [
        headers,
        rows
    ]);
    if (!chartInfo || rows.length === 0) return null;
    const colors = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"]['blue'];
    const monoFont = {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        fontWeight: 500
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full my-6 bg-white dark:bg-[#1e1e1e] rounded-3xl border border-gray-200 dark:border-[#333] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2.5 bg-gray-50 dark:bg-[#262626] border-b border-gray-200 dark:border-[#333] flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5 mr-2",
                                children: [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"
                                    }, i, false, {
                                        fileName: "[project]/components/chat/ChatChart.tsx",
                                        lineNumber: 42,
                                        columnNumber: 39
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono text-gray-500 dark:text-gray-400 lowercase",
                                children: "visual_insight"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/ChatChart.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onExpand,
                        className: "flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Expand"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/ChatChart.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/ChatChart.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-72 p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: type === 'pie' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                data: rows,
                                dataKey: chartInfo.valueKeys[0],
                                nameKey: chartInfo.labelKey,
                                cx: "50%",
                                cy: "50%",
                                outerRadius: 80,
                                innerRadius: 50,
                                paddingAngle: 4,
                                stroke: "none",
                                children: rows.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/components/chat/ChatChart.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    fontSize: '11px',
                                    fontFamily: 'JetBrains Mono'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                verticalAlign: "bottom",
                                height: 36,
                                iconType: "circle",
                                wrapperStyle: {
                                    fontSize: '10px',
                                    fontFamily: 'JetBrains Mono',
                                    textTransform: 'uppercase'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/ChatChart.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this) : type === 'line' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: rows,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                vertical: false,
                                stroke: "rgba(0,0,0,0.05)"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartInfo.labelKey,
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    ...monoFont,
                                    fill: '#999'
                                },
                                dy: 10
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    ...monoFont,
                                    fill: '#999'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    fontFamily: 'JetBrains Mono',
                                    fontSize: '11px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            chartInfo.valueKeys.map((key, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: key,
                                    stroke: colors[i % colors.length],
                                    strokeWidth: 3,
                                    dot: {
                                        r: 5,
                                        strokeWidth: 2,
                                        fill: '#fff'
                                    },
                                    activeDot: {
                                        r: 7,
                                        strokeWidth: 0
                                    }
                                }, key, false, {
                                    fileName: "[project]/components/chat/ChatChart.tsx",
                                    lineNumber: 99,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/ChatChart.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: rows,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                vertical: false,
                                stroke: "rgba(0,0,0,0.05)"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartInfo.labelKey,
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    ...monoFont,
                                    fill: '#999'
                                },
                                dy: 10
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    ...monoFont,
                                    fill: '#999'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                cursor: {
                                    fill: 'rgba(0,0,0,0.02)'
                                },
                                contentStyle: {
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    fontFamily: 'JetBrains Mono',
                                    fontSize: '11px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chat/ChatChart.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            chartInfo.valueKeys.map((key, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: key,
                                    fill: colors[i % colors.length],
                                    radius: [
                                        6,
                                        6,
                                        0,
                                        0
                                    ],
                                    barSize: 32
                                }, key, false, {
                                    fileName: "[project]/components/chat/ChatChart.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/ChatChart.tsx",
                        lineNumber: 111,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chat/ChatChart.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chat/ChatChart.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/ChatChart.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
};
_s(ChatChart, "C+ea4gVTto7gMR2ZfFId+PGtZjs=");
_c = ChatChart;
var _c;
__turbopack_context__.k.register(_c, "ChatChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/AnalysisBlock.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AnalysisBlock": (()=>AnalysisBlock)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/CodeBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/EmbeddedTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$ChatChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/ChatChart.tsx [app-client] (ecmascript)");
;
;
;
;
;
// Mini-component for Single Value Results
const StatResult = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#1e1e1e] p-5 rounded-2xl border border-gray-200 dark:border-[#333] shadow-sm inline-flex flex-col min-w-[160px] animate-in fade-in duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                lineNumber: 22,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-bold text-gray-900 dark:text-white font-mono",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/chat/AnalysisBlock.tsx",
                        lineNumber: 24,
                        columnNumber: 8
                    }, this),
                    typeof value === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/components/chat/AnalysisBlock.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/AnalysisBlock.tsx",
                        lineNumber: 26,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                lineNumber: 23,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/AnalysisBlock.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, this);
_c = StatResult;
const AnalysisBlock = ({ code, result, onExpandTable })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-6 animate-in fade-in duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeBlock"], {
                language: "sql",
                code: code
            }, void 0, false, {
                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-col gap-4 items-start",
                children: [
                    result.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-100 dark:border-red-800 flex gap-2 items-start font-mono shadow-sm w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                size: 14,
                                className: "mt-0.5 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                lineNumber: 45,
                                columnNumber: 18
                            }, this),
                            result.data
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/AnalysisBlock.tsx",
                        lineNumber: 44,
                        columnNumber: 14
                    }, this),
                    result.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-sm w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-2 border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#252525]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold uppercase text-gray-500 tracking-wider",
                                    children: "Output"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                    lineNumber: 53,
                                    columnNumber: 20
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                lineNumber: 52,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "font-mono text-xs text-gray-800 dark:text-gray-300 whitespace-pre-wrap p-4",
                                children: result.data
                            }, void 0, false, {
                                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                lineNumber: 55,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/AnalysisBlock.tsx",
                        lineNumber: 51,
                        columnNumber: 14
                    }, this),
                    result.type === 'table' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: result.visualHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$ChatChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatChart"], {
                            data: result.data,
                            type: result.visualHint,
                            onExpand: ()=>onExpandTable && onExpandTable(result.data, "Analysis Result", result.visualHint)
                        }, void 0, false, {
                            fileName: "[project]/components/chat/AnalysisBlock.tsx",
                            lineNumber: 65,
                            columnNumber: 18
                        }, this) : /* B. Scalar / Stat Check */ (()=>{
                            const tableData = result.data;
                            const isScalar = tableData.rows.length === 1 && tableData.headers.length === 1;
                            if (isScalar) {
                                const header = tableData.headers[0];
                                const val = tableData.rows[0][header];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatResult, {
                                    label: header,
                                    value: val
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                    lineNumber: 79,
                                    columnNumber: 32
                                }, this);
                            }
                            // C. Standard Table (Only if not scalar and no chart)
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedTable"], {
                                data: tableData,
                                fileName: "Analysis Result",
                                visualHint: result.visualHint,
                                onExpand: ()=>onExpandTable && onExpandTable(tableData, "Analysis Result", result.visualHint)
                            }, void 0, false, {
                                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, this);
                        })()
                    }, void 0, false)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/AnalysisBlock.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/AnalysisBlock.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
};
_c1 = AnalysisBlock;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatResult");
__turbopack_context__.k.register(_c1, "AnalysisBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/MarkdownRenderer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarkdownRenderer": (()=>MarkdownRenderer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/CodeBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MediaRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/MediaRenderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$AnalysisBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/AnalysisBlock.tsx [app-client] (ecmascript)");
;
;
;
;
const MarkdownRenderer = ({ content, executionResult, executionResults, onExpandTable })=>{
    if (!content) return null;
    // Split by code blocks. Regex captures the delimiter to include it in the parts array.
    const parts = content.split(/(```[\s\S]*?```)/g);
    let codeBlockIndex = 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2 text-[15px] leading-7 text-gray-800 dark:text-gray-200 font-normal",
        children: parts.map((part, index)=>{
            if (part.startsWith('```')) {
                const currentCodeIndex = codeBlockIndex++;
                // Check if it's a SQL or Python block
                // Robust matching for language identifier (optional) and content
                const match = part.match(/```(\w*)\s*([\s\S]*?)```/);
                const lang = match?.[1]?.toLowerCase() || '';
                const code = match?.[2] || part.slice(3, -3);
                // Resolve result: try executionResults (map) first, then fallback to legacy executionResult (single) for first block
                let result = executionResults?.[currentCodeIndex];
                if (!result && currentCodeIndex === 0 && executionResult) {
                    result = executionResult;
                }
                if ((lang === 'sql' || lang === 'python') && result) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$AnalysisBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisBlock"], {
                        code: code,
                        result: result,
                        onExpandTable: onExpandTable
                    }, index, false, {
                        fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeBlock"], {
                    language: lang,
                    code: code
                }, index, false, {
                    fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                    lineNumber: 59,
                    columnNumber: 18
                }, this);
            }
            // Normal text processing (Markdown, Media, etc.)
            const mediaRegex = /((?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)[a-zA-Z0-9_-]{11}|https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)/gi;
            const textParts = part.split(mediaRegex);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: textParts.map((subPart, i)=>{
                    if (!subPart) return null;
                    const isYoutube = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)/i.test(subPart);
                    const isImage = /\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?.*)?$/i.test(subPart);
                    if (isYoutube) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MediaRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaRenderer"], {
                        url: subPart,
                        type: "video"
                    }, i, false, {
                        fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                        lineNumber: 73,
                        columnNumber: 37
                    }, this);
                    if (isImage) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MediaRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaRenderer"], {
                        url: subPart,
                        type: "image"
                    }, i, false, {
                        fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                        lineNumber: 74,
                        columnNumber: 35
                    }, this);
                    return subPart.split('\n').map((line, lineIdx)=>{
                        if (line === '') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4"
                        }, `${i}-${lineIdx}`, false, {
                            fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                            lineNumber: 77,
                            columnNumber: 41
                        }, this);
                        const segments = line.split(/(\*\*.*?\*\*)/g);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-2",
                            children: segments.map((seg, k)=>seg.startsWith('**') && seg.endsWith('**') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "font-semibold text-gray-900 dark:text-white",
                                    children: seg.slice(2, -2)
                                }, k, false, {
                                    fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                                    lineNumber: 81,
                                    columnNumber: 92
                                }, this) : seg)
                        }, `${i}-${lineIdx}`, false, {
                            fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                            lineNumber: 80,
                            columnNumber: 19
                        }, this);
                    });
                })
            }, index, false, {
                fileName: "[project]/components/chat/MarkdownRenderer.tsx",
                lineNumber: 67,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/chat/MarkdownRenderer.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_c = MarkdownRenderer;
var _c;
__turbopack_context__.k.register(_c, "MarkdownRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/MessageItem.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MessageItem": (()=>MessageItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-client] (ecmascript) <export default as ThumbsDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formatHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/formatHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/fileHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MarkdownRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/MarkdownRenderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/EmbeddedTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const MessageItem = ({ msg, onRerun, onFeedback, onExpandTable })=>{
    _s();
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRerunSuccess, setIsRerunSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = ()=>{
        navigator.clipboard.writeText(msg.text);
        setIsCopied(true);
        setTimeout(()=>setIsCopied(false), 2000);
    };
    const handleRerun = ()=>{
        onRerun(msg.id);
        setIsRerunSuccess(true);
        setTimeout(()=>setIsRerunSuccess(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `max-w-3xl mx-auto px-4 py-6 flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${msg.role === 'user' ? 'bg-[#f4f4f4] dark:bg-[#2f2f2f] px-5 py-3.5 rounded-3xl text-gray-900 dark:text-white max-w-[85%]' : 'w-full text-gray-900 dark:text-gray-100'} leading-7`,
                children: [
                    msg.role === 'user' && msg.attachments && msg.attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 mb-3",
                        children: msg.attachments.map((att, i)=>{
                            if (att.tableData) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedTable"], {
                                    data: att.tableData,
                                    fileName: att.name,
                                    onExpand: ()=>onExpandTable && onExpandTable(att.tableData, att.name)
                                }, i, false, {
                                    fileName: "[project]/components/chat/MessageItem.tsx",
                                    lineNumber: 43,
                                    columnNumber: 24
                                }, this);
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: att.mimeType.startsWith('image/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: att.previewUrl,
                                    alt: "attachment",
                                    className: "max-w-full h-auto max-h-64 rounded-xl border border-gray-200 dark:border-[#444]"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/MessageItem.tsx",
                                    lineNumber: 54,
                                    columnNumber: 23
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#383838] border border-gray-200 dark:border-[#444] max-w-xs w-full shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg text-blue-600 dark:text-blue-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/MessageItem.tsx",
                                                lineNumber: 58,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 57,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium truncate text-gray-900 dark:text-gray-100",
                                                    children: att.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/chat/MessageItem.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 dark:text-gray-400",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFileSize"])(att.size)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/chat/MessageItem.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 60,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/chat/MessageItem.tsx",
                                    lineNumber: 56,
                                    columnNumber: 23
                                }, this)
                            }, i, false, {
                                fileName: "[project]/components/chat/MessageItem.tsx",
                                lineNumber: 52,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/chat/MessageItem.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    msg.role === 'model' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MarkdownRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkdownRenderer"], {
                                content: msg.text,
                                executionResult: msg.executionResult,
                                executionResults: msg.executionResults,
                                onExpandTable: onExpandTable
                            }, void 0, false, {
                                fileName: "[project]/components/chat/MessageItem.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            msg.groundingMetadata?.groundingChunks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 pt-3 border-t border-gray-100 dark:border-[#333] flex flex-wrap gap-2",
                                children: msg.groundingMetadata.groundingChunks.map((chunk, i)=>chunk.web?.uri && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: chunk.web.uri,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 dark:bg-[#1a1a1a] text-[10px] text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-[#333] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                size: 10
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/MessageItem.tsx",
                                                lineNumber: 85,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate max-w-[150px]",
                                                children: chunk.web.title || 'Source'
                                            }, void 0, false, {
                                                fileName: "[project]/components/chat/MessageItem.tsx",
                                                lineNumber: 85,
                                                columnNumber: 42
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 84,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/chat/MessageItem.tsx",
                                lineNumber: 82,
                                columnNumber: 17
                            }, this),
                            !msg.isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mt-4 select-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCopy,
                                        className: "p-1 text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
                                        children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 93,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 93,
                                            columnNumber: 55
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 92,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRerun,
                                        className: "p-1 text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
                                        children: isRerunSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 96,
                                            columnNumber: 39
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 96,
                                            columnNumber: 61
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 95,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onFeedback(msg.id, 'like'),
                                        className: `p-1 transition-colors ${msg.feedback === 'like' ? 'text-black dark:text-white' : 'text-gray-300 dark:text-gray-600 hover:text-gray-700'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                            size: 14,
                                            fill: msg.feedback === 'like' ? "currentColor" : "none"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 99,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 98,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onFeedback(msg.id, 'dislike'),
                                        className: `p-1 transition-colors ${msg.feedback === 'dislike' ? 'text-black dark:text-white' : 'text-gray-300 dark:text-gray-600 hover:text-gray-700'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"], {
                                            size: 14,
                                            fill: msg.feedback === 'dislike' ? "currentColor" : "none"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/MessageItem.tsx",
                                            lineNumber: 102,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-[9px] text-gray-300 dark:text-gray-700 font-mono pt-0.5",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formatHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(msg.timestamp)
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/MessageItem.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chat/MessageItem.tsx",
                                lineNumber: 91,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "whitespace-pre-wrap",
                        children: msg.text
                    }, void 0, false, {
                        fileName: "[project]/components/chat/MessageItem.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/MessageItem.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/chat/MessageItem.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chat/MessageItem.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
};
_s(MessageItem, "s9z/1Cz3fzr3Mlp4KeAL7xStdaI=");
_c = MessageItem;
var _c;
__turbopack_context__.k.register(_c, "MessageItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/tableUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "exportToCSV": (()=>exportToCSV),
    "generatePivot": (()=>generatePivot),
    "parseCSV": (()=>parseCSV),
    "parseJSON": (()=>parseJSON)
});
const parseCSV = (text)=>{
    const lines = text.split('\n').filter((l)=>l.trim());
    if (lines.length === 0) return {
        headers: [],
        rows: []
    };
    // Simple CSV parser (does not handle quoted commas for this prototype)
    const headers = lines[0].split(',').map((h)=>h.trim());
    const rows = lines.slice(1).map((line, idx)=>{
        const values = line.split(',');
        const row = {
            id: `row-${idx}`
        }; // Add internal ID
        headers.forEach((h, i)=>{
            let val = values[i]?.trim();
            // Attempt number conversion
            if (!isNaN(Number(val)) && val !== '') {
                val = Number(val);
            }
            row[h] = val;
        });
        return row;
    });
    return {
        headers,
        rows
    };
};
const parseJSON = (text)=>{
    try {
        const data = JSON.parse(text);
        if (Array.isArray(data) && data.length > 0) {
            const headers = Object.keys(data[0]);
            const rows = data.map((row, idx)=>({
                    ...row,
                    id: `row-${idx}`
                }));
            return {
                headers,
                rows
            };
        }
    } catch (e) {
        console.error("Failed to parse JSON", e);
    }
    return {
        headers: [],
        rows: []
    };
};
const exportToCSV = (data)=>{
    const headerLine = data.headers.join(',');
    const rowLines = data.rows.map((row)=>{
        return data.headers.map((h)=>row[h]).join(',');
    });
    return [
        headerLine,
        ...rowLines
    ].join('\n');
};
const generatePivot = (data, config)=>{
    const { rows, columns, values, aggregation } = config;
    // Allow generation if at least Rows OR Columns are specified. 
    // If Values are empty, we will just count the occurrences.
    if (rows.length === 0 && columns.length === 0) return null;
    const pivotData = {};
    const colKeys = new Set();
    data.forEach((item)=>{
        const rowKey = rows.length > 0 ? rows.map((r)=>item[r]).join(' - ') : 'Total';
        const colKey = columns.length > 0 ? columns.map((c)=>item[c]).join(' - ') : 'Total';
        if (columns.length > 0) colKeys.add(colKey);
        else colKeys.add('Total'); // Default column if none selected
        if (!pivotData[rowKey]) pivotData[rowKey] = {
            name: rowKey
        };
        if (!pivotData[rowKey][colKey]) pivotData[rowKey][colKey] = [];
        if (values.length > 0) {
            pivotData[rowKey][colKey].push(item[values[0]]);
        } else {
            // If no value column is selected, we treat existence as 1 for counting
            pivotData[rowKey][colKey].push(1);
        }
    });
    const result = [];
    Object.keys(pivotData).forEach((rowKey)=>{
        const rowObj = {
            name: rowKey
        };
        const allColKeys = Array.from(colKeys);
        allColKeys.forEach((colKey)=>{
            const vals = pivotData[rowKey][colKey] || [];
            let aggVal = 0;
            // If no values were selected, force aggregation to count (or sum of 1s)
            const effectiveAgg = values.length === 0 ? 'count' : aggregation;
            if (effectiveAgg === 'count') aggVal = vals.length;
            else if (effectiveAgg === 'sum') aggVal = vals.reduce((a, b)=>a + Number(b), 0);
            else if (effectiveAgg === 'average') aggVal = vals.length ? vals.reduce((a, b)=>a + Number(b), 0) / vals.length : 0;
            else if (effectiveAgg === 'min') aggVal = vals.length ? Math.min(...vals) : 0;
            else if (effectiveAgg === 'max') aggVal = vals.length ? Math.max(...vals) : 0;
            rowObj[colKey] = parseFloat(aggVal.toFixed(2));
        });
        result.push(rowObj);
    });
    return {
        data: result,
        columns: Array.from(colKeys)
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/AttachmentPreview.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AttachmentPreview": (()=>AttachmentPreview)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
;
;
const AttachmentPreview = ({ attachments, onRemove })=>{
    if (attachments.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-4 px-2 pb-2 mb-2",
        children: attachments.map((att, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative group animate-in fade-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#444] bg-white dark:bg-[#2a2a2a] flex flex-col items-center justify-center relative shadow-sm",
                        children: att.mimeType.startsWith('image/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: att.previewUrl,
                            alt: att.name,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/components/chat/AttachmentPreview.tsx",
                            lineNumber: 20,
                            columnNumber: 16
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center h-full w-full p-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    size: 24,
                                    className: "text-gray-400 dark:text-gray-500 mb-1.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/AttachmentPreview.tsx",
                                    lineNumber: 23,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] leading-tight text-gray-500 dark:text-gray-400 w-full truncate px-1 font-medium",
                                    children: att.name
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/AttachmentPreview.tsx",
                                    lineNumber: 24,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chat/AttachmentPreview.tsx",
                            lineNumber: 22,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/AttachmentPreview.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onRemove(i),
                        className: "absolute -top-2 -right-2 bg-gray-900 dark:bg-gray-700 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 12,
                            strokeWidth: 3
                        }, void 0, false, {
                            fileName: "[project]/components/chat/AttachmentPreview.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/AttachmentPreview.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/chat/AttachmentPreview.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/chat/AttachmentPreview.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
_c = AttachmentPreview;
var _c;
__turbopack_context__.k.register(_c, "AttachmentPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/InputArea.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "InputArea": (()=>InputArea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/chat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/fileHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/tableUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$AttachmentPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/AttachmentPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// --- High Fidelity Sub-components ---
const ChatPill = ({ active, onClick, icon: Icon, label, disabled = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `
      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all border outline-none
      ${active ? 'bg-gray-100 dark:bg-[#3d3d3d] text-gray-900 dark:text-white border-gray-300 dark:border-[#555]' : 'bg-transparent text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-[#333]'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 14,
                strokeWidth: 2,
                className: label === "Polishing..." ? "animate-spin" : ""
            }, void 0, false, {
                fileName: "[project]/components/chat/InputArea.tsx",
                lineNumber: 41,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/components/chat/InputArea.tsx",
                lineNumber: 42,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/InputArea.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, this);
_c = ChatPill;
const PrimaryAction = ({ onClick, icon: Icon, label, variant = 'primary', disabled = false, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `
      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95
      ${variant === 'primary' ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90' : 'bg-gray-100 dark:bg-[#333] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/components/chat/InputArea.tsx",
                lineNumber: 59,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 16,
                strokeWidth: 2.5,
                className: className
            }, void 0, false, {
                fileName: "[project]/components/chat/InputArea.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/InputArea.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, this);
_c1 = PrimaryAction;
const InputArea = (props)=>{
    _s();
    const [isModelMenuOpen, setIsModelMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRewriting, setIsRewriting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const taRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InputArea.useEffect": ()=>{
            const handleClick = {
                "InputArea.useEffect.handleClick": (e)=>{
                    if (menuRef.current && !menuRef.current.contains(e.target)) {
                        setIsModelMenuOpen(false);
                    }
                }
            }["InputArea.useEffect.handleClick"];
            document.addEventListener('mousedown', handleClick);
            return ({
                "InputArea.useEffect": ()=>document.removeEventListener('mousedown', handleClick)
            })["InputArea.useEffect"];
        }
    }["InputArea.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InputArea.useEffect": ()=>{
            if (taRef.current) {
                taRef.current.style.height = 'auto';
                taRef.current.style.height = `${Math.min(taRef.current.scrollHeight, 200)}px`;
            }
        }
    }["InputArea.useEffect"], [
        props.query
    ]);
    const handleFileSelect = async (e)=>{
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newAttachments = await Promise.all(files.map(async (file)=>{
                const base64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fileToDataUrl"])(file);
                let tableData = undefined;
                if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                    tableData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCSV"])(await file.text());
                } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
                    tableData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJSON"])(await file.text());
                }
                return {
                    file,
                    previewUrl: base64,
                    base64,
                    mimeType: file.type,
                    name: file.name,
                    size: file.size,
                    tableData
                };
            }));
            props.setAttachments([
                ...props.attachments,
                ...newAttachments
            ]);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };
    const handleRewrite = async ()=>{
        if (!props.query.trim() || isRewriting) return;
        setIsRewriting(true);
        try {
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
            });
            const response = await ai.models.generateContent({
                model: 'gemini-flash-lite-latest',
                contents: `Improve the clarity and tone of this message for an AI assistant. Output only the improved text. Text: "${props.query}"`
            });
            if (response.text) props.setQuery(response.text.trim());
        } catch (e) {
            console.error(e);
        } finally{
            setIsRewriting(false);
        }
    };
    const hasContent = props.query.trim().length > 0 || props.attachments.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full px-4 pb-8 pt-2 z-10 bg-white/95 dark:bg-[#212121]/95 backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto relative flex flex-col gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    multiple: true,
                    ref: fileInputRef,
                    onChange: handleFileSelect,
                    className: "hidden"
                }, void 0, false, {
                    fileName: "[project]/components/chat/InputArea.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center p-1 bg-gray-100 dark:bg-[#2f2f2f] rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>props.setIsAnalyzeMode(false),
                                className: `px-6 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${!props.isAnalyzeMode ? 'bg-white dark:bg-[#1e1e1e] text-black dark:text-white border border-gray-200 dark:border-[#444]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`,
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/InputArea.tsx",
                                lineNumber: 131,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>props.setIsAnalyzeMode(true),
                                className: `px-6 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${props.isAnalyzeMode ? 'bg-white dark:bg-[#1e1e1e] text-black dark:text-white border border-gray-200 dark:border-[#444]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`,
                                children: "Analyst"
                            }, void 0, false, {
                                fileName: "[project]/components/chat/InputArea.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/InputArea.tsx",
                        lineNumber: 130,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chat/InputArea.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#f4f4f4] dark:bg-[#2f2f2f] rounded-[32px] border border-gray-200 dark:border-[#444] p-4 pb-3 transition-all duration-300 relative group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$AttachmentPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AttachmentPreview"], {
                            attachments: props.attachments,
                            onRemove: (i)=>props.setAttachments(props.attachments.filter((_, idx)=>idx !== i))
                        }, void 0, false, {
                            fileName: "[project]/components/chat/InputArea.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ref: taRef,
                            value: props.query,
                            onChange: (e)=>props.setQuery(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    props.onSend();
                                }
                            },
                            placeholder: props.isAnalyzeMode ? "Describe the analysis you need..." : "Ask Auxiliary",
                            className: "w-full bg-transparent border-none focus:ring-0 outline-none resize-none text-[16px] text-gray-900 dark:text-white placeholder-gray-400 placeholder:text-opacity-50 dark:placeholder:text-opacity-50 leading-relaxed p-0 mb-4 max-h-[200px] overflow-y-auto no-scrollbar font-normal appearance-none",
                            rows: 1,
                            style: {
                                backgroundColor: 'transparent'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/chat/InputArea.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 mt-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 flex-wrap relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatPill, {
                                            onClick: ()=>fileInputRef.current?.click(),
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"],
                                            label: "Attach"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/InputArea.tsx",
                                            lineNumber: 164,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatPill, {
                                            active: props.useSearch,
                                            onClick: ()=>props.setUseSearch(!props.useSearch),
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
                                            label: "Search"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/InputArea.tsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatPill, {
                                                    active: isModelMenuOpen,
                                                    onClick: ()=>setIsModelMenuOpen(!isModelMenuOpen),
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"],
                                                    label: "Model"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/chat/InputArea.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 25
                                                }, this),
                                                isModelMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    ref: menuRef,
                                                    className: "absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#444] overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-200",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODELS"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                props.setSelectedModel(m);
                                                                setIsModelMenuOpen(false);
                                                            },
                                                            className: `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${props.selectedModel.id === m.id ? 'bg-gray-100 dark:bg-[#333]' : 'hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-medium text-gray-900 dark:text-white",
                                                                            children: m.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/chat/InputArea.tsx",
                                                                            lineNumber: 193,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[10px] text-gray-500",
                                                                            children: m.desc
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/chat/InputArea.tsx",
                                                                            lineNumber: 194,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/chat/InputArea.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 41
                                                                }, this),
                                                                props.selectedModel.id === m.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-1.5 h-1.5 rounded-full bg-green-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/chat/InputArea.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 77
                                                                }, this)
                                                            ]
                                                        }, m.id, true, {
                                                            fileName: "[project]/components/chat/InputArea.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 37
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/chat/InputArea.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/chat/InputArea.tsx",
                                            lineNumber: 177,
                                            columnNumber: 21
                                        }, this),
                                        hasContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatPill, {
                                            active: false,
                                            onClick: handleRewrite,
                                            icon: isRewriting ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"],
                                            label: isRewriting ? "Polishing..." : "Polish",
                                            disabled: isRewriting
                                        }, void 0, false, {
                                            fileName: "[project]/components/chat/InputArea.tsx",
                                            lineNumber: 205,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/chat/InputArea.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryAction, {
                                        onClick: props.onSend,
                                        icon: props.isGenerating ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"] : hasContent ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
                                        label: props.isAnalyzeMode ? "Analyze" : "Ask",
                                        disabled: props.isGenerating,
                                        className: props.isGenerating ? "animate-spin" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/chat/InputArea.tsx",
                                        lineNumber: 216,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/InputArea.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chat/InputArea.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/InputArea.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chat/InputArea.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chat/InputArea.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
};
_s(InputArea, "isW1fRI/iaBy8XE5UnuWHomf5/E=");
_c2 = InputArea;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ChatPill");
__turbopack_context__.k.register(_c1, "PrimaryAction");
__turbopack_context__.k.register(_c2, "InputArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/VoiceOverlay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "VoiceOverlay": (()=>VoiceOverlay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
;
;
const VoiceOverlay = ({ status, audioLevel, isMuted, onClose, onToggleMic })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-50 bg-white dark:bg-[#212121] flex flex-col items-center justify-center animate-in fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 p-6 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-[#2f2f2f] rounded-full border border-gray-100 dark:border-[#333]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full ${[
                                    'listening',
                                    'speaking'
                                ].includes(status) ? 'bg-black dark:bg-white animate-pulse' : 'bg-gray-400'}`
                            }, void 0, false, {
                                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider",
                                children: status === 'connecting' ? 'Connecting...' : 'Live Session'
                            }, void 0, false, {
                                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 24,
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/components/chat/VoiceOverlay.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-md aspect-square flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full border border-gray-200 dark:border-[#333] transition-all duration-300",
                        style: {
                            transform: `scale(${1 + audioLevel * 2.5})`,
                            opacity: Math.min(audioLevel * 1.5, 0.4)
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-20 rounded-full border border-gray-300 dark:border-[#444] transition-all duration-200",
                        style: {
                            transform: `scale(${1 + audioLevel * 1.5})`,
                            opacity: Math.min(audioLevel * 2, 0.6)
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-32 h-32 rounded-full bg-black dark:bg-white shadow-2xl dark:shadow-white/5 flex items-center justify-center z-10",
                        style: {
                            transform: `scale(${Math.max(1, 1 + audioLevel)})`
                        },
                        children: status === 'connecting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/chat/VoiceOverlay.tsx",
                            lineNumber: 31,
                            columnNumber: 38
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full rounded-full bg-gradient-to-b from-white/10 to-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/chat/VoiceOverlay.tsx",
                            lineNumber: 31,
                            columnNumber: 134
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-8 text-xl font-medium text-gray-900 dark:text-white",
                children: status === 'listening' ? 'Listening...' : status === 'speaking' ? 'Speaking...' : 'Connecting...'
            }, void 0, false, {
                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-12 flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onToggleMic,
                        className: `p-5 rounded-full border transition-all ${isMuted ? 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-[#2a2a2a]' : 'bg-white border-gray-200 text-gray-900 dark:bg-[#212121] dark:text-white'}`,
                        children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                            size: 24,
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/components/chat/VoiceOverlay.tsx",
                            lineNumber: 37,
                            columnNumber: 22
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                            size: 24,
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/components/chat/VoiceOverlay.tsx",
                            lineNumber: 37,
                            columnNumber: 63
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "px-8 py-5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:scale-105 transition-all",
                        children: "End Session"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/VoiceOverlay.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/VoiceOverlay.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/VoiceOverlay.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
_c = VoiceOverlay;
var _c;
__turbopack_context__.k.register(_c, "VoiceOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/views/DataGridView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DataGridView": (()=>DataGridView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
;
var _s = __turbopack_context__.k.signature();
;
;
const DataGridView = ({ headers, rows, onRowUpdate, onAddRow, onDeleteRow, filters, setFilters, sortConfig, setSortConfig })=>{
    _s();
    const [selectedCell, setSelectedCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [colWidths, setColWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const resizingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Lazy Loading State
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initial width setup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataGridView.useEffect": ()=>{
            const widths = {};
            headers.forEach({
                "DataGridView.useEffect": (h)=>widths[h] = 150
            }["DataGridView.useEffect"]);
            setColWidths(widths);
        }
    }["DataGridView.useEffect"], [
        headers
    ]);
    // Reset lazy load on filter/sort/data change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataGridView.useEffect": ()=>{
            setVisibleCount(50);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
        }
    }["DataGridView.useEffect"], [
        filters,
        sortConfig,
        rows.length
    ]);
    const handleCellEdit = (id, key, val)=>{
        onRowUpdate(id, {
            [key]: val
        });
    };
    // Scroll Handler for Lazy Loading
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataGridView.useCallback[handleScroll]": (e)=>{
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            // Load more when within 200px of bottom
            if (scrollHeight - scrollTop <= clientHeight + 200) {
                if (visibleCount < rows.length) {
                    setVisibleCount({
                        "DataGridView.useCallback[handleScroll]": (prev)=>Math.min(prev + 50, rows.length)
                    }["DataGridView.useCallback[handleScroll]"]);
                }
            }
        }
    }["DataGridView.useCallback[handleScroll]"], [
        rows.length,
        visibleCount
    ]);
    // Resizing Logic
    const handleResizeMouseDown = (e, header)=>{
        e.preventDefault();
        e.stopPropagation();
        resizingRef.current = {
            startX: e.clientX,
            startWidth: colWidths[header] || 150,
            header
        };
        document.addEventListener('mousemove', handleResizeMouseMove);
        document.addEventListener('mouseup', handleResizeMouseUp);
    };
    const handleResizeMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataGridView.useCallback[handleResizeMouseMove]": (e)=>{
            if (!resizingRef.current) return;
            const { startX, startWidth, header } = resizingRef.current;
            const diff = e.clientX - startX;
            setColWidths({
                "DataGridView.useCallback[handleResizeMouseMove]": (prev)=>({
                        ...prev,
                        [header]: Math.max(60, startWidth + diff)
                    })
            }["DataGridView.useCallback[handleResizeMouseMove]"]);
        }
    }["DataGridView.useCallback[handleResizeMouseMove]"], []);
    const handleResizeMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataGridView.useCallback[handleResizeMouseUp]": ()=>{
            resizingRef.current = null;
            document.removeEventListener('mousemove', handleResizeMouseMove);
            document.removeEventListener('mouseup', handleResizeMouseUp);
        }
    }["DataGridView.useCallback[handleResizeMouseUp]"], [
        handleResizeMouseMove
    ]);
    const visibleRows = rows.slice(0, visibleCount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 p-2 border-b border-gray-200 dark:border-[#333] bg-white/80 dark:bg-[#252525]/80 backdrop-blur-sm flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onAddRow,
                        className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#444] text-gray-700 dark:text-gray-200 transition-colors rounded-md shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            " Row"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/DataGridView.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-gray-300 dark:bg-[#444]"
                    }, void 0, false, {
                        fileName: "[project]/components/table/views/DataGridView.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilters({}),
                        className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#444] text-gray-700 dark:text-gray-200 transition-colors rounded-md shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            " Clear Filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/DataGridView.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto text-xs text-gray-500",
                        children: [
                            "Showing ",
                            visibleRows.length,
                            " of ",
                            rows.length,
                            " rows"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/DataGridView.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/views/DataGridView.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto custom-scrollbar bg-[#F5F5F7] dark:bg-[#1e1e1e] p-4",
                onScroll: handleScroll,
                ref: scrollContainerRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-block min-w-full bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] shadow-sm overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex sticky top-0 z-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 flex-shrink-0 bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-200 dark:border-[#444] h-8"
                                }, void 0, false, {
                                    fileName: "[project]/components/table/views/DataGridView.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-shrink-0 flex flex-col justify-center bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-200 dark:border-[#444] h-8 px-2 group",
                                        style: {
                                            width: colWidths[h]
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-[11px] font-semibold text-gray-600 dark:text-gray-300 select-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onClick: ()=>setSortConfig({
                                                            key: h,
                                                            dir: sortConfig?.key === h && sortConfig.dir === 'asc' ? 'desc' : 'asc'
                                                        }),
                                                    className: "cursor-pointer hover:text-black dark:hover:text-white",
                                                    children: [
                                                        h,
                                                        " ",
                                                        sortConfig?.key === h && (sortConfig.dir === 'asc' ? '↑' : '↓')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/table/views/DataGridView.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 z-30",
                                                onMouseDown: (e)=>handleResizeMouseDown(e, h)
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, h, true, {
                                        fileName: "[project]/components/table/views/DataGridView.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/table/views/DataGridView.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex sticky top-8 z-20 bg-white dark:bg-[#252525]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 flex-shrink-0 bg-white dark:bg-[#252525] border-r border-b border-gray-200 dark:border-[#444] h-8 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 10,
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/DataGridView.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/table/views/DataGridView.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 border-r border-b border-gray-200 dark:border-[#444] h-8 p-0",
                                        style: {
                                            width: colWidths[h]
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full h-full px-2 text-xs bg-transparent outline-none text-gray-600 dark:text-gray-300 placeholder-gray-300",
                                            placeholder: "Filter...",
                                            value: filters[h] || '',
                                            onChange: (e)=>setFilters({
                                                    ...filters,
                                                    [h]: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/DataGridView.tsx",
                                            lineNumber: 161,
                                            columnNumber: 17
                                        }, this)
                                    }, `filter-${h}`, false, {
                                        fileName: "[project]/components/table/views/DataGridView.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/table/views/DataGridView.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        visibleRows.map((row, rIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex group hover:bg-blue-50/50 dark:hover:bg-[#333] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 flex-shrink-0 bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-100 dark:border-[#444] text-[10px] flex items-center justify-center text-gray-400 dark:text-gray-500 select-none font-mono group-hover:bg-gray-100 dark:group-hover:bg-[#383838] relative",
                                        children: [
                                            rIdx + 1,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onDeleteRow(row.id),
                                                className: "absolute left-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 p-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    size: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/components/table/views/DataGridView.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/table/views/DataGridView.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    headers.map((h)=>{
                                        const isSelected = selectedCell?.r === rIdx && selectedCell?.c === h;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex-shrink-0 border-r border-b border-gray-100 dark:border-[#444] h-8 p-0 relative ${rIdx % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-[#fafbfc] dark:bg-[#232323]'} ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}`,
                                            style: {
                                                width: colWidths[h]
                                            },
                                            onClick: ()=>setSelectedCell({
                                                    r: rIdx,
                                                    c: h
                                                }),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full h-full px-2 bg-transparent border-none outline-none text-xs font-sans text-gray-800 dark:text-gray-200",
                                                value: row[h] || '',
                                                onChange: (e)=>handleCellEdit(row.id, h, e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                                lineNumber: 194,
                                                columnNumber: 21
                                            }, this)
                                        }, `${row.id}-${h}`, false, {
                                            fileName: "[project]/components/table/views/DataGridView.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, row.id, true, {
                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)),
                        visibleCount < rows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center p-4 bg-gray-50 dark:bg-[#252525]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/DataGridView.tsx",
                                lineNumber: 207,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/DataGridView.tsx",
                            lineNumber: 206,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/table/views/DataGridView.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/table/views/DataGridView.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/table/views/DataGridView.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
};
_s(DataGridView, "SyUtkD+OOigHX58VFB4XRON4fsA=");
_c = DataGridView;
var _c;
__turbopack_context__.k.register(_c, "DataGridView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/views/PivotView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PivotView": (()=>PivotView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/tableUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const PivotView = ({ headers, rows, config, setConfig })=>{
    _s();
    const [themeColor, setThemeColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('blue');
    const [showLabels, setShowLabels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pivotResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PivotView.useMemo[pivotResult]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePivot"])(rows, config);
        }
    }["PivotView.useMemo[pivotResult]"], [
        rows,
        config
    ]);
    const handlePivotDrag = (field, target)=>{
        setConfig({
            ...config,
            rows: config.rows.filter((f)=>f !== field),
            columns: config.columns.filter((f)=>f !== field),
            values: config.values.filter((f)=>f !== field),
            [target]: [
                ...config[target],
                field
            ]
        });
    };
    const removeField = (field, target)=>{
        setConfig({
            ...config,
            [target]: config[target].filter((f)=>f !== field)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-64 border-r border-gray-200 dark:border-[#333] flex flex-col bg-white dark:bg-[#252525] overflow-y-auto p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider",
                        children: "Pivot Settings"
                    }, void 0, false, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold mb-2 text-gray-700 dark:text-gray-200",
                                children: "Fields"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: true,
                                        onDragStart: (e)=>e.dataTransfer.setData('field', h),
                                        className: "px-3 py-2 bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] rounded-md text-xs cursor-grab active:cursor-grabbing shadow-sm hover:bg-gray-50 dark:hover:bg-[#383838] flex items-center justify-between transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: h
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: 12,
                                                className: "text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, h, true, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    [
                        'rows',
                        'columns',
                        'values'
                    ].map((area)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 min-h-[80px] border border-dashed border-gray-300 dark:border-[#444] rounded-lg bg-gray-50/50 dark:bg-[#2a2a2a]",
                            onDragOver: (e)=>e.preventDefault(),
                            onDrop: (e)=>{
                                const f = e.dataTransfer.getData('field');
                                if (f) handlePivotDrag(f, area);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-1.5 border-b border-gray-200 dark:border-[#444]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase text-gray-500 font-bold",
                                        children: area
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/table/views/PivotView.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 flex flex-col gap-1.5",
                                    children: [
                                        config[area].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center px-2.5 py-1.5 bg-white dark:bg-[#333] text-xs border border-gray-200 dark:border-[#444] rounded-md shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: f
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 12,
                                                        className: "cursor-pointer text-gray-400 hover:text-red-500",
                                                        onClick: ()=>removeField(f, area)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, f, true, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)),
                                        config[area].length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-gray-400 italic p-1 text-center",
                                            children: "Drop here"
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/PivotView.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/PivotView.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, area, true, {
                            fileName: "[project]/components/table/views/PivotView.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-gray-700 dark:text-gray-300",
                                children: "Aggregation"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "w-full mt-1 p-2 text-xs bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] rounded-md outline-none shadow-sm",
                                value: config.aggregation,
                                onChange: (e)=>setConfig({
                                        ...config,
                                        aggregation: e.target.value
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "sum",
                                        children: "Sum"
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "count",
                                        children: "Count"
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "average",
                                        children: "Average"
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto pt-4 border-t border-gray-200 dark:border-[#333] space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: showLabels,
                                            onChange: (e)=>setShowLabels(e.target.checked),
                                            className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/PivotView.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        "Show Labels"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/PivotView.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                size: 12,
                                                className: "text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 125,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-gray-400 uppercase",
                                                children: "Theme"
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"]).map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setThemeColor(color),
                                                className: `w-5 h-5 rounded-full transition-all ${themeColor === color ? 'ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-110'}`,
                                                style: {
                                                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"][color][0]
                                                },
                                                title: color
                                            }, color, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/views/PivotView.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-8 bg-[#F5F5F7] dark:bg-[#1e1e1e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#444] shadow-sm rounded-xl overflow-hidden min-h-[300px]",
                    children: pivotResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full border-collapse text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-gray-200 dark:border-[#444]",
                                    style: {
                                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"][themeColor][0]
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-3 text-left font-semibold text-white border-r border-white/10",
                                            children: config.rows.join(' > ') || 'Total'
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/PivotView.tsx",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this),
                                        pivotResult.columns.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-3 font-semibold text-white border-r border-white/10 min-w-[100px]",
                                                children: c
                                            }, c, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/PivotView.tsx",
                                    lineNumber: 151,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: pivotResult.data.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-gray-50 dark:hover:bg-[#2f2f2f] border-b border-gray-100 dark:border-[#444]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 font-medium text-gray-900 dark:text-white border-r border-gray-100 dark:border-[#444]",
                                                children: row.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/table/views/PivotView.tsx",
                                                lineNumber: 171,
                                                columnNumber: 21
                                            }, this),
                                            pivotResult.columns.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-right font-mono text-gray-600 dark:text-gray-400 border-r border-gray-100 dark:border-[#444]",
                                                    children: [
                                                        row[c],
                                                        showLabels && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-1 text-[9px] text-gray-400",
                                                            children: [
                                                                "(",
                                                                row[c],
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/table/views/PivotView.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, c, true, {
                                                    fileName: "[project]/components/table/views/PivotView.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 23
                                                }, this))
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/table/views/PivotView.tsx",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[300px] flex flex-col items-center justify-center text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                size: 48,
                                strokeWidth: 1,
                                className: "mb-4 opacity-20"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 189,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "Configure pivot to see results"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/PivotView.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/PivotView.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/table/views/PivotView.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/table/views/PivotView.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/table/views/PivotView.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
};
_s(PivotView, "QCxNnqhCUDtbhMFhuiOuH1U7oEw=");
_c = PivotView;
var _c;
__turbopack_context__.k.register(_c, "PivotView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/imageHelpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "downloadSvgAsPng": (()=>downloadSvgAsPng)
});
const downloadSvgAsPng = (svgElement, fileName)=>{
    try {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        // Create a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Get dimensions from SVG or use bounding rect
        const rect = svgElement.getBoundingClientRect();
        const width = rect.width * 2; // 2x for Retina/High Res
        const height = rect.height * 2;
        canvas.width = width;
        canvas.height = height;
        const img = new Image();
        const svgBlob = new Blob([
            svgString
        ], {
            type: 'image/svg+xml;charset=utf-8'
        });
        const url = URL.createObjectURL(svgBlob);
        img.onload = ()=>{
            if (ctx) {
                // White background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);
                // Draw image
                ctx.drawImage(img, 0, 0, width, height);
                // Download
                const pngUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = pngUrl;
                link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        };
        img.src = url;
    } catch (error) {
        console.error('Failed to download image', error);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/views/VisualsView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "VisualsView": (()=>VisualsView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/LabelList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$imageHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/imageHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const VisualsView = ({ headers, rows, fileName, config, setConfig })=>{
    _s();
    const { chartType, themeColor } = config;
    const [showLabels, setShowLabels] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const getChartData = ()=>{
        if (rows.length > 0) {
            // Simple heuristic: Use first string col as label, all number cols as values
            const labelKey = headers.find((h)=>typeof rows[0][h] === 'string') || headers[0];
            const valueKeys = headers.filter((h)=>typeof rows[0][h] === 'number');
            if (valueKeys.length > 0) {
                return {
                    data: rows,
                    keys: valueKeys,
                    labelKey
                };
            }
        }
        return null;
    };
    const chartDataInfo = getChartData();
    const handleDownloadVisual = ()=>{
        const svg = document.querySelector('.recharts-wrapper svg');
        if (svg) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$imageHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadSvgAsPng"])(svg, `${fileName}_visual.png`);
        }
    };
    if (!chartDataInfo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full flex flex-col items-center justify-center text-gray-400 bg-[#F5F5F7] dark:bg-[#1e1e1e]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"], {
                    size: 48,
                    strokeWidth: 1,
                    className: "mb-4 opacity-20"
                }, void 0, false, {
                    fileName: "[project]/components/table/views/VisualsView.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Visuals require numeric data."
                }, void 0, false, {
                    fileName: "[project]/components/table/views/VisualsView.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/table/views/VisualsView.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this);
    }
    const { data: chartData, keys: dataKeys, labelKey } = chartDataInfo;
    const colors = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"][themeColor];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full p-8 bg-[#F5F5F7] dark:bg-[#1e1e1e] overflow-y-auto flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 p-1 bg-white dark:bg-[#252525] rounded-lg border border-gray-200 dark:border-[#444] shadow-sm",
                                children: [
                                    'bar',
                                    'line',
                                    'pie'
                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setConfig({
                                                ...config,
                                                chartType: type
                                            }),
                                        className: `px-4 py-1.5 text-xs font-medium rounded-md transition-all uppercase tracking-wide ${chartType === type ? 'bg-gray-100 dark:bg-[#333] text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`,
                                        children: type
                                    }, type, false, {
                                        fileName: "[project]/components/table/views/VisualsView.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-[#252525] rounded-lg border border-gray-200 dark:border-[#444] shadow-sm",
                                children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"]).map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setConfig({
                                                ...config,
                                                themeColor: color
                                            }),
                                        className: `w-3 h-3 rounded-full transition-all ${themeColor === color ? 'scale-125 ring-1 ring-gray-400' : ''}`,
                                        style: {
                                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"][color][0]
                                        }
                                    }, color, false, {
                                        fileName: "[project]/components/table/views/VisualsView.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/VisualsView.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDownloadVisual,
                        className: "flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#444] rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#333] shadow-sm transition-colors text-xs font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            "Download PNG"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/VisualsView.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/views/VisualsView.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-[300px] max-h-[600px] bg-white dark:bg-[#252525] p-8 border border-gray-200 dark:border-[#444] shadow-sm rounded-2xl relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: chartType === 'bar' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: chartData,
                        margin: {
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                vertical: false,
                                stroke: "#F2F2F7"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: labelKey,
                                tick: {
                                    fontSize: 11,
                                    fill: '#8E8E93'
                                },
                                axisLine: false,
                                tickLine: false,
                                dy: 10
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fontSize: 11,
                                    fill: '#8E8E93'
                                },
                                axisLine: false,
                                tickLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                cursor: {
                                    fill: 'transparent'
                                },
                                contentStyle: {
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                wrapperStyle: {
                                    paddingTop: '20px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            dataKeys.map((key, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: key,
                                    fill: colors[i % colors.length],
                                    radius: [
                                        6,
                                        6,
                                        0,
                                        0
                                    ],
                                    barSize: 40,
                                    children: showLabels && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelList"], {
                                        dataKey: key,
                                        position: "top",
                                        style: {
                                            fontSize: '10px',
                                            fill: '#666'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/VisualsView.tsx",
                                        lineNumber: 135,
                                        columnNumber: 21
                                    }, this)
                                }, key, false, {
                                    fileName: "[project]/components/table/views/VisualsView.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/VisualsView.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this) : chartType === 'line' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: chartData,
                        margin: {
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                vertical: false,
                                stroke: "#F2F2F7"
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: labelKey,
                                tick: {
                                    fontSize: 11,
                                    fill: '#8E8E93'
                                },
                                axisLine: false,
                                tickLine: false,
                                dy: 10
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fontSize: 11,
                                    fill: '#8E8E93'
                                },
                                axisLine: false,
                                tickLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                wrapperStyle: {
                                    paddingTop: '20px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this),
                            dataKeys.map((key, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: key,
                                    stroke: colors[i % colors.length],
                                    strokeWidth: 3,
                                    dot: {
                                        r: 4,
                                        strokeWidth: 0
                                    },
                                    activeDot: {
                                        r: 6
                                    }
                                }, key, false, {
                                    fileName: "[project]/components/table/views/VisualsView.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/VisualsView.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                data: chartData,
                                dataKey: dataKeys[0],
                                nameKey: labelKey,
                                cx: "50%",
                                cy: "50%",
                                innerRadius: 100,
                                outerRadius: 140,
                                paddingAngle: 4,
                                cornerRadius: 6,
                                children: chartData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: colors[index % colors.length],
                                        strokeWidth: 0
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/components/table/views/VisualsView.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 177,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/components/table/views/VisualsView.tsx",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/VisualsView.tsx",
                        lineNumber: 176,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/table/views/VisualsView.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/table/views/VisualsView.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/table/views/VisualsView.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
};
_s(VisualsView, "X8LdADTmNvCJh6UQXzp9qUoxmVU=");
_c = VisualsView;
var _c;
__turbopack_context__.k.register(_c, "VisualsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/views/NotebookView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NotebookView": (()=>NotebookView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-code.js [app-client] (ecmascript) <export default as FileCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/tableUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$imageHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/imageHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// Helper Component for Markdown
const NotebookMarkdown = ({ content })=>{
    const lines = content.split('\n');
    const parseBold = (text)=>{
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index)=>{
            if (part.startsWith('**') && part.endsWith('**')) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    className: "font-semibold text-gray-900 dark:text-white",
                    children: part.slice(2, -2)
                }, index, false, {
                    fileName: "[project]/components/table/views/NotebookView.tsx",
                    lineNumber: 30,
                    columnNumber: 16
                }, this);
            }
            return part;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2 text-sm",
        children: lines.map((line, i)=>{
            const trimmed = line.trim();
            if (trimmed === '---') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "my-6 border-gray-200 dark:border-[#333]"
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 40,
                columnNumber: 39
            }, this);
            if (line.startsWith('# ')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3",
                children: line.replace('# ', '')
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 41,
                columnNumber: 43
            }, this);
            if (line.startsWith('## ')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold text-gray-900 dark:text-white mt-5 mb-2",
                children: line.replace('## ', '')
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 42,
                columnNumber: 44
            }, this);
            if (line.startsWith('### ')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-bold text-gray-900 dark:text-white mt-4 mb-2",
                children: line.replace('### ', '')
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 43,
                columnNumber: 45
            }, this);
            if (line.startsWith('- ')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 ml-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400",
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/components/table/views/NotebookView.tsx",
                        lineNumber: 44,
                        columnNumber: 84
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-700 dark:text-gray-300",
                        children: parseBold(line.replace('- ', ''))
                    }, void 0, false, {
                        fileName: "[project]/components/table/views/NotebookView.tsx",
                        lineNumber: 44,
                        columnNumber: 124
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 44,
                columnNumber: 43
            }, this);
            if (trimmed === '') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2"
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 45,
                columnNumber: 36
            }, this);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-700 dark:text-gray-300 leading-relaxed",
                children: parseBold(line)
            }, i, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 46,
                columnNumber: 16
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/table/views/NotebookView.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
};
_c = NotebookMarkdown;
const NotebookView = ({ headers, rows, fileName, triggerOnMount, report, setReport })=>{
    _s();
    const [isAnalyzing, setIsAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const themeColor = 'blue'; // Default theme
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotebookView.useEffect": ()=>{
            if (triggerOnMount && !report && rows.length > 0) {
                triggerAnalysis();
            }
        }
    }["NotebookView.useEffect"], [
        triggerOnMount,
        rows
    ]);
    const triggerAnalysis = async ()=>{
        if (rows.length === 0) return;
        setIsAnalyzing(true);
        try {
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
            });
            // Generate Data Profile
            const profile = {};
            headers.slice(0, 8).forEach((h)=>{
                const sampleVal = rows.find((r)=>r[h] !== null && r[h] !== undefined)?.[h];
                if (typeof sampleVal === 'number') {
                    const vals = rows.map((r)=>Number(r[h])).filter((n)=>!isNaN(n));
                    if (vals.length) {
                        const min = Math.min(...vals);
                        const max = Math.max(...vals);
                        const avg = vals.reduce((a, b)=>a + b, 0) / vals.length;
                        profile[h] = {
                            type: 'number',
                            min,
                            max,
                            avg: avg.toFixed(2)
                        };
                    }
                } else {
                    const vals = rows.map((r)=>String(r[h]));
                    const unique = new Set(vals).size;
                    const counts = vals.reduce((acc, v)=>{
                        acc[v] = (acc[v] || 0) + 1;
                        return acc;
                    }, {});
                    const top5 = Object.entries(counts).sort((a, b)=>b[1] - a[1]).slice(0, 5);
                    profile[h] = {
                        type: 'string',
                        unique,
                        top5
                    };
                }
            });
            const prompt = `
        You are an expert data analyst creating a comprehensive "Data Notebook" report.
        DATA PROFILE: ${JSON.stringify(profile)}

        TASK: Create a structured analysis notebook JSON with a title, summary, and a linear sequence of blocks.
        The analysis MUST follow this strict chapter structure:
        1. Dataset Overview (Row counts, structure, quality)
        2. Distributions (Histograms/Bars of key numeric fields)
        3. Categorical Breakdown (Pie/Bar charts of categories)
        4. Time-Series Trends (Lines/Areas if dates exist, else skip)
        5. Correlation Analysis (Scatter descriptions or Bar charts of relationships)
        6. Marketing Metrics (If applicable: conversion, cost, sales, ROI)
        7. Anomaly Detection (Highlight outliers or weird patterns)
        8. Final Recommendations (Actionable bullet points)

        RULES:
        - Never place two "chart" blocks back-to-back. Always separate them with a "text" block providing narrative/context.
        - "text" blocks should use Markdown (use # for Chapter Titles, ## for sections, **bold** for emphasis).
        - "chart" blocks must have valid 'xAxis' and 'yAxis' from the data headers provided in the profile.
        - If a chapter is not applicable (e.g. no dates for time-series), skip it gracefully.

        Response JSON format:
        {
          "title": string,
          "summary": string,
          "blocks": [
            { "type": "text", "content": string },
            { "type": "stat", "statLabel": string, "statValue": string, "trend": "up"|"down"|"neutral" },
            { "type": "chart", "title": string, "chartType": "bar"|"line"|"pie"|"area", "xAxis": string, "yAxis": string, "aggregation": "sum"|"count"|"average", "explanation": string }
          ]
        }
      `;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });
            const json = JSON.parse(response.text || '{}');
            if (json.title && json.blocks) {
                setReport(json);
            }
        } catch (e) {
            console.error("Analysis failed", e);
        } finally{
            setIsAnalyzing(false);
        }
    };
    const aggregateForChart = (xAxis, yAxis, aggType = 'sum')=>{
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePivot"])(rows, {
            rows: [
                xAxis
            ],
            columns: [],
            values: [
                yAxis
            ],
            aggregation: aggType
        });
        return result ? result.data : [];
    };
    const handleDownloadChartPng = (index, title)=>{
        const container = document.getElementById(`chart-block-${index}`);
        // Use robust selector to target Recharts wrapper SVG only, ignoring button icons
        const svg = container?.querySelector('.recharts-wrapper svg');
        if (svg) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$imageHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadSvgAsPng"])(svg, `${title.replace(/\s+/g, '_')}.png`);
        } else {
            console.error("Could not find chart SVG in block", index);
        }
    };
    const getChartBase64 = async (index)=>{
        const container = document.getElementById(`chart-block-${index}`);
        // Use robust selector here as well
        const svg = container?.querySelector('.recharts-wrapper svg');
        if (!svg) return null;
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        return new Promise((resolve)=>{
            const img = new Image();
            // Encode the SVG string to be safe for data URI
            const svgBlob = new Blob([
                svgString
            ], {
                type: 'image/svg+xml;charset=utf-8'
            });
            const url = URL.createObjectURL(svgBlob);
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                // Use bounding rect to determine size, multiplying by 2 for high DPI
                const rect = svg.getBoundingClientRect();
                const width = rect.width > 0 ? rect.width * 2 : 800;
                const height = rect.height > 0 ? rect.height * 2 : 600;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    resolve(null);
                }
                URL.revokeObjectURL(url);
            };
            img.onerror = ()=>{
                console.error("Failed to load SVG image for export");
                URL.revokeObjectURL(url);
                resolve(null);
            };
            img.src = url;
        });
    };
    const handleExport = async (format)=>{
        if (!report) return;
        setIsExporting(true);
        try {
            let content = '';
            const timestamp = new Date().toLocaleDateString();
            if (format === 'html') {
                content = `
<!DOCTYPE html>
<html>
<head>
    <title>${report.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-w-width: 900px; margin: 0 auto; padding: 40px; color: #333; }
        h1 { font-size: 2.5em; margin-bottom: 10px; color: #111; }
        h2 { margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px; color: #222; }
        h3 { margin-top: 25px; color: #444; }
        p { margin-bottom: 15px; color: #555; }
        .stat-grid { display: flex; gap: 20px; margin: 30px 0; flex-wrap: wrap; }
        .stat-card { background: #f9f9f9; padding: 20px; border-radius: 12px; border: 1px solid #eee; min-width: 150px; }
        .stat-label { font-size: 12px; text-transform: uppercase; color: #777; font-weight: 600; letter-spacing: 0.5px; }
        .stat-value { font-size: 24px; font-weight: 700; color: #111; margin-top: 5px; }
        .chart-container { margin: 40px 0; padding: 30px; border: 1px solid #eee; border-radius: 12px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .chart-img { width: 100%; height: auto; display: block; border-radius: 4px; }
        .summary { background: #f0f9ff; padding: 25px; border-radius: 12px; color: #0c4a6e; margin-bottom: 40px; line-height: 1.8; }
        .explanation { font-style: italic; color: #666; margin-bottom: 15px; display: block; }
    </style>
</head>
<body>
    <h1>${report.title}</h1>
    <p style="color: #666; font-size: 0.9em;">Generated on ${timestamp}</p>
    
    <div class="summary">
        <strong>Executive Summary</strong><br/>
        ${report.summary}
    </div>
            `;
            } else {
                content = `# ${report.title}\n\nGenerated on: ${timestamp}\n\n**Executive Summary**\n\n${report.summary}\n\n---\n\n`;
            }
            // Iterate blocks
            for(let i = 0; i < report.blocks.length; i++){
                const block = report.blocks[i];
                if (block.type === 'text') {
                    const text = block.content || '';
                    if (format === 'html') {
                        // Simple markdown-ish parser for HTML export
                        let htmlText = text.replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
                        content += `<div class="text-block">${htmlText}</div>`;
                    } else {
                        content += `${text}\n\n`;
                    }
                } else if (block.type === 'stat') {
                    if (format === 'html') {
                        content += `
                    <div class="stat-grid">
                        <div class="stat-card">
                            <div class="stat-label">${block.statLabel}</div>
                            <div class="stat-value">${block.statValue}</div>
                        </div>
                    </div>`;
                    } else {
                        content += `**${block.statLabel}**: ${block.statValue}\n\n`;
                    }
                } else if (block.type === 'chart') {
                    // Capture chart
                    const base64 = await getChartBase64(i);
                    if (base64) {
                        if (format === 'html') {
                            content += `
                        <div class="chart-container">
                            <h3>${block.title}</h3>
                            <span class="explanation">${block.explanation}</span>
                            <img src="${base64}" class="chart-img" alt="${block.title}" />
                        </div>`;
                        } else {
                            content += `### ${block.title}\n\n*${block.explanation}*\n\n![${block.title}](${base64})\n\n`;
                        }
                    }
                }
            }
            if (format === 'html') {
                content += `</body></html>`;
                const blob = new Blob([
                    content
                ], {
                    type: 'text/html'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}_notebook.html`;
                a.click();
            } else {
                const blob = new Blob([
                    content
                ], {
                    type: 'text/markdown'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}_notebook.md`;
                a.click();
            }
        } catch (e) {
            console.error("Export failed", e);
        } finally{
            setIsExporting(false);
        }
    };
    const renderBlock = (block, index)=>{
        if (block.type === 'text') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotebookMarkdown, {
                    content: block.content || ''
                }, void 0, false, {
                    fileName: "[project]/components/table/views/NotebookView.tsx",
                    lineNumber: 325,
                    columnNumber: 48
                }, this)
            }, index, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 325,
                columnNumber: 14
            }, this);
        }
        if (block.type === 'chart') {
            const chartData = block.xAxis && block.yAxis ? aggregateForChart(block.xAxis, block.yAxis, block.aggregation) : [];
            if (!chartData.length) return null;
            const colors = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_THEMES"][themeColor];
            const ChartComponent = block.chartType === 'line' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"] : block.chartType === 'pie' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"] : block.chartType === 'area' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: `chart-block-${index}`,
                className: "mb-8 bg-white dark:bg-[#252525] p-6 rounded-2xl border border-gray-100 dark:border-[#333] shadow-sm break-inside-avoid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-gray-900 dark:text-white text-lg",
                                        children: block.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this),
                                    block.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl",
                                        children: block.explanation
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 338,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDownloadChartPng(index, block.title || 'chart'),
                                className: "text-xs font-medium text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this),
                                    " PNG"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/views/NotebookView.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[250px] md:h-[300px] w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: block.chartType === 'pie' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                        data: chartData,
                                        dataKey: "Total",
                                        nameKey: "name",
                                        cx: "50%",
                                        cy: "50%",
                                        innerRadius: 60,
                                        outerRadius: 100,
                                        paddingAngle: 4,
                                        children: chartData.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                fill: colors[idx % colors.length],
                                                strokeWidth: 0
                                            }, `cell-${idx}`, false, {
                                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                                lineNumber: 349,
                                                columnNumber: 52
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 348,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 351,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 352,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                lineNumber: 347,
                                columnNumber: 18
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartComponent, {
                                data: chartData,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        vertical: false,
                                        stroke: "#eee"
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 356,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "name",
                                        tick: {
                                            fontSize: 11
                                        },
                                        axisLine: false,
                                        tickLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 357,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        tick: {
                                            fontSize: 11
                                        },
                                        axisLine: false,
                                        tickLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 358,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 359,
                                        columnNumber: 21
                                    }, this),
                                    block.chartType === 'line' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                        type: "monotone",
                                        dataKey: "Total",
                                        stroke: colors[0],
                                        strokeWidth: 3,
                                        dot: {
                                            r: 4
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 361,
                                        columnNumber: 26
                                    }, this) : block.chartType === 'area' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "Total",
                                        stroke: colors[0],
                                        fill: colors[0],
                                        fillOpacity: 0.3
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 363,
                                        columnNumber: 26
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                        dataKey: "Total",
                                        fill: colors[0],
                                        radius: [
                                            4,
                                            4,
                                            0,
                                            0
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/views/NotebookView.tsx",
                                        lineNumber: 365,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                lineNumber: 355,
                                columnNumber: 18
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/table/views/NotebookView.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 334,
                columnNumber: 9
            }, this);
        }
        return null;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 p-4 md:p-8 overflow-y-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto",
                children: isAnalyzing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center py-20 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 383,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 font-medium animate-pulse",
                            children: "Analyzing data & generating chapters..."
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 384,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/table/views/NotebookView.tsx",
                    lineNumber: 382,
                    columnNumber: 13
                }, this) : report ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-in fade-in duration-500 pb-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 pb-6 border-b border-gray-200 dark:border-[#333]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs font-bold text-blue-600 uppercase",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 103
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "AI Analysis"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 125
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                            lineNumber: 390,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleExport('html'),
                                                    disabled: isExporting,
                                                    className: "flex items-center gap-2 text-xs font-medium bg-white dark:bg-[#333] dark:text-white px-3 py-1.5 rounded-full border dark:border-[#444] shadow-sm hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors disabled:opacity-50",
                                                    children: [
                                                        isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            size: 12,
                                                            className: "animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 40
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__["FileCode"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 91
                                                        }, this),
                                                        "HTML"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleExport('md'),
                                                    disabled: isExporting,
                                                    className: "flex items-center gap-2 text-xs font-medium bg-white dark:bg-[#333] dark:text-white px-3 py-1.5 rounded-full border dark:border-[#444] shadow-sm hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors disabled:opacity-50",
                                                    children: [
                                                        isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            size: 12,
                                                            className: "animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 40
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 91
                                                        }, this),
                                                        "Markdown"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                            lineNumber: 391,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 389,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-900 dark:text-white mb-3",
                                    children: report.title
                                }, void 0, false, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 410,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-500",
                                    children: report.summary
                                }, void 0, false, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 411,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 388,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-4 mb-8",
                            children: report.blocks.filter((b)=>b.type === 'stat').map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-100 dark:border-[#333] min-w-[160px] shadow-sm flex-1 md:flex-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500 uppercase font-semibold tracking-wider",
                                            children: b.statLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                            lineNumber: 416,
                                            columnNumber: 27
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-end gap-2 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-3xl font-bold text-gray-900 dark:text-white",
                                                    children: b.statValue
                                                }, void 0, false, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 31
                                                }, this),
                                                b.trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs font-medium px-1.5 py-0.5 rounded ${b.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : b.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`,
                                                    children: b.trend === 'up' ? '↑' : b.trend === 'down' ? '↓' : '−'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                            lineNumber: 417,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 415,
                                    columnNumber: 23
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 413,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: report.blocks.filter((b)=>b.type !== 'stat').map((b, i)=>renderBlock(b, i))
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 432,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 pt-6 border-t border-gray-200 dark:border-[#333] flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-400 text-xs font-medium",
                                    children: [
                                        "Generated for ",
                                        fileName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 436,
                                    columnNumber: 18
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: triggerAnalysis,
                                    className: "flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/views/NotebookView.tsx",
                                            lineNumber: 437,
                                            columnNumber: 157
                                        }, this),
                                        " Regenerate Analysis"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/table/views/NotebookView.tsx",
                                    lineNumber: 437,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 435,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/table/views/NotebookView.tsx",
                    lineNumber: 387,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[400px] flex flex-col items-center justify-center text-center p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-white dark:bg-[#333] rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-sm border border-gray-100 dark:border-[#333]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/components/table/views/NotebookView.tsx",
                                lineNumber: 442,
                                columnNumber: 185
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 442,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold mb-2 text-gray-900 dark:text-white",
                            children: "AI Data Notebook"
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 443,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 dark:text-gray-400 mb-6 max-w-md",
                            children: "Generate a comprehensive report with specific chapters: Overview, Distributions, Trends, Correlations, and Recommendations."
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 444,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: triggerAnalysis,
                            className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 transition-all",
                            children: "Generate Report"
                        }, void 0, false, {
                            fileName: "[project]/components/table/views/NotebookView.tsx",
                            lineNumber: 445,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/table/views/NotebookView.tsx",
                    lineNumber: 441,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/table/views/NotebookView.tsx",
                lineNumber: 380,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/table/views/NotebookView.tsx",
            lineNumber: 379,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/table/views/NotebookView.tsx",
        lineNumber: 378,
        columnNumber: 5
    }, this);
};
_s(NotebookView, "KTxiVU6TUMTgMWgIDtDNrsdqsu8=");
_c1 = NotebookView;
var _c, _c1;
__turbopack_context__.k.register(_c, "NotebookMarkdown");
__turbopack_context__.k.register(_c1, "NotebookView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/table/TableDrawer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TableDrawer": (()=>TableDrawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$DataGridView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/views/DataGridView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$PivotView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/views/PivotView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$VisualsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/views/VisualsView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$NotebookView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/views/NotebookView.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const TableDrawer = ({ isOpen, data, fileName, visualHint, onClose, onSave, mode = 'fixed' })=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('data');
    const [lastSaved, setLastSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Data State
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [headers, setHeaders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // View States
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pivotConfig, setPivotConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        rows: [],
        columns: [],
        values: [],
        aggregation: 'sum'
    });
    const [visualsConfig, setVisualsConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        chartType: 'bar',
        themeColor: 'blue'
    });
    const [notebookReport, setNotebookReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const saveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    // Initialize once or when forced externally
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableDrawer.useEffect": ()=>{
            if (data) {
                const dataHash = JSON.stringify({
                    h: data.headers,
                    rCount: data.rows.length
                });
                // Only reset if it's a completely different dataset, not a silent autosave update from parent
                if (lastUpdateRef.current !== dataHash) {
                    setRows(data.rows);
                    setHeaders(data.headers);
                    lastUpdateRef.current = dataHash;
                }
                if (data.metadata) {
                    if (data.metadata.filters) setFilters(data.metadata.filters);
                    if (data.metadata.sortConfig) setSortConfig(data.metadata.sortConfig);
                    if (data.metadata.pivotConfig) setPivotConfig(data.metadata.pivotConfig);
                    if (data.metadata.visualsConfig) setVisualsConfig(data.metadata.visualsConfig);
                    if (data.metadata.notebookReport) setNotebookReport(data.metadata.notebookReport);
                }
                if (visualHint && [
                    'bar',
                    'pie',
                    'line'
                ].includes(visualHint)) {
                    setActiveTab('visuals');
                    setVisualsConfig({
                        "TableDrawer.useEffect": (prev)=>({
                                ...prev,
                                chartType: visualHint
                            })
                    }["TableDrawer.useEffect"]);
                }
            }
        }
    }["TableDrawer.useEffect"], [
        data,
        visualHint
    ]);
    // Persist logic - Silent background save
    const persistState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TableDrawer.useCallback[persistState]": ()=>{
            const metadata = {
                pivotConfig,
                visualsConfig,
                notebookReport,
                filters,
                sortConfig
            };
            onSave({
                headers,
                rows,
                metadata
            });
            setLastSaved(new Date());
        }
    }["TableDrawer.useCallback[persistState]"], [
        headers,
        rows,
        pivotConfig,
        visualsConfig,
        notebookReport,
        filters,
        sortConfig,
        onSave
    ]);
    // 3-second Autosave Effect - Truly in the background
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableDrawer.useEffect": ()=>{
            if (!isOpen) return;
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout({
                "TableDrawer.useEffect": ()=>{
                    persistState();
                }
            }["TableDrawer.useEffect"], 3000);
            return ({
                "TableDrawer.useEffect": ()=>{
                    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
                }
            })["TableDrawer.useEffect"];
        }
    }["TableDrawer.useEffect"], [
        rows,
        pivotConfig,
        visualsConfig,
        filters,
        sortConfig,
        isOpen,
        persistState
    ]);
    const handleRowUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TableDrawer.useCallback[handleRowUpdate]": (id, updates)=>{
            setRows({
                "TableDrawer.useCallback[handleRowUpdate]": (prev)=>prev.map({
                        "TableDrawer.useCallback[handleRowUpdate]": (r)=>r.id === id ? {
                                ...r,
                                ...updates
                            } : r
                    }["TableDrawer.useCallback[handleRowUpdate]"])
            }["TableDrawer.useCallback[handleRowUpdate]"]);
        }
    }["TableDrawer.useCallback[handleRowUpdate]"], []);
    const handleAddRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TableDrawer.useCallback[handleAddRow]": ()=>{
            const newRow = {
                id: `row-${Date.now()}`
            };
            headers.forEach({
                "TableDrawer.useCallback[handleAddRow]": (h)=>newRow[h] = ''
            }["TableDrawer.useCallback[handleAddRow]"]);
            setRows({
                "TableDrawer.useCallback[handleAddRow]": (prev)=>[
                        ...prev,
                        newRow
                    ]
            }["TableDrawer.useCallback[handleAddRow]"]);
        }
    }["TableDrawer.useCallback[handleAddRow]"], [
        headers
    ]);
    const handleDeleteRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TableDrawer.useCallback[handleDeleteRow]": (id)=>{
            setRows({
                "TableDrawer.useCallback[handleDeleteRow]": (prev)=>prev.filter({
                        "TableDrawer.useCallback[handleDeleteRow]": (r)=>r.id !== id
                    }["TableDrawer.useCallback[handleDeleteRow]"])
            }["TableDrawer.useCallback[handleDeleteRow]"]);
        }
    }["TableDrawer.useCallback[handleDeleteRow]"], []);
    const processedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TableDrawer.useMemo[processedRows]": ()=>{
            let res = [
                ...rows
            ];
            Object.keys(filters).forEach({
                "TableDrawer.useMemo[processedRows]": (key)=>{
                    const val = filters[key].toLowerCase();
                    if (val) res = res.filter({
                        "TableDrawer.useMemo[processedRows]": (r)=>r[key]?.toString().toLowerCase().includes(val)
                    }["TableDrawer.useMemo[processedRows]"]);
                }
            }["TableDrawer.useMemo[processedRows]"]);
            if (sortConfig) {
                res.sort({
                    "TableDrawer.useMemo[processedRows]": (a, b)=>{
                        const av = a[sortConfig.key];
                        const bv = b[sortConfig.key];
                        if (av < bv) return sortConfig.dir === 'asc' ? -1 : 1;
                        if (av > bv) return sortConfig.dir === 'asc' ? 1 : -1;
                        return 0;
                    }
                }["TableDrawer.useMemo[processedRows]"]);
            }
            return res;
        }
    }["TableDrawer.useMemo[processedRows]"], [
        rows,
        filters,
        sortConfig
    ]);
    const containerClasses = mode === 'inline' ? 'w-full h-full flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden' : `fixed inset-y-0 right-0 z-[60] w-[95vw] md:w-[90vw] lg:w-[1200px] bg-white dark:bg-[#1e1e1e] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-[#333] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
    if (mode === 'inline' && !isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: containerClasses,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 flex items-center justify-between px-6 flex-shrink-0 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#333] z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/table/TableDrawer.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-medium text-gray-900 dark:text-white tracking-tight",
                                        children: fileName
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/TableDrawer.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-medium uppercase tracking-widest text-gray-400",
                                            children: lastSaved ? `Autosaved ${lastSaved.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}` : 'Live Workspace'
                                        }, void 0, false, {
                                            fileName: "[project]/components/table/TableDrawer.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/TableDrawer.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex bg-gray-100 dark:bg-[#2a2a2a] p-1 rounded-xl",
                        children: [
                            {
                                id: 'data',
                                label: 'Grid',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"]
                            },
                            {
                                id: 'pivot',
                                label: 'Pivot',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"]
                            },
                            {
                                id: 'visuals',
                                label: 'Chart',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"]
                            },
                            {
                                id: 'analysis',
                                label: 'Notebook',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab.id),
                                className: `flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-white dark:bg-[#333] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                                        size: 13,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/table/TableDrawer.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this),
                                    tab.label
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: persistState,
                                className: "flex items-center gap-2 px-5 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full hover:opacity-80 transition-all active:scale-95 shadow-sm",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/table/TableDrawer.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/TableDrawer.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden relative bg-[#F5F5F7] dark:bg-[#1e1e1e]",
                children: [
                    activeTab === 'data' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$DataGridView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataGridView"], {
                        headers: headers,
                        rows: processedRows,
                        onRowUpdate: handleRowUpdate,
                        onAddRow: handleAddRow,
                        onDeleteRow: handleDeleteRow,
                        filters: filters,
                        setFilters: setFilters,
                        sortConfig: sortConfig,
                        setSortConfig: setSortConfig
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    activeTab === 'pivot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$PivotView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PivotView"], {
                        headers: headers,
                        rows: processedRows,
                        config: pivotConfig,
                        setConfig: setPivotConfig
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    activeTab === 'visuals' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$VisualsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualsView"], {
                        headers: headers,
                        rows: processedRows,
                        fileName: fileName,
                        config: visualsConfig,
                        setConfig: setVisualsConfig
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    activeTab === 'analysis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$NotebookView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotebookView"], {
                        headers: headers,
                        rows: processedRows,
                        fileName: fileName,
                        report: notebookReport,
                        setReport: setNotebookReport,
                        triggerOnMount: !notebookReport
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/TableDrawer.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/table/TableDrawer.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
};
_s(TableDrawer, "GHmpnJl+8Xy63sVZhUNUtJ825IY=");
_c = TableDrawer;
var _c;
__turbopack_context__.k.register(_c, "TableDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/chat/ContextSuggestions.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ContextSuggestions": (()=>ContextSuggestions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ContextSuggestions = ({ suggestions, onSelect, isLoading })=>{
    if (suggestions.length === 0 && !isLoading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-3xl mx-auto px-4 mb-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 fade-in-up",
            children: isLoading ? // Loading skeletons
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 w-full",
                children: [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-24 bg-gray-100 dark:bg-[#2f2f2f] rounded-full animate-pulse"
                    }, i, false, {
                        fileName: "[project]/components/chat/ContextSuggestions.tsx",
                        lineNumber: 19,
                        columnNumber: 16
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/chat/ContextSuggestions.tsx",
                lineNumber: 17,
                columnNumber: 11
            }, this) : suggestions.map((suggestion, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelect(suggestion),
                    className: "   flex-shrink-0 px-4 py-2    bg-white dark:bg-[#2a2a2a]    border border-gray-200 dark:border-[#333]    rounded-full text-xs font-medium    text-gray-500 dark:text-gray-400    hover:bg-gray-50 dark:hover:bg-[#333]    hover:text-gray-900 dark:hover:text-white    hover:border-gray-300 dark:hover:border-[#555]    transition-all duration-200 shadow-sm hover:shadow-md   animate-in slide-in-from-bottom-2 fade-in fill-mode-both whitespace-nowrap   ",
                    style: {
                        animationDelay: `${idx * 100}ms`
                    },
                    children: suggestion
                }, idx, false, {
                    fileName: "[project]/components/chat/ContextSuggestions.tsx",
                    lineNumber: 24,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/chat/ContextSuggestions.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chat/ContextSuggestions.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = ContextSuggestions;
var _c;
__turbopack_context__.k.register(_c, "ContextSuggestions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/NewChat.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * NewChat.tsx
 * 
 * Purpose: 
 * The core chat interface manager. It handles:
 * 1. Multi-tab chat sessions (NewChat component).
 * 2. Individual chat session logic (ChatSession component).
 * 3. File drag-and-drop for data analysis.
 * 4. Integration with the Table Drawer for data visualization.
 * 
 * Outline:
 * - ChatSession: Renders a single active chat context, managing messages, inputs, and AI interactions.
 * - NewChat: Manages the list of active chat tabs and the shared TableDrawer state.
 */ __turbopack_context__.s({
    "NewChat": (()=>NewChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useChatSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useVoiceSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useVoiceSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/chat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MessageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/MessageItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$InputArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/InputArea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$VoiceOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/VoiceOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$TableDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/TableDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$ContextSuggestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/ContextSuggestions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/fileHelpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/tableUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * ChatSession
 * 
 * Represents a single conversation thread.
 * Handles:
 * - Message history (via useChatSession)
 * - File attachments (drag & drop)
 * - Voice input (via useVoiceSession)
 * - Auto-titling of new chats
 */ const ChatSession = ({ id, isActive, onTitleChange, onExpandTable, initialData, lastDrawerUpdate })=>{
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedModel, setSelectedModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODELS"][0]);
    const [useSearch, setUseSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAnalyzeMode, setIsAnalyzeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [attachments, setAttachments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hasRenamed, setHasRenamed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasIngestedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const chat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatSession"])({
        selectedModel,
        useSearch,
        isAnalyzeMode
    });
    const voice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useVoiceSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVoiceSession"])();
    // Sync drawer updates back to chat messages without triggering a full remount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSession.useEffect": ()=>{
            if (lastDrawerUpdate && lastDrawerUpdate.msgId) {
                chat.setMessages({
                    "ChatSession.useEffect": (prev)=>prev.map({
                            "ChatSession.useEffect": (m)=>{
                                if (m.id === lastDrawerUpdate.msgId) {
                                    // Shallow compare to avoid unnecessary nested updates
                                    if (m.executionResults?.[0]?.data === lastDrawerUpdate.data) return m;
                                    if (m.executionResult && m.executionResult.type === 'table') {
                                        return {
                                            ...m,
                                            executionResult: {
                                                ...m.executionResult,
                                                data: lastDrawerUpdate.data
                                            }
                                        };
                                    }
                                    if (m.executionResults) {
                                        const updatedResults = {
                                            ...m.executionResults
                                        };
                                        if (updatedResults[0]) updatedResults[0] = {
                                            ...updatedResults[0],
                                            data: lastDrawerUpdate.data
                                        };
                                        return {
                                            ...m,
                                            executionResults: updatedResults
                                        };
                                    }
                                }
                                return m;
                            }
                        }["ChatSession.useEffect"])
                }["ChatSession.useEffect"]);
            }
        }
    }["ChatSession.useEffect"], [
        lastDrawerUpdate
    ]);
    // Initialize with data if provided (e.g. from "Ask AI" on a dataset)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSession.useEffect": ()=>{
            if (initialData && !hasIngestedData.current) {
                hasIngestedData.current = true;
                setIsAnalyzeMode(true);
                const attachment = {
                    file: new File([], initialData.name),
                    name: initialData.name,
                    previewUrl: '',
                    base64: '',
                    mimeType: 'application/json',
                    size: 0,
                    tableData: initialData.data
                };
                chat.handleSend(`I have loaded the dataset "${initialData.name}". Please review the columns and act as a consultant. Do not run a full analysis yet. Instead, propose 4-5 specific analysis options based on the data structure and ask me what I would like to focus on.`, [
                    attachment
                ]);
                onTitleChange(id, `Analysis: ${initialData.name}`);
                setHasRenamed(true);
            }
        }
    }["ChatSession.useEffect"], [
        initialData,
        chat,
        id,
        onTitleChange
    ]);
    // Scroll to bottom when new messages arrive or when switching back to this tab
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSession.useEffect": ()=>{
            if (isActive) {
                endRef.current?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }["ChatSession.useEffect"], [
        chat.messages,
        chat.isGenerating,
        isActive
    ]);
    // Auto-Summarize Title using Gemini
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSession.useEffect": ()=>{
            const generateTitle = {
                "ChatSession.useEffect.generateTitle": async ()=>{
                    if (chat.messages.length >= 2 && !hasRenamed && !initialData) {
                        const userMsg = chat.messages[0];
                        const modelMsg = chat.messages[1];
                        if (userMsg.role === 'user' && modelMsg.role === 'model' && !modelMsg.isStreaming) {
                            setHasRenamed(true);
                            try {
                                const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                                    apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
                                });
                                const response = await ai.models.generateContent({
                                    model: 'gemini-3-flash-preview',
                                    contents: `Summarize this user query into a very short title (max 3 words). No quotes. Text: "${userMsg.text}"`
                                });
                                const title = response.text?.trim();
                                if (title) onTitleChange(id, title);
                            } catch (e) {
                                onTitleChange(id, userMsg.text.slice(0, 20) + '...');
                            }
                        }
                    }
                }
            }["ChatSession.useEffect.generateTitle"];
            generateTitle();
        }
    }["ChatSession.useEffect"], [
        chat.messages,
        hasRenamed,
        id,
        onTitleChange,
        initialData
    ]);
    const handleSuggestion = (prompt, modelId)=>{
        setQuery(prompt);
        const model = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODELS"].find((m)=>m.id === modelId);
        if (model) setSelectedModel(model);
    };
    const handleSend = async ()=>{
        const currentQuery = query;
        const currentAttachments = attachments;
        setQuery('');
        setAttachments([]);
        await chat.handleSend(currentQuery, currentAttachments);
    };
    // Drag and drop handlers
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatSession.useCallback[handleDragOver]": (e)=>{
            e.preventDefault();
            setIsDragging(true);
        }
    }["ChatSession.useCallback[handleDragOver]"], []);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatSession.useCallback[handleDragLeave]": (e)=>{
            e.preventDefault();
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsDragging(false);
            }
        }
    }["ChatSession.useCallback[handleDragLeave]"], []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatSession.useCallback[handleDrop]": async (e)=>{
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const files = Array.from(e.dataTransfer.files);
                const newAttachments = await Promise.all(files.map({
                    "ChatSession.useCallback[handleDrop]": async (f)=>{
                        const base64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$fileHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fileToDataUrl"])(f);
                        let tableData = undefined;
                        if (f.type === 'text/csv' || f.name.endsWith('.csv')) tableData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCSV"])(await f.text());
                        else if (f.type === 'application/json' || f.name.endsWith('.json')) tableData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tableUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJSON"])(await f.text());
                        if (tableData) setIsAnalyzeMode(true);
                        return {
                            file: f,
                            previewUrl: base64,
                            base64,
                            mimeType: f.type,
                            name: f.name,
                            size: f.size,
                            tableData
                        };
                    }
                }["ChatSession.useCallback[handleDrop]"]));
                setAttachments({
                    "ChatSession.useCallback[handleDrop]": (prev)=>[
                            ...prev,
                            ...newAttachments
                        ]
                }["ChatSession.useCallback[handleDrop]"]);
            }
        }
    }["ChatSession.useCallback[handleDrop]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex-col h-full relative bg-white dark:bg-[#212121] w-full ${isActive ? 'flex' : 'hidden'}`,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: [
            isDragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center transition-all duration-200 pointer-events-none p-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full border-2 border-dashed border-indigo-500 rounded-3xl flex flex-col items-center justify-center bg-indigo-50/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] shadow-2xl flex items-center justify-center mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 32,
                                className: "text-indigo-600",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 201,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/NewChat.tsx",
                            lineNumber: 200,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-gray-900 dark:text-white tracking-tight",
                            children: "Drop data to analyze"
                        }, void 0, false, {
                            fileName: "[project]/components/NewChat.tsx",
                            lineNumber: 203,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/NewChat.tsx",
                    lineNumber: 199,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 198,
                columnNumber: 17
            }, this),
            voice.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$VoiceOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceOverlay"], {
                status: voice.status,
                audioLevel: voice.audioLevel,
                isMuted: voice.isMuted,
                onClose: voice.stopSession,
                onToggleMic: voice.toggleMic
            }, void 0, false, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 209,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto no-scrollbar flex flex-col items-center p-4 pb-24 w-full",
                children: chat.messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                    onSuggestionClick: handleSuggestion
                }, void 0, false, {
                    fileName: "[project]/components/NewChat.tsx",
                    lineNumber: 214,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex flex-col pb-4",
                    children: [
                        chat.messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$MessageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageItem"], {
                                msg: msg,
                                onRerun: chat.handleRerun,
                                onFeedback: chat.toggleFeedback,
                                onExpandTable: (data, name, hint)=>onExpandTable(data, name, hint, msg.id)
                            }, msg.id, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 218,
                                columnNumber: 29
                            }, this)),
                        chat.isGenerating && chat.messages[chat.messages.length - 1]?.role === 'user' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto px-4 py-6 w-full flex justify-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NewChat.tsx",
                                        lineNumber: 229,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NewChat.tsx",
                                        lineNumber: 230,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NewChat.tsx",
                                        lineNumber: 231,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 228,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/NewChat.tsx",
                            lineNumber: 227,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: endRef
                        }, void 0, false, {
                            fileName: "[project]/components/NewChat.tsx",
                            lineNumber: 235,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/NewChat.tsx",
                    lineNumber: 216,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 212,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full z-10 bg-white dark:bg-[#212121]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$ContextSuggestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextSuggestions"], {
                        suggestions: chat.suggestions,
                        onSelect: (s)=>chat.handleSend(s, []),
                        isLoading: chat.isSuggestionsLoading
                    }, void 0, false, {
                        fileName: "[project]/components/NewChat.tsx",
                        lineNumber: 241,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$InputArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputArea"], {
                        query: query,
                        setQuery: setQuery,
                        onSend: handleSend,
                        isGenerating: chat.isGenerating,
                        onStartVoice: voice.startSession,
                        selectedModel: selectedModel,
                        setSelectedModel: setSelectedModel,
                        useSearch: useSearch,
                        setUseSearch: setUseSearch,
                        isAnalyzeMode: isAnalyzeMode,
                        setIsAnalyzeMode: setIsAnalyzeMode,
                        attachments: attachments,
                        setAttachments: setAttachments
                    }, void 0, false, {
                        fileName: "[project]/components/NewChat.tsx",
                        lineNumber: 242,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 240,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NewChat.tsx",
        lineNumber: 191,
        columnNumber: 9
    }, this);
};
_s(ChatSession, "RMWW+X5zhmjzORhJQxKSyypJfiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useVoiceSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVoiceSession"]
    ];
});
_c = ChatSession;
const NewChat = ({ onChatUpdate, selectedChatId, incomingDataset, onClearIncomingDataset })=>{
    _s1();
    const [tabs, setTabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            title: 'New Chat'
        }
    ]);
    const [activeTabId, setActiveTabId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [tabData, setTabData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [drawerUpdate, setDrawerUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [draggedTabIndex, setDraggedTabIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredTabId, setHoveredTabId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTableDrawerOpen, setIsTableDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTableData, setActiveTableData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTableName, setActiveTableName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeVisualHint, setActiveVisualHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [activeMsgId, setActiveMsgId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [drawerWidth, setDrawerWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(600);
    const resizerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [editingTabId, setEditingTabId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTitle, setEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Sync selected tab with global state selection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewChat.useEffect": ()=>{
            const checkMobile = {
                "NewChat.useEffect.checkMobile": ()=>setIsMobile(window.innerWidth < 1024)
            }["NewChat.useEffect.checkMobile"]; // Matching sidebar breakpoint
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "NewChat.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["NewChat.useEffect"];
        }
    }["NewChat.useEffect"], []);
    // Sync selected tab with global state selection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewChat.useEffect": ()=>{
            if (selectedChatId) setActiveTabId(selectedChatId);
        }
    }["NewChat.useEffect"], [
        selectedChatId
    ]);
    // Handle incoming datasets (e.g. from file upload elsewhere)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewChat.useEffect": ()=>{
            if (incomingDataset) {
                const newId = Date.now().toString();
                setTabs({
                    "NewChat.useEffect": (prev)=>[
                            ...prev,
                            {
                                id: newId,
                                title: incomingDataset.name
                            }
                        ]
                }["NewChat.useEffect"]);
                setTabData({
                    "NewChat.useEffect": (prev)=>({
                            ...prev,
                            [newId]: incomingDataset
                        })
                }["NewChat.useEffect"]);
                setActiveTabId(newId);
                onChatUpdate(newId, incomingDataset.name);
                onClearIncomingDataset();
            }
        }
    }["NewChat.useEffect"], [
        incomingDataset
    ]);
    const handleExpandTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewChat.useCallback[handleExpandTable]": (data, fileName, visualHint, msgId)=>{
            setActiveTableData(data);
            setActiveTableName(fileName);
            setActiveVisualHint(visualHint);
            setActiveMsgId(msgId);
            setIsTableDrawerOpen(true);
        }
    }["NewChat.useCallback[handleExpandTable]"], []);
    const handleSaveTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewChat.useCallback[handleSaveTable]": (newData)=>{
            // Use ref-like comparison logic in ChatSession to avoid unnecessary cycles
            setDrawerUpdate({
                "NewChat.useCallback[handleSaveTable]": (prev)=>({
                        ...prev,
                        [activeTabId]: {
                            data: newData,
                            msgId: activeMsgId
                        }
                    })
            }["NewChat.useCallback[handleSaveTable]"]);
        }
    }["NewChat.useCallback[handleSaveTable]"], [
        activeTabId,
        activeMsgId
    ]);
    const handleTitleSubmit = (id)=>{
        if (editingTitle.trim()) {
            setTabs(tabs.map((t)=>t.id === id ? {
                    ...t,
                    title: editingTitle
                } : t));
            onChatUpdate(id, editingTitle);
        }
        setEditingTabId(null);
    };
    // Tab reordering logic
    const handleTabDragStart = (idx)=>{
        setDraggedTabIndex(idx);
    };
    const handleTabDragOver = (e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleTabDrop = (idx)=>{
        if (draggedTabIndex === null || draggedTabIndex === idx) return;
        const newTabs = [
            ...tabs
        ];
        const [movedTab] = newTabs.splice(draggedTabIndex, 1);
        newTabs.splice(idx, 0, movedTab);
        setTabs(newTabs);
        setDraggedTabIndex(null);
    };
    // Extracted resize logic for cleanliness
    const handleMouseDown = (e)=>{
        e.preventDefault();
        resizerRef.current = {
            startX: e.clientX,
            startWidth: drawerWidth
        };
        const move = (me)=>{
            const newWidth = resizerRef.current.startWidth + (resizerRef.current.startX - me.clientX);
            setDrawerWidth(Math.max(300, Math.min(window.innerWidth * 0.7, newWidth)));
        };
        const up = ()=>{
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full overflow-hidden bg-white dark:bg-[#212121] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 bg-white dark:bg-[#212121] border-b border-gray-100 dark:border-[#2a2a2a] flex items-end px-4 z-20 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center h-full overflow-x-auto no-scrollbar gap-0",
                    children: [
                        tabs.map((tab, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `relative flex items-end h-[46px] ${draggedTabIndex === idx ? 'opacity-40' : ''}`,
                                draggable: true,
                                onDragStart: ()=>handleTabDragStart(idx),
                                onDragOver: handleTabDragOver,
                                onDrop: ()=>handleTabDrop(idx),
                                onMouseEnter: ()=>setHoveredTabId(tab.id),
                                onMouseLeave: ()=>setHoveredTabId(null),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setActiveTabId(tab.id),
                                        onDoubleClick: ()=>{
                                            setEditingTabId(tab.id);
                                            setEditingTitle(tab.title);
                                        },
                                        className: `
                                    group relative h-[38px] flex items-center gap-3 cursor-pointer outline-none transition-all duration-300 ease-in-out
                                    ${activeTabId === tab.id ? 'text-black dark:text-white font-semibold bg-white dark:bg-[#212121] tab-active rounded-t-xl z-20 px-8 border-t border-x border-gray-100 dark:border-white/5 mb-[-1px]' : 'text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-200 px-6 z-10 tab-inactive rounded-t-lg h-[34px] mb-1'}
                                `,
                                        children: [
                                            activeTabId !== tab.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tab-inactive-shadow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/NewChat.tsx",
                                                lineNumber: 395,
                                                columnNumber: 60
                                            }, this),
                                            editingTabId === tab.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                autoFocus: true,
                                                value: editingTitle,
                                                onChange: (e)=>setEditingTitle(e.target.value),
                                                onBlur: ()=>handleTitleSubmit(tab.id),
                                                onKeyDown: (e)=>e.key === 'Enter' && handleTitleSubmit(tab.id),
                                                className: "bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-[0.15em] w-32 focus:ring-0",
                                                onClick: (e)=>e.stopPropagation()
                                            }, void 0, false, {
                                                fileName: "[project]/components/NewChat.tsx",
                                                lineNumber: 398,
                                                columnNumber: 37
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `truncate text-[11px] font-bold uppercase tracking-[0.15em] transition-opacity duration-300 ${activeTabId === tab.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`,
                                                children: tab.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/NewChat.tsx",
                                                lineNumber: 408,
                                                columnNumber: 37
                                            }, this),
                                            tabs.length > 1 && (activeTabId === tab.id || hoveredTabId === tab.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setTabs(tabs.filter((t)=>t.id !== tab.id));
                                                },
                                                className: `
                                            flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200
                                            bg-transparent hover:bg-gray-200/50 dark:hover:bg-white/10
                                            text-gray-400 hover:text-gray-900 dark:hover:text-white
                                            scale-90 hover:scale-100
                                        `,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 12,
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/components/NewChat.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/NewChat.tsx",
                                                lineNumber: 414,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NewChat.tsx",
                                        lineNumber: 381,
                                        columnNumber: 29
                                    }, this),
                                    activeTabId !== tab.id && activeTabId !== tabs[idx + 1]?.id && idx < tabs.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-5 w-px bg-gray-300 dark:bg-gray-700/50 mb-3 mx-[-1px]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NewChat.tsx",
                                        lineNumber: 429,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 371,
                                columnNumber: 25
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                const id = Date.now().toString();
                                setTabs([
                                    ...tabs,
                                    {
                                        id,
                                        title: 'New Chat'
                                    }
                                ]);
                                setActiveTabId(id);
                            },
                            className: "flex items-center justify-center w-8 h-8 rounded-full text-[#667681] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-300 ml-2 mb-1",
                            title: "New Chat",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 18,
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 439,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/NewChat.tsx",
                            lineNumber: 434,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/NewChat.tsx",
                    lineNumber: 369,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 368,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0 relative",
                        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatSession, {
                                id: tab.id,
                                isActive: activeTabId === tab.id,
                                onTitleChange: (id, title)=>{
                                    setTabs(tabs.map((t)=>t.id === id ? {
                                            ...t,
                                            title
                                        } : t));
                                    onChatUpdate(id, title);
                                },
                                onExpandTable: handleExpandTable,
                                initialData: tabData[tab.id],
                                lastDrawerUpdate: drawerUpdate[tab.id]
                            }, tab.id, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 448,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/NewChat.tsx",
                        lineNumber: 446,
                        columnNumber: 17
                    }, this),
                    !isMobile && isTableDrawerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onMouseDown: handleMouseDown,
                                className: "w-1.5 h-full cursor-col-resize hover:bg-indigo-500 active:bg-indigo-600 bg-gray-200 dark:bg-[#333] z-30 flex-shrink-0 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 460,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: drawerWidth
                                },
                                className: "h-full flex-shrink-0 bg-white dark:bg-[#1e1e1e] shadow-2xl border-l border-gray-200 dark:border-[#333] overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$TableDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableDrawer"], {
                                    isOpen: true,
                                    data: activeTableData,
                                    fileName: activeTableName,
                                    visualHint: activeVisualHint,
                                    onClose: ()=>setIsTableDrawerOpen(false),
                                    onSave: handleSaveTable,
                                    mode: "inline"
                                }, void 0, false, {
                                    fileName: "[project]/components/NewChat.tsx",
                                    lineNumber: 462,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/NewChat.tsx",
                                lineNumber: 461,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 445,
                columnNumber: 13
            }, this),
            isMobile && isTableDrawerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$TableDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableDrawer"], {
                isOpen: true,
                data: activeTableData,
                fileName: activeTableName,
                visualHint: activeVisualHint,
                onClose: ()=>setIsTableDrawerOpen(false),
                onSave: handleSaveTable,
                mode: "fixed"
            }, void 0, false, {
                fileName: "[project]/components/NewChat.tsx",
                lineNumber: 470,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NewChat.tsx",
        lineNumber: 366,
        columnNumber: 9
    }, this);
};
_s1(NewChat, "AZJYzObd65ArYL2eC/5dwZlv4z8=");
_c1 = NewChat;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatSession");
__turbopack_context__.k.register(_c1, "NewChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * app/page.tsx
 * 
 * Purpose: 
 * The main Home page of the application, rendering the default Chat interface.
 * 
 * Outline:
 * - Page: Main server/client component.
 * - NewChat: Core chat component.
 */ __turbopack_context__.s({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NewChat.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Page() {
    _s();
    // Access global state for updating chat titles and handling shared datasets
    const { updateChatTitle, incomingDataset, setIncomingDataset, selectedChatId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewChat"], {
        onChatUpdate: updateChatTitle,
        selectedChatId: selectedChatId,
        incomingDataset: incomingDataset,
        onClearIncomingDataset: ()=>setIncomingDataset(null)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
_s(Page, "Rpzs5BghUqigRqVdNQKkkwVa4dk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_2ee862f3._.js.map
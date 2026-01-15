(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

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
                                            columnNumber: 17
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
                                        lineNumber: 176,
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
                                lineNumber: 183,
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
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/table/TableDrawer.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 182,
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
                        lineNumber: 200,
                        columnNumber: 11
                    }, this),
                    activeTab === 'pivot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$PivotView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PivotView"], {
                        headers: headers,
                        rows: processedRows,
                        config: pivotConfig,
                        setConfig: setPivotConfig
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 213,
                        columnNumber: 12
                    }, this),
                    activeTab === 'visuals' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$views$2f$VisualsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualsView"], {
                        headers: headers,
                        rows: processedRows,
                        fileName: fileName,
                        config: visualsConfig,
                        setConfig: setVisualsConfig
                    }, void 0, false, {
                        fileName: "[project]/components/table/TableDrawer.tsx",
                        lineNumber: 221,
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
                        lineNumber: 230,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/table/TableDrawer.tsx",
                lineNumber: 198,
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
"[project]/app/datasets/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DatasetsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/EmbeddedTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$TableDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/table/TableDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/archive.js [app-client] (ecmascript) <export default as Archive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Mock Data Generation
const MOCK_DATASETS = [
    {
        id: '1',
        name: 'Retail Sales Forecast Demo',
        source: 'Salesforce',
        type: 'CSV',
        updated: 'Last Monday at 12:33 AM',
        status: 'Not deployed',
        data: {
            headers: [
                'Store ID',
                'Employee ID',
                'Area',
                'Date'
            ],
            rows: [
                {
                    'Store ID': 1,
                    'Employee ID': 54,
                    'Area': 'Asia',
                    'Date': '2018-01-31'
                },
                {
                    'Store ID': 1,
                    'Employee ID': 57,
                    'Area': 'Asia',
                    'Date': '2018-02-28'
                },
                {
                    'Store ID': 1,
                    'Employee ID': 50,
                    'Area': 'Asia',
                    'Date': '2018-03-31'
                },
                {
                    'Store ID': 1,
                    'Employee ID': 56,
                    'Area': 'Asia',
                    'Date': '2018-04-30'
                }
            ]
        }
    },
    {
        id: '2',
        name: 'Employee Attrition Demo',
        source: 'Workday',
        type: 'XLSX',
        updated: '06/27/2025',
        status: 'Not deployed',
        visualHint: 'bar',
        data: {
            headers: [
                'Job Title',
                'Years of Exp',
                'Department',
                'Salary Range'
            ],
            rows: [
                {
                    'Job Title': 'Assistant',
                    'Years of Exp': 25,
                    'Department': 'Sales',
                    'Salary Range': 'High'
                },
                {
                    'Job Title': 'Consultant',
                    'Years of Exp': 29,
                    'Department': 'Customer Service',
                    'Salary Range': 'Medium'
                },
                {
                    'Job Title': 'Executive',
                    'Years of Exp': 6,
                    'Department': 'Sales',
                    'Salary Range': 'High'
                },
                {
                    'Job Title': 'Consultant',
                    'Years of Exp': 3,
                    'Department': 'Marketing',
                    'Salary Range': 'Medium'
                }
            ]
        }
    },
    {
        id: '3',
        name: 'inconsistent_dataset',
        source: 'Manual Upload',
        type: 'JSON',
        updated: '12/04/2024',
        status: 'Not deployed',
        data: {
            headers: [
                'Product_ID',
                'Price',
                'Advertising',
                'Budget'
            ],
            rows: [
                {
                    'Product_ID': 'P001',
                    'Price': null,
                    'Advertising': null,
                    'Budget': null
                },
                {
                    'Product_ID': 'P002',
                    'Price': 150,
                    'Advertising': 510.0,
                    'Budget': 11500.0
                },
                {
                    'Product_ID': 'P003',
                    'Price': 200,
                    'Advertising': 520.0,
                    'Budget': 12000.0
                },
                {
                    'Product_ID': 'P004',
                    'Price': 250,
                    'Advertising': 530.0,
                    'Budget': 12500.0
                }
            ]
        }
    },
    {
        id: '4',
        name: 'Sentiment Model',
        source: 'HuggingFace',
        type: 'Parquet',
        updated: '12/02/2024',
        status: 'Deployed',
        visualHint: 'pie',
        data: {
            headers: [
                'Review Text',
                'Review',
                'Review_Binary'
            ],
            rows: [
                {
                    'Review Text': 'Wow... Loved this place.',
                    'Review': 'Positive',
                    'Review_Binary': 1
                },
                {
                    'Review Text': 'Crust is not good.',
                    'Review': 'Negative',
                    'Review_Binary': 0
                },
                {
                    'Review Text': 'Not tasty and texture bad.',
                    'Review': 'Negative',
                    'Review_Binary': 0
                },
                {
                    'Review Text': 'Stopped by during late May...',
                    'Review': 'Positive',
                    'Review_Binary': 1
                }
            ]
        }
    },
    {
        id: '5',
        name: 'Lead Scoring Demo',
        source: 'HubSpot',
        type: 'CSV',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: [
                'Job Title',
                'Years of Exp',
                'Company Size',
                'Industry'
            ],
            rows: [
                {
                    'Job Title': 'Assistant',
                    'Years of Exp': 23,
                    'Company Size': 'Large',
                    'Industry': 'IT'
                },
                {
                    'Job Title': 'Manager',
                    'Years of Exp': 23,
                    'Company Size': 'Large',
                    'Industry': 'Finance'
                },
                {
                    'Job Title': 'Manager',
                    'Years of Exp': 24,
                    'Company Size': 'Large',
                    'Industry': 'Finance'
                },
                {
                    'Job Title': 'Executive',
                    'Years of Exp': 3,
                    'Company Size': 'Large',
                    'Industry': 'Healthcare'
                }
            ]
        }
    },
    {
        id: '6',
        name: 'Churn Prediction Demo',
        source: 'Salesforce',
        type: 'CSV',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: [
                'Customer_ID',
                'Tenure',
                'MonthlyCharges',
                'TotalCharges'
            ],
            rows: [
                {
                    'Customer_ID': 'C1001',
                    'Tenure': 12,
                    'MonthlyCharges': 70.5,
                    'TotalCharges': 846.0
                },
                {
                    'Customer_ID': 'C1002',
                    'Tenure': 24,
                    'MonthlyCharges': 85.0,
                    'TotalCharges': 2040.0
                },
                {
                    'Customer_ID': 'C1003',
                    'Tenure': 5,
                    'MonthlyCharges': 50.0,
                    'TotalCharges': 250.0
                },
                {
                    'Customer_ID': 'C1004',
                    'Tenure': 36,
                    'MonthlyCharges': 90.0,
                    'TotalCharges': 3240.0
                }
            ]
        }
    },
    {
        id: '7',
        name: 'Credit Card Fraud Demo',
        source: 'Stripe',
        type: 'JSON',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: [
                'Transaction_ID',
                'Transaction_Type',
                'Currency',
                'Amount'
            ],
            rows: [
                {
                    'Transaction_ID': 7271,
                    'Transaction_Type': 'US',
                    'Currency': 'AUD',
                    'Amount': 1
                },
                {
                    'Transaction_ID': 861,
                    'Transaction_Type': 'US',
                    'Currency': 'AUD',
                    'Amount': 8
                },
                {
                    'Transaction_ID': 5391,
                    'Transaction_Type': 'US',
                    'Currency': 'CAD',
                    'Amount': 12
                },
                {
                    'Transaction_ID': 5192,
                    'Transaction_Type': 'US',
                    'Currency': 'USD',
                    'Amount': 5
                }
            ]
        }
    }
];
function DatasetsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setIncomingDataset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [datasets, setDatasets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MOCK_DATASETS);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [drawerOpen, setDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTable, setActiveTable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filter & Menu State
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSources, setSelectedSources] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeMenuId, setActiveMenuId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const filterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleExpand = (data, name)=>{
        setActiveTable({
            data,
            name
        });
        setDrawerOpen(true);
    };
    // Close filter when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatasetsPage.useEffect": ()=>{
            const handleClickOutside = {
                "DatasetsPage.useEffect.handleClickOutside": (event)=>{
                    if (filterRef.current && !filterRef.current.contains(event.target)) {
                        setFilterOpen(false);
                    }
                }
            }["DatasetsPage.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "DatasetsPage.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["DatasetsPage.useEffect"];
        }
    }["DatasetsPage.useEffect"], []);
    // Extract unique sources for filter
    const sources = Array.from(new Set(MOCK_DATASETS.map((d)=>d.source)));
    const toggleSource = (source)=>{
        setSelectedSources((prev)=>prev.includes(source) ? prev.filter((s)=>s !== source) : [
                ...prev,
                source
            ]);
    };
    // Filter Logic
    const displayedDatasets = datasets.filter((d)=>{
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.source.toLowerCase().includes(searchQuery.toLowerCase()) || d.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(d.source);
        return matchesSearch && matchesSource;
    });
    const handleOpenInChat = (ds)=>{
        // Set global context and redirect to home
        setIncomingDataset({
            name: ds.name,
            data: ds.data,
            source: ds.source
        });
        setActiveMenuId(null);
        router.push('/');
    };
    const handleDuplicate = (id)=>{
        const original = datasets.find((d)=>d.id === id);
        if (original) {
            const newDs = {
                ...original,
                id: Date.now().toString(),
                name: `${original.name} (Copy)`,
                updated: 'Just now',
                status: 'Not deployed' // Reset status for copy
            };
            setDatasets([
                newDs,
                ...datasets
            ]);
        }
        setActiveMenuId(null);
    };
    const handleDelete = (id)=>{
        setDatasets(datasets.filter((d)=>d.id !== id));
        setActiveMenuId(null);
    };
    const handleArchive = (id)=>{
        // Treating archive as delete for the list view for now
        handleDelete(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 md:p-10 pb-20 max-w-[1600px] mx-auto",
        onClick: ()=>setActiveMenuId(null),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2",
                                children: "Datasets"
                            }, void 0, false, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 225,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 dark:text-gray-400",
                                children: "Manage and analyze your connected data sources."
                            }, void 0, false, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 226,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/datasets/page.tsx",
                        lineNumber: 224,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full sm:w-72 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16,
                                            className: "text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/datasets/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search datasets...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "block w-full pl-10 pr-3 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 233,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 w-full sm:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-1 sm:flex-none",
                                        ref: filterRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setFilterOpen(!filterOpen);
                                                },
                                                className: `flex w-full items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-700 dark:text-gray-200 shadow-sm active:scale-95 ${filterOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                        size: 16,
                                                        strokeWidth: 1.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Filter"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 33
                                                    }, this),
                                                    selectedSources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full",
                                                        children: selectedSources.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 249,
                                                columnNumber: 29
                                            }, this),
                                            filterOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 z-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-[#333]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2",
                                                            children: "Filter by Source"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/datasets/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-1.5 max-h-64 overflow-y-auto custom-scrollbar",
                                                        children: [
                                                            sources.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        toggleSource(s);
                                                                    },
                                                                    className: "flex items-center gap-3 w-full px-2 py-2 text-sm text-left rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-4 h-4 border rounded-md flex items-center justify-center transition-colors ${selectedSources.includes(s) ? 'bg-black dark:bg-white border-transparent' : 'border-gray-300 dark:border-[#444]'}`,
                                                                            children: selectedSources.includes(s) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                size: 10,
                                                                                className: "text-white dark:text-black",
                                                                                strokeWidth: 3
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                                lineNumber: 275,
                                                                                columnNumber: 85
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/datasets/page.tsx",
                                                                            lineNumber: 274,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-700 dark:text-gray-200 truncate",
                                                                            children: s
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/datasets/page.tsx",
                                                                            lineNumber: 277,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, s, true, {
                                                                    fileName: "[project]/app/datasets/page.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 45
                                                                }, this)),
                                                            sources.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-4 text-center text-gray-400 text-xs",
                                                                children: "No sources found"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 66
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 37
                                                    }, this),
                                                    selectedSources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 border-t border-gray-100 dark:border-[#333]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setSelectedSources([]),
                                                            className: "w-full py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors",
                                                            children: "Clear Filters"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/datasets/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-black dark:bg-white text-white dark:text-black border border-transparent rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm active:scale-95",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 16,
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:inline",
                                                children: "Import Data"
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sm:hidden",
                                                children: "Import"
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 246,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/datasets/page.tsx",
                        lineNumber: 230,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/datasets/page.tsx",
                lineNumber: 223,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6",
                children: [
                    displayedDatasets.map((ds)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>{
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === ds.id ? null : ds.id);
                            },
                            className: `
               relative flex flex-col gap-3 p-2 rounded-2xl transition-all duration-200 group border border-transparent
               hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer
               ${activeMenuId === ds.id ? 'bg-gray-50 dark:bg-[#1a1a1a]' : ''}
            `,
                            children: [
                                activeMenuId === ds.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] rounded-2xl animate-in fade-in duration-200",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        setActiveMenuId(null);
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] shadow-2xl p-1.5 min-w-[220px] rounded-xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            setActiveMenuId(null);
                                                        },
                                                        className: "group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                size: 16,
                                                                className: "text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Open in Notebook"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 330,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleOpenInChat(ds);
                                                        },
                                                        className: "group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                size: 16,
                                                                className: "text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Open in Chat"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleDuplicate(ds.id);
                                                        },
                                                        className: "group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                size: 16,
                                                                className: "text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Duplicate"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleArchive(ds.id);
                                                        },
                                                        className: "group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__["Archive"], {
                                                                size: 16,
                                                                className: "text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 355,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Archive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    handleDelete(ds.id);
                                                },
                                                className: "group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-md",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 16,
                                                        className: "text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/datasets/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full relative shadow-sm rounded-xl overflow-hidden transition-shadow duration-300 border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1e1e1e]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$EmbeddedTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedTable"], {
                                        data: ds.data,
                                        fileName: ds.name,
                                        source: ds.source,
                                        visualHint: ds.visualHint,
                                        onExpand: ()=>handleExpand(ds.data, ds.name)
                                    }, void 0, false, {
                                        fileName: "[project]/app/datasets/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/datasets/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-2 flex justify-between items-center min-h-[24px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-0.5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium",
                                                children: [
                                                    ds.status === 'Deployed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1.5 text-green-600 dark:text-green-400",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/datasets/page.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    ds.status
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 dark:text-gray-600",
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/datasets/page.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-gray-400",
                                                        children: ds.updated
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/datasets/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 387,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/datasets/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2a2a] px-2 py-0.5 rounded border border-gray-200 dark:border-[#333] uppercase tracking-wider",
                                                children: ds.type
                                            }, void 0, false, {
                                                fileName: "[project]/app/datasets/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/datasets/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/datasets/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, ds.id, true, {
                            fileName: "[project]/app/datasets/page.tsx",
                            lineNumber: 305,
                            columnNumber: 21
                        }, this)),
                    displayedDatasets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full flex flex-col items-center justify-center py-20 text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 bg-gray-100 dark:bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 24,
                                    strokeWidth: 1.5,
                                    className: "opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/app/datasets/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 413,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "No datasets found matching your criteria."
                            }, void 0, false, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 416,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setSearchQuery('');
                                    setSelectedSources([]);
                                },
                                className: "mt-2 text-xs text-blue-600 hover:underline",
                                children: "Clear all filters"
                            }, void 0, false, {
                                fileName: "[project]/app/datasets/page.tsx",
                                lineNumber: 417,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/datasets/page.tsx",
                        lineNumber: 412,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/datasets/page.tsx",
                lineNumber: 303,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$table$2f$TableDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableDrawer"], {
                isOpen: drawerOpen,
                data: activeTable?.data || null,
                fileName: activeTable?.name || '',
                onClose: ()=>setDrawerOpen(false),
                onSave: ()=>{}
            }, void 0, false, {
                fileName: "[project]/app/datasets/page.tsx",
                lineNumber: 423,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/datasets/page.tsx",
        lineNumber: 220,
        columnNumber: 9
    }, this);
}
_s(DatasetsPage, "mgrS3r7G1hknBL8qljL+PJtXsao=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = DatasetsPage;
var _c;
__turbopack_context__.k.register(_c, "DatasetsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_12a8e778._.js.map
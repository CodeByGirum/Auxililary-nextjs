

import React, { useState, useEffect } from 'react';
import { Sparkles, Printer, RefreshCw, Download, FileText, FileCode } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { generatePivot } from '../../../utils/tableUtils';
import { downloadSvgAsPng } from '../../../utils/imageHelpers';
import { NotebookReport, NotebookBlock, COLOR_THEMES } from '../types';

interface NotebookViewProps {
  headers: string[];
  rows: any[];
  fileName: string;
  triggerOnMount?: boolean;
  report: NotebookReport | null;
  setReport: (report: NotebookReport | null) => void;
}

// Helper Component for Markdown
const NotebookMarkdown = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-2 text-sm">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed === '---') return <hr key={i} className="my-6 border-gray-200 dark:border-[#333]" />;
        if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gray-900 dark:text-white mt-5 mb-2">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">{line.replace('### ', '')}</h3>;
        if (line.startsWith('- ')) return <div key={i} className="flex gap-2 ml-2"><span className="text-gray-400">•</span><span className="text-gray-700 dark:text-gray-300">{parseBold(line.replace('- ', ''))}</span></div>;
        if (trimmed === '') return <div key={i} className="h-2" />;
        return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{parseBold(line)}</p>;
      })}
    </div>
  );
};

export const NotebookView: React.FC<NotebookViewProps> = ({ headers, rows, fileName, triggerOnMount, report, setReport }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const themeColor = 'blue'; // Default theme

  useEffect(() => {
    if (triggerOnMount && !report && rows.length > 0) {
      triggerAnalysis();
    }
  }, [triggerOnMount, rows]);

  const triggerAnalysis = async () => {
    if (rows.length === 0) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Generate Data Profile
      const profile: any = {};
      headers.slice(0, 8).forEach((h) => { // Limit to first 8 cols to save tokens
        const sampleVal = rows.find((r) => r[h] !== null && r[h] !== undefined)?.[h];
        if (typeof sampleVal === 'number') {
          const vals = rows.map((r) => Number(r[h])).filter((n) => !isNaN(n));
          if (vals.length) {
            const min = Math.min(...vals);
            const max = Math.max(...vals);
            const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
            profile[h] = { type: 'number', min, max, avg: avg.toFixed(2) };
          }
        } else {
          const vals = rows.map((r) => String(r[h]));
          const unique = new Set(vals).size;
          const counts = vals.reduce((acc: any, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
          const top5 = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5);
          profile[h] = { type: 'string', unique, top5 };
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
        config: { responseMimeType: 'application/json' }
      });

      const json = JSON.parse(response.text || '{}');
      if (json.title && json.blocks) {
        setReport(json);
      }
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const aggregateForChart = (xAxis: string, yAxis: string, aggType: 'sum' | 'count' | 'average' = 'sum') => {
    const result = generatePivot(rows, {
      rows: [xAxis],
      columns: [],
      values: [yAxis],
      aggregation: aggType,
    });
    return result ? result.data : [];
  };

  const handleDownloadChartPng = (index: number, title: string) => {
    const container = document.getElementById(`chart-block-${index}`);
    // Use robust selector to target Recharts wrapper SVG only, ignoring button icons
    const svg = container?.querySelector('.recharts-wrapper svg');
    if (svg) {
      downloadSvgAsPng(svg as SVGElement, `${title.replace(/\s+/g, '_')}.png`);
    } else {
      console.error("Could not find chart SVG in block", index);
    }
  };

  const getChartBase64 = async (index: number): Promise<string | null> => {
    const container = document.getElementById(`chart-block-${index}`);
    // Use robust selector here as well
    const svg = container?.querySelector('.recharts-wrapper svg');
    if (!svg) return null;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    return new Promise((resolve) => {
        const img = new Image();
        // Encode the SVG string to be safe for data URI
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
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
        img.onerror = () => {
            console.error("Failed to load SVG image for export");
            URL.revokeObjectURL(url);
            resolve(null);
        }
        img.src = url;
    });
  };

  const handleExport = async (format: 'html' | 'md') => {
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
        for (let i = 0; i < report.blocks.length; i++) {
            const block = report.blocks[i];
            
            if (block.type === 'text') {
                const text = block.content || '';
                if (format === 'html') {
                    // Simple markdown-ish parser for HTML export
                    let htmlText = text
                        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>');
                    content += `<div class="text-block">${htmlText}</div>`;
                } else {
                    content += `${text}\n\n`;
                }
            } 
            else if (block.type === 'stat') {
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
            }
            else if (block.type === 'chart') {
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
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}_notebook.html`;
            a.click();
        } else {
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}_notebook.md`;
            a.click();
        }

    } catch (e) {
        console.error("Export failed", e);
    } finally {
        setIsExporting(false);
    }
  };

  const renderBlock = (block: NotebookBlock, index: number) => {
    if (block.type === 'text') {
      return <div key={index} className="mb-6"><NotebookMarkdown content={block.content || ''} /></div>;
    }
    if (block.type === 'chart') {
      const chartData = block.xAxis && block.yAxis ? aggregateForChart(block.xAxis, block.yAxis, block.aggregation) : [];
      if (!chartData.length) return null;
      const colors = COLOR_THEMES[themeColor];
      const ChartComponent = block.chartType === 'line' ? LineChart : block.chartType === 'pie' ? RePieChart : block.chartType === 'area' ? AreaChart : BarChart;

      return (
        <div key={index} id={`chart-block-${index}`} className="mb-8 bg-white dark:bg-[#252525] p-6 rounded-2xl border border-gray-100 dark:border-[#333] shadow-sm break-inside-avoid">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{block.title}</h4>
              {block.explanation && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">{block.explanation}</p>}
            </div>
            <button onClick={() => handleDownloadChartPng(index, block.title || 'chart')} className="text-xs font-medium text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
              <Download size={12} /> PNG
            </button>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               {block.chartType === 'pie' ? (
                 <RePieChart>
                    <Pie data={chartData} dataKey="Total" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4}>
                        {chartData.map((_, idx) => <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} strokeWidth={0} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                 </RePieChart>
               ) : (
                 <ChartComponent data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    {block.chartType === 'line' ? (
                         <Line type="monotone" dataKey="Total" stroke={colors[0]} strokeWidth={3} dot={{r:4}} />
                    ) : block.chartType === 'area' ? (
                         <Area type="monotone" dataKey="Total" stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} />
                    ) : (
                         <Bar dataKey="Total" fill={colors[0]} radius={[4, 4, 0, 0]} />
                    )}
                 </ChartComponent>
               )}
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]">
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 font-medium animate-pulse">Analyzing data & generating chapters...</p>
            </div>
          ) : report ? (
            <div className="animate-in fade-in duration-500 pb-20">
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-[#333]">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase"><Sparkles size={12} /><span>AI Analysis</span></div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleExport('html')} 
                        disabled={isExporting}
                        className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-[#333] dark:text-white px-3 py-1.5 rounded-full border dark:border-[#444] shadow-sm hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors disabled:opacity-50"
                      >
                        {isExporting ? <RefreshCw size={12} className="animate-spin" /> : <FileCode size={12} />}
                        HTML
                      </button>
                      <button 
                        onClick={() => handleExport('md')} 
                        disabled={isExporting}
                        className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-[#333] dark:text-white px-3 py-1.5 rounded-full border dark:border-[#444] shadow-sm hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors disabled:opacity-50"
                      >
                        {isExporting ? <RefreshCw size={12} className="animate-spin" /> : <FileText size={12} />}
                        Markdown
                      </button>
                   </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{report.title}</h1>
                <p className="text-lg text-gray-500">{report.summary}</p>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                  {report.blocks.filter(b => b.type === 'stat').map((b, i) => (
                      <div key={i} className="p-5 bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-100 dark:border-[#333] min-w-[160px] shadow-sm flex-1 md:flex-none">
                          <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{b.statLabel}</span>
                          <div className="flex items-end gap-2 mt-2">
                              <span className="text-3xl font-bold text-gray-900 dark:text-white">{b.statValue}</span>
                              {b.trend && (
                                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                                    b.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                                    b.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                    {b.trend === 'up' ? '↑' : b.trend === 'down' ? '↓' : '−'}
                                </span>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
              <div className="space-y-2">
                   {report.blocks.filter(b => b.type !== 'stat').map((b, i) => renderBlock(b, i))}
              </div>
              <div className="mt-12 pt-6 border-t border-gray-200 dark:border-[#333] flex justify-between">
                 <span className="text-gray-400 text-xs font-medium">Generated for {fileName}</span>
                 <button onClick={triggerAnalysis} className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"><RefreshCw size={12} /> Regenerate Analysis</button>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-white dark:bg-[#333] rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-sm border border-gray-100 dark:border-[#333]"><Sparkles size={24} /></div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI Data Notebook</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">Generate a comprehensive report with specific chapters: Overview, Distributions, Trends, Correlations, and Recommendations.</p>
                <button onClick={triggerAnalysis} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 transition-all">Generate Report</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


import React, { useMemo, useState } from 'react';
import { Grid, X, Palette, Table as TableIcon } from 'lucide-react';
import { generatePivot, PivotConfig } from '../../../utils/tableUtils';
import { COLOR_THEMES } from '../types';

interface PivotViewProps {
  headers: string[];
  rows: any[];
  config: PivotConfig;
  setConfig: (config: PivotConfig) => void;
}

export const PivotView: React.FC<PivotViewProps> = ({ headers, rows, config, setConfig }) => {
  const [themeColor, setThemeColor] = useState<string>('blue');
  const [showLabels, setShowLabels] = useState(false);

  const pivotResult = useMemo(() => {
    return generatePivot(rows, config);
  }, [rows, config]);

  const handlePivotDrag = (field: string, target: 'rows' | 'columns' | 'values') => {
    setConfig({
      ...config,
      rows: config.rows.filter((f) => f !== field),
      columns: config.columns.filter((f) => f !== field),
      values: config.values.filter((f) => f !== field),
      [target]: [...config[target], field]
    });
  };

  const removeField = (field: string, target: 'rows' | 'columns' | 'values') => {
      setConfig({
          ...config,
          [target]: config[target].filter((f) => f !== field)
      });
  };

  return (
    <div className="flex h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]">
      {/* Config Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-[#333] flex flex-col bg-white dark:bg-[#252525] overflow-y-auto p-4">
        <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Pivot Settings</h3>

        <div className="mb-6">
          <p className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-200">Fields</p>
          <div className="flex flex-col gap-1.5">
            {headers.map((h) => (
              <div
                key={h}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('field', h)}
                className="px-3 py-2 bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] rounded-md text-xs cursor-grab active:cursor-grabbing shadow-sm hover:bg-gray-50 dark:hover:bg-[#383838] flex items-center justify-between transition-all"
              >
                <span>{h}</span>
                <Grid size={12} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {['rows', 'columns', 'values'].map((area) => (
          <div
            key={area}
            className="mb-4 min-h-[80px] border border-dashed border-gray-300 dark:border-[#444] rounded-lg bg-gray-50/50 dark:bg-[#2a2a2a]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const f = e.dataTransfer.getData('field');
              if (f) handlePivotDrag(f, area as any);
            }}
          >
            <div className="px-3 py-1.5 border-b border-gray-200 dark:border-[#444]">
              <p className="text-[10px] uppercase text-gray-500 font-bold">{area}</p>
            </div>
            <div className="p-2 flex flex-col gap-1.5">
              {(config as any)[area].map((f: string) => (
                <div
                  key={f}
                  className="flex justify-between items-center px-2.5 py-1.5 bg-white dark:bg-[#333] text-xs border border-gray-200 dark:border-[#444] rounded-md shadow-sm"
                >
                  <span>{f}</span>
                  <X
                    size={12}
                    className="cursor-pointer text-gray-400 hover:text-red-500"
                    onClick={() => removeField(f, area as any)}
                  />
                </div>
              ))}
              {(config as any)[area].length === 0 && (
                <span className="text-[10px] text-gray-400 italic p-1 text-center">Drop here</span>
              )}
            </div>
          </div>
        ))}

        <div className="mt-2 mb-6">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Aggregation</label>
          <select
            className="w-full mt-1 p-2 text-xs bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] rounded-md outline-none shadow-sm"
            value={config.aggregation}
            onChange={(e) => setConfig({ ...config, aggregation: e.target.value as any })}
          >
            <option value="sum">Sum</option>
            <option value="count">Count</option>
            <option value="average">Average</option>
          </select>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-[#333] space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show Labels
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette size={12} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase">Theme</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(COLOR_THEMES).map((color) => (
                <button
                  key={color}
                  onClick={() => setThemeColor(color)}
                  className={`w-5 h-5 rounded-full transition-all ${
                    themeColor === color ? 'ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: COLOR_THEMES[color][0] }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Area */}
      <div className="flex-1 overflow-auto p-8 bg-[#F5F5F7] dark:bg-[#1e1e1e]">
        <div className="bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#444] shadow-sm rounded-xl overflow-hidden min-h-[300px]">
          {pivotResult ? (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr
                  className="border-b border-gray-200 dark:border-[#444]"
                  style={{ backgroundColor: COLOR_THEMES[themeColor][0] }}
                >
                  <th className="p-3 text-left font-semibold text-white border-r border-white/10">
                    {config.rows.join(' > ') || 'Total'}
                  </th>
                  {pivotResult.columns.map((c) => (
                    <th key={c} className="p-3 font-semibold text-white border-r border-white/10 min-w-[100px]">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pivotResult.data.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-[#2f2f2f] border-b border-gray-100 dark:border-[#444]"
                  >
                    <td className="p-3 font-medium text-gray-900 dark:text-white border-r border-gray-100 dark:border-[#444]">
                      {row.name}
                    </td>
                    {pivotResult.columns.map((c) => (
                      <td
                        key={c}
                        className="p-3 text-right font-mono text-gray-600 dark:text-gray-400 border-r border-gray-100 dark:border-[#444]"
                      >
                        {row[c]}
                        {showLabels && <span className="ml-1 text-[9px] text-gray-400">({row[c]})</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
              <TableIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Configure pivot to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
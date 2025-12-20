

import React from 'react';
import { Download, PieChart } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, Legend, LineChart, Line, LabelList
} from 'recharts';
import { downloadSvgAsPng } from '../../../utils/imageHelpers';
import { COLOR_THEMES } from '../types';

interface VisualsConfig {
  chartType: 'bar' | 'pie' | 'line';
  themeColor: string;
}

interface VisualsViewProps {
  headers: string[];
  rows: any[];
  fileName: string;
  config: VisualsConfig;
  setConfig: (config: VisualsConfig) => void;
}

export const VisualsView: React.FC<VisualsViewProps> = ({ headers, rows, fileName, config, setConfig }) => {
  const { chartType, themeColor } = config;
  const [showLabels, setShowLabels] = React.useState(false);

  const getChartData = () => {
    if (rows.length > 0) {
      // Simple heuristic: Use first string col as label, all number cols as values
      const labelKey = headers.find((h) => typeof rows[0][h] === 'string') || headers[0];
      const valueKeys = headers.filter((h) => typeof rows[0][h] === 'number');
      if (valueKeys.length > 0) {
        return { data: rows, keys: valueKeys, labelKey };
      }
    }
    return null;
  };

  const chartDataInfo = getChartData();

  const handleDownloadVisual = () => {
    const svg = document.querySelector('.recharts-wrapper svg');
    if (svg) {
      downloadSvgAsPng(svg as SVGElement, `${fileName}_visual.png`);
    }
  };

  if (!chartDataInfo) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-[#F5F5F7] dark:bg-[#1e1e1e]">
        <PieChart size={48} strokeWidth={1} className="mb-4 opacity-20" />
        <p>Visuals require numeric data.</p>
      </div>
    );
  }

  const { data: chartData, keys: dataKeys, labelKey } = chartDataInfo;
  const colors = COLOR_THEMES[themeColor];

  return (
    <div className="h-full p-8 bg-[#F5F5F7] dark:bg-[#1e1e1e] overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#252525] rounded-lg border border-gray-200 dark:border-[#444] shadow-sm">
            {['bar', 'line', 'pie'].map((type) => (
              <button
                key={type}
                onClick={() => setConfig({ ...config, chartType: type as any })}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all uppercase tracking-wide ${
                  chartType === type
                    ? 'bg-gray-100 dark:bg-[#333] text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-[#252525] rounded-lg border border-gray-200 dark:border-[#444] shadow-sm">
            {Object.keys(COLOR_THEMES).map((color) => (
              <button
                key={color}
                onClick={() => setConfig({ ...config, themeColor: color })}
                className={`w-3 h-3 rounded-full transition-all ${
                  themeColor === color ? 'scale-125 ring-1 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: COLOR_THEMES[color][0] }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleDownloadVisual}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#444] rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#333] shadow-sm transition-colors text-xs font-medium"
        >
          <Download size={14} />
          Download PNG
        </button>
      </div>

      <div className="flex-1 min-h-[300px] max-h-[600px] bg-white dark:bg-[#252525] p-8 border border-gray-200 dark:border-[#444] shadow-sm rounded-2xl relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F2F7" />
              <XAxis
                dataKey={labelKey}
                tick={{ fontSize: 11, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis tick={{ fontSize: 11, fill: '#8E8E93' }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {dataKeys.map((key, i) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[i % colors.length]}
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                >
                  {showLabels && (
                    <LabelList
                      dataKey={key}
                      position="top"
                      style={{ fontSize: '10px', fill: '#666' }}
                    />
                  )}
                </Bar>
              ))}
            </BarChart>
          ) : chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F2F7" />
              <XAxis
                dataKey={labelKey}
                tick={{ fontSize: 11, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis tick={{ fontSize: 11, fill: '#8E8E93' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {dataKeys.map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[i % colors.length]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          ) : (
            <RePieChart>
              <Pie
                data={chartData}
                dataKey={dataKeys[0]}
                nameKey={labelKey}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                paddingAngle={4}
                cornerRadius={6}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
            </RePieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
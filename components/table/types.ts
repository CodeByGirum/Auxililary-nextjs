
export interface NotebookBlock {
  type: 'text' | 'chart' | 'stat';
  content?: string; // For text
  title?: string;
  // For charts
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  xAxis?: string;
  yAxis?: string;
  aggregation?: 'sum' | 'count' | 'average';
  explanation?: string;
  // For stats
  statValue?: string;
  statLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface NotebookReport {
  title: string;
  summary: string;
  blocks: NotebookBlock[];
}

export const COLOR_THEMES: Record<string, string[]> = {
  green: ['#107c41', '#21a366', '#33c481', '#185c37', '#0b5a2d'],
  blue: ['#007AFF', '#5856D6', '#00C7BE', '#32ADE6', '#007AFF'],
  purple: ['#AF52DE', '#BF5AF2', '#DA8FFF', '#5E5CE6', '#7D54DE'],
  orange: ['#FF9500', '#FF3B30', '#FF2D55', '#FFCC00', '#FF9500'],
  gray: ['#8E8E93', '#AEAEB2', '#C7C7CC', '#48484A', '#1C1C1E'],
};

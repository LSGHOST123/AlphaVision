
export interface ChartDataPoint {
  date: string;
  price: number;
}

export type Currency = 'BRL' | 'USD' | 'EUR' | 'GBP';
export type Language = 'pt' | 'en';

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number; // This will always be in the baseCurrency
  baseCurrency: 'BRL' | 'USD';
  change: number;
  changePercent: number;
  chartData: ChartDataPoint[]; // Prices in here are also in baseCurrency
  logo: string;
  profile: string;
  news: NewsItem[];
}

export interface AIAnalysis {
  recommendation: 'COMPRE' | 'VENDA' | 'MANTENHA';
  reasoning: string;
  risk: 'BAIXO' | 'MÉDIO' | 'ALTO';
  potentialReturn: string;
  probabilities: {
    up: number;
    down: number;
  };
}

export interface AIInsight {
  marketTrend: string;
  opportunity: {
    symbol: string;
    reasoning: string;
  };
  attentionPoint: {
    symbol: string;
    reasoning: string;
  };
}

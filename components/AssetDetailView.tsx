
import React, { useState, useMemo, useEffect } from 'react';
import { Asset, AIAnalysis, NewsItem } from '../types';
import { useCurrency, useLanguage } from '../contexts';
import { translations } from '../translations';
import Chart from './Chart';
import { generateAnalysis, fetchNewsForAsset } from '../services/geminiService';
import { calculateRSI, calculateSMA, calculateMACD, MacdResult } from '../utils/technicalAnalysis';
import LoadingSpinner from './LoadingSpinner';

interface AssetDetailViewProps {
  asset: Asset;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const RecommendationBadge: React.FC<{ recommendation: AIAnalysis['recommendation'] }> = ({ recommendation }) => {
    const { lang } = useLanguage();
    const t = translations[lang];
    const baseClasses = "px-4 py-1 text-sm font-bold rounded-full inline-block";
    
    switch (recommendation) {
        case 'COMPRE':
            return <span className={`${baseClasses} bg-emerald-500/20 text-emerald-600 dark:text-emerald-400`}>{t.COMPRE}</span>;
        case 'VENDA':
            return <span className={`${baseClasses} bg-red-500/20 text-red-600 dark:text-red-400`}>{t.VENDA}</span>;
        case 'MANTENHA':
            return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-600 dark:text-yellow-400`}>{t.MANTENHA}</span>;
        default:
            return null;
    }
}

const RiskBadge: React.FC<{ risk: AIAnalysis['risk'] }> = ({ risk }) => {
    const { lang } = useLanguage();
    const t = translations[lang];
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    switch (risk) {
        case 'BAIXO':
            return <span className={`${baseClasses} bg-green-500/20 text-green-600 dark:text-green-400`}>{t.BAIXO}</span>;
        case 'MÉDIO':
            return <span className={`${baseClasses} bg-orange-500/20 text-orange-600 dark:text-orange-400`}>{t.MÉDIO}</span>;
        case 'ALTO':
            return <span className={`${baseClasses} bg-red-500/20 text-red-600 dark:text-red-400`}>{t.ALTO}</span>;
        default:
            return null;
    }
}

const AssetDetailView: React.FC<AssetDetailViewProps> = ({ asset, isFavorite, onToggleFavorite }) => {
  const { lang } = useLanguage();
  const { currency, formatCurrency, convertCurrency } = useCurrency();
  const t = translations[lang];

  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  // Fetch real-time news on component mount
  useEffect(() => {
    const loadNews = async () => {
        setIsNewsLoading(true);
        const fetchedNews = await fetchNewsForAsset(asset.name);
        setNews(fetchedNews);
        setIsNewsLoading(false);
    };
    loadNews();
  }, [asset.name]);
  
  // Dynamic Chart Data
  const dynamicChartData = useMemo(() => {
    const convertedPrice = convertCurrency(asset.price, asset.baseCurrency, currency);
    const convertedData = asset.chartData.map(d => ({ 
        ...d, 
        price: convertCurrency(d.price, asset.baseCurrency, currency) 
    }));
    if (convertedData.length > 0) {
        convertedData[convertedData.length - 1].price = convertedPrice;
    }
    return convertedData;
  }, [asset.price, asset.baseCurrency, currency, convertCurrency, asset.chartData]);

  // Calculate Technical Indicators
  const { rsi, smas, macd } = useMemo(() => {
    const prices = asset.chartData.map(d => d.price);
    if (prices.length < 26) return { rsi: null, smas: {short: null, long: null}, macd: null }; // Need enough data

    return {
        rsi: calculateRSI(prices, 14),
        smas: {
            short: calculateSMA(prices, 10),
            long: calculateSMA(prices, 20)
        },
        macd: calculateMACD(prices, 12, 26, 9)
    };
  }, [asset.chartData]);


  const handleGenerateAnalysis = async () => {
    setIsAnalyzing(true);
    const newAnalysis = await generateAnalysis(asset, rsi, macd, smas);
    setAnalysis(newAnalysis);
    setIsAnalyzing(false);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(asset.id);
  };

  const isPositive = asset.changePercent >= 0;
  const changeColor = isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
  const changeSymbol = isPositive ? '▲' : '▼';

  return (
    <div className="animate-fade-in-up">
      <button onClick={() => window.location.hash = '#'} className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {t.backToList}
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <img src={asset.logo} alt={`${asset.name} logo`} className="w-16 h-16" style={{ filter: asset.symbol === 'AAPL' ? 'invert(1)' : 'none' }} />
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100">{asset.name}</h2>
            <p className="text-xl text-gray-500 dark:text-slate-400">{asset.symbol}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
              onClick={handleFavoriteClick}
              title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
              className="text-gray-400 dark:text-slate-400 hover:text-yellow-400 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill={isFavorite ? '#facc15' : 'none'} stroke={isFavorite ? '#facc15' : 'currentColor'} strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
          </button>
          <div className="text-right">
            <p className="text-4xl font-semibold text-gray-900 dark:text-slate-50">{formatCurrency(asset.price, asset.baseCurrency)}</p>
            <div className={`flex items-center justify-end gap-2 text-xl font-medium ${changeColor}`}>
              <span>{changeSymbol} {formatCurrency(asset.change, asset.baseCurrency)}</span>
              <span>({asset.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-4 mb-8">
        <Chart data={dynamicChartData} color={isPositive ? '#10b981' : '#ef4444'} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Indicators Section */}
            <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400 mb-4">Indicadores Técnicos</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-1">RSI (14)</h4>
                        <p className="text-xl font-bold text-gray-800 dark:text-slate-200">{rsi ? rsi.toFixed(2) : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-1">MMS (10)</h4>
                        <p className="text-xl font-bold text-gray-800 dark:text-slate-200">{smas.short ? formatCurrency(smas.short, asset.baseCurrency) : 'N/A'}</p>
                    </div>
                     <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-1">MMS (20)</h4>
                        <p className="text-xl font-bold text-gray-800 dark:text-slate-200">{smas.long ? formatCurrency(smas.long, asset.baseCurrency) : 'N/A'}</p>
                    </div>
                     <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg col-span-2 md:col-span-3">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">MACD (12,26,9)</h4>
                        <div className="flex justify-center items-center gap-4">
                            <span className="text-sm"><b className="text-blue-500">MACD:</b> {macd ? macd.MACD.toFixed(2) : 'N/A'}</span>
                            <span className="text-sm"><b className="text-orange-500">Sinal:</b> {macd ? macd.signal.toFixed(2) : 'N/A'}</span>
                            <span className="text-sm"><b>Hist:</b> {macd ? macd.histogram.toFixed(2) : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400 mb-4">{t.profile}</h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{asset.profile}</p>
            </div>

            {/* News Section */}
            <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400 mb-4">{t.news}</h3>
                 {isNewsLoading ? (
                    <div className="flex justify-center items-center h-24">
                        <LoadingSpinner />
                    </div>
                 ) : news.length > 0 ? (
                    <ul className="space-y-4">
                    {news.map((item, index) => (
                        <li key={index} className="border-b border-gray-200 dark:border-slate-700 pb-4 last:border-b-0 last:pb-0">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-md transition-colors">
                            <p className="font-semibold text-gray-800 dark:text-slate-100">{item.title}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-400 mt-1">
                                <span className="font-medium">{item.source}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </a>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-slate-400">{t.noNews}</p>
                )}
            </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6 h-fit sticky top-8">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400">{t.aiAnalysis}</h3>
            </div>
            
            {!analysis && (
                <>
                    <p className="text-gray-500 dark:text-slate-400 mb-6">{t.aiAnalysisSubtitle}</p>
                    <button
                        onClick={handleGenerateAnalysis}
                        disabled={isAnalyzing}
                        className="w-full flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                       {isAnalyzing && <LoadingSpinner size="h-5 w-5" />}
                       {isAnalyzing ? t.generatingAnalysis : t.generateAnalysis}
                    </button>
                </>
            )}

            {analysis && (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">{t.modalRecommendation}</h3>
                        <RecommendationBadge recommendation={analysis.recommendation} />
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">{t.modalReasoning}</h3>
                        <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">{analysis.reasoning}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">{t.modalRisk}</h4>
                            <RiskBadge risk={analysis.risk} />
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">{t.modalReturn}</h4>
                            <p className="text-md font-bold text-sky-500 dark:text-sky-400">{analysis.potentialReturn}</p>
                        </div>
                    </div>
                     <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700 text-center">
                        <h4 className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-2">{t.modalProbabilities}</h4>
                        <div className="flex justify-center items-center gap-4">
                            <span className="text-emerald-500 dark:text-emerald-400 font-bold text-sm">▲ {analysis.probabilities.up}%</span>
                            <span className="text-red-500 dark:text-red-400 font-bold text-sm">▼ {analysis.probabilities.down}%</span>
                        </div>
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={handleGenerateAnalysis}
                            disabled={isAnalyzing}
                            className="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-600/50 dark:disabled:bg-slate-700/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                        >
                            {isAnalyzing && <LoadingSpinner size="h-4 w-4" />}
                            {isAnalyzing ? t.refreshingAnalysis : t.refreshAnalysis}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailView;

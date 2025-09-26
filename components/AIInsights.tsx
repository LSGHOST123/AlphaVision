
import React from 'react';
import { AIInsight } from '../types';
import { useLanguage } from '../contexts';
import { translations } from '../translations';
import LoadingSpinner from './LoadingSpinner';

interface AIInsightsProps {
  insights: AIInsight | null;
  isLoading: boolean;
  onGenerate: () => void;
  findAssetLogo: (symbol: string) => string | undefined;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights, isLoading, onGenerate, findAssetLogo }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const renderInitialState = () => (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-300 mb-2">{t.aiInsightsTitle}</h3>
      <p className="text-gray-500 dark:text-slate-400 mb-4">{t.aiInsightsDescription}</p>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 mx-auto"
      >
        {isLoading ? <LoadingSpinner size="h-5 w-5" /> : null}
        {isLoading ? t.generatingInsights : t.generateInsights}
      </button>
    </div>
  );

  const renderInsights = () => {
    if (!insights) return null;
    
    const opportunityLogo = findAssetLogo(insights.opportunity.symbol);
    const attentionLogo = findAssetLogo(insights.attentionPoint.symbol);

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-300">{t.aiInsightsTitle}</h3>
             <button
                onClick={onGenerate}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 text-sm text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
            >
                {isLoading ? <LoadingSpinner size="h-4 w-4" /> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 15a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v4a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
                }
                {t.refreshAnalysis}
            </button>
        </div>

        <p className="text-center italic text-gray-600 dark:text-slate-400 mb-6 text-sm">{`"${insights.marketTrend}"`}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opportunity Card */}
            <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-lg p-4 flex gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        {opportunityLogo ? 
                            <img src={opportunityLogo} alt={insights.opportunity.symbol} className="w-8 h-8"/> :
                            <span className="text-2xl">💡</span>
                        }
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400">{t.opportunityHighlight}</h4>
                    <p className="text-sm text-gray-800 dark:text-slate-200 font-semibold mb-1">{insights.opportunity.symbol}</p>
                    <p className="text-xs text-gray-600 dark:text-slate-300">{insights.opportunity.reasoning}</p>
                </div>
            </div>

            {/* Attention Point Card */}
            <div className="bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-500/20 rounded-lg p-4 flex gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                       {attentionLogo ? 
                            <img src={attentionLogo} alt={insights.attentionPoint.symbol} className="w-8 h-8"/> :
                            <span className="text-2xl">⚠️</span>
                        }
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-yellow-700 dark:text-yellow-500">{t.attentionPoint}</h4>
                    <p className="text-sm text-gray-800 dark:text-slate-200 font-semibold mb-1">{insights.attentionPoint.symbol}</p>
                    <p className="text-xs text-gray-600 dark:text-slate-300">{insights.attentionPoint.reasoning}</p>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="mb-8 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6 animate-fade-in-up">
        {insights && !isLoading ? renderInsights() : renderInitialState()}
    </div>
  );
};

export default AIInsights;


import React from 'react';
import { useSettings } from '../contexts';
import { translations } from '../translations';
import { Language, Currency } from '../types';
import { Theme } from '../services/localStorageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { lang, setLang, currency, setCurrency, theme, setTheme } = useSettings();
  const t = translations[lang];

  if (!isOpen) return null;

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div 
        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 ease-out animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t.settings}</h2>
                 <button onClick={onClose} className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors" aria-label={t.close}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                {/* Language Setting */}
                <div>
                    <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{t.language}</label>
                    <select
                        id="language-select"
                        value={lang}
                        onChange={(e) => setLang(e.target.value as Language)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md py-2 px-3 text-gray-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
                    >
                        <option value="pt">🇧🇷 Português</option>
                        <option value="en">🇺🇸 English</option>
                    </select>
                </div>

                {/* Currency Setting */}
                <div>
                    <label htmlFor="currency-select" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{t.currency}</label>
                    <select
                        id="currency-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md py-2 px-3 text-gray-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
                    >
                        <option value="BRL">BRL (R$)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                    </select>
                </div>
                
                {/* Theme Setting */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{t.theme}</label>
                    <div className="flex gap-2 rounded-md bg-slate-100 dark:bg-slate-800 p-1">
                        <button 
                            onClick={() => handleThemeChange('light')}
                            className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${theme === 'light' ? 'bg-sky-500 text-white' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                        >
                            {t.lightTheme}
                        </button>
                        <button 
                            onClick={() => handleThemeChange('dark')}
                             className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${theme === 'dark' ? 'bg-sky-500 text-white' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                        >
                            {t.darkTheme}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

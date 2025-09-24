import React from 'react';
import { useLanguage } from '../contexts';
import { translations } from '../translations';

interface ControlsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortValue: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Controls: React.FC<ControlsProps> = ({ searchTerm, onSearchChange, sortValue, onSortChange, showFavoritesOnly, onShowFavoritesChange }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const selectClasses = "w-full bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md py-2 px-3 text-gray-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300 appearance-none";
  
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center flex-wrap">
      <div className="relative w-full sm:flex-grow">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md py-2 pl-10 pr-4 text-gray-800 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
          aria-label={t.searchPlaceholder}
        />
      </div>

      <div className="flex items-center gap-4">
        <label htmlFor="favorites-toggle" className="flex items-center cursor-pointer select-none">
            <div className="relative">
                <input type="checkbox" id="favorites-toggle" className="sr-only" checked={showFavoritesOnly} onChange={onShowFavoritesChange} />
                <div className="block bg-gray-300 dark:bg-slate-700 w-14 h-8 rounded-full transition-colors"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${showFavoritesOnly ? 'transform translate-x-full bg-sky-400' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700 dark:text-slate-300 font-medium whitespace-nowrap">
                {t.showFavoritesOnly}
            </div>
        </label>
      </div>

      <div className="relative w-full sm:w-auto sm:min-w-[250px]">
        <select 
            value={sortValue} 
            onChange={onSortChange} 
            className={selectClasses}
            aria-label={t.sortLabel}
        >
          <option value="name_asc">{t.sortNameAsc}</option>
          <option value="name_desc">{t.sortNameDesc}</option>
          <option value="price_desc">{t.sortPriceDesc}</option>
          <option value="price_asc">{t.sortPriceAsc}</option>
          <option value="changePercent_desc">{t.sortChangeDesc}</option>
          <option value="changePercent_asc">{t.sortChangeAsc}</option>
        </select>
         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default Controls;

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { Currency, Language, Asset } from './types';
import { loadSettings, saveSettings, AppSettings, Theme } from './services/localStorageService';

// --- Main Settings Context ---
interface SettingsContextType extends AppSettings {
  setLang: (lang: Language) => void;
  setCurrency: (currency: Currency) => void;
  setTheme: (theme: Theme) => void;
  formatCurrency: (value: number, baseCurrency: Asset['baseCurrency']) => string;
  convertCurrency: (value: number, from: Asset['baseCurrency'], to: Currency) => number;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const CONVERSION_RATES: Record<Currency, number> = {
  USD: 1,
  BRL: 5.43,
  EUR: 0.93,
  GBP: 0.79,
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  // Effect to apply theme class to the root element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
  }, [settings.theme]);

  // Effect to save settings to localStorage whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const setLang = (lang: Language) => setSettings(s => ({ ...s, lang }));
  const setCurrency = (currency: Currency) => setSettings(s => ({ ...s, currency }));
  const setTheme = (theme: Theme) => setSettings(s => ({ ...s, theme }));

  const convertCurrency = (value: number, from: Asset['baseCurrency'], to: Currency) => {
    if (from === to) return value;
    const fromRate = from === 'BRL' ? CONVERSION_RATES.BRL : CONVERSION_RATES[from];
    const valueInUSD = value / fromRate;
    return valueInUSD * CONVERSION_RATES[to];
  };

  const formatCurrency = (value: number, baseCurrency: Asset['baseCurrency']) => {
    const convertedValue = convertCurrency(value, baseCurrency, settings.currency);
    return new Intl.NumberFormat(settings.lang === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: settings.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedValue);
  };

  const value = useMemo(() => ({
    ...settings,
    setLang,
    setCurrency,
    setTheme,
    formatCurrency,
    convertCurrency,
  }), [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// --- Custom Hooks for easy consumption ---
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const useLanguage = () => {
  const { lang, setLang } = useSettings();
  return { lang, setLang };
};

export const useCurrency = () => {
  const { currency, setCurrency, formatCurrency, convertCurrency } = useSettings();
  return { currency, setCurrency, formatCurrency, convertCurrency };
};

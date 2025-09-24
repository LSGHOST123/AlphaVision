import { Currency, Language } from '../types';

const FAVORITES_KEY = 'alphaVisionFavorites';
const SETTINGS_KEY = 'alphaVisionSettings';

// --- Favorites ---
export const loadFavorites = (): Set<string> => {
  try {
    const item = window.localStorage.getItem(FAVORITES_KEY);
    return item ? new Set(JSON.parse(item)) : new Set();
  } catch (error) {
    console.error("Error loading favorites from localStorage", error);
    return new Set();
  }
};

export const saveFavorites = (favorites: Set<string>): void => {
  try {
    const array = Array.from(favorites);
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(array));
// Fix: Added missing curly braces to the catch block for correct error handling.
  } catch (error) {
    console.error("Error saving favorites to localStorage", error);
  }
};

// --- App Settings ---
export type Theme = 'light' | 'dark';

export interface AppSettings {
  lang: Language;
  currency: Currency;
  theme: Theme;
}

const defaultSettings: AppSettings = {
  lang: 'pt',
  currency: 'BRL',
  theme: 'dark',
};

export const loadSettings = (): AppSettings => {
  try {
    const item = window.localStorage.getItem(SETTINGS_KEY);
    // Merge saved settings with defaults to ensure all keys are present
    return item ? { ...defaultSettings, ...JSON.parse(item) } : defaultSettings;
  } catch (error) {
    console.error("Error loading settings from localStorage", error);
    return defaultSettings;
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings to localStorage", error);
  }
};
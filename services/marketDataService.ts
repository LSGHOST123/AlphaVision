import { MOCK_ASSETS } from '../constants';
import { Asset } from '../types';

let currentAssets: Asset[] = JSON.parse(JSON.stringify(MOCK_ASSETS));

// Map to hold initial prices for daily change calculation
let initialPrices = new Map<string, number>();

/**
 * Fetches the latest prices for crypto assets from the Gemini public API.
 */
const fetchInitialPrices = async (): Promise<void> => {
  const cryptoAssets = currentAssets.filter(a => ['BTC', 'ETH'].includes(a.symbol));

  try {
    const pricePromises = cryptoAssets.map(async (asset) => {
      const symbol = asset.symbol === 'BTC' ? 'btcusd' : 'ethusd';
      const response = await fetch(`https://api.gemini.com/v1/pubticker/${symbol}`);
      if (!response.ok) {
        console.warn(`Failed to fetch price for ${asset.symbol}`);
        return null;
      }
      const data = await response.json();
      return { id: asset.id, price: parseFloat(data.last) };
    });

    const results = await Promise.all(pricePromises);

    // Update currentAssets with the fetched prices
    results.forEach(result => {
      if (result) {
        const assetIndex = currentAssets.findIndex(a => a.id === result.id);
        if (assetIndex !== -1) {
          currentAssets[assetIndex].price = result.price;
        }
      }
    });

  } catch (error) {
    console.error("Error fetching initial crypto prices:", error);
    // The app will proceed with mock data if the API fails.
  }

  // After fetching or falling back, set the initial prices for change calculation
  initialPrices = new Map(currentAssets.map(asset => [asset.id, asset.price]));
};


/**
 * Checks if the B3 market is currently open.
 * B3 operates from 10:00 to 17:00 (BRT, UTC-3) on weekdays.
 * @returns {boolean} True if the market is open, false otherwise.
 */
function isB3MarketOpen(): boolean {
  try {
    const now = new Date();
    const spTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    
    const dayOfWeek = spTime.getDay(); // Sunday = 0, Saturday = 6
    const hour = spTime.getHours();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    if (hour >= 10 && hour < 17) return true;
    
    return false;
  } catch (e) {
    console.error("Could not determine market hours, defaulting to closed.", e);
    return false;
  }
}

const simulateMarketUpdates = () => {
  const marketOpen = isB3MarketOpen();

  currentAssets = currentAssets.map(asset => {
    const isB3Stock = asset.baseCurrency === 'BRL' && /\d$/.test(asset.symbol) && !asset.symbol.includes('/');
    
    if (isB3Stock && !marketOpen) {
      return asset;
    }

    const fluctuation = (Math.random() - 0.495) * 0.01;
    const newPrice = asset.price * (1 + fluctuation);
    const initialPrice = initialPrices.get(asset.id)!;
    
    const newChange = newPrice - initialPrice;
    const newChangePercent = (newChange / initialPrice) * 100;
    
    const pricePrecision = asset.price < 10 ? 4 : 2;

    return {
      ...asset,
      price: parseFloat(newPrice.toFixed(pricePrecision)),
      change: parseFloat(newChange.toFixed(pricePrecision)),
      changePercent: parseFloat(newChangePercent.toFixed(2)),
    };
  });
};

let intervalId: number | undefined;

export const subscribeToMarketData = (onUpdate: (assets: Asset[]) => void): (() => void) => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Immediately provide mock data for a fast initial load
  onUpdate([...currentAssets]);

  // Asynchronously fetch real prices and update the state
  fetchInitialPrices().then(() => {
    onUpdate([...currentAssets]); // Send the updated list with real prices

    // Now start the simulation interval
    if (intervalId) clearInterval(intervalId); // Ensure no multiple intervals
    intervalId = setInterval(() => {
      simulateMarketUpdates();
      onUpdate([...currentAssets]);
    }, 2500);
  });

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };
};
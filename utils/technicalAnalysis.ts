// --- Technical Indicator Calculations ---

export interface MacdResult {
  MACD: number;
  signal: number;
  histogram: number;
}


/**
 * Calculates the Simple Moving Average (SMA).
 * @param prices Array of prices.
 * @param period The period for the moving average (e.g., 10, 20).
 * @returns The latest SMA value, or null if there's not enough data.
 */
export const calculateSMA = (prices: number[], period: number): number | null => {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((acc, val) => acc + val, 0);
  return sum / period;
};

/**
 * Calculates the Exponential Moving Average (EMA).
 * @param prices Array of prices.
 * @param period The period for the moving average.
 * @returns An array of EMA values for the entire price series.
 */
export const calculateEMA = (prices: number[], period: number): number[] => {
  const k = 2 / (period + 1);
  const emaArray = [prices[0]];
  for (let i = 1; i < prices.length; i++) {
    emaArray.push(prices[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
};

/**
 * Calculates the Relative Strength Index (RSI).
 * @param prices Array of prices.
 * @param period The period for RSI calculation (typically 14).
 * @returns The latest RSI value, or null if there's not enough data.
 */
export const calculateRSI = (prices: number[], period: number = 14): number | null => {
  if (prices.length <= period) return null;

  let gains = 0;
  let losses = 0;

  // Calculate initial average gains and losses
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change; // losses are positive values
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  // Smooth the averages for the rest of the prices
  for (let i = period + 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    let currentGain = 0;
    let currentLoss = 0;
    if (change > 0) {
      currentGain = change;
    } else {
      currentLoss = -change;
    }
    avgGain = (avgGain * (period - 1) + currentGain) / period;
    avgLoss = (avgLoss * (period - 1) + currentLoss) / period;
  }
  
  if (avgLoss === 0) return 100; // Prevent division by zero

  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));

  return rsi;
};


/**
 * Calculates the Moving Average Convergence Divergence (MACD).
 * @param prices Array of prices.
 * @param shortPeriod Typically 12.
 * @param longPeriod Typically 26.
 * @param signalPeriod Typically 9.
 * @returns The latest MACD, signal line, and histogram values, or null if not enough data.
 */
export const calculateMACD = (prices: number[], shortPeriod = 12, longPeriod = 26, signalPeriod = 9): MacdResult | null => {
  if (prices.length < longPeriod) return null;
  
  const emaShort = calculateEMA(prices, shortPeriod);
  const emaLong = calculateEMA(prices, longPeriod);
  
  const macdLine = emaShort.map((val, index) => val - emaLong[index]);
  const signalLine = calculateEMA(macdLine, signalPeriod);
  
  const lastMacd = macdLine[macdLine.length - 1];
  const lastSignal = signalLine[signalLine.length - 1];
  const histogram = lastMacd - lastSignal;

  return {
    MACD: lastMacd,
    signal: lastSignal,
    histogram: histogram
  };
};

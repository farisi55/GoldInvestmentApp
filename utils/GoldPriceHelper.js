/**
 * utils/GoldPriceHelper.js
 * Fetches current gold price per gram in IDR from goldprice.org.
 *
 * Fallback: returns Rp1.000.000/gram if the fetch fails (network error,
 * service unavailable, or malformed response).
 *
 * Updated by Task #003: replaced console.error with logError (CrashReporter).
 */

import axios from 'axios';
import { logError } from './CrashReporter';

export async function fetchGoldPrice() {
  try {
    const response = await axios.get(
      'https://data-asg.goldprice.org/dbXRates/IDR',
      { timeout: 10000 }, // 10 s explicit timeout
    );
    const goldPricePerOunceIDR = response.data.items[0].xauPrice;
    const ozToGram = 31.1035;
    const goldPricePerGramIDR = goldPricePerOunceIDR / ozToGram;
    return Math.round(goldPricePerGramIDR);
  } catch (error) {
    // Log via CrashReporter — PII-free (no financial data in context).
    logError('GoldPriceHelper', error, { source: 'goldprice.org' });
    return 1000000; // Nilai fallback jika API gagal
  }
}

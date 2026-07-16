/**
 * services/GoldRateService.js
 * Fetches real-time gold rates in multiple currencies from goldprice.org.
 *
 * Updated by Task #003: replaced console.error with logError (CrashReporter).
 */

import { logError } from '../utils/CrashReporter';

const OZ_TO_GRAM = 31.1035;
const TOLA_TO_GRAM = 11.66;

export const fetchGoldRates = async () => {
  try {
    const response = await fetch('https://data-asg.goldprice.org/dbXRates/IDR');
    const data = await response.json();

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return data.items.map(item => ({
      currency: item.curr,
      goldRates: {
        'Price per Gram': formatter.format(item.xauPrice / OZ_TO_GRAM),
        'Price per Tola': formatter.format((item.xauPrice / OZ_TO_GRAM) * TOLA_TO_GRAM),
        'Price per Ounce': formatter.format(item.xauPrice),
      },
    }));
  } catch (error) {
    // Log via CrashReporter — PII-free (no financial data in context).
    logError('GoldRateService', error, { source: 'goldprice.org' });
    return [];
  }
};

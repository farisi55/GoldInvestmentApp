import axios from "axios";

export async function fetchGoldPrice() {
  try {
    const response = await axios.get("https://data-asg.goldprice.org/dbXRates/IDR");
    const goldPricePerOunceIDR = response.data.items[0].xauPrice; // Harga emas per ounce dalam IDR
    const ozToGram = 31.1035; // Konversi ounce ke gram
    const goldPricePerGramIDR = goldPricePerOunceIDR / ozToGram; // Harga emas per gram

    return Math.round(goldPricePerGramIDR); // Kembalikan harga emas per gram (dibulatkan)
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return 1000000; // Nilai fallback jika API gagal
  }
}
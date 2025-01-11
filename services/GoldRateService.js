const OZ_TO_GRAM = 31.1035;
const TOLA_TO_GRAM = 11.66;

export const fetchGoldRates = async () => {
  try {
    const response = await fetch("https://data-asg.goldprice.org/dbXRates/IDR");
    const data = await response.json();

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return data.items.map((item) => ({
      currency: item.curr,
      goldRates: {
        "Price per Gram": formatter.format(item.xauPrice / OZ_TO_GRAM),
        "Price per Tola": formatter.format((item.xauPrice / OZ_TO_GRAM) * TOLA_TO_GRAM),
        "Price per Ounce": formatter.format(item.xauPrice),
      },
    }));
  } catch (error) {
    console.error("Failed to fetch gold rates:", error);
    return [];
  }
};

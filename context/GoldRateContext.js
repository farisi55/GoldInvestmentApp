import React, { createContext, useState } from "react";

// Buat konteks
export const GoldRateContext = createContext();

// Penyedia konteks
export const GoldRateProvider = ({ children }) => {
  const [currentGoldRate, setCurrentGoldRate] = useState(1000000); // Default harga emas

  return (
    <GoldRateContext.Provider value={{ currentGoldRate, setCurrentGoldRate }}>
      {children}
    </GoldRateContext.Provider>
  );
};

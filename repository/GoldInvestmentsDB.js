import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "GoldInvestment.db", location: "default" });

export function createTables() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS gold_investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        input_date DATETIME NOT NULL,
        sys_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sys_update_date DATETIME NULL,
        weight_gram FLOAT NOT NULL,
        price_gold FLOAT NOT NULL,
        investment_value FLOAT NOT NULL,
        use_data VARCHAR(5) DEFAULT 'Y'
      )`
    );
  });
}

export function getTotalInvestment() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(weight_gram) AS totalWeight FROM gold_investments WHERE use_data = 'Y'`,
        [],
        (_, { rows }) => resolve(rows.item(0).totalWeight || 0),
        (_, error) => reject(error)
      );
    });
  });
}

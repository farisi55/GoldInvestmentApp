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

export const fetchInvestmentDetails = async (orderByDate) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, input_date, weight_gram, investment_value
         FROM gold_investments
         WHERE use_data = 'Y'
         ORDER BY input_date ${orderByDate};`,
        [],
        (_, result) => {
          const rows = [];
          for (let i = 0; i < result.rows.length; i++) {
            rows.push(result.rows.item(i));
          }
          resolve(rows);
        },
        (error) => reject(error)
      );
    });
  });
};

export const deleteInvestment = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE gold_investments SET use_data = 'N', sys_update_date = date('now') WHERE id = ?;`,
        [id],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};

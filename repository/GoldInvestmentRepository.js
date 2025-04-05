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

export function getTotalInvestmentData() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
            SUM(weight_gram) AS totalWeight,
            SUM(investment_value) AS totalInvestmentValue
         FROM gold_investments
         WHERE use_data = 'Y'`,
        [],
        (_, { rows }) => {
          const item = rows.item(0);
          resolve({
            totalWeight: item.totalWeight || 0,
            totalInvestmentValue: item.totalInvestmentValue || 0
          });
        },
        (_, error) => {
          console.error("Error fetching investment data", error);
          reject(error);
        }
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

export const addInvestmentToDatabase = (inputDate, weightGram, goldRate, investmentValue) => {
  return new Promise((resolve, reject) => {
    const formattedDate = inputDate.toISOString().split('T')[0];
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO gold_investments (input_date, weight_gram, price_gold, investment_value) VALUES (?, ?, ?, ?)`,
          [formattedDate, weightGram, goldRate, investmentValue],
          () => resolve(true),
          (_, error) => reject(error)
        );
      },
      (error) => reject(error)
    );
  });
};

export const fetchGraphData = (days) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT input_date, SUM(weight_gram) AS total_weight, SUM(investment_value) AS total_value
           FROM gold_investments
           WHERE use_data = "Y" AND input_date >= date('now', '-${days} days')
           GROUP BY input_date
           ORDER BY input_date ASC;`,
          [],
          (tx, results) => {
            const rows = results.rows;
            let data = [];
            let cumulativeWeight = 0;
            let cumulativeInvestment = 0;

            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              cumulativeWeight += item.total_weight;
              cumulativeInvestment += item.total_value;

              const formattedDate = new Date(item.input_date).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
              });

              data.push({
                label: formattedDate,
                weight: cumulativeWeight,
                investment: cumulativeInvestment,
              });
            }
            resolve(data);
          },
          (error) => reject(error)
        );
      },
      (error) => reject(error)
    );
  });
};

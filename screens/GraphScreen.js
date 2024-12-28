import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import SQLite from 'react-native-sqlite-storage';
import { View, Text, Dimensions, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

export default function GraphScreen() {
  const [chartData, setChartData] = useState([]);
  const navigation = useNavigation();

  //create table
  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS GoldPrices (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, price REAL)',
        [],
        () => console.log('Table created successfully'),
        error => console.log('Error creating table', error)
      );
    });
  };

  //insert data
  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO GoldPrices (date, price) VALUES (?, ?)',
        ['2024-01-01', 1300],
        () => console.log('Data inserted successfully'),
        error => console.log('Error inserting data', error)
      );
    });
  };


  // Fetch data dari database untuk ditampilkan di grafik
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM investments',
        [],
        (tx, results) => {
          const rows = results.rows;
          let data = [];

          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            data.push({ x: `#${item.id}`, y: item.currentValue });
          }

          setChartData(data);
        },
        error => console.error('Error fetching data: ', error)
      );
    });
  }, []);

  //select data
  const [data, setData] = useState([]);
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM GoldPrices',
        [],
        (tx, results) => {
          const rows = results.rows;
          let temp = [];
          for (let i = 0; i < rows.length; i++) {
            temp.push(rows.item(i));
          }
          setData(temp);
        },
        error => console.log('Error fetching data', error)
      );
    });
  }, []);

  createTable();
  insertData();

//  chartData = {
//    labels: data.map(item => item.date),
//    datasets: [{ data: data.map(item => item.price) }],
//  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grafik Pertumbuhan Investasi</Text>
      {chartData.length > 0 ? (
        <LineChart
          data={{
            labels: chartData.map(item => item.x),
            datasets: [{ data: chartData.map(item => item.y) }],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#f5a623',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noData}>Belum ada data investasi.</Text>
      )}
      <Text style={styles.title}>Gold Investment Graph</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const GraphScreenOverTime = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gold Price Over Time</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [1200, 1250, 1300, 1275, 1350, 1400],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // Full width
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

//export default GraphScreen;


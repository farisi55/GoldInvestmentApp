import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

const GraphScreen = () => {
  const [chartData, setChartData] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: null });
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT input_date, SUM(weight_gram) AS total_weight, SUM(investment_value) AS total_value
         FROM gold_investments
         WHERE use_data = "Y" AND input_date >= date('now', '-30 days')
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
          setChartData(data);
        },
        (error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  };

  const handleDataPointClick = (dataIndex) => {
    const point = chartData[dataIndex];
    setTooltip({
      visible: true,
      x: dataIndex,
      y: point.weight,
      value: point.investment,
    });

    // Sembunyikan tooltip setelah 2 detik
    setTimeout(() => setTooltip({ visible: false, x: 0, y: 0, value: null }), 2000);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grafik Pertumbuhan Investasi</Text>
      {chartData.length > 0 ? (
        <View>
          <LineChart
            data={{
              labels: chartData.map((item) => item.label),
              datasets: [{ data: chartData.map((item) => item.weight) }],
            }}
            width={screenWidth - 32}
            height={250}
            yAxisSuffix="gr"
            chartConfig={{
              backgroundColor: '#f5f5f5',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={styles.chart}
            verticalLabelRotation={30}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          {tooltip.visible && (
            <View style={[styles.tooltip, { top: 50 + tooltip.x * 10, left: 20 + tooltip.x * 10 }]}>
              <Text style={styles.tooltipText}>
                Nilai Investasi: Rp {tooltip.value.toLocaleString('id-ID')}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noData}>Belum ada data investasi.</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default GraphScreen;

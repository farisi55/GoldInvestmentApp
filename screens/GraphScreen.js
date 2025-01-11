import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ChartComponent from '../components/ChartComponent';
import { fetchGraphData } from '../repository/GoldInvestmentRepository';
import styles from '../styles/CssStyles';

const GraphScreen = () => {
  const [chartData, setChartData] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: null });
  const [selectedPeriod, setSelectedPeriod] = useState('30'); // Default 1 bulan
  const navigation = useNavigation();

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const fetchData = async (days) => {
    try {
      const data = await fetchGraphData(days);
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  return (
    <View style={styles.containerGraph}>
      <Text style={styles.title}>Grafik Pertumbuhan Investasi</Text>
      <Picker
        selectedValue={selectedPeriod}
        onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="1 Bulan" value="30" />
        <Picker.Item label="3 Bulan" value="90" />
        <Picker.Item label="6 Bulan" value="180" />
        <Picker.Item label="1 Tahun" value="365" />
      </Picker>
      {chartData.length > 0 ? (
        <ChartComponent
          data={chartData}
          onDataPointClick={handleDataPointClick}
          tooltip={tooltip}
        />
      ) : (
        <Text style={styles.noData}>Belum ada data investasi.</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default GraphScreen;

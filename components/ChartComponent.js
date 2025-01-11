import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../styles/CssStyles';

const ChartComponent = ({ data, onDataPointClick, tooltip }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <LineChart
        data={{
          labels: data.map((item) => item.label),
          datasets: [{ data: data.map((item) => item.weight) }],
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
        onDataPointClick={({ index }) => onDataPointClick(index)}
      />
      {tooltip.visible && (
        <View style={[styles.tooltip, { top: 50 + tooltip.x * 10, left: 20 + tooltip.x * 10 }]}>
          <Text style={styles.tooltipText}>
            Nilai Investasi: Rp {tooltip.value.toLocaleString('id-ID')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ChartComponent;

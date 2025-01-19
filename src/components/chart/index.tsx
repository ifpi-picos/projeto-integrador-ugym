import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { temas } from '../../global/temas';
import { LineChart, BarChart } from 'react-native-chart-kit';

interface GenericChartProps {
  title: string;
  data: any;
  chartConfig: any;
  chartType: 'line' | 'bar';
  width: number;
  height: number;
  verticalLabelRotation?: number;
  yAxisLabel?: string;
  yAxisSuffix?: string;
}

const GenericChart: React.FC<GenericChartProps> = ({
  title,
  data,
  chartConfig,
  chartType,
  width,
  height,
  verticalLabelRotation = 0,
  yAxisLabel = '',
  yAxisSuffix = '',
}) => {
  const ChartComponent: React.ElementType = chartType === 'line' ? LineChart : BarChart;

  // Adiciona a cor vermelha aos pontos no gráfico de linha
  const modifiedData =
    chartType === 'line'
      ? {
          ...data,
          datasets: data.datasets.map((dataset: any) => ({
            ...dataset,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Cor das linhas
            propsForDots: {
              r: '4', // Tamanho dos pontos
              strokeWidth: '2',
              stroke: '#ff0000', // Cor do contorno dos pontos
            },
          })),
        }
      : data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ChartComponent
        data={modifiedData}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={styles.chart}
        verticalLabelRotation={verticalLabelRotation}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        bezier={chartType === 'line'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: temas.cores.primaria,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 8,
  },
});

export default GenericChart;

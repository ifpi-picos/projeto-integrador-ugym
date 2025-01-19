import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

interface ChartConfig {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces?: number;
  color: (opacity: number) => string;
  labelColor: (opacity: number) => string;
  style?: object;
  propsForDots?: object;
}

const ProgressChart = ({
  title = "Gráfico de Evolução", // Título do gráfico
  data,
  chartType = "bar", // Tipo de gráfico: "bar" ou "line"
  width = 350,
  height = 220,
  yAxisLabel = "",
  yAxisSuffix = "",
  chartConfig,
  verticalLabelRotation = 0,
}: {
  title?: string;
  data: any;
  chartType?: "bar" | "line";
  width?: number;
  height?: number;
  yAxisLabel?: string;
  yAxisSuffix?: string;
  chartConfig: ChartConfig;
  verticalLabelRotation?: number;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {chartType === "bar" ? (
        <BarChart
          style={styles.chart}
          data={data}
          width={width}
          height={height}
          yAxisLabel={yAxisLabel}
          yAxisSuffix={yAxisSuffix}
          chartConfig={chartConfig}
          verticalLabelRotation={verticalLabelRotation}
        />
      ) : (
        <LineChart
          style={styles.chart}
          data={data}
          width={width}
          height={height}
          yAxisLabel={yAxisLabel}
          yAxisSuffix={yAxisSuffix}
          chartConfig={chartConfig}
          verticalLabelRotation={verticalLabelRotation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent", // Fundo transparente
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff", // Texto branco
  },
  chart: {
    borderRadius: 10,
  },
});

export default ProgressChart;

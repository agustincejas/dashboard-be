import Metric from "../models/metrics";
import { IMetric } from "../types/metric";
const DAY_MS = 1000 * 60 * 60 * 24;

export const getMetricNames = async () => {
  const metrics = await Metric.distinct("name");

  return metrics;
};

const generateChartDatasets = (
  metrics: IMetric[],
  endDate: string,
  startDate: string,
  name: string
) => {
  const parsedEndDate = +endDate;
  const sum: number = metrics.reduce((a, b) => a + b.value, 0);
  const timeDifference = parsedEndDate - +startDate;
  const days = timeDifference / DAY_MS;
  const avgPerDay = sum / days;

  const avgPerDayDataSet = [] as IMetric[];
  const avgPerHourDataSet = [] as IMetric[];
  const avgPerMinDataSet = [] as IMetric[];
  const newLabels = [];

  const avgPerHour = avgPerDay / 24;
  const avgPerMin = avgPerHour / 60;
  let currentDate = +startDate;

  while (currentDate <= parsedEndDate) {
    avgPerDayDataSet.push({
      value: avgPerDay,
      timestamp: currentDate,
      id: `${name}-avg-per-day`,
      name,
    });
    avgPerHourDataSet.push({
      value: avgPerHour,
      timestamp: currentDate,
      id: `${name}-avg-per-hour`,
      name,
    });
    avgPerMinDataSet.push({
      value: avgPerMin,
      timestamp: currentDate,
      id: `${name}-avg-per-min`,
      name,
    });
    newLabels.push(new Date(currentDate).toDateString());
    currentDate += DAY_MS;
  }
  return {
    newLabels,
    avgPerDayDataSet,
    avgPerHourDataSet,
    avgPerMinDataSet,
  };
};

export const getMetricData = async (
  name: string,
  startDate: string,
  endDate: string
) => {
  const metrics = await Metric.find({
    name,
    timestamp: { $gte: startDate, $lte: endDate },
  });

  const { newLabels, avgPerDayDataSet, avgPerHourDataSet, avgPerMinDataSet } =
    generateChartDatasets(metrics, endDate, startDate, name);

  return {
    labels: newLabels,
    data: metrics,
    avgPerDay: avgPerDayDataSet,
    avgPerHour: avgPerHourDataSet,
    avgPerMin: avgPerMinDataSet,
  };
};

export const createMetric = async (metric: IMetric) => {
  return await Metric.create(metric);
};

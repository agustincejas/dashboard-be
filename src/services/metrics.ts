import Metric from "../models/metrics";
import { IMetric } from "../types/metric";

export const getMetrics = async (filter?: string) => {
  const query = filter ? { name: filter } : {};
  const metrics = await Metric.find(query);

  return metrics;
};

export const createMetric = async (metric: IMetric) => {
  return await Metric.create(metric);
};

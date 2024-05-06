import { Request, Response } from "express";
import { IMetric } from "../types/metric";
import {
  createMetric,
  getMetricNames,
  getMetricData,
} from "../services/metrics";

const getMetricsController = async (_: Request, res: Response) => {
  try {
    const metrics = await getMetricNames();

    return res.status(200).json(metrics);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

interface MetricRequestQuery {
  startDate: string;
  endDate: string;
}

const getMetricController = async (req: Request, res: Response) => {
  try {
    const nameFilter = req.params.metric as string;
    const { startDate, endDate } = req.query as unknown as MetricRequestQuery;

    if (!startDate && !endDate) {
      return res.status(400).json({ message: "Bad request" });
    }
    const metrics = await getMetricData(nameFilter, startDate, endDate);

    return res.status(200).json(metrics);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const postMetricController = async (req: Request, res: Response) => {
  const { name, value, timestamp } = req.body as IMetric;

  try {
    const metric = await createMetric({ name, value, timestamp });

    return res.status(201).json(metric);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { getMetricsController, getMetricController, postMetricController };

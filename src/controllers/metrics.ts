import { Request, Response } from "express";
import { IMetric } from "../types/metric";
import { createMetric, getMetrics } from "../services/metrics";

const getMetricsController = async (req: Request, res: Response) => {
  const nameFilter = req.query.name as string;

  try {
    const metrics = await getMetrics(nameFilter);

    return res.status(200).json(metrics);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const postMetricController = async (req: Request, res: Response) => {
  const { name, value, timestamp } = req.body as IMetric;

  try {
    const metric = await createMetric({ name, value, timestamp });

    return res.status(201).json(metric);
  } catch (error) {
    console.log(error);
  }
};

export { getMetricsController, postMetricController };

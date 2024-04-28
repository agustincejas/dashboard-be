import express from "express";
const metricsRouter = express.Router();

import {
  getMetricsController,
  postMetricController,
} from "../controllers/metrics";
import { postMetricValidator } from "../validators/postMetric.validator";
import validate from "../middlewares/validate";

metricsRouter.get("/", getMetricsController);
metricsRouter.post("/", validate(postMetricValidator), postMetricController);

export default metricsRouter;

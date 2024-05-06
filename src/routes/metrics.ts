import express from "express";
const metricsRouter = express.Router();

import {
  getMetricsController,
  getMetricController,
  postMetricController,
} from "../controllers/metrics";
import { postMetricValidator } from "../validators/postMetric.validator";
import validate from "../middlewares/validate";

metricsRouter.get("/", getMetricsController);
metricsRouter.get("/:metric", getMetricController);
metricsRouter.post("/", validate(postMetricValidator), postMetricController);

export default metricsRouter;

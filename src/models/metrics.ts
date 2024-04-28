import { Schema, model } from "mongoose";
import { IMetric } from "../types/metric";

const metricSchema = new Schema<IMetric>({
  timestamp: { type: Number, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const Metric = model<IMetric>("Metric", metricSchema);

export default Metric;

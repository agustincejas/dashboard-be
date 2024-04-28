import { ValidationChain, body } from "express-validator";

export const postMetricValidator: ValidationChain[] = [
  body("timestamp").exists().isNumeric(),
  body("name").exists().isString(),
  body("value").exists().isNumeric(),
];

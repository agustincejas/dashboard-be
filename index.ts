import { Response } from "express";
import MongooseFactory from "./src/utils/db";
import metricsRouter from "./src/routes/metrics";
var express = require("express");
var path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

MongooseFactory.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Aloha from server");
});
app.use("/api/metrics", metricsRouter);

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

export default app;

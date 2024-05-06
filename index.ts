import MongooseFactory from "./src/utils/db";
import metricsRouter from "./src/routes/metrics";
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3001;
const allowedOrigins = process.env.WHITE_LISTED_ORIGINS || ([] as string[]);

const app = express();

MongooseFactory.init();

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/metrics", metricsRouter);

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

export default app;

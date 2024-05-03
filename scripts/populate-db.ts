import data from "./MOCK_DATA.json";
import MongooseFactory from "../src/utils/db";
import Metric from "../src/models/metrics";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

(async () => {
  try {
    MongooseFactory.init();
    await Metric.insertMany(data);
    console.log("Everything good! 🚀");
  } catch (error) {
    console.log("Populate Db failed 🔥");
  }
})();

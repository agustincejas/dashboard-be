const mongoose = require("mongoose");

const MongooseFactory = {
  init: async () => {
    try {
      await mongoose.connect(process.env.DB_STRING);
      console.log(`Connected to ${process.env.DB_STRING}`);
      console.log(
        `Database explorer available at: ${process.env.BASE_URL}:8081/db/dashboard/`
      );
    } catch (error) {
      console.error(error);
    }
  },
};

export default MongooseFactory;

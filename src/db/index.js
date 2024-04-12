import mongoose from "mongoose";
import { DB_NAME } from "../../constansts.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MongoDB conncetion error : ", err);
    process.exit(1);
  }
};

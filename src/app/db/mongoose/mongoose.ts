import mongoose from "mongoose";
import env from "dotenv";

env.config();

mongoose.connect(process.env.DATABASE || "");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});

export = mongoose;

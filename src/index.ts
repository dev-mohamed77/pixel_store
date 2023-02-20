import express from "express";
import mongoose from "mongoose";
import Morgan from "morgan";
import env from "dotenv";
import presentationRoute from "./presentation/router/index";

env.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(Morgan("dev"));

app.use(express.json());

// mongoose connect
// mongoose.set("strictQuery");

mongoose.connect(`${process.env.DATABASE}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});

app.use("/api", presentationRoute);

app.get("*", async (_req: express.Request, res: express.Response) => {
  res.status(404).json({
    status: false,
    result: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`server is running at port :${port} ...`);
});

export default app;

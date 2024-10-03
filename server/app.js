import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToDatabase from "./model/dbconnection.js";
import authRouter from "./routes/auth.routes.js";
import movieRouter from "./routes/movie.routes.js";
import theaterRouter from "./routes/theater.routes.js";
configDotenv();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bankai Katen Kyokotsu: Karamatsu Shinju");
});

app.use("/auth", authRouter);
app.use("/movie" , movieRouter);
app.use("/theater", theaterRouter);

app.listen(process.env.PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${process.env.PORT}`);
});

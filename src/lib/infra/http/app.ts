import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { v1Router } from "./api/v1";
import { Config } from "../../../config";

import cookieParser from "cookie-parser";

const app = express();

const origin = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(origin));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("yo i'm up");
});

app.use("/api/v1", v1Router);

// New api versions can go here

app.listen(Config.PORT || 4000, () => {
  console.log(`[App]: Server listening on ${Config.PORT}`);
});

export { app };

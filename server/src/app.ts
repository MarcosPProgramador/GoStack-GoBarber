import "reflect-metadata";
import "./database/connection";

import cors from "cors";
import express from "express";
import router from "./routes/router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

export default app;

import express from "express";
import cors from "cors";
import urlRoutes from "./modules/url/url.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);

app.use("/api/url", urlRoutes);

export default app;

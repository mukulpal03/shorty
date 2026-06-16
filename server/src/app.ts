import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import urlRoutes from "./modules/url/url.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.use("/api/url", urlRoutes);
app.use("/api/users", userRoutes);

export default app;

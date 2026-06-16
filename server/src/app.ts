import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import urlRedirectRoutes from "./modules/url/url.redirect.routes";
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
app.use(urlRedirectRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

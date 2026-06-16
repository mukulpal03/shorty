import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT ?? 3000;

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
);

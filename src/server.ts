import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import app from "./app.js";

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
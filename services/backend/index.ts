import { connectRedis } from "./src/database/redis";
import { connectDatabase } from "./src/database/sqlite";
import { startServer } from "./src/server";

connectDatabase();
connectRedis();
startServer();
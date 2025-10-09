import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register } from "./src/controllers/register";
import { environment } from "./src/config/env";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (_, res) => res.send("service working"));
register(app);

app.listen(environment.port, () => console.log("Server running"));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("API working"));
app.listen(3000, () => console.log("Server running on port 3000"));

import dotenv from "dotenv";
import express from "express";
import geminiOutput from "./api/gemini.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const result = geminiOutput();
// const finalOutput = result.response;
console.log(result);

//import what u need
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

dotenv.config({
  path: "./env",
});

//declare the variables
const app = express();
const geminiAPI = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const port = process.env.PORT;
const prompt = "Explain how AI works";

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// [Read the PROJECT.md file for feature list]
//===============================implement

const result = await model.generateContent(prompt);
console.log(result.response.text());

import {
  GoogleGenerativeAI,
  DynamicRetrievalMode,
} from "@google/generative-ai";
import { schema } from "./outSchema.js";
import "dotenv/config";

const geminiAPI = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiAPI);
const prompt = "Black swans dont exist";
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an unbiased fact checker",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
  tools: [
    {
      googleSearchRetrieval: {
        dynamicRetrievalConfig: {
          mode: DynamicRetrievalMode.MODE_DYNAMIC,
          dynamicThreshold: 0.9,
        },
      },
    },
  ],
});

const geminiOutput = async () => {
  try {
    const result = await model.generateContent(prompt);
    console.log("gemini responsed!!!");
    return result.response.text().json();
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default geminiOutput;

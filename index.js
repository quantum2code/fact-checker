//import what u need
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import express from "express";

dotenv.config();

//declare the variables
const app = express();
const geminiAPI = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiAPI);

//schema for structured respose
const schema = {
  type: SchemaType.ARRAY,
  description: "inference against the provided information",
  items: {
    type: SchemaType.OBJECT,
    properties: {
      percentageOfAccuracy: {
        //precentage of accuracy
        type: SchemaType.NUMBER,
        description:
          "How accurate the provided information is in number between 0-100?",
        nullable: false,
      },
      emotionalTone: {
        //emotional tone
        type: SchemaType.STRING,
        description:
          "the emotional tone of the provided statement in 1-2 words",
        nullable: false,
      },
      reasoning: {
        // reasoning
        type: SchemaType.STRING,
        description:
          "Assertive reasoning behind the metric of accuracy of the provided statement, under ~30 words",
        nullable: false,
      },
    },
  },
  // required: ["percentageOfAccuracy", "emotional tone"],
};

//configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an unbiased fact checker",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const port = process.env.PORT;
const prompt = "some misinfo";

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// [Read the PROJECT.md file for feature list]

const result = await model.generateContent(prompt);
console.log(result.response.text());

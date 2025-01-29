import { SchemaType } from "@google/generative-ai";
export const schema = {
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

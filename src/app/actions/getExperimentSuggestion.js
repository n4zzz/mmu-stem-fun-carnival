"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function getExperimentSuggestion(resourceName, resourceDescription) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    I am a STEM student looking for a project. 
    Based on this lab resource: "${resourceName}" (${resourceDescription}), 
    suggest ONE exciting and educational experiment I can perform. 
    
    Please provide the response in this format:
    Title: [Experiment Title]
    Objective: [Short objective]
    Steps: 1. [Step 1]
    2. [Step 2]
    ...
    Expected Outcome: [What to expect]
    
    Keep it concise but informative.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, I couldn't generate an experiment at this time. Please try again.";
  }
}

export default getExperimentSuggestion;
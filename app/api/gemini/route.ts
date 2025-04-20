import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the provided API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { prompt, section, context } = await request.json()

    // Get the Gemini model (using Gemini 1.5 Flash for faster responses)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a more specific prompt based on the section and context
    let enhancedPrompt = prompt

    if (section) {
      enhancedPrompt = `You are an expert academic writing assistant helping with a research paper. 
      The user is working on the "${section}" section of their paper.
      
      ${context ? `Here's the current content of their paper: "${context}"` : ""}
      
      ${prompt}
      
      Provide a direct response without any introductory phrases like "Here's your response" or "Here's what you asked for". 
      Just provide the content in a well-structured, academically rigorous way that would be appropriate for a research paper. 
      Write in a natural, conversational human tone. Avoid overly formal or AI-sounding language. 
      Include some natural variations, occasional informalities, and a warm, personable style while maintaining academic credibility.`
    } else {
      // Add human-like instructions to regular prompts too
      enhancedPrompt = `${prompt}\n\nPlease respond directly without any introductory phrases like "Here's your response" or "Here's what you asked for". Just provide the direct answer or content in a natural, conversational human tone. Avoid overly formal or AI-sounding language. Include some natural variations, occasional informalities, and a warm, personable style.`
    }

    // Generate content with Gemini
    const result = await model.generateContent(enhancedPrompt)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing Gemini request:", error)
    return NextResponse.json({ error: "Failed to process request with Gemini API" }, { status: 500 })
  }
}

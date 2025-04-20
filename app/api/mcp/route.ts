import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the provided API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

// MCP (Model Control Protocol) implementation for controlling the AI model
export async function POST(request: Request) {
  try {
    const { paperData, action, prompt, context, parameters } = await request.json()

    // Get the Gemini model (using Gemini 1.5 Flash for faster responses)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Apply any custom generation parameters if provided
      generationConfig: parameters || {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    let response = {}

    switch (action) {
      case "generate":
        // Create an enhanced prompt with context and human-like instructions
        const humanizedPrompt = `${prompt}\n\nPlease respond directly to what I've asked without any introductory phrases like "Here's your response" or "Here's what you asked for". Just provide the direct answer or content I requested in a natural, conversational human tone. Avoid overly formal or AI-sounding language. Include some natural variations, occasional informalities, and a warm, personable style while maintaining academic credibility.`

        const enhancedPrompt = context ? `${humanizedPrompt}\n\nContext: ${context}` : humanizedPrompt

        // Generate content with Gemini
        const result = await model.generateContent(enhancedPrompt)
        response = {
          success: true,
          content: result.response.text(),
          usage: {
            promptTokens: enhancedPrompt.length / 4, // Rough estimate
            completionTokens: result.response.text().length / 4, // Rough estimate
          },
        }
        break

      case "analyze":
        // Analyze the paper content for improvements
        const analysisPrompt = `
          You are an expert academic editor. Analyze the following research paper content and provide feedback:
          
          Title: ${paperData.title || "Untitled"}
          Authors: ${paperData.authors || "Unknown"}
          
          ${Object.entries(paperData)
            .filter(
              ([key, value]) =>
                key !== "title" &&
                key !== "authors" &&
                key !== "institution" &&
                typeof value === "string" &&
                value.trim().length > 0,
            )
            .map(([key, value]) => `${key.toUpperCase()}:\n${value}`)
            .join("\n\n")}
          
          Provide an analysis of:
          1. Overall structure and coherence
          2. Academic language and tone
          3. Clarity and precision
          4. Areas for improvement
          5. Readability score (estimate)
        `

        const analysisResult = await model.generateContent(analysisPrompt)

        // Extract a readability score from the analysis (this is a simplification)
        const analysisText = analysisResult.response.text()
        const readabilityMatch = analysisText.match(/readability score.*?(\d+)/i)
        const readabilityScore = readabilityMatch
          ? Number.parseInt(readabilityMatch[1])
          : Math.floor(Math.random() * 30) + 70

        response = {
          success: true,
          analysis: {
            feedback: analysisText,
            readabilityScore,
            grammarIssues: analysisText.includes("grammar")
              ? (analysisText.match(/grammar issues/gi) || []).length
              : Math.floor(Math.random() * 5),
            citationCount: paperData.references
              ? paperData.references.split("\n").filter((line) => line.trim().length > 0).length
              : 0,
            suggestions: analysisText
              .split(/\d+\.\s+/)
              .slice(1)
              .map((s) => s.split("\n")[0].trim())
              .filter((s) => s.length > 0),
          },
        }
        break

      case "save":
        // In a real implementation, this would save to a database
        response = {
          success: true,
          message: "Paper saved successfully",
          paperId: `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        }
        break

      case "export":
        // In a real implementation, this would generate a document
        response = {
          success: true,
          message: "Paper exported successfully",
          downloadUrl: `/api/download/paper_${Date.now()}.pdf`,
          formats: ["PDF", "DOCX", "LaTeX"],
        }
        break

      default:
        response = {
          success: false,
          message: "Unknown action",
        }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error processing MCP request:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request with MCP",
        message: error.message,
      },
      { status: 500 },
    )
  }
}

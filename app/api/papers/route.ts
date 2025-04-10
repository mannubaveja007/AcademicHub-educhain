import { NextResponse } from "next/server"

// This is a mock database. In a real application, you'd use a proper database.
const papers = [
  {
    id: 1,
    title: "Quantum Computing: A New Paradigm",
    author: "Dr. Jane Smith",
    institution: "Stanford University",
    publishedDate: "2023-05-15",
    views: 1245,
    downloads: 342,
    coins: 567,
    abstract:
      "This paper explores the latest advancements in quantum computing and proposes a new approach to qubit stabilization that could significantly reduce decoherence time.",
  },
  {
    id: 2,
    title: "Machine Learning in Healthcare",
    author: "Dr. John Doe",
    institution: "MIT",
    publishedDate: "2023-06-01",
    views: 980,
    downloads: 215,
    coins: 423,
    abstract:
      "An exploration of how machine learning algorithms can improve diagnostic accuracy in medical imaging, with a focus on early cancer detection.",
  },
]

export async function GET() {
  return NextResponse.json(papers)
}

export async function POST(request: Request) {
  const paper = await request.json()
  paper.id = papers.length + 1
  paper.views = 0
  paper.downloads = 0
  paper.coins = 0
  papers.push(paper)
  return NextResponse.json(paper, { status: 201 })
}

// Check if this file uses MongoDB

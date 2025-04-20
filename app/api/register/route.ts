import { NextResponse } from "next/server"

// This is a mock database. In a real application, you'd use a proper database.
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { name, email, password, institution } = await request.json()

    // Basic validation
    if (!name || !email || !password || !institution) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = { id: users.length + 1, name, email, password, institution }
    users.push(newUser)

    // In a real application, you would hash the password before storing it
    // and use a proper database to store user information

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

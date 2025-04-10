"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen,
  ChevronRight,
  FileText,
  Lightbulb,
  MessageCircle,
  Save,
  Send,
  Sparkles,
  Wand2,
  Moon,
  Sun,
  Zap,
  BookMarked,
  Pencil,
  Brain,
  Dices,
  Palette,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

// Paper sections and their descriptions
const paperSections = [
  {
    id: "title",
    name: "Title & Authors",
    description: "Create a compelling title and add author information",
    icon: BookMarked,
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Summarize your research in a concise abstract (150-250 words)",
    icon: Layers,
  },
  {
    id: "introduction",
    name: "Introduction",
    description: "Provide background, context, and state your research question",
    icon: Lightbulb,
  },
  {
    id: "methodology",
    name: "Methodology",
    description: "Describe your research methods and approach",
    icon: Dices,
  },
  {
    id: "results",
    name: "Results",
    description: "Present your findings and data",
    icon: Zap,
  },
  {
    id: "discussion",
    name: "Discussion",
    description: "Interpret your results and discuss implications",
    icon: Brain,
  },
  {
    id: "conclusion",
    name: "Conclusion",
    description: "Summarize key findings and suggest future research",
    icon: Pencil,
  },
  {
    id: "references",
    name: "References",
    description: "List all cited sources in the appropriate format",
    icon: FileText,
  },
]

// AI suggestions for different sections
const aiSuggestions = {
  title: [
    "Make your title specific and concise (10-15 words)",
    "Consider using a colon to separate main title from subtitle",
    "Include key terms that researchers might search for",
  ],
  abstract: [
    "Start with a broad statement about the field",
    "Clearly state your research question or objective",
    "Briefly mention methodology and key findings",
    "End with implications of your research",
  ],
  introduction: [
    "Begin with the broader context of your research area",
    "Narrow down to the specific problem you're addressing",
    "Review relevant literature to show the research gap",
    "Clearly state your research question and objectives",
    "Outline the structure of your paper",
  ],
  methodology: [
    "Describe your research design in detail",
    "Explain data collection methods and tools",
    "Discuss participant selection or sampling methods",
    "Address ethical considerations if applicable",
    "Explain data analysis procedures",
  ],
  results: [
    "Present findings without interpretation",
    "Use tables, figures, or charts to visualize data",
    "Organize results logically, often by research question",
    "Include statistical analyses where appropriate",
  ],
  discussion: [
    "Interpret your results in context of your research questions",
    "Compare findings with existing literature",
    "Discuss implications of your results",
    "Address limitations of your study",
  ],
  conclusion: [
    "Summarize key findings without introducing new information",
    "Discuss broader implications of your research",
    "Suggest directions for future research",
    "End with a strong closing statement about the significance",
  ],
  references: [
    "Follow a consistent citation style (APA, MLA, Chicago, etc.)",
    "Include all sources cited in the text",
    "Format each reference according to the chosen style guide",
    "Arrange references alphabetically by author's last name",
  ],
}

export default function BuildPaper() {
  const [activeSection, setActiveSection] = useState("title")
  const [paperContent, setPaperContent] = useState({
    title: "",
    authors: "",
    institution: "",
    abstract: "",
    introduction: "",
    methodology: "",
    results: "",
    discussion: "",
    conclusion: "",
    references: "",
  })
  const [aiResponse, setAiResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [userPrompt, setUserPrompt] = useState("")
  const [paperTitle, setPaperTitle] = useState("Untitled Research Paper")
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [paperHistory, setPaperHistory] = useState([])
  const [lastSaved, setLastSaved] = useState(null)
  const [aiMode, setAiMode] = useState("assistant") // "assistant" or "editor"
  const [darkMode, setDarkMode] = useState(false)
  const [aiTemperature, setAiTemperature] = useState(0.7)
  const [showWelcome, setShowWelcome] = useState(true)
  const [plagiarismResults, setPlagiarismResults] = useState(null)
  const [isPlagiarismChecking, setIsPlagiarismChecking] = useState(false)

  const contentRef = useRef(null)
  const { toast } = useToast()

  // Calculate completion percentage whenever paper content changes
  useEffect(() => {
    const totalSections = Object.keys(paperContent).length - 2 // Exclude authors and institution
    const filledSections = Object.entries(paperContent).filter(
      ([key, value]) =>
        key !== "authors" && key !== "institution" && typeof value === "string" && value.trim().length > 0,
    ).length
    setCompletionPercentage(Math.round((filledSections / totalSections) * 100))

    // Update paper title if it's been set
    if (paperContent.title && paperContent.title.trim()) {
      setPaperTitle(paperContent.title)
    }
  }, [paperContent])

  // Load saved draft if available
  useEffect(() => {
    const savedDraft = localStorage.getItem("paperDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setPaperContent(parsedDraft.content)
        setPaperTitle(parsedDraft.title || "Untitled Research Paper")
        setLastSaved(parsedDraft.savedAt)
        toast({
          title: "Draft loaded",
          description: `Last saved: ${new Date(parsedDraft.savedAt).toLocaleString()}`,
        })
      } catch (error) {
        console.error("Error loading saved draft:", error)
      }
    }

    // Check system dark mode preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Update paper content for the current section
  const updateContent = (value) => {
    setPaperContent({
      ...paperContent,
      [activeSection]: value,
    })

    // Add to history for undo functionality
    setPaperHistory([...paperHistory, { ...paperContent }])
  }

  // Simulated plagiarism detection
  const checkPlagiarism = async (text) => {
    setIsPlagiarismChecking(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Split text into sentences for analysis
    const sentences = text.split(/(?<=[.!?])\s+/)

    // Simulate plagiarism detection with random results
    const results = {
      score: Math.random() * 100,
      matches: [],
    }

    // Randomly mark some sentences as plagiarized (for demonstration)
    sentences.forEach((sentence, index) => {
      if (sentence.length > 20 && Math.random() < 0.2) {
        results.matches.push({
          text: sentence,
          similarity: Math.round(Math.random() * 50 + 50),
          source: `Journal of ${["Computer Science", "Physics", "Biology", "Medicine", "Psychology"][Math.floor(Math.random() * 5)]}, ${2018 + Math.floor(Math.random() * 5)}`,
        })
      }
    })

    // Calculate overall plagiarism score based on matches
    results.score =
      results.matches.length > 0
        ? Math.round(results.matches.reduce((acc, match) => acc + match.similarity, 0) / results.matches.length)
        : 0

    setIsPlagiarismChecking(false)
    return results
  }

  // Handle AI generation request via MCP
  const generateWithAI = async (prompt) => {
    setIsGenerating(true)
    setAiResponse("")
    setPlagiarismResults(null)

    try {
      // Get the current content for context
      const currentContent = paperContent[activeSection]

      // Call the MCP API
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generate",
          prompt,
          context: currentContent,
          parameters: {
            temperature: aiTemperature,
            topP: 0.8,
            topK: 40,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()

      if (data.success) {
        setAiResponse(data.content)

        // Check for plagiarism
        const plagiarismResults = await checkPlagiarism(data.content)
        setPlagiarismResults(plagiarismResults)

        // Show warning if high plagiarism detected
        if (plagiarismResults.score > 30) {
          toast({
            title: "Plagiarism Warning",
            description: `Potential plagiarism detected (${plagiarismResults.score}% similarity)`,
            variant: "destructive",
          })
        }
      } else {
        throw new Error(data.message || "Failed to generate content")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
      setAiResponse("Sorry, there was an error generating content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Apply AI suggestion to current section
  const applyAiSuggestion = () => {
    updateContent(aiResponse)
    setAiResponse("")
    toast({
      title: "AI suggestion applied",
      description: "The generated content has been added to your paper.",
    })
  }

  // Save paper draft
  const saveDraft = async () => {
    try {
      const now = new Date().toISOString()
      const draft = {
        title: paperTitle,
        content: paperContent,
        savedAt: now,
      }

      localStorage.setItem("paperDraft", JSON.stringify(draft))
      setLastSaved(now)

      // Also save to MCP
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "save",
          paperData: {
            ...paperContent,
            title: paperTitle,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save to server")
      }

      toast({
        title: "Draft saved",
        description: "Your paper has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving draft:", error)
      toast({
        title: "Local save only",
        description: "Your paper was saved locally, but we couldn't save to the server.",
        variant: "warning",
      })
    }
  }

  // Analyze paper with AI
  const analyzePaper = async () => {
    toast({
      title: "Analyzing paper",
      description: "Your paper is being analyzed...",
    })

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "analyze",
          paperData: {
            ...paperContent,
            title: paperTitle,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze paper")
      }

      const data = await response.json()

      if (data.success) {
        setAiResponse(data.analysis.feedback)
        toast({
          title: "Analysis complete",
          description: `Readability score: ${data.analysis.readabilityScore}/100`,
        })
      } else {
        throw new Error(data.message || "Failed to analyze paper")
      }
    } catch (error) {
      console.error("Error analyzing paper:", error)
      toast({
        title: "Analysis failed",
        description: "Failed to analyze your paper. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Export paper to PDF/DOCX
  const exportPaper = async () => {
    toast({
      title: "Preparing export",
      description: "Your paper is being prepared for export...",
    })

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "export",
          paperData: {
            ...paperContent,
            title: paperTitle,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to export paper")
      }

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Export ready",
          description: "Your paper has been exported successfully.",
        })

        // This would typically trigger a download
        // window.location.href = data.downloadUrl
      } else {
        throw new Error(data.message || "Failed to export paper")
      }
    } catch (error) {
      console.error("Error exporting paper:", error)
      toast({
        title: "Export failed",
        description: "Failed to export your paper. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Academic Hub
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/rankings" className="text-sm font-medium transition-colors hover:text-primary">
              Rankings
            </Link>
            <Link href="/careers" className="text-sm font-medium transition-colors hover:text-primary">
              Careers
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {darkMode ? "Light" : "Dark"} Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Link href="/profile">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-indigo-600 hover:shadow-md transition-shadow"></div>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 bg-gradient-to-b from-background via-blue-50/30 to-indigo-50/30 dark:from-background dark:via-blue-950/5 dark:to-indigo-950/5">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Paper Builder</span>
              </div>
              <h1 className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                {paperTitle}
              </h1>
              {lastSaved && (
                <p className="text-xs text-muted-foreground mt-1">Last saved: {new Date(lastSaved).toLocaleString()}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2 mr-2">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="ai-mode" className="text-xs text-muted-foreground">
                    AI Mode: {aiMode === "assistant" ? "Assistant" : "Editor"}
                  </Label>
                  <Switch
                    id="ai-mode"
                    checked={aiMode === "editor"}
                    onCheckedChange={(checked) => setAiMode(checked ? "editor" : "assistant")}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-indigo-600"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={saveDraft}
                className="gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button
                className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={exportPaper}
              >
                <FileText className="h-4 w-4" />
                Export Paper
              </Button>
            </div>
          </div>

          {showWelcome && (
            <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-indigo-600/5 backdrop-blur shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Welcome to the AI-Powered Research Paper Builder
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)} className="h-8 w-8 p-0">
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build your research paper step-by-step with the help of our Gemini AI assistant. Complete each section
                  of your paper, get AI-powered suggestions, and export your finished work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                      <Pencil className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Step-by-Step Writing</h3>
                      <p className="text-xs text-muted-foreground">Complete each section of your paper in order</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">AI Assistance</h3>
                      <p className="text-xs text-muted-foreground">Get help with writing, editing, and citations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Export & Share</h3>
                      <p className="text-xs text-muted-foreground">Download your paper in multiple formats</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className="w-full gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
                  onClick={() => setShowWelcome(false)}
                >
                  <Sparkles className="h-4 w-4" />
                  Start Building Your Paper
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            {/* Left sidebar - Paper sections */}
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Paper Structure
                  </CardTitle>
                  <CardDescription>Complete each section of your paper</CardDescription>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <Progress
                      value={completionPercentage}
                      className="h-2 bg-primary/20"
                      indicatorClassName="bg-gradient-to-r from-primary to-indigo-600"
                    />
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 pt-2">
                  {paperSections.map((section) => {
                    const SectionIcon = section.icon
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className={`justify-start h-auto py-2 px-3 ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground"
                            : "hover:bg-primary/10 hover:text-primary"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <SectionIcon className="h-4 w-4" />
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{section.name}</div>
                            <div className="text-xs opacity-80 text-left">{section.description}</div>
                          </div>
                          {paperContent[section.id]?.trim().length > 0 && (
                            <Badge className="ml-auto bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/20">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Writing Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {aiSuggestions[activeSection] ? (
                      aiSuggestions[activeSection].map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <Sparkles className="h-3 w-3 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">{tip}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Focus on clarity and precision in this section. Make sure your content flows logically from the
                        previous sections.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette className="h-5 w-5 text-primary" />
                    AI Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="ai-temperature" className="text-sm">
                          Creativity
                        </Label>
                        <span className="text-xs text-muted-foreground">{aiTemperature.toFixed(1)}</span>
                      </div>
                      <input
                        id="ai-temperature"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={aiTemperature}
                        onChange={(e) => setAiTemperature(Number.parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Precise</span>
                        <span>Creative</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={analyzePaper}
                      className="w-full gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <Brain className="h-4 w-4" />
                      Analyze Paper
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (paperContent[activeSection]) {
                          checkPlagiarism(paperContent[activeSection]).then(setPlagiarismResults)
                        } else {
                          toast({
                            title: "No content",
                            description: "Please add some content to check for plagiarism.",
                            variant: "destructive",
                          })
                        }
                      }}
                      className="w-full gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary mt-2"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Check Plagiarism
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content area */}
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {(() => {
                        const currentSection = paperSections.find((section) => section.id === activeSection)
                        if (currentSection?.icon) {
                          const IconComponent = currentSection.icon
                          return <IconComponent className="h-5 w-5 text-primary" />
                        }
                        return null
                      })()}
                      {paperSections.find((section) => section.id === activeSection)?.name}
                    </CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              generateWithAI(
                                `Generate a high-quality ${activeSection} for a research paper about ${paperContent.title || "my research topic"}`,
                              )
                            }
                            disabled={isGenerating}
                            className="gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                          >
                            <Wand2 className="h-3.5 w-3.5" />
                            AI Assist
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate content with Gemini AI</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>
                    {paperSections.find((section) => section.id === activeSection)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent ref={contentRef}>
                  {activeSection === "title" ? (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="paper-title">Paper Title</Label>
                        <Input
                          id="paper-title"
                          placeholder="Enter your paper title"
                          value={paperContent.title}
                          onChange={(e) => updateContent(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="authors">Authors</Label>
                        <Input
                          id="authors"
                          placeholder="e.g., Dr. Jane Smith, Dr. John Doe"
                          value={paperContent.authors}
                          onChange={(e) => setPaperContent({ ...paperContent, authors: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          placeholder="e.g., Stanford University"
                          value={paperContent.institution}
                          onChange={(e) => setPaperContent({ ...paperContent, institution: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        placeholder={`Write your ${activeSection} here...`}
                        className="min-h-[300px] resize-y"
                        value={paperContent[activeSection]}
                        onChange={(e) => updateContent(e.target.value)}
                      />

                      {activeSection === "references" && (
                        <div className="rounded-lg bg-primary/5 p-4">
                          <h3 className="text-sm font-medium mb-2">Citation Formats</h3>
                          <Tabs defaultValue="apa">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="apa">APA</TabsTrigger>
                              <TabsTrigger value="mla">MLA</TabsTrigger>
                              <TabsTrigger value="chicago">Chicago</TabsTrigger>
                            </TabsList>
                            <TabsContent value="apa" className="text-xs text-muted-foreground">
                              <p className="mb-2">Format: Author, A. A. (Year). Title of work. Publisher.</p>
                              <p>Example: Smith, J. D. (2020). Quantum computing applications. Science Press.</p>
                            </TabsContent>
                            <TabsContent value="mla" className="text-xs text-muted-foreground">
                              <p className="mb-2">Format: Author. "Title." Publisher, Year.</p>
                              <p>Example: Smith, John D. "Quantum Computing Applications." Science Press, 2020.</p>
                            </TabsContent>
                            <TabsContent value="chicago" className="text-xs text-muted-foreground">
                              <p className="mb-2">Format: Author, Title (Publisher, Year).</p>
                              <p>
                                Example: Smith, John D. Quantum Computing Applications (New York: Science Press, 2020).
                              </p>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-indigo-600/5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI {aiMode === "assistant" ? "Assistant" : "Editor"}
                  </CardTitle>
                  <CardDescription>
                    {aiMode === "assistant"
                      ? "Get help with your research paper"
                      : "Let AI edit and improve your writing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {aiResponse && (
                    <div className="mb-4">
                      <div className="rounded-lg bg-primary/5 p-4 mb-2">
                        <div className="text-sm whitespace-pre-line">{aiResponse}</div>
                      </div>

                      {isPlagiarismChecking ? (
                        <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Checking for plagiarism...
                        </div>
                      ) : (
                        plagiarismResults && (
                          <div className="mb-3">
                            <Alert variant={plagiarismResults.score > 30 ? "destructive" : "default"} className="mb-2">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              <AlertTitle>Plagiarism Check Results</AlertTitle>
                              <AlertDescription>
                                <div className="flex items-center justify-between">
                                  <span>Similarity score: {plagiarismResults.score}%</span>
                                  <Badge variant={plagiarismResults.score > 30 ? "destructive" : "outline"}>
                                    {plagiarismResults.score < 10
                                      ? "Very Low"
                                      : plagiarismResults.score < 20
                                        ? "Low"
                                        : plagiarismResults.score < 40
                                          ? "Moderate"
                                          : plagiarismResults.score < 60
                                            ? "High"
                                            : "Very High"}
                                  </Badge>
                                </div>
                              </AlertDescription>
                            </Alert>

                            {plagiarismResults.matches.length > 0 ? (
                              <div className="text-sm border rounded-md divide-y">
                                <div className="px-3 py-2 font-medium bg-muted/50">
                                  Potential matches ({plagiarismResults.matches.length})
                                </div>
                                {plagiarismResults.matches.map((match, i) => (
                                  <div key={i} className="px-3 py-2">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-xs text-muted-foreground">Source: {match.source}</span>
                                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                        {match.similarity}% similar
                                      </span>
                                    </div>
                                    <p className="text-sm italic bg-amber-50 dark:bg-amber-950/30 p-2 rounded border-l-2 border-amber-500">
                                      "{match.text}"
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 p-2">
                                <CheckCircle2 className="h-4 w-4" />
                                No significant matches found
                              </div>
                            )}
                          </div>
                        )
                      )}

                      <div className="flex justify-end">
                        <Button
                          onClick={applyAiSuggestion}
                          size="sm"
                          className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
                        >
                          <Wand2 className="h-3.5 w-3.5" />
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={
                        aiMode === "assistant"
                          ? "Ask for help with your paper..."
                          : "Ask to edit or improve your writing..."
                      }
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && userPrompt.trim()) {
                          e.preventDefault()
                          generateWithAI(userPrompt)
                          setUserPrompt("")
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        generateWithAI(userPrompt)
                        setUserPrompt("")
                      }}
                      disabled={isGenerating || !userPrompt.trim()}
                      className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateWithAI(
                          `Review my ${activeSection} section and suggest improvements. Here's the current content: "${paperContent[activeSection]}"`,
                        )
                      }
                      disabled={isGenerating}
                      className="justify-start text-xs h-auto py-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-medium">Improve this section</div>
                        <div className="text-xs opacity-80">Get suggestions for enhancement</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateWithAI(
                          `Check the grammar, clarity, and academic tone of my ${activeSection} section. Here's the content: "${paperContent[activeSection]}"`,
                        )
                      }
                      disabled={isGenerating}
                      className="justify-start text-xs h-auto py-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-medium">Check grammar</div>
                        <div className="text-xs opacity-80">Review writing quality</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateWithAI(
                          `Suggest 5 relevant academic citations for my research on "${paperContent.title || "my research topic"}" that would strengthen my ${activeSection} section.`,
                        )
                      }
                      disabled={isGenerating}
                      className="justify-start text-xs h-auto py-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-medium">Find citations</div>
                        <div className="text-xs opacity-80">Get relevant references</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateWithAI(
                          `Simplify and clarify the following academic text while maintaining its scholarly tone. Make it more accessible without losing the academic rigor: "${paperContent[activeSection]}"`,
                        )
                      }
                      disabled={isGenerating}
                      className="justify-start text-xs h-auto py-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-medium">Simplify language</div>
                        <div className="text-xs opacity-80">Make content more accessible</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 bg-gradient-to-b from-background to-blue-50/20 dark:to-blue-950/10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Academic Hub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, BookOpen, Download, FileText, MessageCircle, Search, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [papers, setPapers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPapers() {
      try {
        const response = await fetch("http://localhost:3000/api/papers")
        if (!response.ok) {
          throw new Error("Failed to fetch papers")
        }
        const data = await response.json()
        setPapers(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching papers:", error)
        setIsLoading(false)
      }
    }
    fetchPapers()
  }, [])

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
            <Link href="/dashboard" className="text-sm font-medium text-primary">
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
        <div className="container grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">Welcome back, Dr. Smith</p>
              </div>
              <div className="flex gap-2">
                <Link href="/build-paper">
                  <Button
                    variant="outline"
                    className="gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <FileText className="h-4 w-4" />
                    Build Paper
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                    <Upload className="h-4 w-4" />
                    Upload Paper
                  </Button>
                </Link>
              </div>
            </div>
            <Tabs
              defaultValue="papers"
              className="bg-white/80 dark:bg-gray-950/80 backdrop-blur rounded-lg border shadow-sm"
            >
              <TabsList className="grid w-full grid-cols-3 p-1">
                <TabsTrigger
                  value="papers"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  My Papers
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Saved
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Activity
                </TabsTrigger>
              </TabsList>
              <TabsContent value="papers" className="space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search your papers..."
                      className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    Filter
                  </Button>
                </div>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  papers.map((paper) => (
                    <Card
                      key={paper.id}
                      className="group overflow-hidden border-primary/20 hover:shadow-md transition-all duration-200"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {paper.title}
                          </CardTitle>
                          <Badge className="bg-primary/10 text-primary border-primary/20">Published</Badge>
                        </div>
                        <CardDescription>
                          Published on {new Date(paper.publishedDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{paper.abstract}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Views: {paper.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Downloads: {paper.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium text-primary">Coins earned: {paper.coins}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between bg-muted/30">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          View Stats
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
              <TabsContent value="saved" className="space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search saved papers..."
                      className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    Filter
                  </Button>
                </div>
                {[1, 2].map((i) => (
                  <Card
                    key={i}
                    className="group overflow-hidden border-primary/20 hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          Machine Learning in Healthcare
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          Saved 2 days ago
                        </Badge>
                      </div>
                      <CardDescription>By Dr. Sarah Johnson • Stanford University</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        An exploration of how machine learning algorithms can improve diagnostic accuracy in medical
                        imaging, with a focus on early cancer detection.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-muted/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        Read
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="activity" className="space-y-4 p-4">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions on the platform</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {[
                      {
                        action: "Your paper was viewed",
                        paper: "Quantum Computing: A New Paradigm",
                        time: "2 hours ago",
                        coins: "+5",
                      },
                      {
                        action: "Your paper was downloaded",
                        paper: "Quantum Computing: A New Paradigm",
                        time: "5 hours ago",
                        coins: "+20",
                      },
                      {
                        action: "You commented on",
                        paper: "Machine Learning in Healthcare",
                        time: "Yesterday",
                        coins: "+2",
                      },
                      {
                        action: "You saved",
                        paper: "Advances in Neural Networks",
                        time: "2 days ago",
                        coins: "",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-lg border border-primary/10 p-3 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.paper}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                        {item.coins && (
                          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <Award className="h-3 w-3" />
                            <span>{item.coins}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Your Stats
                </CardTitle>
                <CardDescription>Your performance on the platform</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Coins</div>
                    <div className="flex items-center gap-1 font-medium">
                      <Award className="h-4 w-4 text-primary" />
                      1,245
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Papers Published</div>
                    <div className="font-medium">3</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Views</div>
                    <div className="font-medium">3,421</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Downloads</div>
                    <div className="font-medium">842</div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-medium">Ranking Progress</div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={65}
                      className="h-2 bg-primary/20"
                      indicatorClassName="bg-gradient-to-r from-primary to-indigo-600"
                    />
                    <div className="text-xs text-muted-foreground">65%</div>
                  </div>
                  <div className="text-xs text-muted-foreground">435 more coins to reach Associate Professor rank</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  View Detailed Stats
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Paper Builder
                </CardTitle>
                <CardDescription>Create research papers with AI assistance</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-lg bg-gradient-to-br from-primary/10 to-indigo-600/10 p-4">
                  <p className="text-sm">
                    Our AI-powered paper builder helps you structure your research, format citations, and generate
                    visualizations.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Recent Drafts</div>
                    <div className="font-medium">3</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last edited: Quantum Computing Analysis (2 hours ago)
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/build-paper" className="w-full">
                  <Button className="w-full gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                    <FileText className="h-4 w-4" />
                    Build New Paper
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Connect
                </CardTitle>
                <CardDescription>People you might want to connect with</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-indigo-600/80 text-white">
                        AJ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Dr. Alex Johnson</div>
                      <div className="text-xs text-muted-foreground">Quantum Physics • MIT</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full hover:bg-primary/10 hover:text-primary transition-colors">
                  View All
                </Button>
              </CardFooter>
            </Card>
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

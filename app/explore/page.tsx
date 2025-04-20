"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Search, ChevronDown, MessageCircle, SortAsc, SortDesc, BookmarkPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const papers = [
  {
    id: 1,
    title: "Quantum Computing: A New Paradigm",
    author: "Dr. Jane Smith",
    institution: "Stanford University",
    field: "Computer Science",
    abstract:
      "This paper explores the latest advancements in quantum computing, focusing on recent breakthroughs in qubit stability and error correction. We present a novel approach to quantum gate operations that significantly reduces decoherence, potentially paving the way for more practical quantum computers.",
    views: 1245,
    downloads: 342,
    citations: 28,
    publishedDate: "2023-05-15",
  },
  {
    id: 2,
    title: "Advancements in Machine Learning for Healthcare",
    author: "Dr. John Doe",
    institution: "MIT",
    field: "Artificial Intelligence",
    abstract:
      "We present novel machine learning techniques for improving diagnostic accuracy in medical imaging. Our approach combines deep learning models with expert knowledge, resulting in a hybrid system that outperforms both traditional machine learning methods and human experts in detecting early-stage cancers.",
    views: 987,
    downloads: 276,
    citations: 15,
    publishedDate: "2023-06-01",
  },
  {
    id: 3,
    title: "Climate Change: Global Impact and Mitigation Strategies",
    author: "Dr. Emily Brown",
    institution: "Oxford University",
    field: "Environmental Science",
    abstract:
      "This comprehensive study analyzes the global impact of climate change across various ecosystems and human societies. We propose a set of mitigation strategies that balance economic considerations with environmental preservation, offering a roadmap for policymakers and industry leaders.",
    views: 1532,
    downloads: 421,
    citations: 37,
    publishedDate: "2023-04-22",
  },
  {
    id: 4,
    title: "Neuroscience of Consciousness: New Insights",
    author: "Dr. Michael Chen",
    institution: "Harvard University",
    field: "Neuroscience",
    abstract:
      "Our research delves into the neural correlates of consciousness, utilizing advanced brain imaging techniques and computational models. We present evidence for a new theory of consciousness that reconciles several competing models in the field.",
    views: 876,
    downloads: 198,
    citations: 12,
    publishedDate: "2023-05-30",
  },
  {
    id: 5,
    title: "Sustainable Energy: Breakthroughs in Solar Cell Efficiency",
    author: "Dr. Sarah Johnson",
    institution: "California Institute of Technology",
    field: "Renewable Energy",
    abstract:
      "We report on a significant improvement in solar cell efficiency using a novel material composition. Our findings demonstrate a 30% increase in energy conversion efficiency compared to current commercial solar cells, potentially revolutionizing the solar energy industry.",
    views: 2103,
    downloads: 567,
    citations: 45,
    publishedDate: "2023-03-15",
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("All Fields")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("publishedDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [savedPapers, setSavedPapers] = useState<number[]>([])
  const itemsPerPage = 5

  const filteredPapers = papers
    .filter(
      (paper) =>
        (paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.institution.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedField === "All Fields" || paper.field === selectedField),
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const pageCount = Math.ceil(filteredPapers.length / itemsPerPage)
  const currentPapers = filteredPapers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const toggleSavedPaper = (paperId: number) => {
    setSavedPapers((prev) => (prev.includes(paperId) ? prev.filter((id) => id !== paperId) : [...prev, paperId]))
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
            <Link href="/explore" className="text-sm font-medium text-primary">
              Explore
            </Link>
            <Link href="/rankings" className="text-sm font-medium transition-colors hover:text-primary">
              Rankings
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-2">
            <Button variant="outline" size="icon">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Link href="/profile">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 bg-gradient-to-b from-background via-blue-50/30 to-indigo-50/30 dark:from-background dark:via-blue-950/5 dark:to-indigo-950/5">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Explore Research Papers</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search papers..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                  {selectedField}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSelectedField("All Fields")}>All Fields</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedField("Computer Science")}>
                  Computer Science
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedField("Artificial Intelligence")}>
                  Artificial Intelligence
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedField("Environmental Science")}>
                  Environmental Science
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedField("Neuroscience")}>Neuroscience</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedField("Renewable Energy")}>
                  Renewable Energy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                  Sort by: {sortBy}
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSortBy("publishedDate")}>Published Date</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy("views")}>Views</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy("downloads")}>Downloads</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy("citations")}>Citations</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" onClick={toggleSortOrder}>
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>
          <div className="grid gap-6">
            {currentPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{paper.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{paper.author}</span>
                    <span>•</span>
                    <span>{paper.institution}</span>
                    <span>•</span>
                    <span>{new Date(paper.publishedDate).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{paper.abstract}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant="secondary">{paper.field}</Badge>
                    <span className="text-sm text-muted-foreground">Views: {paper.views}</span>
                    <span className="text-sm text-muted-foreground">Downloads: {paper.downloads}</span>
                    <span className="text-sm text-muted-foreground">Citations: {paper.citations}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{paper.title}</DialogTitle>
                        <DialogDescription>
                          By {paper.author} • {paper.institution}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <p className="text-sm text-muted-foreground">{paper.abstract}</p>
                        <div className="flex flex-wrap items-center gap-4">
                          <Badge variant="secondary">{paper.field}</Badge>
                          <span className="text-sm text-muted-foreground">Views: {paper.views}</span>
                          <span className="text-sm text-muted-foreground">Downloads: {paper.downloads}</span>
                          <span className="text-sm text-muted-foreground">Citations: {paper.citations}</span>
                        </div>
                      </div>
                      <Button className="w-full">Read Full Paper</Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto gap-2"
                    onClick={() => toggleSavedPaper(paper.id)}
                  >
                    {savedPapers.includes(paper.id) ? (
                      <>
                        <X className="h-4 w-4" />
                        Unsave
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
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

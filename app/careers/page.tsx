import Link from "next/link"
import { BookOpen, Briefcase, Building2, Clock, Globe, MapPin, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function Careers() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BookOpen className="h-6 w-6" />
            <span>Career</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/explore" className="text-sm font-medium">
              Explore
            </Link>
            <Link href="/rankings" className="text-sm font-medium">
              Rankings
            </Link>
            <Link href="/careers" className="text-sm font-medium">
              Careers
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
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Academic Careers</h1>
            <Button>Post a Position</Button>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="search" className="text-sm font-medium">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="search" type="search" placeholder="Search positions..." className="pl-8" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="position-type" className="text-sm font-medium">
                      Position Type
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="position-type">
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Positions</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="postdoc">Postdoctoral</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="field" className="text-sm font-medium">
                      Field
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="field">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="social-sciences">Social Sciences</SelectItem>
                        <SelectItem value="humanities">Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="north-america">North America</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="south-america">South America</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Saved Searches</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {[
                    {
                      name: "Quantum Computing Positions",
                      filters: "Faculty, Postdoc • USA, Europe",
                    },
                    {
                      name: "Remote Research Opportunities",
                      filters: "Research • Remote",
                    },
                    {
                      name: "PhD Positions in Physics",
                      filters: "PhD • Physics • Worldwide",
                    },
                  ].map((search, i) => (
                    <div key={i} className="grid gap-1">
                      <div className="font-medium">{search.name}</div>
                      <div className="text-xs text-muted-foreground">{search.filters}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Load
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Save Current Search
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Showing 42 positions</div>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="deadline">Application Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4">
                {[
                  {
                    title: "Assistant Professor in Quantum Computing",
                    institution: "Stanford University",
                    location: "California, USA",
                    type: "Faculty",
                    deadline: "April 15, 2023",
                    posted: "2 weeks ago",
                    description:
                      "The Department of Physics at Stanford University invites applications for a tenure-track Assistant Professor position in Quantum Computing. The successful candidate will be expected to teach courses at the graduate and undergraduate levels and to build and maintain an active, externally funded research program.",
                    tags: ["Quantum Computing", "Faculty", "Full-time"],
                  },
                  {
                    title: "Postdoctoral Researcher in Machine Learning",
                    institution: "MIT",
                    location: "Massachusetts, USA",
                    type: "Postdoctoral",
                    deadline: "May 1, 2023",
                    posted: "1 week ago",
                    description:
                      "The Computer Science and Artificial Intelligence Laboratory (CSAIL) at MIT is seeking a Postdoctoral Researcher to work on cutting-edge machine learning research. The position involves developing new algorithms for reinforcement learning and their application to robotics.",
                    tags: ["Machine Learning", "Postdoc", "AI"],
                  },
                  {
                    title: "PhD Position in Neuroscience",
                    institution: "Oxford University",
                    location: "Oxford, UK",
                    type: "PhD",
                    deadline: "June 30, 2023",
                    posted: "3 days ago",
                    description:
                      "The Department of Neuroscience at Oxford University is offering a fully funded PhD position to work on a project investigating the neural mechanisms of memory formation. The successful candidate will use a combination of electrophysiology and optogenetics to study memory circuits in the hippocampus.",
                    tags: ["Neuroscience", "PhD", "Fully Funded"],
                  },
                  {
                    title: "Research Scientist in Computational Biology",
                    institution: "Harvard University",
                    location: "Massachusetts, USA",
                    type: "Research",
                    deadline: "May 15, 2023",
                    posted: "5 days ago",
                    description:
                      "The Department of Systems Biology at Harvard Medical School is seeking a Research Scientist to join a team working on computational approaches to understanding gene regulatory networks. The position involves developing and applying machine learning methods to analyze large-scale genomic datasets.",
                    tags: ["Computational Biology", "Research", "Genomics"],
                  },
                  {
                    title: "Associate Professor in Astrophysics",
                    institution: "Cambridge University",
                    location: "Cambridge, UK",
                    type: "Faculty",
                    deadline: "July 1, 2023",
                    posted: "1 month ago",
                    description:
                      "The Institute of Astronomy at Cambridge University invites applications for a tenured Associate Professor position in Astrophysics. The successful candidate will lead a research group focused on observational or theoretical astrophysics, with a particular emphasis on exoplanets or cosmology.",
                    tags: ["Astrophysics", "Faculty", "Tenured"],
                  },
                ].map((position, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{position.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {position.institution}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Deadline: {position.deadline}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Globe className="h-3.5 w-3.5" />
                          Posted: {position.posted}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{position.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {position.tags.map((tag, j) => (
                          <Badge key={j} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Details</Button>
                      <Button>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Career. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

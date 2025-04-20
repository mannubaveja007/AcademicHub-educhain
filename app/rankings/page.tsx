import Link from "next/link"
import { Award, BookOpen, MessageCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Rankings() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BookOpen className="h-6 w-6" />
            <span>Ranking</span>
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
            <h1 className="text-3xl font-bold">Rankings</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="global">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs defaultValue="researchers" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="researchers">Researchers</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
              <TabsTrigger value="papers">Papers</TabsTrigger>
            </TabsList>
            <TabsContent value="researchers" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Researchers</CardTitle>
                  <CardDescription>Ranked by coins earned, papers published, and citations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Researcher</TableHead>
                          <TableHead>Institution</TableHead>
                          <TableHead>Field</TableHead>
                          <TableHead className="text-right">Papers</TableHead>
                          <TableHead className="text-right">Citations</TableHead>
                          <TableHead className="text-right">Coins</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            rank: 1,
                            name: "Dr. Sarah Johnson",
                            institution: "Stanford University",
                            field: "Quantum Physics",
                            papers: 42,
                            citations: 1245,
                            coins: 8765,
                          },
                          {
                            rank: 2,
                            name: "Dr. Michael Chen",
                            institution: "MIT",
                            field: "Machine Learning",
                            papers: 38,
                            citations: 1102,
                            coins: 7654,
                          },
                          {
                            rank: 3,
                            name: "Dr. Emily Rodriguez",
                            institution: "Oxford University",
                            field: "Neuroscience",
                            papers: 35,
                            citations: 987,
                            coins: 6543,
                          },
                          {
                            rank: 4,
                            name: "Dr. James Wilson",
                            institution: "Harvard University",
                            field: "Genetics",
                            papers: 31,
                            citations: 876,
                            coins: 5432,
                          },
                          {
                            rank: 5,
                            name: "Dr. Aisha Patel",
                            institution: "Cambridge University",
                            field: "Astrophysics",
                            papers: 29,
                            citations: 765,
                            coins: 4321,
                          },
                          {
                            rank: 6,
                            name: "Dr. Robert Chen",
                            institution: "MIT",
                            field: "Quantum Computing",
                            papers: 27,
                            citations: 654,
                            coins: 3210,
                          },
                          {
                            rank: 7,
                            name: "Dr. Lisa Kim",
                            institution: "Caltech",
                            field: "Materials Science",
                            papers: 25,
                            citations: 543,
                            coins: 2987,
                          },
                          {
                            rank: 8,
                            name: "Dr. David Nguyen",
                            institution: "UC Berkeley",
                            field: "Computer Science",
                            papers: 23,
                            citations: 432,
                            coins: 2876,
                          },
                          {
                            rank: 9,
                            name: "Dr. Maria Garcia",
                            institution: "ETH Zurich",
                            field: "Robotics",
                            papers: 21,
                            citations: 321,
                            coins: 2765,
                          },
                          {
                            rank: 10,
                            name: "Dr. John Smith",
                            institution: "University of Tokyo",
                            field: "Biochemistry",
                            papers: 19,
                            citations: 210,
                            coins: 2654,
                          },
                        ].map((researcher) => (
                          <TableRow key={researcher.rank}>
                            <TableCell className="font-medium">{researcher.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                                  <AvatarFallback>
                                    {researcher.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>{researcher.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{researcher.institution}</TableCell>
                            <TableCell>{researcher.field}</TableCell>
                            <TableCell className="text-right">{researcher.papers}</TableCell>
                            <TableCell className="text-right">{researcher.citations}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Award className="h-4 w-4 text-primary" />
                                {researcher.coins}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="institutions" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Institutions</CardTitle>
                  <CardDescription>Ranked by total researcher coins, papers, and citations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Institution</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead className="text-right">Researchers</TableHead>
                          <TableHead className="text-right">Papers</TableHead>
                          <TableHead className="text-right">Citations</TableHead>
                          <TableHead className="text-right">Total Coins</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            rank: 1,
                            name: "MIT",
                            country: "USA",
                            researchers: 245,
                            papers: 1245,
                            citations: 45678,
                            coins: 98765,
                          },
                          {
                            rank: 2,
                            name: "Stanford University",
                            country: "USA",
                            researchers: 231,
                            papers: 1102,
                            citations: 43210,
                            coins: 87654,
                          },
                          {
                            rank: 3,
                            name: "Oxford University",
                            country: "UK",
                            researchers: 215,
                            papers: 987,
                            citations: 38765,
                            coins: 76543,
                          },
                          {
                            rank: 4,
                            name: "Harvard University",
                            country: "USA",
                            researchers: 198,
                            papers: 876,
                            citations: 35432,
                            coins: 65432,
                          },
                          {
                            rank: 5,
                            name: "Cambridge University",
                            country: "UK",
                            researchers: 187,
                            papers: 765,
                            citations: 32109,
                            coins: 54321,
                          },
                        ].map((institution) => (
                          <TableRow key={institution.rank}>
                            <TableCell className="font-medium">{institution.rank}</TableCell>
                            <TableCell>{institution.name}</TableCell>
                            <TableCell>{institution.country}</TableCell>
                            <TableCell className="text-right">{institution.researchers}</TableCell>
                            <TableCell className="text-right">{institution.papers}</TableCell>
                            <TableCell className="text-right">{institution.citations}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Award className="h-4 w-4 text-primary" />
                                {institution.coins}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="papers" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Papers</CardTitle>
                  <CardDescription>Ranked by views, downloads, and citations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Paper</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Field</TableHead>
                          <TableHead className="text-right">Views</TableHead>
                          <TableHead className="text-right">Downloads</TableHead>
                          <TableHead className="text-right">Citations</TableHead>
                          <TableHead className="text-right">Coins</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            rank: 1,
                            title: "Quantum Computing: A New Paradigm",
                            author: "Dr. Robert Chen",
                            field: "Quantum Computing",
                            views: 12345,
                            downloads: 4321,
                            citations: 321,
                            coins: 8765,
                          },
                          {
                            rank: 2,
                            title: "Machine Learning in Healthcare",
                            author: "Dr. Sarah Johnson",
                            field: "AI in Medicine",
                            views: 10987,
                            downloads: 3876,
                            citations: 287,
                            coins: 7654,
                          },
                          {
                            rank: 3,
                            title: "Advances in Neural Networks",
                            author: "Dr. Michael Chen",
                            field: "Machine Learning",
                            views: 9876,
                            downloads: 3456,
                            citations: 254,
                            coins: 6543,
                          },
                          {
                            rank: 4,
                            title: "CRISPR Gene Editing: New Frontiers",
                            author: "Dr. James Wilson",
                            field: "Genetics",
                            views: 8765,
                            downloads: 3210,
                            citations: 231,
                            coins: 5432,
                          },
                          {
                            rank: 5,
                            title: "Black Holes and Quantum Gravity",
                            author: "Dr. Aisha Patel",
                            field: "Astrophysics",
                            views: 7654,
                            downloads: 2987,
                            citations: 198,
                            coins: 4321,
                          },
                        ].map((paper) => (
                          <TableRow key={paper.rank}>
                            <TableCell className="font-medium">{paper.rank}</TableCell>
                            <TableCell>{paper.title}</TableCell>
                            <TableCell>{paper.author}</TableCell>
                            <TableCell>{paper.field}</TableCell>
                            <TableCell className="text-right">{paper.views}</TableCell>
                            <TableCell className="text-right">{paper.downloads}</TableCell>
                            <TableCell className="text-right">{paper.citations}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Award className="h-4 w-4 text-primary" />
                                {paper.coins}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Ranking</CardTitle>
                <CardDescription>Your current position in the rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                    156
                  </div>
                  <div>
                    <div className="text-lg font-medium">Global Rank: 156</div>
                    <div className="text-sm text-muted-foreground">Top 5% of all researchers</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <span className="text-green-500">↑ 12 positions</span> in the last month
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
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
                    <div className="text-sm">Citations</div>
                    <div className="font-medium">42</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Institution</CardTitle>
                <CardDescription>Your institution's ranking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                    4
                  </div>
                  <div>
                    <div className="text-lg font-medium">Harvard University</div>
                    <div className="text-sm text-muted-foreground">Global Rank: 4</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <span className="text-green-500">↑ 1 position</span> in the last month
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Researchers</div>
                    <div className="font-medium">198</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Papers</div>
                    <div className="font-medium">876</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Total Coins</div>
                    <div className="flex items-center gap-1 font-medium">
                      <Award className="h-4 w-4 text-primary" />
                      65,432
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Top Paper</CardTitle>
                <CardDescription>Your highest ranked paper</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                    23
                  </div>
                  <div>
                    <div className="text-lg font-medium">Quantum Computing: A New Paradigm</div>
                    <div className="text-sm text-muted-foreground">Global Rank: 23</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <span className="text-green-500">↑ 5 positions</span> in the last month
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Views</div>
                    <div className="font-medium">1,245</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Downloads</div>
                    <div className="font-medium">342</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Citations</div>
                    <div className="font-medium">12</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Coins Earned</div>
                    <div className="flex items-center gap-1 font-medium">
                      <Award className="h-4 w-4 text-primary" />
                      567
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 AcademicHub. All rights reserved.
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

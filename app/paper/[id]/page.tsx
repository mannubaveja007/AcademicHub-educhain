import Link from "next/link"
import { Award, BookOpen, Download, Heart, MessageCircle, Share2, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function PaperPage() {
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
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Quantum Computing: A New Paradigm</h1>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Dr. Robert Chen</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Published on May 15, 2023</div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h2>Abstract</h2>
                  <p>
                    This paper explores the latest advancements in quantum computing and proposes a new approach to
                    qubit stabilization that could significantly reduce decoherence time. We present experimental
                    results from our lab that demonstrate a 30% improvement in qubit stability using our novel
                    technique.
                  </p>
                  <h2>Introduction</h2>
                  <p>
                    Quantum computing has seen remarkable progress in the past decade, with significant advancements in
                    both hardware and algorithms. However, one of the persistent challenges in the field has been the
                    issue of quantum decoherence, which limits the practical utility of quantum computers for complex
                    computations.
                  </p>
                  <p>
                    In this paper, we introduce a new approach to qubit stabilization that addresses the decoherence
                    problem through a combination of material science innovations and control theory. Our method builds
                    upon previous work by Johnson et al. (2021) and Zhang et al. (2022), but introduces several key
                    modifications that result in significantly improved performance.
                  </p>
                  <h2>Methodology</h2>
                  <p>
                    Our experimental setup consists of a superconducting quantum processor with 20 transmon qubits
                    arranged in a lattice configuration. We implemented our novel stabilization technique using a
                    combination of:
                  </p>
                  <ul>
                    <li>Advanced error correction codes specifically designed for our qubit architecture</li>
                    <li>A new material substrate that reduces environmental noise</li>
                    <li>Adaptive control algorithms that dynamically adjust to changing conditions</li>
                  </ul>
                  <p>
                    The experiments were conducted over a six-month period, with multiple iterations and refinements to
                    our approach based on the observed results.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Button className="gap-1.5">
                    <Download className="h-4 w-4" />
                    Download Full Paper
                  </Button>
                  <Button variant="outline" className="gap-1.5">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="comments">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="citations">Citations</TabsTrigger>
                </TabsList>
                <TabsContent value="comments" className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Dr. Yuki Okazaki</div>
                        <div className="text-xs text-muted-foreground">2 days ago</div>
                      </div>
                      <p className="text-sm">
                        This is a fascinating approach! Have you considered how this might scale to larger qubit arrays?
                        I'm particularly interested in how the error correction codes would perform with 50+ qubits.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Heart className="h-4 w-4" />
                          <span>12</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Dr. James Smith</div>
                        <div className="text-xs text-muted-foreground">3 days ago</div>
                      </div>
                      <p className="text-sm">
                        I'm impressed by the 30% improvement in stability. This could be a game-changer for practical
                        quantum algorithms. Have you tested this with Shor's algorithm or other quantum algorithms that
                        require longer coherence times?
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Heart className="h-4 w-4" />
                          <span>8</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Load More Comments
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="citations" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Citations</CardTitle>
                      <CardDescription>This paper has been cited 12 times</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="grid gap-1">
                          <div className="font-medium">
                            Advancements in Error Correction for Quantum Computing Systems
                          </div>
                          <div className="text-sm text-muted-foreground">
                            By Dr. Maria Rodriguez et al. • Published in Quantum Computing Journal
                          </div>
                          <div className="text-sm text-muted-foreground">June 2023</div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Citations
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paper Stats</CardTitle>
                  <CardDescription>Performance metrics for this paper</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
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
                  <Separator />
                  <div className="text-sm font-medium">Engagement by Institution</div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">MIT</div>
                      <div className="text-sm">23%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Stanford</div>
                      <div className="text-sm">18%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Oxford</div>
                      <div className="text-sm">15%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>About the Author</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Dr. Robert Chen</div>
                      <div className="text-sm text-muted-foreground">Professor of Quantum Physics</div>
                      <div className="text-sm text-muted-foreground">MIT</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    Dr. Chen is a leading researcher in quantum computing with over 50 published papers. His work
                    focuses on quantum error correction and qubit stability.
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full gap-1.5">
                      <Users className="h-4 w-4" />
                      Connect
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Related Papers</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="grid gap-1">
                      <Link href="#" className="font-medium hover:underline">
                        Quantum Error Correction: A Comprehensive Review
                      </Link>
                      <div className="text-sm text-muted-foreground">By Dr. Sarah Johnson • Stanford University</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span>1,245 coins</span>
                        </div>
                        <div>•</div>
                        <div>3,421 views</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    View More
                  </Button>
                </CardFooter>
              </Card>
            </div>
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

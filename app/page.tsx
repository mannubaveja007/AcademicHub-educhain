'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowRight, Award, BookOpen, MessageSquare, Search, Share2, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginButton from '@/components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import './globals.css';

export default function Home() {
  const { authState, ocAuth } = useOCAuth();
  const router = useRouter();

  // Handle error query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'login_failed') {
      alert('OCID login failed. Please try again.');
      router.replace('/'); // Clear query params
    }
  }, [router]);

  // Render loading state if authState is undefined or loading
  if (!authState || authState.isLoading) {
    return <div className="container py-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Academic Hub
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/rankings" className="text-sm font-medium transition-colors hover:text-primary">
              Rankings
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                  About
                </Link>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About Academic Hub</DialogTitle>
                  <DialogDescription>
                    Academic Hub is a revolutionary platform connecting researchers worldwide. Share your work, earn
                    recognition, and collaborate with brilliant minds across the globe.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p>
                    Our mission is to accelerate scientific progress through open collaboration and fair recognition.
                  </p>
                  <p>Join thousands of researchers who are already part of this exciting journey!</p>
                </div>
              </DialogContent>
            </Dialog>
            {authState.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">
                  Welcome, {authState.OCId?.slice(0, 8)}...
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Placeholder for logout; implement based on SDK
                    alert('Logout not implemented in this example.');
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <LoginButton />
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Display authentication state */}
        {authState.error && (
          <div className="container py-4 text-red-500">Error: {authState.error.message}</div>
        )}
        {authState.isAuthenticated && (
          <div className="container py-4">
            <p>OCID: {authState.OCId}</p>
            <p>Wallet Address: {authState.ethAddress}</p>
          </div>
        )}
        {/* Rest of your existing page content */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-blue-50/50 to-indigo-50/50 dark:from-background dark:via-blue-950/10 dark:to-indigo-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Academic Knowledge Sharing
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                    Share Research, Earn Rewards
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join the academic community where sharing knowledge is rewarded. Publish your research papers and
                    earn coins when others benefit from your work.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      Explore Papers
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800"
                      ></div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Join <span className="font-medium text-foreground">10,000+</span> researchers worldwide
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border bg-background p-2 shadow-xl transition-all duration-200 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"></div>
                  <div className="relative z-10 h-full w-full rounded-xl bg-white dark:bg-gray-950 p-4 shadow-lg">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-indigo-600"></div>
                        <div>
                          <div className="text-sm font-medium">Dr. Jane Smith</div>
                          <div className="text-xs text-muted-foreground">Stanford University</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        <Award className="h-3 w-3" />
                        <span>1,245 coins</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-lg font-semibold">Advances in Quantum Computing: A New Approach</div>
                      <div className="mt-1 text-xs text-muted-foreground">Published on May 15, 2023</div>
                      <div className="mt-3 text-sm">
                        This paper presents a novel approach to quantum computing that significantly reduces decoherence
                        time, allowing for more stable qubit operations...
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Discuss</span>
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">Views: 3,421</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  Platform Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform rewards knowledge sharing and collaboration in the academic community
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-blue-950/10 shadow-md hover:shadow-xl transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Share Research</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">
                    Upload your research papers, academic articles, or scholarly work to the platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-blue-950/10 shadow-md hover:shadow-xl transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Earn Coins</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">
                    Receive coins when others view, download, or cite your work. Original authors earn royalty coins.
                  </p>
                </CardContent>
              </Card>
              <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-blue-950/10 shadow-md hover:shadow-xl transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Build Reputation</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">
                    Climb the rankings based on coins earned, papers published, and community engagement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="inline-flex w-fit mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  Networking
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                    Connect with Brilliant Minds
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform connects you with leading researchers and academics in your field. Chat, collaborate,
                    and innovate together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/connect">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Connect Now
                      <Users className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-1.5 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      Explore Papers
                      <Search className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center lg:justify-end">
                <Card className="w-full max-w-[500px] border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-200 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Top Researchers
                    </CardTitle>
                    <CardDescription>Connect with leading minds in your field</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                      >
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-indigo-600/80"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Dr. Alex Johnson</div>
                          <div className="text-xs text-muted-foreground">Quantum Physics • MIT</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                          Connect
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                      View All Researchers
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                Career Opportunities
              </Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                  Discover Academic Opportunities
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find research positions, academic jobs, and collaboration opportunities
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search opportunities..."
                    className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="group overflow-hidden border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="mb-2 bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30">
                        {i % 3 === 0 ? 'Faculty' : i % 3 === 1 ? 'Research' : 'PhD'}
                      </Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        New
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                      Research Assistant
                    </CardTitle>
                    <CardDescription>Stanford University • California</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Join our team researching advanced machine learning techniques for medical imaging analysis.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/careers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  View All Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
                  What Researchers Say
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Hear from academics who have transformed their research impact through our platform
                </p>
                <div className="grid gap-4">
                  <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur border-primary/20 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-indigo-600/80"></div>
                        <div>
                          <div className="font-medium">Dr. Sarah Johnson</div>
                          <div className="text-sm text-muted-foreground">Stanford University</div>
                          <p className="mt-2 text-sm">
                            "Academic Hub has revolutionized how I share my research. The coin system provides tangible
                            rewards for my work, and I've connected with collaborators I would never have met otherwise."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur border-primary/20 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-indigo-600/80"></div>
                        <div>
                          <div className="font-medium">Dr. Michael Chen</div>
                          <div className="text-sm text-muted-foreground">MIT</div>
                          <p className="mt-2 text-sm">
                            "The visibility my papers have received through Academic Hub is incredible. My citation count
                            has increased by 40% since joining, and the career opportunities have been life-changing."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-indigo-600/20 rounded-2xl blur-3xl opacity-30"></div>
                <Card className="relative border-primary/20 shadow-xl bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Join Academic Hub Today</CardTitle>
                    <CardDescription>Create your account and start sharing your research</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Dr. Jane Smith"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="jane.smith@university.edu"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="institution" className="text-sm font-medium">
                        Institution
                      </label>
                      <input
                        id="institution"
                        type="text"
                        placeholder="Stanford University"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <LoginButton />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 bg-gradient-to-b from-background to-blue-50/20 dark:to-blue-950/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  Academic Hub
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The academic platform that rewards knowledge sharing and collaboration.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Explore Papers
                  </Link>
                </li>
                <li>
                  <Link href="/rankings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Rankings
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/download" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Download App
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
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
        </div>
      </footer>
    </div>
  );
}
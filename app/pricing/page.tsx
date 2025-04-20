import Link from "next/link"
import { BookOpen, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
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
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/rankings" className="text-sm font-medium transition-colors hover:text-primary">
              Rankings
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-blue-50/30 to-indigo-50/30 dark:from-background dark:via-blue-950/5 dark:to-indigo-950/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-400">
              Choose Your Plan
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Select the plan that best fits your academic journey. Unlock premium features and enhance your research
              experience.
            </p>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-2 lg:gap-12 items-start">
            <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Student</CardTitle>
                <CardDescription>Perfect for students and early-career researchers</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  $4.99<span className="text-sm font-normal">/mo</span>
                </div>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Access to all research papers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Basic analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Collaboration tools
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-primary/20 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Researcher</CardTitle>
                <CardDescription>For professional researchers and institutions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  $19.99<span className="text-sm font-normal">/mo</span>
                </div>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Everything in Student plan
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Advanced analytics and metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> API access
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                  Get Started
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
        </div>
      </footer>
    </div>
  )
}

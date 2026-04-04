"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Leaf, 
  ShoppingCart, 
  Building2, 
  ArrowRight, 
  Menu, 
  X,
  TrendingUp,
  Users,
  MapPin,
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  Sun,
  Moon,
  Phone,
  Mail,
  Globe,
  Star,
  CheckCircle2,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Market Prices",
    description: "Get instant access to current crop prices and market trends across all regions"
  },
  {
    icon: Users,
    title: "Direct Farmer Connection",
    description: "Connect directly with verified farmers for fresh produce at competitive rates"
  },
  {
    icon: MapPin,
    title: "Location-based Discovery",
    description: "Find farmers and sellers near you with our interactive map feature"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track sales, procurement, and agricultural data with powerful dashboards"
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "All transactions are protected with enterprise-grade security"
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Stay updated with real-time alerts on orders, prices, and policies"
  }
]

const stats = [
  { value: "50K+", label: "Registered Farmers", icon: Users },
  { value: "10K+", label: "Active Sellers", icon: ShoppingCart },
  { value: "28", label: "States Covered", icon: MapPin },
  { value: "5M+", label: "Tonnes Traded", icon: TrendingUp }
]

const roles = [
  {
    id: "farmer",
    icon: Leaf,
    title: "Farmer",
    description: "List crops, manage orders, and connect with buyers directly",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "hover:border-green-500/50",
    href: "/login?role=farmer",
    features: ["List unlimited crops", "Track real-time prices", "Direct payments"]
  },
  {
    id: "seller",
    icon: ShoppingCart,
    title: "Seller / Buyer",
    description: "Browse crops, place orders, and manage your procurement",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "hover:border-blue-500/50",
    href: "/login?role=seller",
    features: ["Browse 50K+ farmers", "Bulk order support", "Quality assurance"]
  },
  {
    id: "government",
    icon: Building2,
    title: "Government",
    description: "Monitor agriculture data, set MSP, and manage policies",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "hover:border-amber-500/50",
    href: "/login?role=government",
    features: ["Real-time analytics", "MSP management", "Policy tools"]
  }
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Farmer, Punjab",
    content: "Smart Agri Connect helped me get 20% better prices for my wheat crop by connecting directly with buyers.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Procurement Manager",
    content: "Managing our agricultural supply chain has never been easier. The platform saves us hours every day.",
    rating: 5
  },
  {
    name: "Dr. Anil Verma",
    role: "Agriculture Officer",
    content: "The real-time data and analytics help us make better policy decisions for farmer welfare.",
    rating: 5
  }
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                <Leaf className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Smart Agri Connect</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 md:flex">
              <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Features
              </Link>
              <Link href="#roles" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                For You
              </Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Testimonials
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </Link>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="#roles" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                For You
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                Testimonials
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

  {/* Hero Section */}
<section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">

  {/* 🌌 Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
  </div>

  <div className="container mx-auto px-4">
    <div className="mx-auto max-w-5xl text-center">

      {/* 🔥 Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-5 py-2 text-sm text-primary shadow-lg animate-in fade-in zoom-in duration-500">
        <Zap className="size-4 animate-pulse" />
        <span>Revolutionizing Indian Agriculture</span>
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium animate-bounce">
          New
        </span>
      </div>

      {/* 🚀 Heading */}
      <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">

        Connect. Trade.{" "}

        <span className="bg-gradient-to-r from-primary via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] animate-pulse">
          Grow Together.
        </span>

      </h1>

      {/* 💬 Subtitle */}
      <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        The unified platform connecting farmers, buyers, and government agencies 
        for transparent, efficient, and profitable agricultural trade across India.
      </p>

      {/* 🎯 CTA Buttons */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">

        <Button
          size="lg"
          asChild
          className="h-14 rounded-full px-10 text-base font-semibold 
          bg-gradient-to-r from-primary via-green-500 to-emerald-600
          shadow-[0_10px_40px_rgba(34,197,94,0.4)]
          hover:scale-105 hover:shadow-[0_20px_60px_rgba(34,197,94,0.6)]
          transition-all duration-300"
        >
          <Link href="/register">
            Start Free Today
            <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition" />
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          asChild
          className="h-14 rounded-full px-8 text-base border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300"
        >
          <Link href="#roles" className="flex items-center">
            <Play className="mr-2 size-5 animate-pulse" />
            Watch Demo
          </Link>
        </Button>

      </div>

      {/* ✅ Trust Badges */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-in fade-in duration-700 delay-300">

        {[
          "Free to start",
          "No credit card required",
          "24/7 Support"
        ].map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition"
          >
            <CheckCircle2 className="size-5 text-primary animate-pulse" />
            <span>{text}</span>
          </div>
        ))}

      </div>

    </div>
  </div>
</section>

 {/* Stats Section */}
<section id="stats" className="py-16">

  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        Platform Impact 🚀
      </h2>
      <p className="text-muted-foreground mt-2">
        Growing rapidly across India
      </p>
    </div>

    {/* Main Box */}
    <div className="relative rounded-3xl border border-border bg-background/60 backdrop-blur-xl  overflow-hidden">

      {/* Gradient Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-500/10 pointer-events-none" />

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center justify-center p-6 md:p-8 text-center transition-all duration-300 hover:bg-muted/50"
          >

            {/* Icon */}
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl 
            bg-primary/10 group-hover:bg-primary/20 transition">

              <stat.icon className="size-6 text-primary group-hover:scale-110 transition" />
            </div>

            {/* Value */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {stat.value}
            </div>

            {/* Label */}
            <div className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </div>

          </div>
        ))}

      </div>
    </div>

  </div>
</section>

      {/* Role Selection Section */}
      <section id="roles" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>For Everyone</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Choose Your Role
            </h2>
            <p className="text-lg text-muted-foreground">
              Access powerful tools designed specifically for your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role, index) => (
              <Link
                key={role.id}
                href={role.href}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
                  role.borderColor
                )}>
                  <div className={cn(
                    "mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
                    role.color
                  )}>
                    <role.icon className="size-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">
                    {role.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {role.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Get Started</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="size-4" />
              <span>Features</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed in modern agricultural commerce
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/50 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="size-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Star className="size-4" />
              <span>Testimonials</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Loved by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users have to say about Smart Agri Connect
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border/50 bg-card p-6 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 text-foreground">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* CTA Section */}
<section className="py-20 md:py-28 relative overflow-hidden">

  {/* 🌌 Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10" />
    <div className="absolute left-10 top-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full" />
    <div className="absolute right-10 bottom-10 w-96 h-96 bg-emerald-500/20 blur-[140px] rounded-full" />
  </div>

  <div className="container mx-auto px-4">

    <div className="relative overflow-hidden rounded-3xl border border-border bg-background/60 backdrop-blur-2xl p-8 md:p-16 ">

      {/* ✨ Gradient Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-emerald-500/20 opacity-30" />

      {/* 🌟 Content */}
      <div className="relative mx-auto max-w-3xl text-center">

        {/* 🧠 Heading */}
        <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
          Ready to{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            Transform Agriculture?
          </span>
        </h2>

        {/* 💬 Subtitle */}
        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          Join thousands of farmers, sellers, and government agencies already 
          using Smart Agri Connect to grow faster, smarter, and better.
        </p>

        {/* 🎯 CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary CTA */}
          <Button
            size="lg"
            asChild
            className="h-14 rounded-full px-10 text-base font-semibold text-white
            bg-gradient-to-r from-primary via-green-500 to-emerald-600
            shadow-[0_10px_40px_rgba(34,197,94,0.4)]
            hover:scale-105 hover:shadow-[0_20px_60px_rgba(34,197,94,0.6)]
            transition-all duration-300"
          >
            <Link href="/register">
              🚀 Get Started Free
              <ArrowRight className="ml-2 size-5 transition group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Secondary CTA */}
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-14 rounded-full px-8 text-base 
            border-border bg-background/60 backdrop-blur-xl 
            text-foreground hover:bg-muted transition-all duration-300"
          >
            <Link href="/login">
              Sign In
              <ChevronRight className="ml-2 size-5" />
            </Link>
          </Button>

        </div>

        {/* 💎 Trust Line */}
        <div className="mt-8 text-sm text-muted-foreground">
          ✅ No credit card required • ⚡ Instant access • 🔒 Secure platform
        </div>

      </div>

    </div>

  </div>
</section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border/50 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <Leaf className="size-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Smart Agri Connect</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Connecting India&apos;s agricultural ecosystem for a sustainable and prosperous future.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <span>+91 1800-XXX-XXXX (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <span>support@smartagriconnect.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="size-4" />
                  <span>www.smartagriconnect.in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/login?role=farmer" className="hover:text-foreground transition-colors">For Farmers</Link></li>
                <li><Link href="/login?role=seller" className="hover:text-foreground transition-colors">For Sellers</Link></li>
                <li><Link href="/login?role=government" className="hover:text-foreground transition-colors">For Government</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Smart Agri Connect. All rights reserved.</p>
            <p>Made with love for Indian farmers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

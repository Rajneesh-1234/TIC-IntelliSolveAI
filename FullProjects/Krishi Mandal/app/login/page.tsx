"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Leaf, 
  ShoppingCart, 
  Building2, 
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Shield,
  Zap,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore, type UserRole } from "@/lib/store"
import { cn } from "@/lib/utils"

const roles = [
  {
    id: "farmer" as UserRole,
    icon: Leaf,
    title: "Farmer",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/50",
    textColor: "text-green-600 dark:text-green-400",
    headline: "Grow Your Business",
    description: "List your crops, connect with buyers, and grow your agricultural business with our powerful platform."
  },
  {
    id: "seller" as UserRole,
    icon: ShoppingCart,
    title: "Seller",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-600 dark:text-blue-400",
    headline: "Source Fresh Produce",
    description: "Browse thousands of verified farmers, place orders, and manage your procurement efficiently."
  },
  {
    id: "government" as UserRole,
    icon: Building2,
    title: "Government",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-600 dark:text-amber-400",
    headline: "Monitor & Support",
    description: "Access real-time agricultural data, set policies, and support farmers across the nation."
  }
]

const benefits = [
  { icon: Shield, text: "Secure & Encrypted" },
  { icon: Zap, text: "Instant Access" },
  { icon: Users, text: "50K+ Users" }
]

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setRole, setIsAuthenticated } = useAppStore()
  
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole
    if (roleParam && ["farmer", "seller", "government"].includes(roleParam)) {
      setSelectedRole(roleParam)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email && password) {
      setRole(selectedRole)
      setIsAuthenticated(true)
      router.push(`/${selectedRole}`)
    } else {
      setError("Please enter valid credentials")
      setIsLoading(false)
    }
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)!

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-500", selectedRoleData.color)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Leaf className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold">Smart Agri Connect</span>
          </Link>
          
          <div className="space-y-6">
            <div key={selectedRole} className="animate-in fade-in slide-in-from-left-4 duration-300">
              <h1 className="text-4xl font-bold mb-4">
                {selectedRoleData.headline}
              </h1>
              <p className="text-white/80 text-lg max-w-md">
                {selectedRoleData.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <benefit.icon className="size-4" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-10 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm" />
              ))}
            </div>
            <p className="text-sm text-white/80">
              Join 50,000+ users already on the platform
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br", selectedRoleData.color)}>
              <Leaf className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Smart Agri Connect</span>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Select your role</Label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                    selectedRole === role.id
                      ? `${role.bgColor} ${role.borderColor} scale-[1.02]`
                      : "border-border hover:border-border/80 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "flex size-12 items-center justify-center rounded-xl transition-all",
                    selectedRole === role.id
                      ? `bg-gradient-to-br ${role.color} shadow-lg`
                      : "bg-muted"
                  )}>
                    <role.icon className={cn(
                      "size-6",
                      selectedRole === role.id ? "text-white" : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    selectedRole === role.id ? role.textColor : "text-muted-foreground"
                  )}>
                    {role.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
                <span className="size-2 rounded-full bg-destructive" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-12 rounded-xl bg-gradient-to-r shadow-lg transition-all",
                selectedRoleData.color,
                "hover:opacity-90 hover:shadow-xl"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 size-5" />
                  Sign in
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="mr-2 size-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="mr-2 size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href={`/register?role=${selectedRole}`} className="text-primary font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

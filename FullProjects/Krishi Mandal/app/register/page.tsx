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
  User,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore, type UserRole } from "@/lib/store"
import { cn } from "@/lib/utils"

const roles = [
  {
    id: "farmer" as UserRole,
    icon: Leaf,
    title: "Farmer",
    description: "I want to sell my crops",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/50",
    textColor: "text-green-600 dark:text-green-400",
    benefits: [
      "List unlimited crops for free",
      "Direct buyer connections",
      "Real-time price updates",
      "Government scheme alerts"
    ]
  },
  {
    id: "seller" as UserRole,
    icon: ShoppingCart,
    title: "Seller / Buyer",
    description: "I want to buy crops",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-600 dark:text-blue-400",
    benefits: [
      "Browse verified farmers",
      "Bulk order management",
      "Quality assurance",
      "Logistics support"
    ]
  },
  {
    id: "government" as UserRole,
    icon: Building2,
    title: "Government",
    description: "I represent an agency",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-600 dark:text-amber-400",
    benefits: [
      "Real-time agriculture data",
      "MSP management tools",
      "Farmer welfare tracking",
      "Policy implementation"
    ]
  }
]

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setRole, setIsAuthenticated } = useAppStore()
  
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    district: "",
    aadhaar: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole
    if (roleParam && ["farmer", "seller", "government"].includes(roleParam)) {
      setSelectedRole(roleParam)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    }
  }
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match")
    return
  }

  if (!agreed) {
    setError("Please accept the terms and conditions")
    return
  }

  setIsLoading(true)
console.log("RAW PHONE:", formData.phone)
console.log("TYPE:", typeof formData.phone)
console.log("LENGTH:", formData.phone.length)
  try {
    const response = await fetch("http://localhost:7000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, "").slice(0, 10),
        password: formData.password,
        state: formData.state,
        district: formData.district,
        aadhaar: formData.aadhaar || null,
        role: selectedRole.toUpperCase() // 🔥 IMPORTANT
      })
    })

 const data = await response.json()

if (!response.ok) {

  //  1. Field validation errors (Spring Boot)
 // direct map handle karo
if (typeof data === "object") {
  const firstError = Object.values(data)[0]
  throw new Error(firstError as string)
}

  //  2. Custom backend message
  if (data.message) {
    throw new Error(data.message)
    console.log("BACKEND ERROR MESSAGE:", data.message)
  }
 console.log(data.message);
  //  fallback
  throw new Error("Registration failed")
}
    //  Zustand store me save karo
    setRole(selectedRole)
    setIsAuthenticated(true)

    //  token save karo
    localStorage.setItem("token", data.token)

    router.push(`/${selectedRole}`)

  } catch (err: any) {
    setError(err.message)
  } finally {
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
              <h1 className="text-4xl font-bold mb-6">
                Join as {selectedRoleData.title}
              </h1>
              <div className="space-y-4">
                {selectedRoleData.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="size-10 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm" />
              ))}
            </div>
            <p className="text-sm text-white/80">
              Join 50,000+ users today
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
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

          {/* Progress Steps */}
          <div className="flex items-center gap-3 mb-8">
            <div className={cn(
              "flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
              step >= 1 ? `bg-gradient-to-br ${selectedRoleData.color} text-white shadow-lg` : "bg-muted text-muted-foreground"
            )}>
              1
            </div>
            <div className={cn(
              "flex-1 h-1.5 rounded-full transition-all",
              step >= 2 ? `bg-gradient-to-r ${selectedRoleData.color}` : "bg-muted"
            )} />
            <div className={cn(
              "flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
              step >= 2 ? `bg-gradient-to-br ${selectedRoleData.color} text-white shadow-lg` : "bg-muted text-muted-foreground"
            )}>
              2
            </div>
          </div>

          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-bold text-foreground mb-2">Create account</h2>
              <p className="text-muted-foreground mb-8">Choose your role and get started</p>

              {/* Role Selection */}
              <div className="space-y-3 mb-8">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left",
                      selectedRole === role.id
                        ? `${role.bgColor} ${role.borderColor} scale-[1.02]`
                        : "border-border hover:border-border/80 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "flex size-14 items-center justify-center rounded-xl shrink-0 transition-all",
                      selectedRole === role.id
                        ? `bg-gradient-to-br ${role.color} shadow-lg`
                        : "bg-muted"
                    )}>
                      <role.icon className={cn(
                        "size-7",
                        selectedRole === role.id ? "text-white" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-semibold text-lg",
                        selectedRole === role.id ? role.textColor : "text-foreground"
                      )}>
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                    <div className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      selectedRole === role.id ? role.borderColor : "border-muted-foreground/30"
                    )}>
                      {selectedRole === role.id && (
                        <div className={cn("size-3 rounded-full bg-gradient-to-br", role.color)} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleNextStep}
                className={cn(
                  "w-full h-14 rounded-xl bg-gradient-to-r shadow-lg text-base",
                  selectedRoleData.color,
                  "hover:opacity-90 hover:shadow-xl transition-all"
                )}
              >
                Continue
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-foreground">Your details</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-primary hover:underline"
                >
                  Change role
                </button>
              </div>
              <p className="text-muted-foreground mb-6">Fill in your information to complete registration</p>

              <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
                    <span className="size-2 rounded-full bg-destructive" />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="h-11 pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-11 pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="district"
                        name="district"
                        placeholder="Your district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="h-11 pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {selectedRole !== "government" && (
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number (optional)</Label>
                    <Input
                      id="aadhaar"
                      name="aadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.aadhaar}
                      onChange={handleInputChange}
                      className="h-11 rounded-xl"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-11 pr-12 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-11 pr-12 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 size-4 rounded border-border accent-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full h-14 rounded-xl bg-gradient-to-r shadow-lg mt-4 text-base",
                    selectedRoleData.color,
                    "hover:opacity-90 hover:shadow-xl transition-all"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 size-5" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={`/login?role=${selectedRole}`} className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}

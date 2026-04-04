"use client"

import { useEffect, useState } from "react"
import {
  Sprout,
  IndianRupee,
  Package,
  TrendingUp,
  Plus,
  Eye,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

import {
  Area,
  AreaChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

import { KPICard } from "@/components/kpi-card"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

import LogoutButton from "../Logout/page"

// ✅ SAFE CONFIG (IMPORTANT FIX)
const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  tomatoes: { label: "Tomatoes", color: "var(--chart-1)" },
  onions: { label: "Onions", color: "var(--chart-4)" },
}

export default function FarmerDashboard() {

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ✅ API CALL
  useEffect(() => {
    fetch("http://localhost:7000/api/dashboard/1") // 👈 change farmerId
      .then(res => res.json())
      .then(res => {
        console.log("API DATA:", res)
        setData(res)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-6">Loading...</p>

  // ✅ SAFE FALLBACKS
  const revenueData = data?.revenueOverview || []
  const marketPrices = data?.marketPrices || []
  const listings = data?.activeListingsData || []
  const orders = data?.recentOrders || []

  const statusColors: any = {
    pending: "bg-warning/20 text-warning border-warning/30",
    processing: "bg-secondary/20 text-secondary border-secondary/30",
    completed: "bg-success/20 text-success border-success/30",
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your crops & orders
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild>
            <Link href="/farmer/listings">
              <Plus className="size-4 mr-2" />
              Add Listing
            </Link>
          </Button>

          <LogoutButton />
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <KPICard
          title="Total Revenue"
          value={`₹${data?.totalRevenue ?? 0}`}
          icon={<IndianRupee />}
        />

        <KPICard
          title="Active Listings"
          value={data?.activeListings ?? 0}
          icon={<Sprout />}
        />

        <KPICard
          title="Pending Orders"
          value={data?.pendingOrders ?? 0}
          icon={<Package />}
        />

        <KPICard
          title="Avg Price/kg"
          value={`₹${data?.avgPrice ?? 0}`}
          icon={<TrendingUp />}
        />

      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig || {}} className="h-[300px]">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="green"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Market Prices</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig || {}} className="h-[300px]">
              <LineChart data={marketPrices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="tomatoes" stroke="green" />
                <Line dataKey="onions" stroke="orange" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>

      {/* LISTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>Active Listings</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">

          {listings.map((l: any) => (
            <div key={l.id} className="border p-4 rounded">

              <h3 className="font-semibold">{l.name}</h3>
              <p>{l.quantity} {l.unit}</p>

              <p className="font-bold">₹{l.price}</p>

              <div className="flex justify-between text-sm mt-2">
                <span className="flex items-center gap-1">
                  <Eye size={14}/> {l.views}
                </span>
                <span>{l.offers} offers</span>
              </div>

            </div>
          ))}

        </CardContent>
      </Card>

      {/* ORDERS */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

        {orders.map((o: any) => (
  <div key={o.id} className="flex justify-between border p-4 rounded">

    <div>
      <p className="font-medium">{o.buyerName}</p>
      <p className="text-sm">
        {o.cropName} • {o.quantity} kg
      </p>
    </div>

    <div className="text-right">
      <Badge className={statusColors[o.status]}>
        {o.status}
      </Badge>
      <p className="font-semibold">₹{o.total}</p>
    </div>

  </div>
))}

        </CardContent>
      </Card>

    </div>
  )
}








// // OLD CODE SNIPPETS FROM OTHER PAGES (FOR REFERENCE ONLY, DO NOT COPY)

// "use client"

// import { useEffect, useState } from "react"
// import {
//   Sprout,
//   IndianRupee,
//   Package,
//   TrendingUp,
//   Plus,
//   Eye
// } from "lucide-react"
// import Link from "next/link"

// import {
//   Area,
//   AreaChart,
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid
// } from "recharts"

// import { KPICard } from "@/components/kpi-card"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent
// } from "@/components/ui/chart"

// import LogoutButton from "../Logout/page"

// const chartConfig = {
//   revenue: { label: "Revenue", color: "var(--chart-1)" },
//   crop1: { label: "Crop1", color: "var(--chart-1)" },
//   crop2: { label: "Crop2", color: "var(--chart-4)" },
// }

// export default function FarmerDashboard() {

//   const [data, setData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

// useEffect(() => {
//   const token = localStorage.getItem("token")

//   fetch("http://localhost:7000/api/dashboard/1", {
//     headers: {
//       Authorization: `Bearer ${token}`   // ✅ FIX
//     }
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log("API DATA:", res)
//       setData(res)
//     })
//     .catch(err => console.error(err))
//     .finally(() => setLoading(false))
// }, [])

//   if (loading) return <p className="p-6">Loading...</p>
//   if (!data) return <p>No data found</p>

//   // ✅ FIXED MAPPING
//   const revenueData = data.revenueOverview.map((item: any) => ({
//     month: item.month,
//     revenue: item.amount
//   }))

//   const marketPrices = data.marketPrices.map((item: any) => ({
//     month: item.month,
//     crop1: item.crop1,
//     crop2: item.crop2
//   }))

//   const listings = data.activeListingsData
//   const orders = data.recentOrders

//   const statusColors: any = {
//     pending: "bg-yellow-200 text-yellow-800",
//     processing: "bg-blue-200 text-blue-800",
//     completed: "bg-green-200 text-green-800",
//   }

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button asChild>
//             <Link href="/farmer/listings">
//               <Plus className="size-4 mr-2" />
//               Add Listing
//             </Link>
//           </Button>

//           <LogoutButton />
//         </div>
//       </div>

//       {/* KPI */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

//         <KPICard title="Total Revenue" value={`₹${data.totalRevenue}`} icon={<IndianRupee />} />
//         <KPICard title="Active Listings" value={data.activeListings} icon={<Sprout />} />
//         <KPICard title="Pending Orders" value={data.pendingOrders} icon={<Package />} />
//         <KPICard title="Avg Price/kg" value={`₹${data.avgPrice}`} icon={<TrendingUp />} />

//       </div>

//       {/* CHARTS */}
//       <div className="grid gap-6 lg:grid-cols-2">

//         {/* Revenue */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Revenue Overview</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <AreaChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Area dataKey="revenue" stroke="green" fillOpacity={0.2} />
//               </AreaChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         {/* Market */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Market Prices</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <LineChart data={marketPrices}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Line dataKey="crop1" stroke="green" />
//                 <Line dataKey="crop2" stroke="orange" />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//       </div>

//       {/* LISTINGS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Active Listings</CardTitle>
//         </CardHeader>

//         <CardContent className="grid gap-4 md:grid-cols-3">

//           {listings.map((l: any, i: number) => (
//             <div key={i} className="border p-4 rounded">

//               <h3 className="font-semibold">{l.cropName}</h3>
//               <p>{l.quantity} kg</p>

//               <p className="font-bold">₹{l.price}</p>

//               <div className="flex justify-between text-sm mt-2">
//                 <span className="flex items-center gap-1">
//                   <Eye size={14}/> {l.views}
//                 </span>
//                 <span>{l.offers} offers</span>
//               </div>

//             </div>
//           ))}

//         </CardContent>
//       </Card>

//       {/* ORDERS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Orders</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">

//           {orders.map((o: any, i: number) => (
//             <div key={i} className="flex justify-between border p-4 rounded">

//               <div>
//                 <p className="font-medium">{o.buyerName}</p>
//                 <p className="text-sm">
//                   {o.cropName} • {o.quantity} kg
//                 </p>
//               </div>

//               <div className="text-right">
//                 <Badge className={statusColors[o.status]}>
//                   {o.status}
//                 </Badge>
//                 <p className="font-semibold">₹{o.total}</p>
//               </div>

//             </div>
//           ))}

//         </CardContent>
//       </Card>

//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const fallbackMonthly = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 18000 },
]

const fallbackCrop = [
  { name: "Wheat", value: 300 },
  { name: "Rice", value: 200 },
]

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"]

export default function FarmerAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ✅ API CALL
  useEffect(() => {
    const farmerId = 1 // 👉 dynamic bhi kar sakte ho later

    fetch(`http://localhost:7000/api/analytics/${farmerId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API Error")

        const text = await res.text()
        return text ? JSON.parse(text) : null
      })
      .then((res) => {
        console.log("API DATA:", res)
        setData(res)
      })
      .catch((err) => {
        console.error("Error:", err)
      })
      .finally(() => setLoading(false))
  }, [])

  // ✅ SAFE DATA
  const monthlySales = data?.monthlySales || fallbackMonthly
  const cropData = data?.cropDistribution || fallbackCrop

  const totalListings = data?.totalListings ?? 0
  const totalSales = data?.totalSales ?? 0
  const activeBuyers = data?.activeBuyers ?? 0

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and statistics about your crop sales.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-muted-foreground">
          Loading analytics...
        </div>
      )}

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
            <CardDescription>Your active crop listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalListings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>Overall crop sales</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{totalSales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Buyers</CardTitle>
            <CardDescription>Buyers purchasing your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeBuyers}</p>
          </CardContent>
        </Card>

      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* LINE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>
              Track your sales performance
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Distribution</CardTitle>
            <CardDescription>
              Most sold crops
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {cropData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* BAR CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Crop</CardTitle>
          <CardDescription>
            Compare revenue generated
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  )
}


// "use client"

// import { useEffect, useState } from "react"

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"

// const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"]

// export default function FarmerAnalyticsPage() {
//   const [data, setData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

// useEffect(() => {
//   const fetchAnalytics = async () => {
//     try {
//       const token = localStorage.getItem("token")

//       const res = await fetch("http://localhost:7000/api/analytics", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       const text = await res.text()

//       let result = null
//       if (text) {
//         result = JSON.parse(text)
//       }

//       if (!res.ok) {
//         throw new Error(result?.message || "Failed to fetch")
//       }

//       setData(result)

//     } catch (err: any) {
//       console.error("ERROR:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchAnalytics()
// }, [])

//   // ✅ STATES HANDLE
//   if (loading) {
//     return <div className="p-6">Loading analytics...</div>
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>
//   }

//   if (!data) {
//     return <div className="p-6">No data found</div>
//   }

//   const monthlySalesData = data.monthlySales || []
//   const cropDistributionData = data.cropDistribution || []

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Analytics</h1>
//         <p className="text-muted-foreground">
//           Insights and statistics about your crop sales.
//         </p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid gap-4 md:grid-cols-3">

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Listings</CardTitle>
//             <CardDescription>Your active crop listings</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">
//               {data.totalListings || 0}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Sales</CardTitle>
//             <CardDescription>Overall crop sales</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">
//               ₹{data.totalSales || 0}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Active Buyers</CardTitle>
//             <CardDescription>Buyers purchasing your crops</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">
//               {data.activeBuyers || 0}
//             </p>
//           </CardContent>
//         </Card>

//       </div>

//       {/* Charts */}
//       <div className="grid gap-6 lg:grid-cols-2">

//         {/* Line Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Sales</CardTitle>
//             <CardDescription>
//               Track your sales performance
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             {monthlySalesData.length === 0 ? (
//               <p className="text-muted-foreground">No sales data</p>
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={monthlySalesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="sales"
//                     stroke="#22c55e"
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </CardContent>
//         </Card>

//         {/* Pie Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Crop Distribution</CardTitle>
//           </CardHeader>

//           <CardContent>
//             {cropDistributionData.length === 0 ? (
//               <p className="text-muted-foreground">No crop data</p>
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={cropDistributionData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     label
//                   >
//                     {cropDistributionData.map((_, index) => (
//                       <Cell
//                         key={index}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             )}
//           </CardContent>
//         </Card>

//       </div>

//       {/* Bar Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Revenue by Crop</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {cropDistributionData.length === 0 ? (
//             <p className="text-muted-foreground">No revenue data</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={cropDistributionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#22c55e" />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   )
// }
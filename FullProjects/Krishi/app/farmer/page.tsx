"use client"

import { Sprout, IndianRupee, Package, TrendingUp, Plus, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { KPICard } from "@/components/kpi-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { priceHistory } from "@/lib/mock-data"

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
  tomatoes: { label: "Tomatoes", color: "var(--chart-1)" },
  rice: { label: "Rice", color: "var(--chart-2)" },
  wheat: { label: "Wheat", color: "var(--chart-3)" },
  onions: { label: "Onions", color: "var(--chart-4)" },
}

const revenueData = [
  { month: "Oct", revenue: 45000 },
  { month: "Nov", revenue: 52000 },
  { month: "Dec", revenue: 48000 },
  { month: "Jan", revenue: 61000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 72000 },
]

const activeListings = [
  { id: 1, name: "Organic Tomatoes", quantity: 500, unit: "kg", price: 45, views: 128, offers: 5 },
  { id: 2, name: "Fresh Onions", quantity: 800, unit: "kg", price: 30, views: 95, offers: 3 },
  { id: 3, name: "Basmati Rice", quantity: 2000, unit: "kg", price: 85, views: 234, offers: 8 },
]

const recentOrders = [
  { id: "ORD-001", buyer: "Krishna Traders", crop: "Tomatoes", quantity: 100, status: "completed", amount: 4500 },
  { id: "ORD-002", buyer: "Patel Mills", crop: "Rice", quantity: 500, status: "processing", amount: 42500 },
  { id: "ORD-003", buyer: "Green Mart", crop: "Onions", quantity: 200, status: "pending", amount: 6000 },
]

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  processing: "bg-secondary/20 text-secondary border-secondary/30",
  completed: "bg-success/20 text-success border-success/30",
}

export default function FarmerDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your crops, track orders, and grow your business.
          </p>
        </div>
        <Button asChild>
          <Link href="/farmer/listings">
            <Plus className="size-4 mr-2" />
            Add New Listing
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value="₹3,33,000"
          change={18.2}
          icon={<IndianRupee className="size-full" />}
          variant="primary"
        />
        <KPICard
          title="Active Listings"
          value="12"
          change={4}
          changeLabel="new this week"
          icon={<Sprout className="size-full" />}
        />
        <KPICard
          title="Pending Orders"
          value="8"
          change={-2}
          icon={<Package className="size-full" />}
          variant="warning"
        />
        <KPICard
          title="Avg. Price/kg"
          value="₹52"
          change={6.5}
          icon={<TrendingUp className="size-full" />}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Your earnings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Prices</CardTitle>
            <CardDescription>Current price trends for your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="tomatoes" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)", r: 4 }} />
                <Line type="monotone" dataKey="onions" stroke="var(--chart-4)" strokeWidth={2} dot={{ fill: "var(--chart-4)", r: 4 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Listings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Listings</CardTitle>
              <CardDescription>Your current crop listings</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/farmer/listings">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeListings.map((listing) => (
              <div
                key={listing.id}
                className="flex flex-col gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{listing.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {listing.quantity} {listing.unit} available
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{listing.price}</div>
                    <div className="text-xs text-muted-foreground">per {listing.unit}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3.5" />
                      {listing.views}
                    </span>
                    <span>{listing.offers} offers</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from buyers</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/farmer/orders">
                View All
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Package className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{order.buyer}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.crop} • {order.quantity} kg
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{order.id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

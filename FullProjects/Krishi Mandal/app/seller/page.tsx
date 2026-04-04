"use client"

import { ShoppingCart, DollarSign, TrendingUp, Package, ArrowRight } from "lucide-react"
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
  ResponsiveContainer,
} from "recharts"

import { KPICard } from "@/components/kpi-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { demandData, topCrops, priceHistory } from "@/lib/mock-data"
import LogoutButton from "../Logout/page"

const chartConfig = {
  demand: { label: "Demand", color: "var(--chart-1)" },
  supply: { label: "Supply", color: "var(--chart-2)" },
  sales: { label: "Sales", color: "var(--chart-1)" },
  tomatoes: { label: "Tomatoes", color: "var(--chart-1)" },
  rice: { label: "Rice", color: "var(--chart-2)" },
  wheat: { label: "Wheat", color: "var(--chart-3)" },
  onions: { label: "Onions", color: "var(--chart-4)" },
}

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
    <p className="text-muted-foreground">
      Monitor your purchases, analyze market trends, and discover the best deals.
    </p>
  </div>

  <LogoutButton />
</div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Purchases"
          value="1,284"
          change={12.5}
          icon={<ShoppingCart className="size-full" />}
          variant="primary"
        />
        <KPICard
          title="Total Spending"
          value="₹4,52,000"
          change={-3.2}
          icon={<DollarSign className="size-full" />}
        />
        <KPICard
          title="Active Orders"
          value="23"
          change={8.1}
          icon={<Package className="size-full" />}
          variant="secondary"
        />
        <KPICard
          title="Avg. Savings"
          value="12.4%"
          change={5.3}
          icon={<TrendingUp className="size-full" />}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Demand Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Demand vs Supply</CardTitle>
            <CardDescription>Monthly comparison of market demand and supply</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#demandGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="supply"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fill="url(#supplyGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Crops Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Crops</CardTitle>
            <CardDescription>Highest selling crops in your region</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={topCrops} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                <XAxis type="number" className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <YAxis dataKey="name" type="category" className="text-xs" tickLine={false} axisLine={false} width={50} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Price Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Price Trends</CardTitle>
          <CardDescription>Track price movements of major crops over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
              <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="tomatoes" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)", r: 4 }} />
              <Line type="monotone" dataKey="rice" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: "var(--chart-2)", r: 4 }} />
              <Line type="monotone" dataKey="wheat" stroke="var(--chart-3)" strokeWidth={2} dot={{ fill: "var(--chart-3)", r: 4 }} />
              <Line type="monotone" dataKey="onions" stroke="var(--chart-4)" strokeWidth={2} dot={{ fill: "var(--chart-4)", r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/seller/browse">
                <ShoppingCart className="size-5" />
                <span>Browse Crops</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/seller/orders">
                <Package className="size-5" />
                <span>View Orders</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/seller/farmers">
                <TrendingUp className="size-5" />
                <span>Find Farmers</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/seller/analytics">
                <ArrowRight className="size-5" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

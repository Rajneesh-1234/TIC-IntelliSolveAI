"use client"

import { Users, Building2, IndianRupee, Package, TrendingUp, AlertTriangle } from "lucide-react"
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
import { governmentStats, regionData, procurementData, priceHistory } from "@/lib/mock-data"

const chartConfig = {
  production: { label: "Production", color: "var(--chart-1)" },
  farmers: { label: "Farmers", color: "var(--chart-2)" },
  avgPrice: { label: "Avg Price", color: "var(--chart-3)" },
  tomatoes: { label: "Tomatoes", color: "var(--chart-1)" },
  rice: { label: "Rice", color: "var(--chart-2)" },
  wheat: { label: "Wheat", color: "var(--chart-3)" },
  onions: { label: "Onions", color: "var(--chart-4)" },
}

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Government Portal</h1>
        <p className="text-muted-foreground">
          Monitor agricultural activities, manage procurement, and analyze market data.
        </p>
      </div>

      {/* Alert Banner */}
      <Card className="border-warning/50 bg-warning/10">
        <CardContent className="p-4 flex items-center gap-4">
          <AlertTriangle className="size-5 text-warning shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Attention Required</p>
            <p className="text-sm text-muted-foreground">
              {governmentStats.pendingApprovals} farmer registrations pending approval, {governmentStats.flaggedAccounts} accounts flagged for review.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/government/control">Review Now</Link>
          </Button>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Registered Farmers"
          value={governmentStats.totalFarmers.toLocaleString()}
          change={8.2}
          icon={<Users className="size-full" />}
          variant="primary"
        />
        <KPICard
          title="Registered Sellers"
          value={governmentStats.totalSellers.toLocaleString()}
          change={5.1}
          icon={<Building2 className="size-full" />}
        />
        <KPICard
          title="Total Transactions"
          value={governmentStats.totalTransactions.toLocaleString()}
          change={12.4}
          icon={<IndianRupee className="size-full" />}
          variant="success"
        />
        <KPICard
          title="Total Volume (tonnes)"
          value={(governmentStats.totalVolume / 1000).toFixed(0) + "k"}
          change={9.8}
          icon={<Package className="size-full" />}
          variant="secondary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Regional Production */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Production</CardTitle>
            <CardDescription>Production volume by state (in tonnes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={regionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis dataKey="region" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="production" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Price Trends</CardTitle>
            <CardDescription>Price movements of key commodities</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="rice" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)", r: 4 }} />
                <Line type="monotone" dataKey="wheat" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: "var(--chart-2)", r: 4 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Procurement Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Procurement Status</CardTitle>
              <CardDescription>Current procurement progress against targets</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/government/procurement">View Details</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {procurementData.map((item) => {
              const percentage = Math.round((item.procured / item.target) * 100)
              return (
                <div key={item.crop} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.crop}</span>
                    <Badge variant={percentage >= 80 ? "default" : percentage >= 50 ? "secondary" : "outline"}>
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.procured.toLocaleString()} {item.unit}</span>
                    <span>Target: {item.target.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/government/farmers">
                <Users className="size-5" />
                <span>Manage Farmers</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/government/procurement">
                <Package className="size-5" />
                <span>Procurement</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/government/market">
                <TrendingUp className="size-5" />
                <span>Market Analysis</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/government/reports">
                <Building2 className="size-5" />
                <span>Generate Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

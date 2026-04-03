"use client"

import * as React from "react"
import { Download, FileText, Lightbulb, TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"
import { demandData, topCrops, priceHistory, cropCategories } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  demand: { label: "Demand", color: "var(--chart-1)" },
  supply: { label: "Supply", color: "var(--chart-2)" },
  sales: { label: "Sales", color: "var(--chart-1)" },
  tomatoes: { label: "Tomatoes", color: "var(--chart-1)" },
  rice: { label: "Rice", color: "var(--chart-2)" },
  wheat: { label: "Wheat", color: "var(--chart-3)" },
  onions: { label: "Onions", color: "var(--chart-4)" },
  vegetables: { label: "Vegetables", color: "var(--chart-1)" },
  grains: { label: "Grains", color: "var(--chart-2)" },
  pulses: { label: "Pulses", color: "var(--chart-3)" },
  fruits: { label: "Fruits", color: "var(--chart-4)" },
  others: { label: "Others", color: "var(--chart-5)" },
}

const insights = [
  {
    title: "Optimal Buying Time",
    description: "Tomato prices typically drop 15-20% in March. Consider increasing orders during this period.",
    type: "opportunity" as const,
  },
  {
    title: "Supply Shortage Alert",
    description: "Rice supply is projected to decrease by 12% next month due to seasonal factors.",
    type: "warning" as const,
  },
  {
    title: "Cost Savings",
    description: "Switching to preferred farmers saved you ₹45,000 in the last quarter.",
    type: "success" as const,
  },
  {
    title: "New Market Trend",
    description: "Organic produce demand increased by 25%. Consider adding more organic suppliers.",
    type: "info" as const,
  },
]

const insightColors = {
  opportunity: "border-l-secondary bg-secondary/5",
  warning: "border-l-warning bg-warning/5",
  success: "border-l-success bg-success/5",
  info: "border-l-primary bg-primary/5",
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("6months")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into market trends and insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileText className="size-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Price Trends</CardTitle>
            <CardDescription>Track price movements of major crops over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="tomatoes" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)", r: 4 }} />
                <Line type="monotone" dataKey="rice" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: "var(--chart-2)", r: 4 }} />
                <Line type="monotone" dataKey="wheat" stroke="var(--chart-3)" strokeWidth={2} dot={{ fill: "var(--chart-3)", r: 4 }} />
                <Line type="monotone" dataKey="onions" stroke="var(--chart-4)" strokeWidth={2} dot={{ fill: "var(--chart-4)", r: 4 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Crops */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Crops</CardTitle>
            <CardDescription>Highest performing crops by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={topCrops} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis dataKey="name" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Breakdown of purchases by crop category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={cropCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {cropCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Demand vs Supply */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Demand vs Supply Analysis</CardTitle>
            <CardDescription>Market equilibrium trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="demandGradientAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="supplyGradientAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#demandGradientAnalytics)"
                />
                <Area
                  type="monotone"
                  dataKey="supply"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fill="url(#supplyGradientAnalytics)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-warning" />
            <CardTitle>AI-Powered Insights</CardTitle>
          </div>
          <CardDescription>
            Smart recommendations based on your purchasing patterns and market trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-lg border-l-4 p-4 transition-colors",
                  insightColors[insight.type]
                )}
              >
                <h4 className="font-semibold">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

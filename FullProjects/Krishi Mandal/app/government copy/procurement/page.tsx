"use client"

import * as React from "react"
import { Plus, TrendingUp, Package, Target, Calendar } from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { cn } from "@/lib/utils"
import { procurementData, regionData } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const chartConfig = {
  target: { label: "Target", color: "var(--chart-2)" },
  procured: { label: "Procured", color: "var(--chart-1)" },
}

const procurementWithDetails = procurementData.map((item, index) => ({
  ...item,
  msp: [2200, 2400, 5500, 6500][index],
  lastUpdated: "2026-04-01",
  regions: ["Maharashtra", "Punjab", "MP", "Gujarat"].slice(0, index + 2),
}))

export default function ProcurementPage() {
  const [selectedCrop, setSelectedCrop] = React.useState("all")
  const [selectedRegion, setSelectedRegion] = React.useState("all")

  const totalTarget = procurementData.reduce((sum, item) => sum + item.target, 0)
  const totalProcured = procurementData.reduce((sum, item) => sum + item.procured, 0)
  const overallProgress = Math.round((totalProcured / totalTarget) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement</h1>
          <p className="text-muted-foreground">
            Manage bulk crop procurement across regions.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              New Procurement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Procurement Order</DialogTitle>
              <DialogDescription>
                Set up a new bulk procurement order for crops.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="pulses">Pulses</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Target Quantity (tonnes)</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionData.map((r) => (
                      <SelectItem key={r.region} value={r.region.toLowerCase()}>
                        {r.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <Target className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{(totalTarget / 1000).toFixed(0)}k</div>
                <div className="text-sm text-muted-foreground">Total Target (tonnes)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                <Package className="size-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{(totalProcured / 1000).toFixed(0)}k</div>
                <div className="text-sm text-muted-foreground">Total Procured (tonnes)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/20">
                <TrendingUp className="size-5 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{overallProgress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-warning/20">
                <Calendar className="size-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Procurement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Procurement Progress</CardTitle>
            <CardDescription>Target vs actual procurement by crop</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart 
                data={procurementData.map(item => ({
                  name: item.crop,
                  target: item.target / 1000,
                  procured: item.procured / 1000,
                }))} 
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis dataKey="name" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="target" fill="var(--chart-2)" radius={[4, 4, 0, 0]} opacity={0.5} />
                <Bar dataKey="procured" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Crop-wise Details */}
        <Card>
          <CardHeader>
            <CardTitle>Crop-wise Status</CardTitle>
            <CardDescription>Detailed procurement status for each crop</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {procurementWithDetails.map((item) => {
              const percentage = Math.round((item.procured / item.target) * 100)
              return (
                <div key={item.crop} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{item.crop}</h4>
                      <p className="text-sm text-muted-foreground">
                        MSP: ₹{item.msp}/quintal
                      </p>
                    </div>
                    <Badge variant={percentage >= 80 ? "default" : percentage >= 50 ? "secondary" : "outline"}>
                      {percentage}%
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {item.procured.toLocaleString()} / {item.target.toLocaleString()} {item.unit}
                    </span>
                    <span>
                      {item.regions.length} regions
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

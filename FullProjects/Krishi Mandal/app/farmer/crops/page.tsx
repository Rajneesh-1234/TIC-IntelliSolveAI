"use client"

import * as React from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const myCrops = [
  {
    id: 1,
    name: "Organic Tomatoes",
    variety: "Roma",
    plantedDate: "2026-01-15",
    harvestDate: "2026-04-15",
    status: "growing",
    progress: 75,
    area: 2.5,
    expectedYield: 5000,
    currentHealth: "excellent",
  },
  {
    id: 2,
    name: "Fresh Onions",
    variety: "Red Onion",
    plantedDate: "2025-12-01",
    harvestDate: "2026-03-30",
    status: "ready",
    progress: 100,
    area: 1.8,
    expectedYield: 3600,
    currentHealth: "good",
  },
  {
    id: 3,
    name: "Basmati Rice",
    variety: "Pusa 1121",
    plantedDate: "2025-11-10",
    harvestDate: "2026-03-10",
    status: "harvested",
    progress: 100,
    area: 5.0,
    expectedYield: 12500,
    currentHealth: "harvested",
  },
  {
    id: 4,
    name: "Green Chilies",
    variety: "Jwala",
    plantedDate: "2026-02-20",
    harvestDate: "2026-05-20",
    status: "growing",
    progress: 35,
    area: 1.2,
    expectedYield: 1800,
    currentHealth: "good",
  },
]

const statusColors: Record<string, string> = {
  growing: "bg-primary/20 text-primary border-primary/30",
  ready: "bg-success/20 text-success border-success/30",
  harvested: "bg-secondary/20 text-secondary border-secondary/30",
  planted: "bg-warning/20 text-warning border-warning/30",
}

const healthColors: Record<string, string> = {
  excellent: "text-success",
  good: "text-primary",
  fair: "text-warning",
  poor: "text-destructive",
  harvested: "text-muted-foreground",
}

export default function MyCropsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCrops = myCrops.filter((crop) =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.variety.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: myCrops.length,
    growing: myCrops.filter(c => c.status === "growing").length,
    ready: myCrops.filter(c => c.status === "ready").length,
    totalArea: myCrops.reduce((sum, c) => sum + c.area, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Crops</h1>
          <p className="text-muted-foreground">
            Track and manage your crop production.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Crop
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Crop</DialogTitle>
              <DialogDescription>
                Record a new crop that you are growing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cropName">Crop Name</Label>
                <Input id="cropName" placeholder="e.g., Organic Tomatoes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variety">Variety</Label>
                <Input id="variety" placeholder="e.g., Roma" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantedDate">Planted Date</Label>
                  <Input id="plantedDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Expected Harvest</Label>
                  <Input id="harvestDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (acres)</Label>
                  <Input id="area" type="number" placeholder="2.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yield">Expected Yield (kg)</Label>
                  <Input id="yield" type="number" placeholder="5000" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Crop</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Crops</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.growing}</div>
            <div className="text-sm text-muted-foreground">Currently Growing</div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{stats.ready}</div>
            <div className="text-sm text-muted-foreground">Ready to Harvest</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalArea} acres</div>
            <div className="text-sm text-muted-foreground">Total Area</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search crops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Crops Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{crop.name}</h3>
                  <p className="text-sm text-muted-foreground">{crop.variety}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="size-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="size-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="size-4 mr-2" />
                      Create Listing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="size-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusColors[crop.status]}>
                    {crop.status}
                  </Badge>
                  <span className={cn("text-sm font-medium", healthColors[crop.currentHealth])}>
                    {crop.currentHealth}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Growth Progress</span>
                    <span className="font-medium">{crop.progress}%</span>
                  </div>
                  <Progress value={crop.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Area</span>
                    <p className="font-medium">{crop.area} acres</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Yield</span>
                    <p className="font-medium">{crop.expectedYield.toLocaleString()} kg</p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Harvest: {crop.harvestDate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-lg font-semibold">No crops found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or add a new crop
          </p>
        </div>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { Search, Filter, Grid3X3, List, MapPin, Star, BadgeCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { crops } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const categories = ["All", "Vegetables", "Grains", "Pulses", "Fruits", "Spices"]
const qualities = ["All", "Premium", "Grade A", "Standard"]

export default function BrowseCropsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedQuality, setSelectedQuality] = React.useState("All")
  const [priceRange, setPriceRange] = React.useState([0, 150])
  const [maxDistance, setMaxDistance] = React.useState([500])

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory
    const matchesQuality = selectedQuality === "All" || crop.quality === selectedQuality
    const matchesPrice = crop.price >= priceRange[0] && crop.price <= priceRange[1]
    const matchesDistance = crop.distance <= maxDistance[0]
    
    return matchesSearch && matchesCategory && matchesQuality && matchesPrice && matchesDistance
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Browse Crops</h1>
        <p className="text-muted-foreground">
          Discover fresh crops from verified farmers across the region.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search crops or farmers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your search with filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <Label>Price Range (₹/kg)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={150}
                    step={5}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Maximum Distance (km)</Label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    min={10}
                    max={500}
                    step={10}
                  />
                  <div className="text-sm text-muted-foreground">
                    Within {maxDistance[0]} km
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Quality</Label>
                  <div className="space-y-2">
                    {qualities.map((quality) => (
                      <div key={quality} className="flex items-center gap-2">
                        <Checkbox
                          id={quality}
                          checked={selectedQuality === quality}
                          onCheckedChange={() => setSelectedQuality(quality)}
                        />
                        <Label htmlFor={quality} className="text-sm font-normal">
                          {quality}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCrops.length} of {crops.length} crops
      </div>

      {/* Crops Grid/List */}
      <div className={cn(
        viewMode === "grid" 
          ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
          : "flex flex-col gap-4"
      )}>
        {filteredCrops.map((crop) => (
          <Card 
            key={crop.id} 
            className={cn(
              "overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer group",
              viewMode === "list" && "flex flex-row"
            )}
          >
            <div className={cn(
              "relative bg-muted",
              viewMode === "grid" ? "aspect-[4/3]" : "w-48 shrink-0"
            )}>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-4xl">{crop.category === "Vegetables" ? "🥬" : crop.category === "Grains" ? "🌾" : "🥗"}</span>
              </div>
              {crop.isBestDeal && (
                <Badge className="absolute top-2 left-2 bg-primary">
                  Best Deal
                </Badge>
              )}
            </div>
            <CardContent className={cn(
              "p-4",
              viewMode === "list" && "flex-1 flex flex-col justify-between"
            )}>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {crop.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BadgeCheck className="size-3.5 text-primary" />
                      {crop.farmer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{crop.price}</div>
                    <div className="text-xs text-muted-foreground">per {crop.unit}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {crop.distance} km
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-warning text-warning" />
                    {crop.rating}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {crop.quality}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground">
                  {crop.quantity} {crop.unit} available
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  Make Offer
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold">No crops found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  )
}

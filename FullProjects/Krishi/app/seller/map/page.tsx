"use client"

import * as React from "react"
import { MapPin, Navigation, Layers, Filter, Search, Info, Phone, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { mapLocations, crops } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const mapTypeColors = {
  farm: "bg-primary text-primary-foreground",
  market: "bg-secondary text-secondary-foreground",
  warehouse: "bg-warning text-warning-foreground",
}

export default function SellerMapPage() {
  const [selectedLocation, setSelectedLocation] = React.useState<typeof mapLocations[0] | null>(null)
  const [showHeatmap, setShowHeatmap] = React.useState(false)
  const [radiusFilter, setRadiusFilter] = React.useState([100])
  const [cropFilter, setCropFilter] = React.useState("all")

  // Simulated nearby crops based on selected location
  const nearbyCrops = selectedLocation 
    ? crops.filter(c => c.distance <= radiusFilter[0]).slice(0, 3)
    : []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
          <p className="text-muted-foreground">
            Discover crops and farmers near your location.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="size-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Map Filters</SheetTitle>
                <SheetDescription>
                  Customize your map view
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <Label>Search Radius (km)</Label>
                  <Slider
                    value={radiusFilter}
                    onValueChange={setRadiusFilter}
                    min={10}
                    max={500}
                    step={10}
                  />
                  <div className="text-sm text-muted-foreground">
                    Within {radiusFilter[0]} km
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Crop Type</Label>
                  <Select value={cropFilter} onValueChange={setCropFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Crops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Heatmap</Label>
                    <p className="text-xs text-muted-foreground">
                      Display demand density
                    </p>
                  </div>
                  <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Routes</Label>
                    <p className="text-xs text-muted-foreground">
                      Display delivery routes
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline">
            <Layers className="size-4 mr-2" />
            Layers
          </Button>
          <Button>
            <Navigation className="size-4 mr-2" />
            My Location
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[16/10] bg-muted">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
                
                {/* Heatmap overlay */}
                {showHeatmap && (
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 size-32 rounded-full bg-primary blur-3xl" />
                    <div className="absolute top-1/2 right-1/3 size-24 rounded-full bg-warning blur-2xl" />
                    <div className="absolute bottom-1/4 left-1/2 size-20 rounded-full bg-secondary blur-2xl" />
                  </div>
                )}
                
                {/* Map Markers */}
                {mapLocations.map((location, index) => {
                  const positions = [
                    { top: '20%', left: '25%' },
                    { top: '15%', left: '60%' },
                    { top: '45%', left: '35%' },
                    { top: '60%', left: '55%' },
                    { top: '75%', left: '40%' },
                  ]
                  const pos = positions[index % positions.length]
                  
                  return (
                    <button
                      key={location.id}
                      className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
                        "flex items-center justify-center size-10 rounded-full shadow-lg",
                        "hover:scale-110 hover:z-10",
                        selectedLocation?.id === location.id && "ring-2 ring-ring ring-offset-2",
                        mapTypeColors[location.type as keyof typeof mapTypeColors]
                      )}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <MapPin className="size-5" />
                    </button>
                  )
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow-lg">
                  <div className="text-xs font-medium mb-2">Legend</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-primary" />
                      <span className="text-xs">Farm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-secondary" />
                      <span className="text-xs">Market</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-warning" />
                      <span className="text-xs">Warehouse</span>
                    </div>
                  </div>
                </div>

                {/* Scale */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-0.5 bg-foreground" />
                    <span className="text-xs">50 km</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details Panel */}
        <div className="space-y-4">
          {selectedLocation ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex items-center justify-center size-10 rounded-lg",
                      mapTypeColors[selectedLocation.type as keyof typeof mapTypeColors]
                    )}>
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                      <CardDescription className="capitalize">{selectedLocation.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Production</div>
                      <div className="font-semibold">{selectedLocation.production.toLocaleString()} tonnes</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Distance</div>
                      <div className="font-semibold">~45 km</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Available Crops</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLocation.crops.map((crop) => (
                        <Badge key={crop} variant="secondary">{crop}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Navigation className="size-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline">
                      <Phone className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Crops */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nearby Crops</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nearbyCrops.map((crop) => (
                    <div key={crop.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{crop.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Star className="size-3 fill-warning text-warning" />
                          {crop.rating} • {crop.distance} km away
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹{crop.price}</div>
                        <div className="text-xs text-muted-foreground">per {crop.unit}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Info className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-1">Select a Location</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a marker to view details
                </p>
              </CardContent>
            </Card>
          )}

          {/* Location List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mapLocations.map((location) => (
                <button
                  key={location.id}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                    "hover:bg-muted/50",
                    selectedLocation?.id === location.id && "bg-muted border-primary"
                  )}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className={cn(
                    "flex items-center justify-center size-8 rounded-lg",
                    mapTypeColors[location.type as keyof typeof mapTypeColors]
                  )}>
                    <MapPin className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{location.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{location.type}</div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

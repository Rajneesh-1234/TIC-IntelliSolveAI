"use client"

import * as React from "react"
import { MapPin, Layers, Filter, Download, BarChart3 } from "lucide-react"

import { cn } from "@/lib/utils"
import { regionData } from "@/lib/mock-data"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Simulated region positions on map
const regionPositions: Record<string, { top: string; left: string }> = {
  Maharashtra: { top: '55%', left: '25%' },
  Punjab: { top: '20%', left: '30%' },
  Haryana: { top: '25%', left: '35%' },
  UP: { top: '30%', left: '50%' },
  MP: { top: '45%', left: '40%' },
  AP: { top: '70%', left: '45%' },
}

export default function GovernmentMapPage() {
  const [selectedRegion, setSelectedRegion] = React.useState<typeof regionData[0] | null>(null)
  const [mapView, setMapView] = React.useState("production")
  const [cropFilter, setCropFilter] = React.useState("all")

  const maxProduction = Math.max(...regionData.map(r => r.production))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map Analytics</h1>
          <p className="text-muted-foreground">
            Analyze agricultural production and distribution across regions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Crops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="pulses">Pulses</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Map View Tabs */}
      <Tabs value={mapView} onValueChange={setMapView} className="space-y-4">
        <TabsList>
          <TabsTrigger value="production">Production Heatmap</TabsTrigger>
          <TabsTrigger value="farmers">Farmer Distribution</TabsTrigger>
          <TabsTrigger value="prices">Price Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="m-0">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] bg-muted">
                  {/* India outline simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px'
                    }} />
                    
                    {/* Region Markers with Production Intensity */}
                    {regionData.map((region) => {
                      const pos = regionPositions[region.region]
                      const intensity = region.production / maxProduction
                      const size = 40 + (intensity * 40) // 40-80px based on production
                      
                      return (
                        <button
                          key={region.region}
                          className={cn(
                            "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
                            "rounded-full flex items-center justify-center text-xs font-bold",
                            "hover:scale-110 hover:z-10",
                            selectedRegion?.region === region.region && "ring-2 ring-ring ring-offset-2"
                          )}
                          style={{ 
                            top: pos.top, 
                            left: pos.left,
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: `oklch(0.55 0.18 145 / ${0.3 + intensity * 0.7})`,
                          }}
                          onClick={() => setSelectedRegion(region)}
                        >
                          <span className="text-primary-foreground text-[10px]">
                            {(region.production / 1000).toFixed(0)}k
                          </span>
                        </button>
                      )
                    })}

                    {/* Production Legend */}
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow-lg">
                      <div className="text-xs font-medium mb-2">Production (tonnes)</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded bg-gradient-to-r from-primary/30 to-primary" />
                        <div className="flex justify-between w-full text-[10px] text-muted-foreground">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Region Details */}
            <div className="space-y-4">
              {selectedRegion ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedRegion.region}</CardTitle>
                    <CardDescription>Regional statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Production</span>
                        <span className="font-bold">{selectedRegion.production.toLocaleString()} tonnes</span>
                      </div>
                      <Progress value={(selectedRegion.production / maxProduction) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold">{selectedRegion.farmers.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Farmers</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold">₹{selectedRegion.avgPrice}</div>
                        <div className="text-xs text-muted-foreground">Avg Price/kg</div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <BarChart3 className="size-4 mr-2" />
                      View Detailed Report
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MapPin className="size-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">Select a Region</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on a region to view statistics
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Region Ranking */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Production Ranking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[...regionData]
                    .sort((a, b) => b.production - a.production)
                    .map((region, index) => (
                      <button
                        key={region.region}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                          "hover:bg-muted/50",
                          selectedRegion?.region === region.region && "bg-muted border-primary"
                        )}
                        onClick={() => setSelectedRegion(region)}
                      >
                        <div className={cn(
                          "flex items-center justify-center size-7 rounded-full text-xs font-bold",
                          index === 0 && "bg-warning/20 text-warning",
                          index === 1 && "bg-muted text-muted-foreground",
                          index === 2 && "bg-warning/10 text-warning",
                          index > 2 && "bg-muted/50 text-muted-foreground"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{region.region}</div>
                          <div className="text-xs text-muted-foreground">
                            {region.farmers.toLocaleString()} farmers
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{(region.production / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-muted-foreground">tonnes</div>
                        </div>
                      </button>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="farmers" className="m-0">
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Farmer Distribution View</h3>
              <p className="text-muted-foreground">
                Interactive map showing farmer density across regions
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prices" className="m-0">
          <Card>
            <CardContent className="py-12 text-center">
              <BarChart3 className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Price Analysis View</h3>
              <p className="text-muted-foreground">
                Regional price variations and market trends
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

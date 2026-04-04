"use client"

import * as React from "react"
import { MapPin, Navigation, Users, TrendingUp, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Nearby buyers data
const nearbyBuyers = [
  { id: 1, name: "Krishna Traders", type: "Wholesaler", distance: 15, demand: ["Tomatoes", "Onions"], rating: 4.8 },
  { id: 2, name: "Patel Mills", type: "Processor", distance: 28, demand: ["Rice", "Wheat"], rating: 4.9 },
  { id: 3, name: "Green Mart", type: "Retailer", distance: 8, demand: ["Vegetables"], rating: 4.5 },
  { id: 4, name: "Metro Foods", type: "Supermarket", distance: 35, demand: ["All Crops"], rating: 4.7 },
]

// Market positions simulation
const marketPositions = [
  { top: '25%', left: '30%' },
  { top: '40%', left: '60%' },
  { top: '55%', left: '25%' },
  { top: '70%', left: '55%' },
]

export default function FarmerMapPage() {
  const [selectedBuyer, setSelectedBuyer] = React.useState<typeof nearbyBuyers[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
          <p className="text-muted-foreground">
            Find nearby buyers and markets for your crops.
          </p>
        </div>
        <Button>
          <Navigation className="size-4 mr-2" />
          Center on My Farm
        </Button>
      </div>

      {/* Map and Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[16/10] bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
                
                {/* My Farm Marker (Center) */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: '50%', left: '45%' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/30 size-16" />
                    <div className="relative flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground shadow-lg">
                      <span className="text-lg">🌾</span>
                    </div>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-medium shadow">
                    My Farm
                  </div>
                </div>
                
                {/* Buyer Markers */}
                {nearbyBuyers.map((buyer, index) => {
                  const pos = marketPositions[index]
                  
                  return (
                    <button
                      key={buyer.id}
                      className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
                        "flex items-center justify-center size-10 rounded-full shadow-lg",
                        "hover:scale-110 hover:z-10",
                        "bg-secondary text-secondary-foreground",
                        selectedBuyer?.id === buyer.id && "ring-2 ring-ring ring-offset-2"
                      )}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setSelectedBuyer(buyer)}
                    >
                      <Users className="size-5" />
                    </button>
                  )
                })}

                {/* Distance lines */}
                {selectedBuyer && (
                  <svg className="absolute inset-0 pointer-events-none">
                    <line 
                      x1="45%" 
                      y1="50%" 
                      x2={marketPositions[nearbyBuyers.findIndex(b => b.id === selectedBuyer.id)].left} 
                      y2={marketPositions[nearbyBuyers.findIndex(b => b.id === selectedBuyer.id)].top}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="8 4"
                      className="text-primary"
                    />
                  </svg>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow-lg">
                  <div className="text-xs font-medium mb-2">Legend</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-primary" />
                      <span className="text-xs">My Farm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-secondary" />
                      <span className="text-xs">Buyers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buyers Panel */}
        <div className="space-y-4">
          {selectedBuyer ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      {selectedBuyer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedBuyer.name}</CardTitle>
                    <CardDescription>{selectedBuyer.type}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{selectedBuyer.distance} km</div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{selectedBuyer.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Looking for</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBuyer.demand.map((crop) => (
                      <Badge key={crop} variant="secondary">{crop}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <TrendingUp className="size-4 mr-2" />
                    Send Offer
                  </Button>
                  <Button variant="outline">
                    <Eye className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-1">Select a Buyer</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a marker to view buyer details
                </p>
              </CardContent>
            </Card>
          )}

          {/* Nearby Buyers List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nearby Buyers</CardTitle>
              <CardDescription>Sorted by distance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[...nearbyBuyers]
                .sort((a, b) => a.distance - b.distance)
                .map((buyer) => (
                  <button
                    key={buyer.id}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                      "hover:bg-muted/50",
                      selectedBuyer?.id === buyer.id && "bg-muted border-primary"
                    )}
                    onClick={() => setSelectedBuyer(buyer)}
                  >
                    <Avatar className="size-9">
                      <AvatarFallback className="text-sm bg-secondary/20 text-secondary">
                        {buyer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{buyer.name}</div>
                      <div className="text-xs text-muted-foreground">{buyer.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{buyer.distance} km</div>
                      <div className="text-xs text-muted-foreground">away</div>
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

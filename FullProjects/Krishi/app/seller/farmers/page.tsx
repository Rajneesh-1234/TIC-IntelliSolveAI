"use client"

import * as React from "react"
import { Search, Star, MapPin, Phone, BadgeCheck, Heart, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { farmers } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PreferredFarmersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [favorites, setFavorites] = React.useState<string[]>(
    farmers.filter(f => f.preferredStatus).map(f => f.id)
  )

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.crops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const preferredFarmers = filteredFarmers.filter(f => favorites.includes(f.id))
  const allFarmers = filteredFarmers

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Preferred Farmers</h1>
        <p className="text-muted-foreground">
          Connect with trusted farmers and build lasting relationships.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search farmers, locations, or crops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preferred" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preferred">
            Preferred ({preferredFarmers.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Farmers ({allFarmers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferred" className="m-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preferredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                farmer={farmer}
                isFavorite={favorites.includes(farmer.id)}
                onToggleFavorite={() => toggleFavorite(farmer.id)}
              />
            ))}
            {preferredFarmers.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-lg font-semibold">No preferred farmers yet</h3>
                <p className="text-muted-foreground">
                  Add farmers to your preferred list to see them here
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="m-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                farmer={farmer}
                isFavorite={favorites.includes(farmer.id)}
                onToggleFavorite={() => toggleFavorite(farmer.id)}
              />
            ))}
            {allFarmers.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold">No farmers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface FarmerCardProps {
  farmer: typeof farmers[0]
  isFavorite: boolean
  onToggleFavorite: () => void
}

function FarmerCard({ farmer, isFavorite, onToggleFavorite }: FarmerCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary/20 text-primary text-lg">
              {farmer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{farmer.name}</h3>
              {farmer.verified && (
                <BadgeCheck className="size-4 text-primary shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {farmer.location}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onToggleFavorite}
          >
            <Heart className={cn(
              "size-5 transition-colors",
              isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            )} />
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-warning text-warning" />
            <span className="font-medium">{farmer.rating}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            ₹{(farmer.totalSales / 1000).toFixed(0)}k in sales
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {farmer.crops.map((crop) => (
            <Badge key={crop} variant="secondary" className="text-xs">
              {crop}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1">
            <Phone className="size-4 mr-2" />
            Contact
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <MessageSquare className="size-4 mr-2" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import * as React from "react"
import { MapPin, Navigation, Users, TrendingUp, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function FarmerMapPage() {

  const mapRef = React.useRef<HTMLDivElement>(null)

  const [buyers, setBuyers] = React.useState<any[]>([])
  const [selectedBuyer, setSelectedBuyer] = React.useState<any | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  // ✅ LOAD GOOGLE MAP SCRIPT
  const loadMapScript = () => {
    if (window.google) return

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`
    script.async = true
    document.body.appendChild(script)

    script.onload = initMap
  }

  // ✅ INIT MAP
  const initMap = () => {
    if (!mapRef.current || !window.google) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.2599, lng: 77.4126 }, // Bhopal
      zoom: 10,
    })

    // FARM MARKER
    new window.google.maps.Marker({
      position: { lat: 23.2599, lng: 77.4126 },
      map,
      title: "My Farm 🌾",
    })

    // BUYERS MARKERS
    buyers.forEach((b: any) => {
      if (!b.lat || !b.lng) return

      const marker = new window.google.maps.Marker({
        position: { lat: b.lat, lng: b.lng },
        map,
        title: b.name,
      })

      marker.addListener("click", () => {
        setSelectedBuyer(b)
      })
    })
  }

  // ✅ FETCH BUYERS API
  const fetchBuyers = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:7000/api/buyers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed")

      // 👉 ADD LAT/LNG (IMPORTANT)
      const enriched = data.map((b: any) => ({
        ...b,
        lat: 23.2 + Math.random() * 0.2,
        lng: 77.3 + Math.random() * 0.2,
        distance: Math.floor(Math.random() * 50) + 5,
        rating: (Math.random() * 1 + 4).toFixed(1),
        demand: [b.crop]
      }))

      setBuyers(enriched)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchBuyers()
  }, [])

  // ✅ MAP INIT AFTER DATA
  React.useEffect(() => {
    if (buyers.length > 0) {
      loadMapScript()
      setTimeout(() => initMap(), 500)
    }
  }, [buyers])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Find nearby buyers
          </p>
        </div>

        <Button>
          <Navigation className="size-4 mr-2" />
          My Location
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ✅ GOOGLE MAP */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div
              ref={mapRef}
              className="w-full h-[400px]"
            />
          </CardContent>
        </Card>

        {/* RIGHT PANEL SAME */}
        <div className="space-y-4">

          {selectedBuyer ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedBuyer.name}</CardTitle>
                <CardDescription>{selectedBuyer.location}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="flex justify-between">
                  <span>{selectedBuyer.distance} km</span>
                  <span>⭐ {selectedBuyer.rating}</span>
                </div>

                <div>
                  <Badge>{selectedBuyer.crop}</Badge>
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
              <CardContent className="text-center py-10">
                Select a buyer
              </CardContent>
            </Card>
          )}

          {/* LIST SAME */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Buyers</CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                buyers.map((b) => (
                  <div
                    key={b.id}
                    className="p-2 border rounded mb-2 cursor-pointer"
                    onClick={() => setSelectedBuyer(b)}
                  >
                    {b.name} - {b.distance} km
                  </div>
                ))
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
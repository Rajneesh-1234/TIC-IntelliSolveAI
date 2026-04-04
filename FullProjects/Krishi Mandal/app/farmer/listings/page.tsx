"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ActiveListings() {

  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("farmerListings") || "[]")
    setListings(stored)
  }, [])

  const handleDelete = (id: number) => {

    const updated = listings.filter((item) => item.id !== id)

    setListings(updated)

    localStorage.setItem("farmerListings", JSON.stringify(updated))
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Listings</h1>
          <p className="text-muted-foreground">
            Manage your listed crops and track their status.
          </p>
        </div>

        <Button asChild>
          <Link href="/farmer/add-crop">
            <Plus className="size-4 mr-2" />
            Add New Listing
          </Link>
        </Button>
      </div>

      {/* Listings Table */}
      <Card>

        <CardHeader>
          <CardTitle>Your Crop Listings</CardTitle>
          <CardDescription>
            All crops currently listed in the marketplace.
          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-3">Crop</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {listings.map((item) => (

                  <tr key={item.id} className="border-b hover:bg-muted/50">

                    <td className="p-3 font-medium">{item.crop}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.price}</td>
                    <td className="p-3">{item.location}</td>

                    <td className="p-3">
                      <Badge variant="default">
                        {item.status}
                      </Badge>
                    </td>

                    <td className="p-3 text-right space-x-2">

                      <Button size="sm" variant="outline">
                        <Edit className="size-4 mr-1" />
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="size-4 mr-1" />
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {listings.length === 0 && (
              <p className="text-center text-muted-foreground py-6">
                No active listings found.
              </p>
            )}

          </div>

        </CardContent>

      </Card>

    </div>
  )
}
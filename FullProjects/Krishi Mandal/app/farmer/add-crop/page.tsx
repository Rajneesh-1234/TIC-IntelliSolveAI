"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddCropPage() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
    price: "",
    location: "",
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const newCrop = {
      id: Date.now(),
      ...formData,
      status: "Active",
    }

    const existing = JSON.parse(localStorage.getItem("farmerListings") || "[]")

    const updated = [...existing, newCrop]

    localStorage.setItem("farmerListings", JSON.stringify(updated))

    setFormData({
      crop: "",
      quantity: "",
      price: "",
      location: "",
    })

    router.push("/farmer/listings")
  }

  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-3xl font-bold">Add New Crop Listing</h1>
        <p className="text-muted-foreground">
          Fill the form to list your crop in the marketplace.
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Crop Details</CardTitle>
          <CardDescription>
            Provide information about the crop you want to sell.
          </CardDescription>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Crop Name</Label>
              <Input
                name="crop"
                placeholder="Example: Rice"
                value={formData.crop}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                name="quantity"
                placeholder="Example: 500 kg"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                name="price"
                placeholder="Example: ₹25/kg"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                placeholder="Example: Bihar"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Add Listing
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}
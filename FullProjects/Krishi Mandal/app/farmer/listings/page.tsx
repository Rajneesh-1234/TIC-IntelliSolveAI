"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function ActiveListings() {

  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    price: "",
    location: ""
  })

  // ✅ FETCH
  const fetchListings = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:7000/api/crops", {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setListings(Array.isArray(data) ? data : [])

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  // ✅ INPUT
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ ADD
  const handleAddCrop = async (e: any) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:7000/api/crops/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          cropName: formData.cropName,
          quantity: Number(formData.quantity),
          price: Number(formData.price),
          location: formData.location
        })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setFormData({ cropName: "", quantity: "", price: "", location: "" })
      setShowForm(false)
      fetchListings()

    } catch (err: any) {
      setError(err.message)
    }
  }

  // ✅ DELETE
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:7000/api/crops/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })

    setListings(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Active Listings</h1>

        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 size-4" />
          Add Crop
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleAddCrop} className="grid grid-cols-2 gap-4">

              <Input name="cropName" placeholder="Crop Name" value={formData.cropName} onChange={handleChange} required />
              <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />

              <Input name="quantity" type="number" placeholder="Quantity (kg)" value={formData.quantity} onChange={handleChange} required />
              <Input name="price" type="number" placeholder="Price ₹" value={formData.price} onChange={handleChange} required />

              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Save Crop
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <Card className="shadow-lg">

          <CardHeader>
            <CardTitle>Your Crop Listings</CardTitle>
            <CardDescription>All crops</CardDescription>
          </CardHeader>

          <CardContent>

            <div className="overflow-x-auto rounded-lg border">

              <table className="w-full text-sm">

                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Crop</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Location</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {listings.map(item => (
                    <tr key={item.id} className="border-t hover:bg-muted/40 transition">

                      <td className="p-3 font-medium">{item.cropName}</td>

                      <td className="p-3 text-center">{item.quantity} kg</td>

                      <td className="p-3 text-center font-semibold">
                        ₹{item.price}
                      </td>

                      <td className="p-3 text-center">{item.location}</td>

                      <td className="p-3 text-center">
                        <Badge className="bg-green-600">
                          {item.status || "ACTIVE"}
                        </Badge>
                      </td>

                      <td className="p-3 text-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

              {listings.length === 0 && (
                <p className="text-center py-6 text-muted-foreground">
                  No crops added yet
                </p>
              )}

            </div>

          </CardContent>

        </Card>
      )}
    </div>
  )
}
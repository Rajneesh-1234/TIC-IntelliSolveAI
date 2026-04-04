"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    localStorage.setItem("farmerProfile", JSON.stringify(profile))
    alert("Settings Saved Successfully")
  }

  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}
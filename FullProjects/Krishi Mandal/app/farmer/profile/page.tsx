"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"

export default function ProfilePage() {
  const { user, setUser } = useAppStore()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [location, setLocation] = useState(user?.location || "")

  const handleSave = () => {
    if (!user) return

    setUser({
      ...user,
      name,
      email,
      location,
    })

    alert("Profile Updated Successfully ✅")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">
            Role
          </label>
          <input
            value={user?.role}
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  )
}
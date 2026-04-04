"use client"

import {
  Users,
  Leaf,
  ShoppingCart,
  IndianRupee,
  ArrowUpRight
} from "lucide-react"

const stats = [
  { title: "Total Users", value: 1200, icon: Users, color: "text-blue-600" },
  { title: "Farmers", value: 600, icon: Leaf, color: "text-green-600" },
  { title: "Buyers", value: 400, icon: ShoppingCart, color: "text-purple-600" },
  { title: "Revenue", value: "₹2,50,000", icon: IndianRupee, color: "text-orange-600" }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of platform performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-gray-500 text-sm">{item.title}</h3>
                <Icon className={`size-5 ${item.color}`} />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl font-bold">{item.value}</p>
                <span className="flex items-center text-green-500 text-sm">
                  +12% <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Overview</h2>

          {/* Dummy Chart */}
          <div className="h-40 flex items-end gap-2">
            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <div
                key={i}
                className="bg-green-500 w-6 rounded"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">User Growth</h2>

          <div className="h-40 flex items-end gap-2">
            {[20, 40, 60, 50, 70, 90, 100].map((h, i) => (
              <div
                key={i}
                className="bg-blue-500 w-6 rounded"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>👤 Rahul registered</span>
              <span className="text-gray-400">2 min ago</span>
            </li>
            <li className="flex justify-between">
              <span>💰 Payment ₹1200 received</span>
              <span className="text-gray-400">10 min ago</span>
            </li>
            <li className="flex justify-between">
              <span>🚜 Farmer listed wheat</span>
              <span className="text-gray-400">30 min ago</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Add User
            </button>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Create Plan
            </button>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
              View Reports
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
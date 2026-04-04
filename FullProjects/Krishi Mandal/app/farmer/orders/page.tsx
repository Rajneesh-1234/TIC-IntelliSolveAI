"use client"

import * as React from "react"
import { Search, MoreHorizontal, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FarmerOrdersPage() {

  const [orders, setOrders] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")

  // ✅ FETCH
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:7000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setOrders(Array.isArray(data) ? data : [])

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchOrders()
  }, [])

  // ✅ UPDATE STATUS
  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `http://localhost:7000/api/orders/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!res.ok) throw new Error("Update failed")

      fetchOrders()

    } catch (err: any) {
      alert(err.message)
    }
  }

  // ✅ FILTER (FINAL FIX)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cropName?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      order.status === activeTab.toUpperCase()

    return matchesSearch && matchesTab
  })

  // ✅ STATS
  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "PENDING").length,
    processing: orders.filter(o => o.status === "PROCESSING").length,
    completed: orders.filter(o => o.status === "COMPLETED").length,
    revenue: orders
      .filter(o => o.status === "COMPLETED")
      .reduce((sum, o) => sum + o.total, 0),
  }

  const statusColors: any = {
    PENDING: "bg-yellow-500/20 text-yellow-500",
    PROCESSING: "bg-blue-500/20 text-blue-500",
    COMPLETED: "bg-green-500/20 text-green-500",
    CANCELLED: "bg-red-500/20 text-red-500"
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage orders & payments
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card><CardContent className="p-4">
          <div className="text-2xl font-bold">{orderStats.total}</div>
          <p>Total</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="text-2xl font-bold text-yellow-500">{orderStats.pending}</div>
          <p>Pending</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-500">{orderStats.processing}</div>
          <p>Processing</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="text-2xl font-bold text-green-500">{orderStats.completed}</div>
          <p>Completed</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">
            ₹{(orderStats.revenue / 1000).toFixed(1)}k
          </div>
          <p>Revenue</p>
        </CardContent></Card>
      </div>

      {/* SEARCH + TABS */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>

        <div className="flex justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">

              {loading ? (
                <p className="p-6">Loading...</p>
              ) : error ? (
                <p className="p-6 text-red-500">{error}</p>
              ) : (

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.orderId}</TableCell>

                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <Avatar className="size-7">
                              <AvatarFallback>
                                {order.buyerName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {order.buyerName}
                          </div>
                        </TableCell>

                        <TableCell>{order.cropName}</TableCell>
                        <TableCell>{order.quantity} kg</TableCell>
                        <TableCell>₹{order.total}</TableCell>

                        <TableCell>
                          <Badge className={cn(statusColors[order.status])}>
                            {order.status}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {order.status === "COMPLETED" ? (
                            <Badge className="bg-green-500/20 text-green-500">
                              Paid
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-200 text-gray-600">
                              Pending
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">

                              {order.status === "PENDING" && (
                                <>
                                  <DropdownMenuItem onClick={() => updateStatus(order.id, "PROCESSING")}>
                                    <Check className="mr-2 size-4" />
                                    Accept
                                  </DropdownMenuItem>

                                  <DropdownMenuItem onClick={() => updateStatus(order.id, "CANCELLED")}>
                                    <X className="mr-2 size-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}

                              {order.status === "PROCESSING" && (
                                <DropdownMenuItem onClick={() => updateStatus(order.id, "COMPLETED")}>
                                  <Check className="mr-2 size-4" />
                                  Complete + Payment
                                </DropdownMenuItem>
                              )}

                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>

                </Table>

              )}

            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
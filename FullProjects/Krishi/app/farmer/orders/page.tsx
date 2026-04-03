"use client"

import * as React from "react"
import { Search, MoreHorizontal, Check, X, MessageSquare, Eye, Package } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const farmerOrders = [
  {
    id: "ORD-001",
    buyer: "Krishna Traders",
    buyerId: "B001",
    crop: "Organic Tomatoes",
    quantity: 100,
    unit: "kg",
    pricePerUnit: 45,
    totalPrice: 4500,
    status: "completed",
    orderDate: "2026-03-25",
    deliveryDate: "2026-03-28",
  },
  {
    id: "ORD-002",
    buyer: "Patel Mills",
    buyerId: "B002",
    crop: "Basmati Rice",
    quantity: 500,
    unit: "kg",
    pricePerUnit: 85,
    totalPrice: 42500,
    status: "pending",
    orderDate: "2026-04-01",
    deliveryDate: "2026-04-05",
  },
  {
    id: "ORD-003",
    buyer: "Green Mart",
    buyerId: "B003",
    crop: "Fresh Onions",
    quantity: 200,
    unit: "kg",
    pricePerUnit: 30,
    totalPrice: 6000,
    status: "processing",
    orderDate: "2026-03-30",
    deliveryDate: "2026-04-02",
  },
  {
    id: "ORD-004",
    buyer: "Metro Foods",
    buyerId: "B004",
    crop: "Green Chilies",
    quantity: 50,
    unit: "kg",
    pricePerUnit: 60,
    totalPrice: 3000,
    status: "pending",
    orderDate: "2026-04-02",
    deliveryDate: "2026-04-06",
  },
  {
    id: "ORD-005",
    buyer: "Farm Fresh Co",
    buyerId: "B005",
    crop: "Organic Tomatoes",
    quantity: 150,
    unit: "kg",
    pricePerUnit: 45,
    totalPrice: 6750,
    status: "completed",
    orderDate: "2026-03-22",
    deliveryDate: "2026-03-25",
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  processing: "bg-secondary/20 text-secondary border-secondary/30",
  completed: "bg-success/20 text-success border-success/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
}

export default function FarmerOrdersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")

  const filteredOrders = farmerOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.crop.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || order.status === activeTab
    
    return matchesSearch && matchesTab
  })

  const orderStats = {
    total: farmerOrders.length,
    pending: farmerOrders.filter(o => o.status === "pending").length,
    processing: farmerOrders.filter(o => o.status === "processing").length,
    completed: farmerOrders.filter(o => o.status === "completed").length,
    totalRevenue: farmerOrders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.totalPrice, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage incoming orders from buyers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{orderStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{orderStats.pending}</div>
            <div className="text-sm text-muted-foreground">Awaiting Response</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/30 bg-secondary/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{orderStats.processing}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{orderStats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{(orderStats.totalRevenue / 1000).toFixed(1)}k</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Search */}
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {orderStats.pending > 0 && (
                <Badge className="ml-2 size-5 p-0 justify-center text-[10px]">
                  {orderStats.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7">
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                              {order.buyer.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {order.buyer}
                        </div>
                      </TableCell>
                      <TableCell>{order.crop}</TableCell>
                      <TableCell className="text-right">
                        {order.quantity} {order.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{order.pricePerUnit}/{order.unit}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{order.totalPrice.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn("capitalize", statusColors[order.status])}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{order.orderDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="size-4 mr-2" />
                              Contact Buyer
                            </DropdownMenuItem>
                            {order.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-success">
                                  <Check className="size-4 mr-2" />
                                  Accept Order
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <X className="size-4 mr-2" />
                                  Decline Order
                                </DropdownMenuItem>
                              </>
                            )}
                            {order.status === "processing" && (
                              <DropdownMenuItem className="text-success">
                                <Package className="size-4 mr-2" />
                                Mark as Delivered
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-lg font-semibold">No orders found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Pending orders will appear here
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Processing orders will appear here
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Completed orders will appear here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

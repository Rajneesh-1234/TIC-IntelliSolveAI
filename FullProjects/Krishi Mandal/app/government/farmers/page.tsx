"use client"

import * as React from "react"
import { Search, Filter, MoreHorizontal, Check, X, Eye, Download, BadgeCheck, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { farmers } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const regions = ["All Regions", "Maharashtra", "Punjab", "Haryana", "MP", "AP"]
const verificationStatus = ["All", "Verified", "Pending", "Rejected"]

// Extended farmer data for government view
const extendedFarmers = farmers.map((farmer, index) => ({
  ...farmer,
  registrationDate: farmer.joinedDate,
  landSize: [5, 12, 8, 15, 10][index % 5],
  status: index % 3 === 0 ? "pending" : "verified",
  documents: index % 3 === 0 ? "incomplete" : "complete",
}))

export default function FarmersDataPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [regionFilter, setRegionFilter] = React.useState("All Regions")
  const [statusFilter, setStatusFilter] = React.useState("All")

  const filteredFarmers = extendedFarmers.filter((farmer) => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = regionFilter === "All Regions" || farmer.location.includes(regionFilter)
    const matchesStatus = statusFilter === "All" || farmer.status === statusFilter.toLowerCase()
    
    return matchesSearch && matchesRegion && matchesStatus
  })

  const stats = {
    total: extendedFarmers.length,
    verified: extendedFarmers.filter(f => f.status === "verified").length,
    pending: extendedFarmers.filter(f => f.status === "pending").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmers Data</h1>
          <p className="text-muted-foreground">
            Manage and verify farmer registrations.
          </p>
        </div>
        <Button>
          <Download className="size-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Farmers</div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{stats.verified}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {verificationStatus.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Land Size</TableHead>
                <TableHead>Crops</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {farmer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">{farmer.name}</span>
                          {farmer.verified && (
                            <BadgeCheck className="size-4 text-primary" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{farmer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      {farmer.location}
                    </div>
                  </TableCell>
                  <TableCell>{farmer.landSize} acres</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {farmer.crops.slice(0, 2).map((crop) => (
                        <Badge key={crop} variant="secondary" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                      {farmer.crops.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{farmer.crops.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{farmer.registrationDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        "capitalize",
                        farmer.status === "verified" && "bg-success/20 text-success border-success/30",
                        farmer.status === "pending" && "bg-warning/20 text-warning border-warning/30"
                      )}
                    >
                      {farmer.status}
                    </Badge>
                  </TableCell>
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
                        {farmer.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-success">
                              <Check className="size-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <X className="size-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredFarmers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-4xl mb-4">👨‍🌾</div>
              <h3 className="text-lg font-semibold">No farmers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

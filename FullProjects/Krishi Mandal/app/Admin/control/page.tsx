"use client"

import * as React from "react"
import { Shield, AlertTriangle, Ban, CheckCircle, XCircle, Search, Filter, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const pendingApprovals = [
  { id: "F-2024-156", name: "Ramesh Yadav", type: "farmer", location: "Bihar", submittedDate: "2026-04-01", documents: "complete" },
  { id: "F-2024-157", name: "Sunil Kumar", type: "farmer", location: "UP", submittedDate: "2026-04-01", documents: "complete" },
  { id: "S-2024-089", name: "Krishna Traders", type: "seller", location: "Maharashtra", submittedDate: "2026-03-31", documents: "pending" },
  { id: "F-2024-158", name: "Mohan Lal", type: "farmer", location: "Rajasthan", submittedDate: "2026-03-30", documents: "complete" },
]

const flaggedAccounts = [
  { id: "F-2023-234", name: "Suspicious Farm Corp", type: "seller", reason: "Multiple failed transactions", severity: "high", flaggedDate: "2026-03-28" },
  { id: "F-2023-567", name: "Unknown Trader", type: "seller", reason: "Document mismatch", severity: "medium", flaggedDate: "2026-03-27" },
  { id: "F-2023-890", name: "Raju Farming", type: "farmer", reason: "Unusual activity pattern", severity: "low", flaggedDate: "2026-03-25" },
]

const recentActions = [
  { action: "Approved", user: "Amit Patel", type: "farmer", by: "Admin", date: "2026-04-02 10:30" },
  { action: "Banned", user: "Fake Traders Ltd", type: "seller", by: "Admin", date: "2026-04-02 09:15" },
  { action: "Rejected", user: "Invalid Farm", type: "farmer", by: "Admin", date: "2026-04-01 16:45" },
  { action: "Unbanned", user: "Krishna Mills", type: "seller", by: "Admin", date: "2026-04-01 14:20" },
]

export default function ControlPanelPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Shield className="size-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Control Panel</h1>
        </div>
        <p className="text-muted-foreground">
          Manage user approvals, review flagged accounts, and maintain platform integrity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{pendingApprovals.length}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ban className="size-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold">{flaggedAccounts.length}</div>
                <div className="text-sm text-muted-foreground">Flagged Accounts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-8 text-success" />
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Approved This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="size-8 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Rejected This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approvals
            <Badge className="ml-2 size-5 p-0 justify-center text-[10px]">
              {pendingApprovals.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Flagged Accounts
            <Badge variant="destructive" className="ml-2 size-5 p-0 justify-center text-[10px]">
              {flaggedAccounts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">Recent Actions</TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending" className="m-0 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search pending approvals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{item.id}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>Submitted: {item.submittedDate}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={cn(
                        item.documents === "complete" 
                          ? "bg-success/20 text-success border-success/30" 
                          : "bg-warning/20 text-warning border-warning/30"
                      )}
                    >
                      Docs: {item.documents}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="size-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="default">
                        <CheckCircle className="size-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="size-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Flagged Accounts Tab */}
        <TabsContent value="flagged" className="m-0 space-y-4">
          <div className="space-y-3">
            {flaggedAccounts.map((item) => (
              <Card key={item.id} className={cn(
                "border-l-4",
                item.severity === "high" && "border-l-destructive",
                item.severity === "medium" && "border-l-warning",
                item.severity === "low" && "border-l-secondary"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-destructive/20 text-destructive">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "capitalize",
                            item.severity === "high" && "bg-destructive/20 text-destructive border-destructive/30",
                            item.severity === "medium" && "bg-warning/20 text-warning border-warning/30",
                            item.severity === "low" && "bg-secondary/20 text-secondary border-secondary/30"
                          )}
                        >
                          {item.severity} risk
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Reason:</span> {item.reason}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Flagged on {item.flaggedDate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Ban className="size-4 mr-1" />
                            Ban Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Ban this account?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently ban {item.name} from the platform. 
                              This action cannot be easily undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Confirm Ban
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Actions Tab */}
        <TabsContent value="history" className="m-0">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-4 p-4">
                    <div className={cn(
                      "size-10 rounded-full flex items-center justify-center",
                      action.action === "Approved" && "bg-success/20",
                      action.action === "Banned" && "bg-destructive/20",
                      action.action === "Rejected" && "bg-warning/20",
                      action.action === "Unbanned" && "bg-secondary/20"
                    )}>
                      {action.action === "Approved" && <CheckCircle className="size-5 text-success" />}
                      {action.action === "Banned" && <Ban className="size-5 text-destructive" />}
                      {action.action === "Rejected" && <XCircle className="size-5 text-warning" />}
                      {action.action === "Unbanned" && <CheckCircle className="size-5 text-secondary" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        <span className={cn(
                          action.action === "Approved" && "text-success",
                          action.action === "Banned" && "text-destructive",
                          action.action === "Rejected" && "text-warning",
                          action.action === "Unbanned" && "text-secondary"
                        )}>
                          {action.action}
                        </span>
                        {" "}{action.user}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {action.type} • by {action.by}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {action.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

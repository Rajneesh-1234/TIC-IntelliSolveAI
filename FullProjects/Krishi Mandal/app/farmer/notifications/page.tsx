"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const notifications = [
  {
    id: 1,
    title: "New Order",
    message: "A seller placed order for your Rice crop.",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "Price Update",
    message: "Tomato prices increased in your region.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Government Scheme",
    message: "New subsidy scheme available for farmers.",
    time: "Yesterday",
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          All your recent updates will appear here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Latest activities in your account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-lg p-4 hover:bg-muted/50"
            >
              <Bell className="size-5 text-green-600 mt-1" />

              <div>
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-sm text-muted-foreground">
                  {item.message}
                </p>

                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            </div>
          ))}

        </CardContent>
      </Card>

    </div>
  )
}
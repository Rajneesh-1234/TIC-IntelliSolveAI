"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "New Offer Received",
    message: "Farmer Ravi Patel sent you a new wheat offer.",
    time: "2 mins ago",
    type: "info",
    read: false,
  },
  {
    id: 2,
    title: "Offer Accepted",
    message: "Your rice offer has been accepted by Suresh Yadav.",
    time: "10 mins ago",
    type: "success",
    read: true,
  },
  {
    id: 3,
    title: "Offer Rejected",
    message: "Your soybean offer was rejected.",
    time: "1 hour ago",
    type: "error",
    read: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Stay updated with your latest activities
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`transition hover:shadow-md ${
              !n.read ? "bg-muted/50" : ""
            }`}
          >
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              {/* Left Content */}
              <div className="flex items-start gap-3">

                {/* Indicator */}
                <span
                  className={`mt-1 size-2 rounded-full ${
                    n.type === "info"
                      ? "bg-blue-500"
                      : n.type === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                <div>
                  <h2 className="font-medium">{n.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {n.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {n.time}
                  </p>
                </div>

              </div>

              {/* Right Actions */}
              <div className="flex gap-2 w-full sm:w-auto">
                {!n.read && (
                  <Badge variant="secondary">New</Badge>
                )}

                <Button variant="outline" size="sm">
                  Mark Read
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
"use client"

import * as React from "react"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { reviews } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ratingBreakdown = [
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 23, percentage: 30 },
  { stars: 3, count: 5, percentage: 7 },
  { stars: 2, count: 2, percentage: 3 },
  { stars: 1, count: 0, percentage: 0 },
]

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">
          View and manage reviews from your transactions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overall Rating */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold">4.8</div>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-4",
                        star <= 4 ? "fill-warning text-warning" : "fill-warning/50 text-warning/50"
                      )}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Based on 75 reviews
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-sm w-3">{item.stars}</span>
                    <Star className="size-3 fill-warning text-warning" />
                    <Progress value={item.percentage} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground w-8">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Reviews</span>
                <span className="text-2xl font-bold">75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-2xl font-bold text-primary">+12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response Rate</span>
                <span className="text-2xl font-bold">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <MessageSquare className="size-4 mr-2" />
                Respond to Reviews
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ThumbsUp className="size-4 mr-2" />
                Request Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Reviews from your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Needs Attention</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex gap-4 p-4 rounded-lg border bg-card"
                >
                  <Avatar className="size-10 shrink-0">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {review.farmerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{review.farmerName}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.cropPurchased}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "size-4",
                              star <= review.rating
                                ? "fill-warning text-warning"
                                : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="size-3.5 mr-1" />
                        Helpful
                      </Button>
                      <Button size="sm" variant="ghost">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="positive" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Positive reviews will appear here
              </div>
            </TabsContent>

            <TabsContent value="negative" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Reviews needing attention will appear here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const initialReviews = [
  {
    id: 1,
    buyer: "Ravi Kumar",
    rating: 5,
    comment: "Very good quality rice. Fast delivery.",
    date: "12 Apr 2026",
  },
  {
    id: 2,
    buyer: "Amit Singh",
    rating: 4,
    comment: "Fresh tomatoes and good price.",
    date: "10 Apr 2026",
  },
  {
    id: 3,
    buyer: "Suresh Patel",
    rating: 3,
    comment: "Quality was okay but delivery was late.",
    date: "8 Apr 2026",
  },
]

export default function FarmerReviewsPage() {

  const [reviews] = useState(initialReviews)

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">
          See what buyers are saying about your crops.
        </p>
      </div>

      {/* Average Rating */}
      <Card>

        <CardHeader>
          <CardTitle>Average Rating</CardTitle>
          <CardDescription>
            Overall feedback from buyers
          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="flex items-center gap-3">

            <span className="text-4xl font-bold">
              {avgRating.toFixed(1)}
            </span>

            <div className="flex">
              {[1,2,3,4,5].map((star)=>(
                <Star
                  key={star}
                  className={`size-5 ${
                    star <= avgRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-muted-foreground">
              ({reviews.length} reviews)
            </span>

          </div>

        </CardContent>

      </Card>

      {/* Reviews List */}
      <Card>

        <CardHeader>
          <CardTitle>Buyer Reviews</CardTitle>
          <CardDescription>
            Feedback from people who bought your crops
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {reviews.map((review)=>(
            <div
              key={review.id}
              className="border rounded-lg p-4 space-y-2"
            >

              <div className="flex justify-between">

                <h3 className="font-semibold">
                  {review.buyer}
                </h3>

                <span className="text-sm text-muted-foreground">
                  {review.date}
                </span>

              </div>

              <div className="flex">
                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    className={`size-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                {review.comment}
              </p>

            </div>
          ))}

        </CardContent>

      </Card>

    </div>
  )
}
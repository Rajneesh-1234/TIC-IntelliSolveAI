"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function FarmerReviewsPage() {

  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ API CALL (ONLY SOURCE OF DATA)
  useEffect(() => {
    fetch("http://localhost:7000/api/reviews/farmer/1") // 👈 farmerId dynamic kar sakte ho
      .then((res) => {
        if (!res.ok) throw new Error("API failed")
        return res.json()
      })
      .then((data) => {
        console.log("API DATA:", data)

        // ✅ DIRECT SET (NO DUMMY)
        setReviews(
          data.map((item: any) => ({
            id: item.id,
            buyer: item.buyerName || item.buyer,
            rating: item.rating,
            comment: item.comment,
            date: item.date,
          }))
        )
      })
      .catch((err) => {
        console.error("ERROR:", err)
        setReviews([]) // empty fallback
      })
      .finally(() => setLoading(false))
  }, [])

  // ✅ AVERAGE RATING (SAFE)
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
      : 0

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

          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No reviews found
            </p>
          ) : (
            reviews.map((review)=>(
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
            ))
          )}

        </CardContent>

      </Card>

    </div>
  )
}
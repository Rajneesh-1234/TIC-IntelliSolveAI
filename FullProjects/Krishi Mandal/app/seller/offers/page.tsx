"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: 1,
    farmer: "Ravi Patel",
    crop: "Wheat",
    quantity: "50 Quintal",
    price: "₹2100/quintal",
    status: "Pending",
  },
  {
    id: 2,
    farmer: "Suresh Yadav",
    crop: "Rice",
    quantity: "30 Quintal",
    price: "₹2900/quintal",
    status: "Accepted",
  },
  {
    id: 3,
    farmer: "Amit Singh",
    crop: "Soybean",
    quantity: "40 Quintal",
    price: "₹4300/quintal",
    status: "Rejected",
  },
];

export default function OffersPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Offers</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your offers
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="h-full flex flex-col justify-between hover:shadow-lg transition"
          >
            <CardContent className="p-4 flex flex-col h-full">

  {/* Top Content */}
  <div className="space-y-3">

    <div className="flex items-start justify-between">
      <h2 className="font-semibold text-lg">{offer.crop}</h2>

      <Badge
        className={
          offer.status === "Accepted"
            ? "bg-green-500"
            : offer.status === "Rejected"
            ? "bg-red-500"
            : "bg-yellow-500"
        }
      >
        {offer.status}
      </Badge>
    </div>

    <p className="text-sm text-muted-foreground">
      👨‍🌾 {offer.farmer}
    </p>

    <p className="text-sm">
      📦 {offer.quantity}
    </p>

    <p className="text-sm">
      💰 {offer.price}
    </p>

  </div>

  {/* Buttons (BOTTOM FIXED ) */}
  <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-4">
    <Button variant="outline" className="w-full">
      View
    </Button>
  </div>

</CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
}
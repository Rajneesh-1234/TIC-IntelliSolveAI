"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const buyers = [
  {
    id: 1,
    name: "Ramesh Traders",
    location: "Bhopal",
    crop: "Wheat",
    price: "₹2200/quintal",
  },
  {
    id: 2,
    name: "Agro Market Ltd",
    location: "Indore",
    crop: "Rice",
    price: "₹3000/quintal",
  },
  {
    id: 3,
    name: "Green Farm Buyers",
    location: "Nagpur",
    crop: "Soybean",
    price: "₹4500/quintal",
  },
];

export default function BuyersPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold">Buyers</h1>
        <p className="text-muted-foreground">
          Find buyers for your crops and connect instantly
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search buyers..."
          className="pl-10"
        />
      </div>

      {/* Buyers List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buyers.map((buyer) => (
          <Card key={buyer.id}>
            <CardContent className="p-4 space-y-3">

              <h2 className="font-semibold text-lg">{buyer.name}</h2>

              <p className="text-sm text-muted-foreground">
                📍 {buyer.location}
              </p>

              <p className="text-sm">
                🌾 Crop: <span className="font-medium">{buyer.crop}</span>
              </p>

              <p className="text-sm">
                💰 Price: <span className="font-medium">{buyer.price}</span>
              </p>

              <Button className="w-full mt-2">
                Contact Buyer
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
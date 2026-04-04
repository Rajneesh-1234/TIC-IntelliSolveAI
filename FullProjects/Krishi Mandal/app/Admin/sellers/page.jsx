"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const sellers = [
  {
    id: 1,
    name: "Agro Market Ltd",
    location: "Indore",
    verified: true,
    deals: 25,
  },
  {
    id: 2,
    name: "Green Traders",
    location: "Bhopal",
    verified: false,
    deals: 10,
  },
  {
    id: 3,
    name: "Farm Connect",
    location: "Nagpur",
    verified: true,
    deals: 40,
  },
];

export default function GovernmentSellersPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Sellers</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage all registered sellers
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search sellers..." className="pl-10" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {sellers.map((seller) => (
          <Card
            key={seller.id}
            className="h-full flex flex-col justify-between hover:shadow-lg transition"
          >
            <CardContent className="p-4 flex flex-col h-full gap-4">

              {/* Top */}
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-lg">
                  {seller.name}
                </h2>

                <Badge
                  className={
                    seller.verified
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }
                >
                  {seller.verified ? "Verified" : "Pending"}
                </Badge>
              </div>

              {/* Info */}
              <div className="space-y-1 text-sm">
                <p>📍 {seller.location}</p>
                <p>📊 Deals: <span className="font-medium">{seller.deals}</span></p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2">
                <button className="w-full border rounded-md py-2 text-sm hover:bg-muted">
                  View
                </button>
                <button className="w-full bg-primary text-white rounded-md py-2 text-sm hover:opacity-90">
                  Manage
                </button>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
}
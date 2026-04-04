"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MapPin, Wheat, IndianRupee } from "lucide-react";

export default function BuyersPage() {

  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ FETCH FROM BACKEND
  const fetchBuyers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:7000/api/buyers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch buyers");

      setBuyers(Array.isArray(data) ? data : []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  // ✅ FILTER LOGIC
  const filteredBuyers = buyers.filter((b) => {
    const matchSearch =
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.location?.toLowerCase().includes(search.toLowerCase()) ||
      b.crop?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || b.crop?.toLowerCase() === filter;

    return matchSearch && matchFilter;
  });

  // ✅ STATS (DYNAMIC)
  const totalBuyers = buyers.length;
  const uniqueCrops = new Set(buyers.map(b => b.crop)).size;
  const avgPrice =
    buyers.length > 0
      ? buyers.reduce((sum, b) => sum + b.price, 0) / buyers.length
      : 0;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Buyers Marketplace</h1>
        <p className="text-muted-foreground">
          Connect with verified buyers and sell smarter 🚀
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Buyers</p>
          <h2 className="text-2xl font-bold">{totalBuyers}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Crop Types</p>
          <h2 className="text-2xl font-bold">{uniqueCrops}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Avg Price</p>
          <h2 className="text-2xl font-bold">₹{avgPrice.toFixed(0)}</h2>
        </CardContent></Card>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search buyers, crop, location..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "wheat", "rice", "soybean"].map((c) => (
            <Button
              key={c}
              variant={filter === c ? "default" : "outline"}
              onClick={() => setFilter(c)}
              className="capitalize"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {/* LOADING / ERROR */}
      {loading && <p>Loading buyers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* BUYERS GRID */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {filteredBuyers.map((buyer) => (
            <Card key={buyer.id} className="hover:shadow-xl transition hover:-translate-y-1">
              <CardContent className="p-5 space-y-4">

                {/* TOP */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {buyer.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-semibold">{buyer.name}</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} /> {buyer.location}
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex justify-between text-sm">
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    <Wheat size={12} /> {buyer.crop}
                  </Badge>

                  <span className="flex items-center gap-1 font-medium">
                    <IndianRupee size={14} /> {buyer.price}
                  </span>
                </div>

                {/* ACTION */}
                <Button className="w-full">
                  Contact Buyer
                </Button>

              </CardContent>
            </Card>
          ))}

        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredBuyers.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No buyers found 😔
        </div>
      )}

    </div>
  );
}
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Jan", wheat: 2000, rice: 2500 },
  { name: "Feb", wheat: 2100, rice: 2600 },
  { name: "Mar", wheat: 2200, rice: 2700 },
  { name: "Apr", wheat: 2150, rice: 2650 },
  { name: "May", wheat: 2300, rice: 2800 },
];

export default function GovernmentMarketPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Market Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Live crop price trends & insights
        </p>
      </div>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Markets</p>
            <h2 className="text-xl font-bold">24</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Wheat Price</p>
            <h2 className="text-xl font-bold">₹2200</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Rice Price</p>
            <h2 className="text-xl font-bold">₹2700</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Growth</p>
            <h2 className="text-xl font-bold text-green-500">+8%</h2>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Line Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Price Trends</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wheat" strokeWidth={2} />
                <Line type="monotone" dataKey="rice" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 📊 Bar Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Market Comparison</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wheat" />
                <Bar dataKey="rice" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
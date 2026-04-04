"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  {
    id: 1,
    title: "Monthly Market Report",
    desc: "Detailed crop prices and trends",
    date: "April 2026",
  },
  {
    id: 2,
    title: "Farmer Activity Report",
    desc: "Farmer participation and sales data",
    date: "March 2026",
  },
  {
    id: 3,
    title: "Seller Performance Report",
    desc: "Top sellers and transaction insights",
    date: "March 2026",
  },
];

export default function GovernmentReportsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Download and analyze system reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <h2 className="text-xl font-bold">12</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Generated This Month</p>
            <h2 className="text-xl font-bold">4</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Downloads</p>
            <h2 className="text-xl font-bold">120+</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Growth</p>
            <h2 className="text-xl font-bold text-green-500">+12%</h2>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="hover:shadow-lg transition"
          >
            <CardContent className="p-4 flex flex-col h-full gap-4">

              {/* Info */}
              <div>
                <h2 className="font-semibold text-lg">
                  {report.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {report.desc}
                </p>
                <p className="text-xs mt-1 text-muted-foreground">
                  📅 {report.date}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-auto  flex flex-col sm:flex-row gap-5">
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
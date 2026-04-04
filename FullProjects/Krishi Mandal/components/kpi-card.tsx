"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary" | "success" | "warning"
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon,
  className,
  variant = "default",
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === 0

  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/10 border-primary/20",
    secondary: "bg-secondary/10 border-secondary/20",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
  }

  const iconBgStyles = {
    default: "bg-muted",
    primary: "bg-primary/20",
    secondary: "bg-secondary/20",
    success: "bg-success/20",
    warning: "bg-warning/20",
  }

  const iconColorStyles = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning",
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-lg",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-3xl font-bold tracking-tight">
              {typeof value === "number" 
                ? value.toLocaleString() 
                : value}
            </span>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className={cn(
                  "flex items-center gap-0.5 text-sm font-medium",
                  isPositive && "text-success",
                  isNegative && "text-destructive",
                  isNeutral && "text-muted-foreground"
                )}>
                  {isPositive && <TrendingUp className="size-3.5" />}
                  {isNegative && <TrendingDown className="size-3.5" />}
                  {isNeutral && <Minus className="size-3.5" />}
                  {isPositive && "+"}
                  {change}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {changeLabel}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "flex size-12 items-center justify-center rounded-xl",
              iconBgStyles[variant]
            )}>
              <div className={cn("size-6", iconColorStyles[variant])}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

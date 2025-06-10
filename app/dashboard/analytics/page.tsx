"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users, Activity, AlertTriangle } from "lucide-react"
import { AnalyticsCharts } from "@/components/analytics-charts"

const monthlyData = [
  { month: "Jan", patients: 65, predictions: 58, accuracy: 89 },
  { month: "Feb", patients: 72, predictions: 68, accuracy: 94 },
  { month: "Mar", patients: 85, predictions: 80, accuracy: 94 },
  { month: "Apr", patients: 78, predictions: 75, accuracy: 96 },
  { month: "May", patients: 92, predictions: 88, accuracy: 96 },
  { month: "Jun", patients: 88, predictions: 85, accuracy: 97 },
]

const riskDistribution = [
  { name: "Low Risk", value: 65 },
  { name: "Medium Risk", value: 25 },
  { name: "High Risk", value: 10 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" /> Last 6 Months
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">480</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts monthlyData={monthlyData} riskDistribution={riskDistribution} />
    </div>
  )
} 
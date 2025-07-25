"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Brand colors: pink and purple
const BRAND_COLORS = ["#ec4899", "#a21caf", "#f472b6", "#c084fc"];

interface AnalyticsChartsProps {
  monthlyData: Array<{
    month: string
    patients: number
    predictions: number
    accuracy: number
  }>
  riskDistribution: Array<{
    name: string
    value: number
  }>
  ageRiskDistribution: Array<{
    ageGroup: string
    High: number
    Medium: number
    Low: number
  }>
  preUltrasoundData: Array<any>
  postUltrasoundData: Array<any>
  ultrasoundFeatures: string[]
}

export function AnalyticsCharts({ monthlyData, riskDistribution, ageRiskDistribution, preUltrasoundData, postUltrasoundData, ultrasoundFeatures }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Patient Growth & Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Actual Patients"
                />
                <Line
                  type="monotone"
                  dataKey="predictions"
                  stroke="#a21caf"
                  strokeWidth={2}
                  name="AI Predictions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Pre-menopausal: Ultrasound Features by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={preUltrasoundData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                {ultrasoundFeatures.map((feature, idx) => (
                  <Bar
                    key={feature}
                    dataKey={feature}
                    stackId="a"
                    fill={BRAND_COLORS[idx % BRAND_COLORS.length]}
                    name={feature}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Post-menopausal: Ultrasound Features by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={postUltrasoundData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                {ultrasoundFeatures.map((feature, idx) => (
                  <Bar
                    key={feature}
                    dataKey={feature}
                    stackId="a"
                    fill={BRAND_COLORS[idx % BRAND_COLORS.length]}
                    name={feature}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution by Risk Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageRiskDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="High" stackId="a" fill="#ec4899" name="High Risk" />
                <Bar dataKey="Medium" stackId="a" fill="#a21caf" name="Medium Risk" />
                <Bar dataKey="Low" stackId="a" fill="#f472b6" name="Low Risk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
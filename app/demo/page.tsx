'use client'

import { Header } from "@/components/header"
import { PredictionDemo } from "@/components/prediction-demo"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="pt-24">
        <PredictionDemo />
      </div>
    </div>
  )
} 
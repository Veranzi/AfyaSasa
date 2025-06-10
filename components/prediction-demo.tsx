"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, ArrowRight, MapPin, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PatientGrowthChart } from "@/components/patient-growth-chart"
import { RiskDistributionPieChart } from "@/components/risk-distribution-pie-chart"

export function PredictionDemo() {
  const [currentStep, setCurrentStep] = useState(0) // 0: Intro, 1: Symptom Input, 2: Risk Result
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    symptoms: "",
    size: "",
    type: "",
    painLevel: "", // New field for pain level
    menstrualIrregularity: "", // New field
    bloating: "", // New field
    nauseaVomiting: "", // New field
    familyHistory: "", // New field
    sexualDiscomfort: "", // New field
  })

  // Sample data for AnalyticsCharts - replace with actual prediction data later
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

  const handleStartRiskCheck = () => {
    setCurrentStep(1) // Move to symptom input
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setCurrentStep(2) // Move to risk result
    }, 3000)
  }

  const resetDemo = () => {
    setIsAnalyzing(false)
    setFormData({
      age: "",
      symptoms: "",
      size: "",
      type: "",
      painLevel: "",
      menstrualIrregularity: "",
      bloating: "",
      nauseaVomiting: "",
      familyHistory: "",
      sexualDiscomfort: "",
    })
    setCurrentStep(0) // Reset to intro
  }

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {currentStep === 0 && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="p-8 bg-purple-50 rounded-2xl shadow-xl flex flex-col items-center justify-center">
              <div className="p-4 bg-purple-100 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-16 h-16 text-purple-600"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v.1c0 2.22 1.45 4.12 3.51 4.77C14.05 9.22 15.5 7.32 15.5 5.1V5a3 3 0 0 0-3-3z" />
                  <path d="M12 11c-2.45 0-4.78.75-6.73 2.05-.34.22-.57.51-.71.86A6.13 6.13 0 0 0 4 16.5V22h16v-5.5a6.13 6.13 0 0 0-.56-2.59c-.14-.35-.37-.64-.71-.86C16.78 11.75 14.45 11 12 11z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-purple-900 mb-4">THE CHOSEN ONE</h2>
              <p className="text-gray-700 mb-8">Your personal assistant for ovarian health</p>
              <Button
                onClick={handleStartRiskCheck}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 py-3 text-lg"
              >
                START RISK CHECK
              </Button>
              <p className="text-sm text-gray-500 mt-4">Why it matters?</p>
            </div>
          </div>
        )}

        {currentStep > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column: Symptom Input Form / Risk Result */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentStep === 1 && (<><TrendingUp className="h-5 w-5 text-purple-600" />Symptom Input</>)}
                    {currentStep === 2 && (<><CheckCircle className="h-5 w-5 text-green-600" />Risk Result</>)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <div className="space-y-6 text-left">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          placeholder="e.g., 30"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="painLevel">Pain level</Label>
                        <Select
                          value={formData.painLevel}
                          onValueChange={(value) => setFormData({ ...formData, painLevel: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pain level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="mild">Mild</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="severe">Severe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="menstrualIrregularity">Menstrual Irregularity</Label>
                        <Select
                          value={formData.menstrualIrregularity}
                          onValueChange={(value) => setFormData({ ...formData, menstrualIrregularity: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bloating">Bloating</Label>
                        <Select
                          value={formData.bloating}
                          onValueChange={(value) => setFormData({ ...formData, bloating: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="nauseaVomiting">Nausea or vomiting</Label>
                        <Select
                          value={formData.nauseaVomiting}
                          onValueChange={(value) => setFormData({ ...formData, nauseaVomiting: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="familyHistory">Family History of ovarian cysts</Label>
                        <Select
                          value={formData.familyHistory}
                          onValueChange={(value) => setFormData({ ...formData, familyHistory: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sexualDiscomfort">Sexual discomfort</Label>
                        <Select
                          value={formData.sexualDiscomfort}
                          onValueChange={(value) => setFormData({ ...formData, sexualDiscomfort: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={handleAnalyze}
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                        disabled={isAnalyzing || !formData.age || !formData.painLevel || !formData.menstrualIrregularity || !formData.bloating || !formData.nauseaVomiting || !formData.familyHistory || !formData.sexualDiscomfort}
                      >
                        {isAnalyzing ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "SEE MY RISK"
                        )}
                      </Button>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <Badge className="bg-orange-500 text-white px-4 py-2 rounded-full text-base mb-4">Moderate</Badge>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          We recommend visiting a gynecologist within 14 days
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Based on your symptoms, we identified potential hormonal imbalance indicators.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center gap-2 text-purple-600 hover:underline">
                          <ArrowRight className="h-4 w-4" /> Learn more about types of ovarian cysts
                        </a>
                        <a href="#" className="flex items-center gap-2 text-purple-600 hover:underline">
                          <MapPin className="h-4 w-4" /> Find nearby healthcare provider
                        </a>
                      </div>
                      <p className="text-gray-500 text-xs mt-4">
                        Remember, most cysts are harmless. We're here for support.
                      </p>
                      <Button onClick={resetDemo} variant="outline" className="w-full">
                        Try Another Case
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Right Column: Patient Growth Chart */}
              <PatientGrowthChart monthlyData={monthlyData} />
            </div>

            {/* Risk Distribution Pie Chart */}
            <div className="mt-8">
              <RiskDistributionPieChart riskDistribution={riskDistribution} />
            </div>

            {/* LLM Interaction Section */}
            <Card className="shadow-lg mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Chat with our AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {currentStep === 2 ? (
                    "Here are recommendations based on your prediction: [Placeholder for actual recommendations]. Ask me anything else!"
                  ) : (
                    "Ask me anything about ovarian cysts, symptoms, treatments, or our platform!"
                  )}
                </p>
                <div className="flex space-x-2">
                  <Input placeholder="Type your question here..." className="flex-1" />
                  <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
                </div>
                <div className="bg-gray-100 p-4 rounded-md min-h-[100px] text-gray-700">
                  <p>AI Assistant: Hello! How can I help you today?</p>
                  {/* Placeholder for LLM responses */}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

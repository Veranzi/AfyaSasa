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
import { Checkbox } from "@/components/ui/checkbox"

export function PredictionDemo() {
  const [currentStep, setCurrentStep] = useState(0) // 0: Intro, 1: Symptom Input, 2: Risk Result
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const symptomOptions = [
    "Bloating",
    "Fatigue",
    "Irregular periods",
    "Nausea",
    "Pelvic pain",
  ];
  const [formData, setFormData] = useState({
    age: "45",
    menopauseStatus: "Pre-menopausal",
    cystSize: "4.2",
    cystGrowthRate: "0.3",
    ca125: "35",
    ultrasoundFeatures: "Simple cyst",
    symptoms: ["Pelvic pain", "Nausea"],
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
      age: "45",
      menopauseStatus: "Pre-menopausal",
      cystSize: "4.2",
      cystGrowthRate: "0.3",
      ca125: "35",
      ultrasoundFeatures: "Simple cyst",
      symptoms: ["Pelvic pain", "Nausea"],
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
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-[80vh]">
            {/* Form Section (Left) */}
            <div className="h-[80vh] flex flex-col">
              <Card className="shadow-lg flex-1 min-h-0 h-full">
                <div className="overflow-y-auto h-full px-2">
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
                          <Label htmlFor="menopauseStatus">Menopause Status</Label>
                          <Select
                            value={formData.menopauseStatus}
                            onValueChange={(value) => setFormData({ ...formData, menopauseStatus: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pre-menopausal">Pre-menopausal</SelectItem>
                              <SelectItem value="Post-menopausal">Post-menopausal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="cystSize">Cyst Size (cm)</Label>
                          <Input
                            id="cystSize"
                            placeholder="e.g., 4.2"
                            value={formData.cystSize}
                            onChange={(e) => setFormData({ ...formData, cystSize: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cystGrowthRate">Cyst Growth Rate (cm/month)</Label>
                          <Input
                            id="cystGrowthRate"
                            placeholder="e.g., 0.3"
                            value={formData.cystGrowthRate}
                            onChange={(e) => setFormData({ ...formData, cystGrowthRate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ca125">CA-125 Level</Label>
                          <Input
                            id="ca125"
                            placeholder="e.g., 35"
                            value={formData.ca125}
                            onChange={(e) => setFormData({ ...formData, ca125: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ultrasoundFeatures">Ultrasound Features</Label>
                          <Select
                            value={formData.ultrasoundFeatures}
                            onValueChange={(value) => setFormData({ ...formData, ultrasoundFeatures: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select feature" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hemorrhagic cyst">Hemorrhagic cyst</SelectItem>
                              <SelectItem value="Septated cyst">Septated cyst</SelectItem>
                              <SelectItem value="Simple cyst">Simple cyst</SelectItem>
                              <SelectItem value="Solid mass">Solid mass</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Reported Symptoms</Label>
                          <div className="flex flex-col gap-2">
                            {symptomOptions.map((symptom) => (
                              <label key={symptom} className="flex items-center gap-2">
                                <Checkbox
                                  checked={formData.symptoms.includes(symptom)}
                                  onCheckedChange={(checked) => {
                                    setFormData((prev) => {
                                      const current = Array.isArray(prev.symptoms) ? prev.symptoms : [];
                                      if (checked) {
                                        // Add if not present
                                        return { ...prev, symptoms: Array.from(new Set([...current, symptom])) };
                                      } else {
                                        // Remove
                                        return { ...prev, symptoms: current.filter((s) => s !== symptom) };
                                      }
                                    });
                                  }}
                                />
                                <span>{symptom}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={handleAnalyze}
                          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                          disabled={isAnalyzing || !formData.age || !formData.menopauseStatus || !formData.cystSize || !formData.cystGrowthRate || !formData.ca125 || !formData.ultrasoundFeatures || !formData.symptoms.length}
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
                </div>
              </Card>
            </div>
            {/* Chat Section (Right) */}
            <div className="h-[80vh] flex flex-col">
              <Card className="shadow-lg flex-1 min-h-0 h-full">
                <div className="overflow-y-auto h-full px-2">
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
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

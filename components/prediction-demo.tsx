"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

export function PredictionDemo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    symptoms: "",
    size: "",
    type: "",
  })

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  const resetDemo = () => {
    setShowResults(false)
    setFormData({ age: "", symptoms: "", size: "", type: "" })
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Live AI Prediction Demo</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our AI model in action. Input patient data to see real-time cyst growth predictions and treatment
            recommendations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Patient Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      placeholder="e.g., 32"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Cyst Size (cm)</Label>
                    <Input
                      id="size"
                      placeholder="e.g., 4.2"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Cyst Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cyst type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="functional">Functional Cyst</SelectItem>
                      <SelectItem value="dermoid">Dermoid Cyst</SelectItem>
                      <SelectItem value="endometrioma">Endometrioma</SelectItem>
                      <SelectItem value="cystadenoma">Cystadenoma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="symptoms">Primary Symptoms</Label>
                  <Select
                    value={formData.symptoms}
                    onValueChange={(value) => setFormData({ ...formData, symptoms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary symptoms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No symptoms</SelectItem>
                      <SelectItem value="mild">Mild pelvic pain</SelectItem>
                      <SelectItem value="moderate">Moderate pain & bloating</SelectItem>
                      <SelectItem value="severe">Severe pain & irregular periods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                  disabled={isAnalyzing || !formData.age || !formData.size || !formData.type || !formData.symptoms}
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Run AI Analysis"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI Prediction Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="animate-pulse">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-white animate-bounce" />
                        </div>
                        <p className="text-lg font-medium text-gray-700">Processing patient data...</p>
                        <p className="text-sm text-gray-500 mt-2">AI model analyzing risk factors</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing symptoms</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Processing imaging data</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Generating predictions</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                ) : showResults ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">Low Risk</div>
                        <div className="text-sm text-green-700">Malignancy Risk</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">15%</div>
                        <div className="text-sm text-yellow-700">Growth Probability</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900">Recommended Action</div>
                          <div className="text-sm text-blue-700">Monitor with ultrasound in 3 months</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-purple-900">Predicted Timeline</div>
                          <div className="text-sm text-purple-700">Stable size expected over 6 months</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-900">Cost Estimate</div>
                          <div className="text-sm text-green-700">$120 for monitoring protocol</div>
                        </div>
                      </div>
                    </div>

                    <Button onClick={resetDemo} variant="outline" className="w-full">
                      Try Another Case
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Enter patient data to see AI predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

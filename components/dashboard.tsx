import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Package, DollarSign, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react"

export function Dashboard() {
  const patients = [
    { name: "Sarah M.", age: 28, risk: "Low", status: "Monitoring", nextVisit: "2 weeks" },
    { name: "Maria K.", age: 34, risk: "Medium", status: "Treatment", nextVisit: "3 days" },
    { name: "Jennifer L.", age: 41, risk: "High", status: "Surgery", nextVisit: "Tomorrow" },
    { name: "Grace N.", age: 25, risk: "Low", status: "Resolved", nextVisit: "6 months" },
  ]

  const inventory = [
    { item: "Ultrasound Gel", stock: 85, threshold: 20, status: "good" },
    { item: "Contraceptive Pills", stock: 12, threshold: 15, status: "low" },
    { item: "Pain Medication", stock: 45, threshold: 25, status: "good" },
    { item: "Surgical Supplies", stock: 8, threshold: 10, status: "critical" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Provider Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights for healthcare providers managing ovarian cyst patients, inventory, and care
            coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Key Metrics */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Patients</p>
                      <p className="text-3xl font-bold text-gray-900">127</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">High Risk Cases</p>
                      <p className="text-3xl font-bold text-gray-900">8</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                    <span className="text-yellow-600">3 need immediate attention</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prediction Accuracy</p>
                      <p className="text-3xl font-bold text-gray-900">94.2%</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">Above target (90%)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                      <p className="text-3xl font-bold text-gray-900">$24.5K</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">This quarter</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Patient List */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Recent Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-600">Age {patient.age}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          patient.risk === "High" ? "destructive" : patient.risk === "Medium" ? "default" : "secondary"
                        }
                        className="mb-1"
                      >
                        {patient.risk} Risk
                      </Badge>
                      <div className="text-sm text-gray-600">{patient.status}</div>
                      <div className="text-xs text-gray-500">Next: {patient.nextVisit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Management */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Inventory Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.item}</span>
                      <Badge
                        variant={
                          item.status === "critical" ? "destructive" : item.status === "low" ? "default" : "secondary"
                        }
                      >
                        {item.stock} units
                      </Badge>
                    </div>
                    <Progress value={(item.stock / (item.threshold * 4)) * 100} className="h-2" />
                    <div className="text-xs text-gray-500">Threshold: {item.threshold} units</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

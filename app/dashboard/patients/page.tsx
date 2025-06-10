import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"

const patients = [
  { 
    id: "P001",
    name: "Sarah M.", 
    age: 28, 
    risk: "Low", 
    status: "Monitoring", 
    nextVisit: "2 weeks",
    lastVisit: "2024-03-15",
    condition: "Ovarian Cyst",
    contact: "+254 712 345 678"
  },
  { 
    id: "P002",
    name: "Maria K.", 
    age: 34, 
    risk: "Medium", 
    status: "Treatment", 
    nextVisit: "3 days",
    lastVisit: "2024-03-20",
    condition: "Endometriosis",
    contact: "+254 723 456 789"
  },
  { 
    id: "P003",
    name: "Jennifer L.", 
    age: 41, 
    risk: "High", 
    status: "Surgery", 
    nextVisit: "Tomorrow",
    lastVisit: "2024-03-25",
    condition: "Complex Cyst",
    contact: "+254 734 567 890"
  },
  { 
    id: "P004",
    name: "Grace N.", 
    age: 25, 
    risk: "Low", 
    status: "Resolved", 
    nextVisit: "6 months",
    lastVisit: "2024-03-10",
    condition: "Simple Cyst",
    contact: "+254 745 678 901"
  },
]

export default function PatientsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search patients..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {patient.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-600">ID: {patient.id} • Age {patient.age}</div>
                    <div className="text-sm text-gray-600">Condition: {patient.condition}</div>
                    <div className="text-sm text-gray-600">Contact: {patient.contact}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      patient.risk === "High" 
                        ? "destructive" 
                        : patient.risk === "Medium" 
                        ? "default" 
                        : "secondary"
                    }
                    className="mb-1"
                  >
                    {patient.risk} Risk
                  </Badge>
                  <div className="text-sm text-gray-600">{patient.status}</div>
                  <div className="text-xs text-gray-500">Last Visit: {patient.lastVisit}</div>
                  <div className="text-xs text-gray-500">Next: {patient.nextVisit}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
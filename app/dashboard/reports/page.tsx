import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Download,
  FileText,
  Calendar as CalendarIcon,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

const reports = [
  {
    id: "R001",
    title: "Monthly Patient Analysis",
    type: "Analytics",
    date: "2024-03-25",
    status: "Generated",
    format: "PDF",
    size: "2.4 MB",
    icon: BarChart3
  },
  {
    id: "R002",
    title: "Risk Distribution Report",
    type: "Statistics",
    date: "2024-03-24",
    status: "Generated",
    format: "PDF",
    size: "1.8 MB",
    icon: PieChart
  },
  {
    id: "R003",
    title: "Treatment Success Rates",
    type: "Analytics",
    date: "2024-03-23",
    status: "Generated",
    format: "PDF",
    size: "3.2 MB",
    icon: LineChart
  },
  {
    id: "R004",
    title: "Inventory Status Report",
    type: "Inventory",
    date: "2024-03-22",
    status: "Generated",
    format: "PDF",
    size: "1.5 MB",
    icon: FileText
  },
  {
    id: "R005",
    title: "Patient Demographics",
    type: "Statistics",
    date: "2024-03-21",
    status: "Generated",
    format: "PDF",
    size: "2.1 MB",
    icon: BarChart3
  }
]

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Pick a date range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statistics Reports</CardTitle>
            <PieChart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Reports</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search reports..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white">
                    <report.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-600">ID: {report.id} • {report.type}</div>
                    <div className="text-sm text-gray-600">Format: {report.format} • Size: {report.size}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    {report.status}
                  </Badge>
                  <div className="text-xs text-gray-500">Generated: {report.date}</div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
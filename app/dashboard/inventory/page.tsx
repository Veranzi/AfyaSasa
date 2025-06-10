import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, AlertTriangle, Package, ArrowUpRight } from "lucide-react"

const inventory = [
  {
    id: "I001",
    item: "Ultrasound Gel",
    stock: 85,
    threshold: 20,
    status: "good",
    category: "Diagnostic Supplies",
    lastRestock: "2024-03-15",
    supplier: "MedSupply Co.",
    location: "Storage Room A"
  },
  {
    id: "I002",
    item: "Contraceptive Pills",
    stock: 12,
    threshold: 15,
    status: "low",
    category: "Medications",
    lastRestock: "2024-03-10",
    supplier: "PharmaPlus",
    location: "Pharmacy"
  },
  {
    id: "I003",
    item: "Pain Medication",
    stock: 45,
    threshold: 25,
    status: "good",
    category: "Medications",
    lastRestock: "2024-03-20",
    supplier: "PharmaPlus",
    location: "Pharmacy"
  },
  {
    id: "I004",
    item: "Surgical Supplies",
    stock: 8,
    threshold: 10,
    status: "critical",
    category: "Surgical Equipment",
    lastRestock: "2024-03-05",
    supplier: "SurgiTech",
    location: "Storage Room B"
  },
  {
    id: "I005",
    item: "Disposable Gloves",
    stock: 150,
    threshold: 50,
    status: "good",
    category: "Safety Equipment",
    lastRestock: "2024-03-18",
    supplier: "MedSupply Co.",
    location: "Storage Room A"
  },
  {
    id: "I006",
    item: "Antibiotics",
    stock: 18,
    threshold: 20,
    status: "low",
    category: "Medications",
    lastRestock: "2024-03-12",
    supplier: "PharmaPlus",
    location: "Pharmacy"
  }
]

export default function InventoryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> new items this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">2</span> critical items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restock Orders</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> pending orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.5K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search inventory..." className="pl-8" />
        </div>
        <Button variant="outline">Filter by Category</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.item}</div>
                    <div className="text-sm text-gray-600">ID: {item.id} • {item.category}</div>
                    <div className="text-sm text-gray-600">Location: {item.location}</div>
                    <div className="text-sm text-gray-600">Supplier: {item.supplier}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      item.status === "critical"
                        ? "destructive"
                        : item.status === "low"
                        ? "default"
                        : "secondary"
                    }
                    className="mb-1"
                  >
                    {item.stock} units
                  </Badge>
                  <div className="w-[200px]">
                    <Progress value={(item.stock / (item.threshold * 4)) * 100} className="h-2" />
                  </div>
                  <div className="text-xs text-gray-500">Threshold: {item.threshold} units</div>
                  <div className="text-xs text-gray-500">Last Restock: {item.lastRestock}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
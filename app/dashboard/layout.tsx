import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              AfyaSasa
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Healthcare Dashboard</p>
          </div>
          <DashboardNav />
        </div>
      </div>
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  )
} 
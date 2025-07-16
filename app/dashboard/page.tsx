'use client'
import { Dashboard } from "@/components/dashboard"
import RoleGuard from "@/components/RoleGuard";
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardHomePage() {
  const router = useRouter();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "clinician") {
      router.replace("/demo");
    }
  }, [router]);
  return (
    <RoleGuard allowed={["clinician", "admin"]}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Dashboard />
      </div>
    </RoleGuard>
  );
} 
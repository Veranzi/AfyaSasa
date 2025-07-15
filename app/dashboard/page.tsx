import { Dashboard } from "@/components/dashboard"
import RoleGuard from "@/components/RoleGuard";

export default function DashboardHomePage() {
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
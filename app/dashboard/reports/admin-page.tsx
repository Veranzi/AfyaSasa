"use client";
import RoleGuard from "@/components/RoleGuard";

const DUMMY_REPORTS = [
  {
    id: "rep-201",
    name: "Ovarian Cyst Analysis",
    date: "2025-07-15T10:00:00Z",
    fileUrl: "#",
    patient: "Jane Doe",
  },
  {
    id: "rep-202",
    name: "Follow-up Report",
    date: "2025-07-16T14:30:00Z",
    fileUrl: "#",
    patient: "Alice Smith",
  },
];

export default function AdminReportsPage() {
  return (
    <RoleGuard allowed={["admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Reports (Demo)</h2>
        <ul className="space-y-4">
          {DUMMY_REPORTS.map((rep) => (
            <li key={rep.id} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <div><b>Patient:</b> {rep.patient}</div>
              <div><b>Report:</b> {rep.name}</div>
              <div><b>Date:</b> {new Date(rep.date).toLocaleString()}</div>
              <a href={rep.fileUrl} className="text-blue-600 underline">Download</a>
            </li>
          ))}
        </ul>
      </div>
    </RoleGuard>
  );
} 
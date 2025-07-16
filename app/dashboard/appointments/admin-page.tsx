"use client";
import RoleGuard from "@/components/RoleGuard";

const DUMMY_APPOINTMENTS = [
  {
    id: "adm-001",
    patientName: "Jane Doe",
    date: "2025-07-20",
    time: "09:00 AM",
    status: "pending",
    serviceType: "Consultation",
  },
  {
    id: "adm-002",
    patientName: "Alice Smith",
    date: "2025-07-21",
    time: "11:00 AM",
    status: "confirmed",
    serviceType: "Ultrasound",
  },
];

export default function AdminAppointmentsPage() {
  return (
    <RoleGuard allowed={["admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Appointments (Demo)</h2>
        <ul className="space-y-4">
          {DUMMY_APPOINTMENTS.map((apt) => (
            <li key={apt.id} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <div><b>Patient:</b> {apt.patientName}</div>
              <div><b>Date:</b> {apt.date} at {apt.time}</div>
              <div><b>Status:</b> {apt.status}</div>
              <div><b>Service:</b> {apt.serviceType}</div>
            </li>
          ))}
        </ul>
      </div>
    </RoleGuard>
  );
} 
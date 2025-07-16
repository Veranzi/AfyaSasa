"use client";
import RoleGuard from "@/components/RoleGuard";

const DUMMY_REMINDERS = [
  {
    id: 201,
    patient: "Jane Doe",
    doctor: "Dr. Jane Demo",
    date: "2025-07-22",
    time: "10:00 AM",
    clinic: "Demo Clinic",
    mode: "In-person",
    reminderTime: "2025-07-21T10:00:00",
    reminderSMS: true,
    reminderEmail: false,
  },
  {
    id: 202,
    patient: "Alice Smith",
    doctor: "Dr. Alice Demo",
    date: "2025-07-23",
    time: "02:00 PM",
    clinic: "Demo Clinic",
    mode: "Virtual",
    reminderTime: "2025-07-22T14:00:00",
    reminderSMS: false,
    reminderEmail: true,
  },
];

export default function ClinicianRemindersPage() {
  return (
    <RoleGuard allowed={["admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Reminders (Demo)</h2>
        <ul className="space-y-4">
          {DUMMY_REMINDERS.map((reminder) => (
            <li key={reminder.id} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <div><b>Patient:</b> {reminder.patient}</div>
              <div><b>Doctor:</b> {reminder.doctor}</div>
              <div><b>Date:</b> {reminder.date} at {reminder.time}</div>
              <div><b>Clinic:</b> {reminder.clinic}</div>
              <div><b>Mode:</b> {reminder.mode}</div>
              <div><b>Reminder Set For:</b> {new Date(reminder.reminderTime).toLocaleString()}</div>
              <div><b>SMS:</b> {reminder.reminderSMS ? "Yes" : "No"} | <b>Email:</b> {reminder.reminderEmail ? "Yes" : "No"}</div>
            </li>
          ))}
        </ul>
      </div>
    </RoleGuard>
  );
} 
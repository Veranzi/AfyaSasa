"use client";
import { useState, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";

const DUMMY_APPOINTMENTS = [
  {
    id: 1,
    doctor: "Dr. Achieng Onyango",
    specialist: "Gynecologist",
    date: "2025-07-17",
    time: "10:30 AM",
    clinic: "Nairobi Women’s Hospital, Adams Arcade",
    mode: "In-person",
    reminderTime: "2025-07-16T10:30:00",
    reminderSMS: true,
    reminderEmail: true,
  },
];

export default function RemindersPage() {
  const [appointments, setAppointments] = useState(DUMMY_APPOINTMENTS);
  const [role, setRole] = useState<"patient" | "admin" | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole as "patient" | "admin" | null);
  }, []);

  useEffect(() => {
    if (role === "admin") {
      setAppointments([
        {
          id: 101,
          doctor: "Dr. Jane Demo",
          specialist: "Gynecologist",
          date: "2025-07-22",
          time: "10:00 AM",
          clinic: "Demo Clinic",
          mode: "In-person",
          reminderTime: "2025-07-21T10:00:00",
          reminderSMS: true,
          reminderEmail: false,
        },
        {
          id: 102,
          doctor: "Dr. Alice Demo",
          specialist: "Gynecologist",
          date: "2025-07-23",
          time: "02:00 PM",
          clinic: "Demo Clinic",
          mode: "Virtual",
          reminderTime: "2025-07-22T14:00:00",
          reminderSMS: false,
          reminderEmail: true,
        },
      ]);
    }
  }, [role]);

  const handleToggle = (id: number, type: "sms" | "email") => {
    setAppointments(appts => appts.map(a => a.id === id ? { ...a, [type === "sms" ? "reminderSMS" : "reminderEmail"]: !a[type === "sms" ? "reminderSMS" : "reminderEmail"] } : a));
  };
  const handleReschedule = (id: number) => alert("Reschedule coming soon!");
  const handleCancel = (id: number) => setAppointments(appts => appts.filter(a => a.id !== id));
  const handleAddToCalendar = (id: number) => alert("Add to calendar coming soon!");

  return (
    <RoleGuard allowed={["patient", "admin"]}>
      <section className="py-10 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#ffe4ef] font-sans">
        <div className="container px-0 max-w-full h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 animate-fadeIn flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6 text-pink-700 flex items-center gap-2">
              <span role="img" aria-label="location">📍</span> My Appointment Reminders
            </h2>
            <div className="text-2xl mb-4">🗓️ Upcoming Appointments</div>
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">⏰</div>
                <div className="text-gray-500 text-lg mb-2">No reminders to manage yet.</div>
                <div className="text-gray-400">All appointment reminders will appear here for review and management.</div>
              </div>
            ) : (
              appointments.map(appt => {
                const formattedDate = appt.date ? new Date(appt.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "-";
                const reminderDate = appt.reminderTime ? new Date(appt.reminderTime).toLocaleString() : "-";
                return (
                  <div key={appt.id} className="border rounded-lg p-4 bg-white mb-6">
                    <div className="font-bold text-lg mb-1">👩‍⚕️ {appt.doctor}</div>
                    <div className="mb-1">Specialist: {appt.specialist}</div>
                    <div className="mb-1">📅 {formattedDate} at {appt.time}</div>
                    <div className="mb-1">📍 {appt.clinic}</div>
                    <div className="mb-1">💬 Mode: {appt.mode}</div>
                    <div className="mb-1">⏰ Reminder Set For: {reminderDate}</div>
                    <div className="flex gap-4 mb-2 mt-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={appt.reminderSMS} onChange={() => handleToggle(appt.id, "sms")} /> Reminder by SMS
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={appt.reminderEmail} onChange={() => handleToggle(appt.id, "email")} /> Reminder by Email
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-pink-600 text-white px-3 py-1 rounded font-sans" onClick={() => handleAddToCalendar(appt.id)}>📎 Add to Calendar</button>
                      <button className="bg-purple-600 text-white px-3 py-1 rounded font-sans" onClick={() => handleReschedule(appt.id)}>🔁 Reschedule</button>
                      <button className="bg-rose-600 text-white px-3 py-1 rounded font-sans" onClick={() => handleCancel(appt.id)}>❌ Cancel</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </RoleGuard>
  );
} 
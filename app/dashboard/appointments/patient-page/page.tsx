"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import RoleGuard from "@/components/RoleGuard";
import { format } from "date-fns";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Show all appointments for demo/testing
    const q = collection(db, "appointments");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Dashboard summary calculations
  const today = new Date();
  const total = appointments.length;
  const upcoming = appointments.filter(app => {
    const appDate = new Date(app.date);
    return appDate >= today;
  }).length;
  const completed = appointments.filter(app => app.status === "completed").length;

  return (
    <RoleGuard allowed={["patient", "admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-700">My Appointments</h2>
        {/* Dashboard summary */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-700">{total}</div>
            <div className="text-sm text-blue-700">Total</div>
          </div>
          <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{upcoming}</div>
            <div className="text-sm text-green-700">Upcoming</div>
          </div>
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-gray-700">{completed}</div>
            <div className="text-sm text-gray-700">Completed</div>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-gray-500">No appointments found.</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-pink-100 text-pink-700">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Facility</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} className="border-b">
                  <td className="px-4 py-2">{app.date}</td>
                  <td className="px-4 py-2">{app.time}</td>
                  <td className="px-4 py-2">{app.doctor}</td>
                  <td className="px-4 py-2">{app.facility}</td>
                  <td className="px-4 py-2">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RoleGuard>
  );
} 
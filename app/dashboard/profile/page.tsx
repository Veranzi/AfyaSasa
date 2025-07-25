"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function PatientProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const { role } = useUserRole(auth.currentUser);
  const user = auth.currentUser;

  useEffect(() => {
    if (role === "patient" && user) {
      db && getDocs(query(collection(db, "users"), where("uid", "==", user.uid))).then(snapshot => {
        setUserInfo(snapshot.docs[0]?.data() || null);
      });
      db && getDocs(query(collection(db, "appointments"), where("patientId", "==", user.uid))).then(snapshot => {
        setAppointments(snapshot.docs.map(doc => doc.data()));
      });
      db && getDocs(query(collection(db, "reminders"), where("recipient", "==", user.uid))).then(snapshot => {
        setReminders(snapshot.docs.map(doc => doc.data()));
      });
    }
  }, [role, user]);

  if (role !== "patient") {
    return <div className="p-8 text-center text-gray-500">Not authorized.</div>;
  }

  const nextAppointment = appointments
    .filter((a: any) => new Date(a.date) > new Date())
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Profile{userInfo?.name ? `: ${userInfo.name}` : ""}</h2>
      <div className="mb-6 text-lg text-gray-600 italic">“Your health is your wealth. Every step counts!”</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Profile</h3>
          <div><b>Name:</b> {userInfo?.name || user?.displayName || "-"}</div>
          <div><b>Email:</b> {userInfo?.email || user?.email || "-"}</div>
          <div><b>Phone:</b> {userInfo?.phone || "-"}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div><b>Upcoming Appointments:</b> {appointments.filter((a: any) => new Date(a.date) > new Date()).length}</div>
          <div><b>Active Reminders:</b> {reminders.length}</div>
          <div><b>Next Appointment:</b> {nextAppointment ? `${new Date(nextAppointment.date).toLocaleString()} (${nextAppointment.type || "Appointment"})` : "None"}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <a href="/dashboard/appointments" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Book Appointment</a>
        <a href="/dashboard/appointments/patient-page" className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800">View Appointments</a>
        <a href="/dashboard/appointments/patient-reminders" className="bg-amber-500 text-white px-4 py-2 rounded shadow hover:bg-amber-600">Reminders</a>
        <a href="/dashboard/chatbot" className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700">Medical Chatbot</a>
      </div>
    </div>
  );
} 
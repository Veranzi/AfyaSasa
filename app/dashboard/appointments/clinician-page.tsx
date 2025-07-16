"use client";
import { useEffect, useState } from "react";
import bookingsData from "./gynecologist-bookings.json";
import paymentsData from "./payments.json";
import RoleGuard from "@/components/RoleGuard";

export default function ClinicianAppointmentsPage() {
  // Simulate logged-in gynecologist (Dr. Mary Gyenac)
  const doctorId = "doc-001";
  const doctorName = "Dr. Mary Gyenac";
  const [bookings, setBookings] = useState<any[]>([]);
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("clinician"); // Default to clinician

  useEffect(() => {
    // Filter bookings for this gynecologist
    setBookings(bookingsData.filter((b: any) => b.doctorId === doctorId));
    // If admin, show dummy data for demo
    if (role === "admin") {
      setBookings([
        {
          id: "demo-001",
          patientName: "Jane Doe",
          date: "2025-07-20",
          time: "09:00 AM",
          status: "pending",
          serviceType: "Consultation",
        },
        {
          id: "demo-002",
          patientName: "Alice Smith",
          date: "2025-07-21",
          time: "11:00 AM",
          status: "confirmed",
          serviceType: "Ultrasound",
        },
      ]);
    }
  }, [role]);

  const handleUpdateStatus = (id: string, status: string) => {
    setBookings(bookings => bookings.map(b => b.id === id ? { ...b, status } : b));
    setSuccess(`Booking ${status}`);
  };

  return (
    <RoleGuard allowed={["clinician", "admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Clinician: Manage Appointments</h2>
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <div className="text-gray-500 text-lg mb-2">No appointments to manage yet.</div>
            <div className="text-gray-400">All patient bookings will appear here for review and management.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => {
              // Find payment info for this booking
              const payment = paymentsData.find((p: any) => p.patientId === booking.patientId && p.serviceType === booking.serviceType);
              return (
                <li key={booking.id} className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div><b>Patient:</b> {booking.patientName || "-"}</div>
                    <div><b>Date:</b> {booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : "-"}</div>
                    <div><b>Service:</b> {booking.serviceType || "-"}</div>
                    <div><b>Status:</b> {booking.status}</div>
                    {payment && (
                      <div>
                        <b>Payment:</b> {payment.status === "paid" ? (
                          <span className="text-green-600 font-semibold">Paid</span>
                        ) : payment.status === "pending" ? (
                          <span className="text-yellow-600 font-semibold">Pending</span>
                        ) : (
                          <span className="text-gray-600 font-semibold">Not Paid</span>
                        )}
                        <div><b>Amount:</b> {payment.amount} KES</div>
                        <div><b>Type:</b> {payment.paymentType === "before_appointment" ? "Before Appointment" : "After Service"}</div>
                        <div><b>Details:</b> {payment.details}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    {booking.status === "pending" && (
                      <>
                        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateStatus(booking.id, "confirmed")}>Confirm</button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateStatus(booking.id, "rejected")}>Reject</button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateStatus(booking.id, "completed")}>Mark as Completed</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </RoleGuard>
  );
} 
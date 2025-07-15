"use client";
import { useState } from "react";
import AppointmentBookingForm from "./booking-form";
import ConfirmPaymentPage from "./confirm-payment";
import RoleGuard from "@/components/RoleGuard";

export default function PatientAppointmentsPage() {
  const [appointmentSummary, setAppointmentSummary] = useState(null);

  return (
    <RoleGuard allowed={["patient", "admin"]}>
      <section className="py-10 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#ffe4ef] font-sans">
        <div className="container px-0 max-w-full h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 animate-fadeIn flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6 text-pink-700 flex items-center gap-2">
              <span role="img" aria-label="location">📍</span> Book a Gynecologist Appointment
            </h2>
            {appointmentSummary ? (
              <ConfirmPaymentPage summary={appointmentSummary} />
            ) : (
              <AppointmentBookingForm onBook={setAppointmentSummary} />
            )}
          </div>
        </div>
      </section>
    </RoleGuard>
  );
} 
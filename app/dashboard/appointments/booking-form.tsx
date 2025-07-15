"use client";
import { useState } from "react";
import bookingData from "./booking-form.json";
import ClinicMapSelector from "@/components/ClinicMapSelector";

export default function AppointmentBookingForm({ onBook }: { onBook: (summary: any) => void }) {
  // Step state
  const [step, setStep] = useState(1);
  // Form state
  const [location, setLocation] = useState("");
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [consultationType, setConsultationType] = useState("in-person");
  const [insurance, setInsurance] = useState("");
  const [policyNo, setPolicyNo] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedClinicMap, setSelectedClinicMap] = useState<any>(null);
  // Derived options
  const clinics = bookingData.clinics.filter((c: any) => c.locationId === location);
  const doctors = bookingData.doctors.filter((d: any) => d.clinicId === clinic);
  const selectedDoctor = bookingData.doctors.find((d: any) => d.id === doctor);
  const slots = bookingData.slots.find((s: any) => s.doctorId === doctor && s.date === date)?.times || [];

  // Auto-connect map selection to form fields
  const handleMapClinicSelect = (clinicObj: any) => {
    setSelectedClinicMap(clinicObj);
    // Find the matching clinic in bookingData.clinics
    const foundClinic = bookingData.clinics.find((c: any) => c.name === clinicObj.name);
    if (foundClinic) {
      setLocation(foundClinic.locationId);
      setClinic(foundClinic.id);
      setDoctor(""); // Clear doctor selection so user can pick
    }
  };

  // Step 1 validation
  const handleNext1 = () => {
    if ((!location || !clinic || !doctor) && !selectedClinicMap) {
      setError("Please select location, clinic, and doctor, or choose a clinic from the map.");
      return;
    }
    setSpecialization(selectedDoctor?.specialization || "");
    setError("");
    setStep(2);
  };
  // Step 2 validation
  const handleNext2 = () => {
    if (!date || !time) {
      setError("Please select date and time.");
      return;
    }
    setError("");
    setStep(3);
  };
  // Step 3 validation and submit
  const handleBook = () => {
    if (!fullName || !phone || !email) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    const summary = {
      doctor: selectedDoctor?.name + (selectedDoctor?.specialization ? ` (${selectedDoctor.specialization})` : ""),
      clinic: clinics.find(c => c.id === clinic)?.name,
      date,
      time,
      mode: consultationType === "in-person" ? "In-person" : "Virtual",
      fee: 2000,
      fullName,
      phone,
      email,
      emergency,
      insurance,
      policyNo,
      symptoms,
    };
    onBook(summary);
  };
  return (
    <div className="max-w-5xl w-full mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-pink-700 flex items-center gap-2">Book Appointment</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {step === 1 && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 md:flex-[1.2] bg-white rounded-xl shadow p-4 min-h-[500px]">
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Location</label>
              <select className="w-full border rounded px-3 py-2" value={location} onChange={e => { setLocation(e.target.value); setClinic(""); setDoctor(""); setSelectedClinicMap(null); }}>
                <option value="">-- Select Location --</option>
                {bookingData.locations.map((loc: any) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Clinic</label>
              <select className="w-full border rounded px-3 py-2" value={clinic} onChange={e => { setClinic(e.target.value); setDoctor(""); setSelectedClinicMap(null); }} disabled={!location}>
                <option value="">-- Select Clinic --</option>
                {clinics.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Doctor</label>
              <select className="w-full border rounded px-3 py-2" value={doctor} onChange={e => setDoctor(e.target.value)} disabled={!clinic}>
                <option value="">-- Select Doctor --</option>
                {doctors.map((d: any) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            {doctor && (
              <div className="mb-4 flex items-center gap-2">
                <span className="font-medium">Specialization:</span>
                <span>{selectedDoctor?.specialization}</span>
                <button className="ml-auto text-blue-600 underline text-sm" onClick={() => alert("Doctor profile coming soon!")}>View Doctor Profile</button>
              </div>
            )}
            <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={handleNext1}>Next</button>
          </div>
          <div className="flex-1 md:flex-[1.8] bg-white rounded-xl shadow p-4 flex flex-col justify-center">
            <label className="block font-medium mb-1">Or select a clinic from the map</label>
            <ClinicMapSelector onSelect={handleMapClinicSelect} />
            {selectedClinicMap && (
              <div className="mt-2 text-green-700 font-bold">Selected Clinic: {selectedClinicMap.name}</div>
            )}
          </div>
        </div>
      )}
      {step === 2 && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Time Slot</label>
            <select className="w-full border rounded px-3 py-2" value={time} onChange={e => setTime(e.target.value)} disabled={!date}>
              <option value="">-- Select Time --</option>
              {slots.map((t: string) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" checked={emergency} onChange={e => setEmergency(e.target.checked)} id="emergency" />
            <label htmlFor="emergency">Emergency Booking? <span className="text-xs text-gray-500">(+Extra Charge)</span></label>
          </div>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={() => setStep(1)}>Back</button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={handleNext2}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Full Name</label>
            <input className="w-full border rounded px-3 py-2" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number</label>
            <input className="w-full border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email Address</label>
            <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Symptoms (optional)</label>
            <textarea className="w-full border rounded px-3 py-2" value={symptoms} onChange={e => setSymptoms(e.target.value)} />
          </div>
          <div className="mb-4 flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" checked={consultationType === "in-person"} onChange={() => setConsultationType("in-person")}/>
              In-person
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={consultationType === "virtual"} onChange={() => setConsultationType("virtual")}/>
              Virtual
            </label>
          </div>
          <div className="mb-4 flex gap-4 items-center">
            <label className="block font-medium mb-1">Insurance Provider</label>
            <select className="border rounded px-3 py-2" value={insurance} onChange={e => setInsurance(e.target.value)}>
              <option value="">-- Select --</option>
              {bookingData.insuranceProviders.map((p: string) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input className="border rounded px-3 py-2 ml-2" placeholder="Policy No" value={policyNo} onChange={e => setPolicyNo(e.target.value)} />
          </div>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={() => setStep(2)}>Back</button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={handleBook}>Book Appointment →</button>
        </>
      )}
    </div>
  );
} 
"use client";
import RoleGuard from "@/components/RoleGuard";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

function CreateReportForm({ onReportCreated }: { onReportCreated: () => void }) {
  const [patients, setPatients] = useState<any[]>([]);
  const [clinicians, setClinicians] = useState<any[]>([]);
  const [form, setForm] = useState({
    patientId: "",
    clinicianId: "",
    type: "",
    fileUrl: "",
    status: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(users.filter(u => u.role === "patient"));
      setClinicians(users.filter(u => u.role === "clinician"));
    }
    fetchUsers();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const patient = patients.find(p => p.uid === form.patientId);
      const clinician = clinicians.find(c => c.uid === form.clinicianId);
      await addDoc(collection(db, "reports"), {
        patientId: patient?.uid,
        patientName: patient?.name,
        clinicianId: clinician?.uid,
        clinicianName: clinician?.name,
        type: form.type,
        fileUrl: form.fileUrl,
        status: form.status,
        date: form.date || new Date().toISOString(),
      });
      setSuccess("Report created successfully!");
      setForm({
        patientId: "",
        clinicianId: "",
        type: "",
        fileUrl: "",
        status: "",
        date: "",
      });
      if (onReportCreated) onReportCreated();
    } catch (e) {
      setError("Failed to create report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Report</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Patient</label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="">Select patient</option>
            {patients.map(p => (
              <option key={p.uid} value={p.uid}>{p.name} ({p.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Clinician</label>
          <select
            name="clinicianId"
            value={form.clinicianId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="">Select clinician</option>
            {clinicians.map(c => (
              <option key={c.uid} value={c.uid}>{c.name} ({c.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Type</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g. Lab Result"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">File URL</label>
          <input
            name="fileUrl"
            value={form.fileUrl}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g. Reviewed"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Report"}
        </Button>
      </form>
    </div>
  );
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchReports() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "reports"));
      setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <RoleGuard allowed={["admin"]}>
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Manage Reports</h2>
        <CreateReportForm onReportCreated={fetchReports} />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : reports.length === 0 ? (
          <div className="text-gray-500">No reports found.</div>
        ) : (
          <ul className="space-y-4">
            {reports.map((rep) => (
              <li key={rep.id} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
                <div><b>Patient:</b> {rep.patientName}</div>
                <div><b>Clinician:</b> {rep.clinicianName}</div>
                <div><b>Type:</b> {rep.type}</div>
                <div><b>Status:</b> {rep.status}</div>
                <div><b>Date:</b> {rep.date ? new Date(rep.date).toLocaleString() : "-"}</div>
                <a href={rep.fileUrl} className="text-blue-600 underline">Download</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RoleGuard>
  );
} 
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import RoleGuard from "@/components/RoleGuard";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  // Optionally, add fetching logic here if needed

  return (
    <RoleGuard allowed={["clinician", "admin"]}>
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">My Reports</h2>
        {reports.length === 0 ? (
          <div>No reports yet.</div>
        ) : (
          <ul className="space-y-4">
            {reports.map((rep) => (
              <li key={rep.id} className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div><b>Name:</b> {rep.name || "-"}</div>
                  <div><b>Date:</b> {rep.date ? new Date(rep.date).toLocaleString() : "-"}</div>
                </div>
                {rep.fileUrl && (
                  <a href={rep.fileUrl} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600 transition">Download</a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </RoleGuard>
  );
} 
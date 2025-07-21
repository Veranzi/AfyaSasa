"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import RoleGuard from "@/components/RoleGuard";

export default function PatientRemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setReminders([]);
        setLoading(false);
        return;
      }
      // Try to match reminders by UID or email
      const q = query(
        collection(db, "reminders"),
        where("recipient", "in", [user.uid, user.email])
      );
      const snapshot = await getDocs(q);
      setReminders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchReminders();
  }, []);

  const statusReminders = reminders.filter(r => r.type === "status");
  const upcomingReminders = reminders.filter(r => r.type === "upcoming");

  // Copy phone to clipboard handler
  const handleCopyPhone = (phone: string) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 1500);
  };

  return (
    <RoleGuard allowed={["patient", "admin"]}>
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-700">My Reminders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : reminders.length === 0 ? (
          <div className="text-gray-500">No reminders found.</div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-green-700 mb-2">Status Reminders</h3>
              {statusReminders.length === 0 ? (
                <div className="text-gray-500 mb-4">No status reminders.</div>
              ) : (
                <table className="min-w-full border text-sm mb-6">
                  <thead>
                    <tr className="bg-green-100 text-green-700">
                      <th className="px-4 py-2 text-left">Message</th>
                      <th className="px-4 py-2 text-left">Sent At</th>
                      <th className="px-4 py-2 text-left">Sent</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusReminders.map(rem => (
                      <tr key={rem.id} className="border-b">
                        <td className="px-4 py-2">{rem.message}</td>
                        <td className="px-4 py-2">{rem.sendAt ? new Date(rem.sendAt.seconds ? rem.sendAt.seconds * 1000 : rem.sendAt).toLocaleString() : "-"}</td>
                        <td className="px-4 py-2">{rem.sent ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 font-mono select-all flex items-center gap-2">
                          {rem.phone || "-"}
                          {rem.phone && (
                            <button
                              className="ml-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                              onClick={() => handleCopyPhone(rem.phone)}
                              title="Copy phone number"
                            >
                              {copiedPhone === rem.phone ? "Copied!" : "Copy"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-700 mb-2">Upcoming Reminders</h3>
              {upcomingReminders.length === 0 ? (
                <div className="text-gray-500">No upcoming reminders.</div>
              ) : (
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-blue-100 text-blue-700">
                      <th className="px-4 py-2 text-left">Message</th>
                      <th className="px-4 py-2 text-left">Send At</th>
                      <th className="px-4 py-2 text-left">Sent</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingReminders.map(rem => (
                      <tr key={rem.id} className="border-b">
                        <td className="px-4 py-2">{rem.message}</td>
                        <td className="px-4 py-2">{rem.sendAt ? new Date(rem.sendAt.seconds ? rem.sendAt.seconds * 1000 : rem.sendAt).toLocaleString() : "-"}</td>
                        <td className="px-4 py-2">{rem.sent ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 font-mono select-all flex items-center gap-2">
                          {rem.phone || "-"}
                          {rem.phone && (
                            <button
                              className="ml-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                              onClick={() => handleCopyPhone(rem.phone)}
                              title="Copy phone number"
                            >
                              {copiedPhone === rem.phone ? "Copied!" : "Copy"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </RoleGuard>
  );
} 
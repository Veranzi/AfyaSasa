"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientRemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Not logged in");
          setLoading(false);
          return;
        }
        const q = query(collection(db, "reminders"), where("recipient", "==", user.uid));
        const snapshot = await getDocs(q);
        setReminders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setError("Failed to fetch reminders");
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  return (
    <RoleGuard allowed={["patient"]}>
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">My Reminders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : reminders.length === 0 ? (
          <div>No reminders found.</div>
        ) : (
          <div className="space-y-4">
            {reminders.map(rem => (
              <Card key={rem.id}>
                <CardHeader>
                  <CardTitle>{rem.message}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">Scheduled: {rem.sendAt?.toDate?.().toLocaleString?.() || String(rem.sendAt)}</div>
                  <div className="text-xs text-gray-400">Status: {rem.sent ? "Sent" : "Pending"}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
} 
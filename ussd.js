const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  let response = "";

  // Split user input
  const input = text.split("*");
  const userInput = input[input.length - 1];

  // Simple user role check (in production, use a real check)
  const isClinician = phoneNumber.endsWith("000"); // e.g., +2547xxxx000 is a clinician

  if (text === "") {
    response = "CON Welcome to AfyaSasa\n";
    response += isClinician
      ? "1. Add Slot\n2. View My Slots"
      : "1. Book Appointment\n2. View My Appointments";
  } else if (input[0] === "1" && !isClinician) {
    // Patient: Book Appointment
    // Fetch available slots
    const slotsSnap = await db.collection("slots").where("available", "==", true).limit(5).get();
    if (slotsSnap.empty) {
      response = "END No slots available. Try again later.";
    } else {
      response = "CON Choose a slot:\n";
      slotsSnap.docs.forEach((doc, idx) => {
        const slot = doc.data();
        response += `${idx + 1}. ${slot.date} ${slot.time}\n`;
      });
      response += "Reply with slot number";
    }
  } else if (input[0] === "1" && isClinician) {
    // Clinician: Add Slot
    if (input.length === 1) {
      response = "CON Enter slot date (YYYY-MM-DD):";
    } else if (input.length === 2) {
      response = "CON Enter slot time (HH:MM):";
    } else if (input.length === 3) {
      // Save slot
      const date = input[1];
      const time = input[2];
      await db.collection("slots").add({
        clinicianId: phoneNumber,
        date,
        time,
        available: true,
      });
      response = "END Slot added successfully!";
    }
  } else if (input[0] === "2" && !isClinician) {
    // Patient: View My Appointments
    const apptsSnap = await db.collection("appointments").where("patientPhone", "==", phoneNumber).get();
    if (apptsSnap.empty) {
      response = "END No appointments found.";
    } else {
      response = "END Your Appointments:\n";
      apptsSnap.docs.forEach((doc) => {
        const appt = doc.data();
        response += `${appt.date} ${appt.time}\n`;
      });
    }
  } else if (input[0] === "2" && isClinician) {
    // Clinician: View My Slots
    const slotsSnap = await db.collection("slots").where("clinicianId", "==", phoneNumber).get();
    if (slotsSnap.empty) {
      response = "END No slots found.";
    } else {
      response = "END Your Slots:\n";
      slotsSnap.docs.forEach((doc) => {
        const slot = doc.data();
        response += `${slot.date} ${slot.time}\n`;
      });
    }
  } else if (input[0] === "1" && !isClinician && input.length === 2) {
    // Patient: Confirm booking
    const slotIdx = parseInt(userInput) - 1;
    const slotsSnap = await db.collection("slots").where("available", "==", true).limit(5).get();
    const slotDoc = slotsSnap.docs[slotIdx];
    if (!slotDoc) {
      response = "END Invalid slot selection.";
    } else {
      const slot = slotDoc.data();
      // Book appointment
      await db.collection("appointments").add({
        patientPhone: phoneNumber,
        slotId: slotDoc.id,
        clinicianId: slot.clinicianId,
        date: slot.date,
        time: slot.time,
        status: "booked",
      });
      // Mark slot as unavailable
      await db.collection("slots").doc(slotDoc.id).update({ available: false });
      response = `END Appointment booked for ${slot.date} ${slot.time}`;
    }
  } else {
    response = "END Invalid option.";
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(3001, () => console.log("USSD server running on port 3001")); 
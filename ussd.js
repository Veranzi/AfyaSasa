const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Middleware to parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Optional: Log incoming requests
app.use((req, res, next) => {
  console.log("Incoming Request:", req.body);
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("AfyaSasa USSD Server is Running");
});

// Main USSD interaction logic
app.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  let response = "";

  const input = text.split("*");
  const userInput = input[input.length - 1];
  const isClinician = phoneNumber.endsWith("000");

  if (text === "") {
    response = "CON Welcome to AfyaSasa\n";
    response += isClinician
      ? "1. Add Slot\n2. View My Slots"
      : "1. Book Appointment\n2. View My Appointments";
  } else if (input[0] === "1" && !isClinician) {
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
    if (input.length === 1) {
      response = "CON Enter slot date (YYYY-MM-DD):";
    } else if (input.length === 2) {
      response = "CON Enter slot time (HH:MM):";
    } else if (input.length === 3) {
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
    const slotIdx = parseInt(userInput) - 1;
    const slotsSnap = await db.collection("slots").where("available", "==", true).limit(5).get();
    const slotDoc = slotsSnap.docs[slotIdx];
    if (!slotDoc) {
      response = "END Invalid slot selection.";
    } else {
      const slot = slotDoc.data();
      await db.collection("appointments").add({
        patientPhone: phoneNumber,
        slotId: slotDoc.id,
        clinicianId: slot.clinicianId,
        date: slot.date,
        time: slot.time,
        status: "booked",
      });
      await db.collection("slots").doc(slotDoc.id).update({ available: false });
      response = `END Appointment booked for ${slot.date} ${slot.time}`;
    }
  } else {
    response = "END Invalid option.";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// 🔥 NEW: Event endpoint for Africa's Talking (optional but useful)
app.post("/ussd/event", (req, res) => {
  const { sessionId, phoneNumber, event } = req.body;

  console.log(`USSD Event Received => Event: ${event}, Phone: ${phoneNumber}, Session: ${sessionId}`);

  // You can store these in Firestore for analytics/logs if needed

  res.status(200).send("Event received");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`USSD server running on port ${PORT}`));

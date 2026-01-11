export function startReminderEngine() {
  setInterval(() => {
    const meds = JSON.parse(localStorage.getItem("medicines")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const now = new Date();

    meds.forEach(med => {
      const medTime = new Date(`${med.date}T${med.time}`);
      const diff = (medTime - now) / 60000;

      // Logic with safety checks (?.) to prevent crashing
      if (diff <= 10 && diff > 0 && med.status === "yet") {
        sendMessage(med.patientId, `Reminder: Take ${med.name}`);
      }

      if (diff < -15 && med.status === "yet") {
        med.status = "missed";
        const patient = users.find(u => u.id === med.patientId);
        const doctor = users.find(u => u.id === patient?.doctorId);
        
        if (doctor) sendMessage(doctor.phone, `Patient missed ${med.name}`);
        if (patient) sendMessage(patient.guardianPhone, `Missed medicine alert`);
      }
    });

    localStorage.setItem("medicines", JSON.stringify(meds));
  }, 60000);
}

function sendMessage(to, msg) {
  console.log(`Sending to ${to}: ${msg}`); // Useful for debugging
  fetch("http://localhost:5000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, msg })
  }).catch(err => console.log("Backend offline, but app still running."));
}
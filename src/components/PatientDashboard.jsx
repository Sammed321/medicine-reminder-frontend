import { getCurrentUser, getMedicines, saveMedicines, logout } from "../utils/storage";
import { useState } from "react";

export default function PatientDashboard() {
  const user = getCurrentUser();
  const [meds, setMeds] = useState(
    getMedicines().filter(m => m.patientId === user.id)
  );

  const updateStatus = (id, status) => {
    const all = getMedicines();
    const index = all.findIndex(m => m.id === id);
    if (index !== -1) {
      all[index].status = status;
      saveMedicines(all);
      setMeds(all.filter(m => m.patientId === user.id));
    }
  };
  
  async function sendWhatsApp(phone, message) {
  await fetch("http://localhost:5000/send-whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message }),
  });
}

  return (
    <div className="page">
      <div className="header">
        <h2>My Schedule</h2>
        <button
          className="btn-danger"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      {meds.map(m => (
        <div className="card" key={m.id}>
          <b>{m.name}</b> ({m.dosage})<br />
          {m.frequency} | {m.foodTiming} | {m.time}<br />
          Duration: {m.duration}<br />
          {m.notes && <i>{m.notes}</i>}<br />
          Status: {m.status}<br />

          <button
            className="btn-success"
            onClick={() => updateStatus(m.id, "taken")}
          >
            Taken
          </button>

          <button
            className="btn-secondary"
            onClick={() => updateStatus(m.id, "missed")}
          >
            Missed
          </button>
        </div>
      ))}
    </div>
  );
}

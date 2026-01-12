import React, { useEffect, useState } from "react";

export default function CaregiverDashboard() {
  const [medicines, setMedicines] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const allMeds = JSON.parse(localStorage.getItem("medicines")) || [];

    // Filter only this caregiver’s patient
    const patientMeds = allMeds.filter(
      m => m.patientName === user.patientName
    );

    setMedicines(patientMeds);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Caregiver Panel</h2>
      <h3>Patient: {user.patientName}</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((m, i) => (
            <tr key={i}>
              <td>{m.name}</td>
              <td>{m.date}</td>
              <td>{m.time}</td>
              <td>
                {m.taken
                  ? "Taken"
                  : m.missedAlertSent
                  ? "Missed"
                  : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

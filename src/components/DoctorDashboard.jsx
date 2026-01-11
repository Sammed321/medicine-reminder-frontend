import { getUsers, logout } from "../utils/storage";
import PatientDetails from "./PatientDetails";
import { useState } from "react";

export default function DoctorDashboard() {
  const patients = getUsers().filter(u => u.role === "patient");
  const [selected, setSelected] = useState(null);

  return (
    <div className="doctor-page">
    <div className="page ">
      <div className="header">
        <h2>Doctor Dashboard</h2>
        <button
          className="btn-secondary"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      <div className="grid">
        <div>
          <h3>Patients</h3>
          {patients.map(p => (
            <div
              className="card"
              key={p.id}
              onClick={() => setSelected(p)}
            >
              {p.name}
            </div>
          ))}
        </div>

        <div>
          {selected
            ? <PatientDetails patient={selected} />
            : "Select a patient"}
        </div>
      </div>
    </div>
    </div>
  );
}

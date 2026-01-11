import { getUsers, setCurrentUser, initializeStorage } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPatient, setShowPatient] = useState(false);

  useEffect(() => {
    initializeStorage();
  }, []);

  const loginDoctor = () => {
    const doctor = getUsers().find(u => u.role === "doctor");
    setCurrentUser(doctor);
    window.location.reload();
  };

  const loginPatient = () => {
    const patient = getUsers().find(
      u => u.role === "patient" && u.mobile === mobile
    );

    if (!patient) return alert("Invalid mobile number");

    const expectedPassword = patient.name + patient.mobile.slice(-1);
    if (password !== expectedPassword) return alert("Wrong password");

    setCurrentUser(patient);
    window.location.reload();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome to MediBud</h2>

        <button className="btn-primary" onClick={loginDoctor}>
          Login as Doctor
        </button>

        <button
          className="btn-secondary"
          onClick={() => setShowPatient(!showPatient)}
        >
          Login as Patient
        </button>

        {showPatient && (
          <>
            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="btn-primary" onClick={loginPatient}>
              Continue
            </button>

            <p className="hint">
              Password = PatientName + last digit of mobile
            </p>
          </>
        )}
      </div>
    </div>
  );
}

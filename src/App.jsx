import Navbar from "./components/Navbar";
import Login from "./components/Login";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import { getCurrentUser } from "./utils/storage";
import { initializeStorage } from "./utils/storage";

initializeStorage();

export default function App() {
  const user = getCurrentUser();

  return (
    <>
      <Navbar />

      {!user && <Login />}
      {user?.role === "doctor" && <DoctorDashboard />}
      {user?.role === "patient" && <PatientDashboard />}
    </>
  );
}

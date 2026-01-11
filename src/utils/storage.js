import axios from "axios";

/* ===============================
   CONFIG
================================ */
const API_BASE = "http://localhost:5000";

/* ===============================
   INITIALIZE STORAGE
================================ */
export const initializeStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { id: 1, name: "Dr. Sharma", role: "doctor" },
        { id: 2, name: "Rahul", role: "patient", mobile: "7090366469" },
        { id: 3, name: "Anita", role: "patient", mobile: "7090366469" }
      ])
    );
  }

  if (!localStorage.getItem("medicines")) {
    localStorage.setItem("medicines", JSON.stringify([]));
  }
};

/* ===============================
   USERS
================================ */
export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    return [];
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

/* ===============================
   MEDICINES
================================ */
export const getMedicines = () => {
  try {
    return JSON.parse(localStorage.getItem("medicines")) || [];
  } catch {
    return [];
  }
};

/**
 * Save medicines locally AND send ONLY NEW medicine to backend
 */
export const saveMedicines = async (medicines) => {
  // Save for UI
  localStorage.setItem("medicines", JSON.stringify(medicines));

  const latestMedicine = medicines[medicines.length - 1];
  const currentUser = getCurrentUser();

  if (!latestMedicine || !currentUser?.mobile) return;

  try {
    await axios.post(`${API_BASE}/add-medicine`, {
      ...latestMedicine,
      patientPhone: currentUser.mobile,
    });

    console.log("✅ Medicine sent to backend");
  } catch (err) {
    console.error("❌ Backend sync failed:", err.message);
  }
};

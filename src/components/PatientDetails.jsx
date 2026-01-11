import { getMedicines, saveMedicines } from "../utils/storage";
import { useState } from "react";

export default function PatientDetails({ patient }) {
  const meds = getMedicines().filter(m => m.patientId === patient.id);

  const [medicine, setMedicine] = useState({
    name: "",
    dosage: "",
    frequency: "Once a day",
    foodTiming: "After Food",
    duration: "",
    time: "",
    notes: ""
  });

  // ✅ MAKE THIS ASYNC
  const addMedicine = async () => {
    const newMedicine = {
      id: Date.now(),
      patientId: patient.id,
      patientPhone: patient.mobile, // ✅ IMPORTANT
      ...medicine,
      status: "yet",
      date: new Date().toISOString().slice(0, 10)
    };

    // ✅ WAIT for backend sync
    await saveMedicines([
      ...getMedicines(),
      newMedicine
    ]);

    // Reset form
    setMedicine({
      name: "",
      dosage: "",
      frequency: "Once a day",
      foodTiming: "After Food",
      duration: "",
      time: "",
      notes: ""
    });
  };

  return (
    <>
      <h3>{patient.name}</h3>

      {meds.map(m => (
        <div className="card" key={m.id}>
          <b>{m.name}</b> ({m.dosage}) – {m.time}<br />
          {m.frequency} | {m.foodTiming} | {m.duration}<br />
          Status: {m.status}
        </div>
      ))}

      <input
        placeholder="Medicine Name"
        value={medicine.name}
        onChange={e => setMedicine({ ...medicine, name: e.target.value })}
      />

      <input
        placeholder="Dosage"
        value={medicine.dosage}
        onChange={e => setMedicine({ ...medicine, dosage: e.target.value })}
      />

      <select
        value={medicine.frequency}
        onChange={e => setMedicine({ ...medicine, frequency: e.target.value })}
      >
        <option>Once a day</option>
        <option>Twice a day</option>
        <option>Thrice a day</option>
      </select>

      <select
        value={medicine.foodTiming}
        onChange={e => setMedicine({ ...medicine, foodTiming: e.target.value })}
      >
        <option>After Food</option>
        <option>Before Food</option>
      </select>

      <input
        type="time"
        value={medicine.time}
        onChange={e => setMedicine({ ...medicine, time: e.target.value })}
      />

      <input
        placeholder="Duration"
        value={medicine.duration}
        onChange={e => setMedicine({ ...medicine, duration: e.target.value })}
      />

      <textarea
        placeholder="Doctor Notes"
        value={medicine.notes}
        onChange={e => setMedicine({ ...medicine, notes: e.target.value })}
      />

      <button className="btn-primary" onClick={addMedicine}>
        Save Prescription
      </button>
    </>
  );
}

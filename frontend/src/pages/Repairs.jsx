import { useEffect, useState } from "react";
import RepairTracker from "../components/RepairTracker";
import { api } from "../services/api";

function Repairs() {
  const [repairs, setRepairs] = useState([]);
  useEffect(() => { api.getRepairs().then(setRepairs).catch(console.error); }, []);
  return <>
    <div className="page-header"><div><h1>Repair Tracking</h1><p>Monitor repairs from report to completion.</p></div></div>
    {repairs.length === 0 && <div className="panel"><p>No repairs found.</p></div>}
    {repairs.map((repair) => <div className="panel repair-card" key={repair.id}><h2>{repair.issueTitle || "Repair"}</h2><p className="muted">{repair.technician ? `Technician: ${repair.technician}` : "Technician not assigned"}{repair.expectedDate ? ` • Expected ${repair.expectedDate}` : ""}</p><RepairTracker status={repair.status} /><span className="badge">{repair.status || "PENDING"}</span>{repair.note && <p>{repair.note}</p>}</div>)}
  </>;
}
export default Repairs;

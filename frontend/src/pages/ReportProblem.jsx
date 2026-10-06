import { useState } from "react";
import { Droplets, Zap, Bath, Bug, DoorOpen, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRentGuard } from "../context/RentGuardContext";
import { api } from "../services/api";

const categories = [["Water", Droplets], ["Electricity", Zap], ["Bathroom", Bath], ["Pest", Bug], ["Door / Window", DoorOpen], ["Other", AlertTriangle]];

function ReportProblem() {
  const navigate = useNavigate();
  const { addComplaint } = useRentGuard();
  const [category, setCategory] = useState("Water");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) { setError("Please fill all required fields."); return; }
    try {
      setSaving(true); setError("");
      const complaint = await addComplaint({ title, category, location: "My Rental", priority, description });
      for (const file of files) await api.uploadEvidence(complaint.id, file);
      navigate(`/complaints/${complaint.id}`);
    } catch (err) {
      console.error(err); setError(err.message || "Could not create complaint.");
    } finally { setSaving(false); }
  };

  return <>
    <div className="page-header"><div><h1>Report a Problem</h1><p>Record your rental problem and notify the landlord.</p></div></div>
    <form className="form-card" onSubmit={submit}>
      <div className="form-group"><label>What problem are you facing?</label><div className="category-grid">{categories.map(([name, Icon]) => <button type="button" key={name} className={category === name ? "category selected" : "category"} onClick={() => setCategory(name)}><Icon size={22} />{name}</button>)}</div></div>
      <div className="form-group"><label>Problem Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Bathroom pipe leakage" /></div>
      <div className="form-group"><label>Description *</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe exactly what happened..." /></div>
      <div className="form-group"><label>Priority</label><div className="priority-options">{["LOW","MEDIUM","HIGH","EMERGENCY"].map((item) => <button type="button" key={item} className={priority === item ? "priority-selected" : ""} onClick={() => setPriority(item)}>{item}</button>)}</div></div>
      <div className="form-group"><label>Evidence</label><label className="upload-box"><strong>Upload Evidence</strong><span>Photos or videos up to 10MB</span><input type="file" multiple accept="image/*,video/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} hidden /><span className="upload-button">Choose Files</span></label>{files.map((file) => <p key={file.name}>📎 {file.name}</p>)}</div>
      {error && <p className="error">{error}</p>}
      <button className="primary-btn submit-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Submit Complaint"}</button>
    </form>
  </>;
}
export default ReportProblem;

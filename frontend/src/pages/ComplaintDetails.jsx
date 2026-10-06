import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Droplets, User, MessageSquare } from "lucide-react";
import ComplaintTimeline from "../components/ComplaintTimeline";
import StatusBadge from "../components/StatusBadge";
import AuthMedia from "../components/AuthMedia";
import { useRentGuard } from "../context/RentGuardContext";
import { api } from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateComplaint, reloadComplaints } = useRentGuard();
  const [complaint, setComplaint] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getComplaint(id), api.getEvidence(id).catch(() => [])])
      .then(([c, files]) => { setComplaint(c); setEvidence(files); })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  const setStatus = async (status) => {
    try {
      setError("");
      setComplaint(await updateComplaint(id, { status }));
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this complaint and its evidence?")) return;
    try {
      await api.deleteComplaint(id);
      await reloadComplaints();
      navigate("/complaints");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!complaint) return <h2>Complaint not found</h2>;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>{complaint.title}</h1>
          <p>Complaint #{complaint.id}</p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="details-grid">
        <div className="panel">
          <div className="detail-icon"><Droplets /></div>
          <h2>Problem Details</h2>
          <p>{complaint.description}</p>
          <div className="detail-row"><span>Category</span><strong>{complaint.category}</strong></div>
          <div className="detail-row"><span>Location</span><strong>{complaint.location}</strong></div>
          <div className="detail-row"><span>Priority</span><StatusBadge status={complaint.priority} /></div>

          <div className="action-row">
            {complaint.status === "OPEN" && (
              <button className="secondary-btn" onClick={() => setStatus("IN_PROGRESS")}>Mark in progress</button>
            )}
            {complaint.status !== "RESOLVED" && (
              <button className="secondary-btn" onClick={() => setStatus("RESOLVED")}>Confirm resolved</button>
            )}
            {complaint.status === "RESOLVED" && (
              <button className="secondary-btn" onClick={() => setStatus("OPEN")}>Reopen</button>
            )}
            <button className="danger-btn" onClick={remove}>Delete</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="panel">
          <h2>Repair Timeline</h2>
          <ComplaintTimeline status={complaint.status} />
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 20 }}>
        <h2>Evidence</h2>
        {evidence.length === 0 ? (
          <p className="muted">No evidence attached. Add photos from the Evidence page.</p>
        ) : (
          <div className="evidence-grid" style={{ marginTop: 14 }}>
            {evidence.map((item) => (
              <div className="evidence-card" key={item.id}>
                <div className="evidence-image"><AuthMedia url={item.url} contentType={item.contentType} /></div>
                <strong>{item.fileName}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel landlord-card">
        <User size={30} />
        <div><strong>Property Owner</strong><p>Landlord</p></div>
        <button className="secondary-btn"><MessageSquare size={15} /> Message</button>
      </div>
    </>
  );
}

export default ComplaintDetails;

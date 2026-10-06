import { Link } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard";
import { useRentGuard } from "../context/RentGuardContext";

function Complaints() {
  const { complaints, loading, error } = useRentGuard();

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My Complaints</h1>
          <p>Track all your reported rental problems.</p>
        </div>
        <Link to="/report-problem" className="primary-btn">+ Report Problem</Link>
      </div>

      <div className="panel">
        {loading && <p className="muted">Loading complaints...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && complaints.length === 0 && (
          <p className="muted">No complaints yet. Report your first problem to start a record.</p>
        )}
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </>
  );
}

export default Complaints;

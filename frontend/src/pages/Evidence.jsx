import { Camera } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import AuthMedia from "../components/AuthMedia";
import { useRentGuard } from "../context/RentGuardContext";
import { api } from "../services/api";

function Evidence() {
  const { complaints } = useRentGuard();
  const [evidence, setEvidence] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const all = await Promise.all(
      complaints.map((c) =>
        api.getEvidence(c.id)
          .then((items) => items.map((f) => ({ ...f, complaintTitle: c.title })))
          .catch(() => [])
      )
    );
    setEvidence(all.flat());
  }, [complaints]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!complaintId && complaints.length > 0) setComplaintId(complaints[0].id);
  }, [complaints, complaintId]);

  const upload = async () => {
    if (!complaintId || files.length === 0) return;
    try {
      setUploading(true);
      setError("");
      for (const file of files) await api.uploadEvidence(complaintId, file);
      setFiles([]);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Evidence Vault</h1>
          <p>Protect yourself with rental property evidence.</p>
        </div>
      </div>

      <div className="evidence-banner">
        <Camera size={30} />
        <div>
          <strong>Move-in & Move-out Protection</strong>
          <p>Store property condition photos to help protect your deposit.</p>
        </div>
      </div>

      <div className="panel upload-panel">
        {complaints.length === 0 ? (
          <p className="muted">Report a problem first, then you can attach photos or videos to it here.</p>
        ) : (
          <>
            <select value={complaintId} onChange={(e) => setComplaintId(e.target.value)}>
              {complaints.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            <button className="primary-btn" onClick={upload} disabled={uploading || files.length === 0}>
              {uploading ? "Uploading..." : `Upload${files.length ? ` (${files.length})` : ""}`}
            </button>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      <div className="evidence-grid">
        {evidence.length === 0 ? (
          <div className="panel"><p>No evidence uploaded yet.</p></div>
        ) : (
          evidence.map((item) => (
            <div className="evidence-card" key={item.id}>
              <div className="evidence-image">
                <AuthMedia url={item.url} contentType={item.contentType} alt={item.fileName} />
              </div>
              <strong>{item.fileName}</strong>
              <span>{item.complaintTitle}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Evidence;

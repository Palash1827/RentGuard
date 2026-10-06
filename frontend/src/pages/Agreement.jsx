import { FileText, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const empty = {
  fileName: "Rental Agreement",
  monthlyRent: "",
  securityDeposit: "",
  noticePeriod: "",
  maintenanceResponsibility: "",
  summary: "",
};

function Agreement() {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAgreement()
      .then(setAgreement)
      .catch((e) => { if (e.status !== 404) setError(e.message); })
      .finally(() => setLoading(false));
  }, []);

  const startEdit = () => {
    setForm(
      agreement
        ? Object.fromEntries(Object.keys(empty).map((k) => [k, agreement[k] ?? ""]))
        : empty
    );
    setEditing(true);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      const saved = await api.saveAgreement({
        ...form,
        monthlyRent: Number(form.monthlyRent),
        securityDeposit: Number(form.securityDeposit),
      });
      setAgreement(saved);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const header = (
    <div className="page-header">
      <div>
        <h1>Rental Agreement</h1>
        <p>Understand your rental agreement.</p>
      </div>
      {!editing && (
        <button className="primary-btn" onClick={startEdit}>
          {agreement ? "Edit details" : "Add agreement"}
        </button>
      )}
    </div>
  );

  if (loading) return <>{header}<div className="panel">Loading agreement...</div></>;

  if (editing) {
    return (
      <>
        {header}
        <form className="form-card" onSubmit={save}>
          <div className="form-group"><label>Agreement name</label><input value={form.fileName} onChange={set("fileName")} /></div>
          <div className="form-group"><label>Monthly rent (₹) *</label><input type="number" min="0" value={form.monthlyRent} onChange={set("monthlyRent")} required /></div>
          <div className="form-group"><label>Security deposit (₹) *</label><input type="number" min="0" value={form.securityDeposit} onChange={set("securityDeposit")} required /></div>
          <div className="form-group"><label>Notice period</label><input value={form.noticePeriod} onChange={set("noticePeriod")} placeholder="e.g. 1 month" /></div>
          <div className="form-group"><label>Who handles maintenance?</label><input value={form.maintenanceResponsibility} onChange={set("maintenanceResponsibility")} placeholder="e.g. Landlord for structural, tenant for minor repairs" /></div>
          <div className="form-group"><label>Important clauses / summary</label><textarea value={form.summary} onChange={set("summary")} /></div>
          {error && <p className="error">{error}</p>}
          <div className="action-row">
            <button className="primary-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="secondary-btn" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      {header}
      {error && <p className="error">{error}</p>}
      {!agreement ? (
        <div className="panel">
          <p className="muted">No agreement saved yet. Add your rent, deposit and notice period so RentGuard AI can use them.</p>
        </div>
      ) : (
        <div className="agreement-grid">
          <div className="panel agreement-file">
            <FileText size={40} />
            <h3>{agreement.fileName}</h3>
            <span>Stored in RentGuard</span>
          </div>
          <div className="panel">
            <div className="ai-title"><Bot /><h2>Agreement Summary</h2></div>
            <div className="agreement-row"><span>Monthly Rent</span><strong>₹{Number(agreement.monthlyRent).toLocaleString("en-IN")}</strong></div>
            <div className="agreement-row"><span>Security Deposit</span><strong>₹{Number(agreement.securityDeposit).toLocaleString("en-IN")}</strong></div>
            <div className="agreement-row"><span>Notice Period</span><strong>{agreement.noticePeriod || "—"}</strong></div>
            <div className="agreement-row"><span>Maintenance</span><strong>{agreement.maintenanceResponsibility || "—"}</strong></div>
            {agreement.summary && <div className="warning">⚠️ Important Clause<p>{agreement.summary}</p></div>}
          </div>
        </div>
      )}
    </>
  );
}

export default Agreement;

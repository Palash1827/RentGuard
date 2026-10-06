import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function Payments() {
  const [payments, setPayments] = useState([]);
  const [deposit, setDeposit] = useState(null);
  const [error, setError] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("PAID");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.getPayments().then(setPayments).catch((e) => setError(e.message));
    api.getAgreement().then((a) => setDeposit(a.securityDeposit)).catch(() => setDeposit(null));
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      await api.createPayment({ month: month.trim(), amount: Number(amount), status });
      setMonth("");
      setAmount("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await api.deletePayment(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const latest = payments[0];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Rent & Payments</h1>
          <p>Keep your rental payment history organized.</p>
        </div>
      </div>

      <div className="payment-summary">
        <div className="summary-card">
          <span>Last Payment</span>
          <strong>{latest ? inr(latest.amount) : "—"}</strong>
        </div>
        <div className="summary-card">
          <span>Security Deposit</span>
          <strong>{deposit != null ? inr(deposit) : "Add in Agreement"}</strong>
        </div>
        <div className="summary-card">
          <span>Current Status</span>
          <strong className={latest?.status === "PAID" ? "paid" : ""}>
            {latest?.status || "—"} {latest?.status === "PAID" ? "✓" : ""}
          </strong>
        </div>
      </div>

      <form className="panel inline-form" onSubmit={add}>
        <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month, e.g. October 2026" required />
        <input type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (₹)" required />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="OVERDUE">Overdue</option>
        </select>
        <button className="primary-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Record payment"}</button>
      </form>

      <div className="panel">
        <h2>Payment History</h2>
        {error && <p className="error">{error}</p>}
        {payments.length === 0 && <p className="muted">No payments recorded yet.</p>}
        {payments.map((p) => (
          <div className="payment-row" key={p.id}>
            <span>{p.month}</span>
            <strong>{inr(p.amount)}</strong>
            <span className={p.status === "PAID" ? "paid" : ""}>
              {p.status} {p.status === "PAID" ? "✓" : ""}
              <button className="link-btn" onClick={() => remove(p.id)} title="Delete">✕</button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Payments;

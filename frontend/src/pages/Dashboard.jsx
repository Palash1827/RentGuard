import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Wallet,
  Bot,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StatCard from "../components/StatCard";
import ComplaintCard from "../components/ComplaintCard";
import NotificationPanel from "../components/NotificationPanel";

import { useRentGuard } from "../context/RentGuardContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

function Dashboard() {

  const { complaints, loading, error } =
    useRentGuard();

  const { user } = useAuth();
  const [latestPayment, setLatestPayment] = useState(null);

  useEffect(() => {
    api.getPayments()
      .then((p) => setLatestPayment(p[0] || null))
      .catch(console.error);
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const active =
    complaints.filter(
      (c) => c.status !== "RESOLVED"
    ).length;

  const resolved =
    complaints.filter(
      (c) => c.status === "RESOLVED"
    ).length;

  return (
    <>

      <div className="page-header">

        <div>
          <h1>
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p>
            Here's what's happening with your rental.
          </p>
        </div>

        <Link
          to="/report-problem"
          className="primary-btn"
        >
          + Report Problem
        </Link>

      </div>


      {loading && <div className="panel">Loading data from backend...</div>}
      {error && <div className="panel error">{error}</div>}

      <div className="stats">

        <StatCard
          icon={<ClipboardList />}
          title="Total Issues"
          value={complaints.length}
          description="Reported problems"
        />

        <StatCard
          icon={<Clock3 />}
          title="Active Repairs"
          value={active}
          description="Need attention"
        />

        <StatCard
          icon={<CheckCircle2 />}
          title="Resolved"
          value={resolved}
          description="Successfully solved"
        />

        <StatCard
          icon={<Wallet />}
          title="Rent Status"
          value={latestPayment ? latestPayment.status : "—"}
          description={latestPayment ? latestPayment.month : "No payments recorded"}
        />

      </div>


      <div className="dashboard-grid">

        <section className="panel">

          <div className="panel-header">

            <div>
              <h2>
                Recent Complaints
              </h2>

              <p>
                Track your rental issues
              </p>
            </div>

            <Link to="/complaints">
              View all →
            </Link>

          </div>

          {complaints
            .slice(0, 4)
            .map((complaint) => (

              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />

            ))}

        </section>


        <NotificationPanel />

      </div>


      <div className="bottom-grid">

        <div className="panel">

          <h2>
            Rental Health
          </h2>

          <p className="muted">
            Overall condition of your rental.
          </p>

          <div className="health-score">
            82<span>/100</span>
          </div>

          <div className="progress">
            <div style={{ width: "82%" }} />
          </div>

          <p className="health-good">
            ✓ Your rental is mostly healthy
          </p>

        </div>


        <div className="ai-dashboard">

          <Bot size={35} />

          <h2>
            Need rental help?
          </h2>

          <p>
            Ask RentGuard AI about your
            rental problem.
          </p>

          <Link to="/communication">
            Ask AI →
          </Link>

        </div>

      </div>

    </>
  );
}

export default Dashboard;
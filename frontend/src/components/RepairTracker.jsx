import { CheckCircle2, Clock, Wrench } from "lucide-react";

const steps = [
  { label: "Reported", icon: CheckCircle2 },
  { label: "Assigned", icon: CheckCircle2 },
  { label: "Repairing", icon: Wrench },
  { label: "Completed", icon: Clock },
];

// c = completed, a = active, n = not reached
const statesByStatus = {
  PENDING: ["c", "a", "n", "n"],
  ASSIGNED: ["c", "c", "a", "n"],
  IN_PROGRESS: ["c", "c", "a", "n"],
  COMPLETED: ["c", "c", "c", "c"],
};

function RepairTracker({ status = "PENDING" }) {
  const states = statesByStatus[status] || statesByStatus.PENDING;

  return (
    <div className="repair-tracker">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const cls = states[i] === "c" ? "completed" : states[i] === "a" ? "active" : "";
        return (
          <div key={step.label} style={{ display: "contents" }}>
            {i > 0 && <div className={`line ${states[i - 1] === "c" ? "completed-line" : ""}`} />}
            <div className={`repair-step ${cls}`}>
              <Icon />
              <span>{step.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RepairTracker;

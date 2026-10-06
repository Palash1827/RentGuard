import { CheckCircle2, Bell, Wrench, Clock } from "lucide-react";

const steps = [
  { title: "Complaint Submitted", description: "Your complaint was received.", icon: CheckCircle2 },
  { title: "Landlord Notified", description: "Landlord has been notified.", icon: Bell },
  { title: "Technician Assigned", description: "A technician has been assigned.", icon: Wrench },
  { title: "Repair In Progress", description: "Repair work is currently active.", icon: Clock },
  { title: "Tenant Confirmation", description: "Confirm after repair completion.", icon: CheckCircle2 },
];

// how many steps are done for each complaint status
const doneByStatus = { OPEN: 2, IN_PROGRESS: 4, RESOLVED: 5 };

function ComplaintTimeline({ status = "OPEN" }) {
  const done = doneByStatus[status] ?? 2;

  return (
    <div className="timeline">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div className={`timeline-item ${index < done ? "done" : ""}`} key={step.title}>
            <div className="timeline-icon">
              <Icon size={17} />
            </div>
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ComplaintTimeline;

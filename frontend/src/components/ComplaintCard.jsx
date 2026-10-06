import {
  Droplets,
  Zap,
  Bug,
  Bath,
  DoorOpen,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

const icons = {
  Water: Droplets,
  Electricity: Zap,
  Pest: Bug,
  Bathroom: Bath,
  "Door / Window": DoorOpen,
};

function ComplaintCard({ complaint }) {

  const Icon =
    icons[complaint.category] || Droplets;

  return (
    <div className="complaint-card">

      <div className="complaint-icon">
        <Icon size={20} />
      </div>

      <div className="complaint-info">

        <strong>
          {complaint.title}
        </strong>

        <span>
          {complaint.location} • {complaint.date || (complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : "")}
        </span>

      </div>

      <div className="complaint-status">

        <StatusBadge
          status={complaint.priority}
        />

        <StatusBadge
          status={complaint.status}
        />

      </div>

      <Link
        to={`/complaints/${complaint.id}`}
        className="arrow"
      >
        <ChevronRight size={17} />
      </Link>

    </div>
  );
}

export default ComplaintCard;
import {
  Bell,
  Droplets,
  Wrench,
} from "lucide-react";

function NotificationPanel() {

  return (
    <div className="notification-panel">

      <h3>
        Notifications
      </h3>

      <div className="notification-item">

        <Droplets />

        <div>
          <strong>
            Water complaint updated
          </strong>

          <span>
            Technician assigned
          </span>
        </div>

      </div>

      <div className="notification-item">

        <Wrench />

        <div>
          <strong>
            Repair scheduled
          </strong>

          <span>
            Tomorrow at 10:00 AM
          </span>
        </div>

      </div>

      <div className="notification-item">

        <Bell />

        <div>
          <strong>
            Landlord notification
          </strong>

          <span>
            Message delivered
          </span>
        </div>

      </div>

    </div>
  );
}

export default NotificationPanel;
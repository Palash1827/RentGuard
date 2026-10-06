import {
  Search,
  Bell,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <header className="navbar">

      <div className="search">

        <Search size={17} />

        <input
          placeholder="Search complaints..."
        />

      </div>

      <div className="nav-right">

        <button className="notification">
          <Bell size={19} />
        </button>

        <div className="profile">

          <div className="avatar">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <strong>
              {user?.name}
            </strong>

            <small>
              Tenant
            </small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
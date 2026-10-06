import {
  Home,
  ClipboardList,
  PlusCircle,
  Wrench,
  Wallet,
  FileText,
  Camera,
  MessageSquare,
  Bot,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },

  {
    name: "My Complaints",
    path: "/complaints",
    icon: ClipboardList,
  },

  {
    name: "Report Problem",
    path: "/report-problem",
    icon: PlusCircle,
  },

  {
    name: "Repairs",
    path: "/repairs",
    icon: Wrench,
  },

  {
    name: "Payments",
    path: "/payments",
    icon: Wallet,
  },

  {
    name: "Agreement",
    path: "/agreement",
    icon: FileText,
  },

  {
    name: "Evidence",
    path: "/evidence",
    icon: Camera,
  },

  {
    name: "Communication",
    path: "/communication",
    icon: MessageSquare,
  },

  {
    name: "AI Assistant",
    path: "/communication?ai=true",
    icon: Bot,
  },
];

function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          🏠
        </div>

        <div>
          <h2>RentGuard</h2>
          <span>Rental Protection</span>
        </div>

      </div>

      <p className="menu-title">
        MENU
      </p>

      <nav>

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `menu-item ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={18} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </nav>

      <div className="sidebar-bottom">

        <NavLink
          to="/settings"
          className="menu-item"
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <div className="ai-box">

          <Bot size={25} />

          <strong>
            RentGuard AI
          </strong>

          <p>
            Get smart help for your rental problems.
          </p>

          <NavLink to="/communication">
            Ask AI
          </NavLink>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
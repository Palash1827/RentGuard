import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Navbar />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ReportProblem from "./pages/ReportProblem";
import Complaints from "./pages/Complaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import Repairs from "./pages/Repairs";
import Payments from "./pages/Payments";
import Agreement from "./pages/Agreement";
import Evidence from "./pages/Evidence";
import Communication from "./pages/Communication";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/report-problem"
          element={<ReportProblem />}
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/complaints/:id"
          element={<ComplaintDetails />}
        />

        <Route
          path="/repairs"
          element={<Repairs />}
        />

        <Route
          path="/payments"
          element={<Payments />}
        />

        <Route
          path="/agreement"
          element={<Agreement />}
        />

        <Route
          path="/evidence"
          element={<Evidence />}
        />

        <Route
          path="/communication"
          element={<Communication />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;
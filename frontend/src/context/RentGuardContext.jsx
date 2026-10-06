import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

const RentGuardContext = createContext(null);

export function RentGuardProvider({ children }) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadComplaints = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getComplaints();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  // load when a user logs in, clear when they log out
  useEffect(() => {
    if (user) loadComplaints();
    else setComplaints([]);
  }, [user?.id, loadComplaints]);

  const addComplaint = async (complaint) => {
    const created = await api.createComplaint({
      title: complaint.title,
      category: complaint.category,
      location: complaint.location || "My Rental",
      priority: complaint.priority,
      description: complaint.description,
    });
    setComplaints((prev) => [created, ...prev]);
    return created;
  };

  const updateComplaint = async (id, data) => {
    const updated = await api.updateComplaint(id, data);
    setComplaints((prev) => prev.map((item) => (String(item.id) === String(id) ? updated : item)));
    return updated;
  };

  return (
    <RentGuardContext.Provider
      value={{ complaints, loading, error, addComplaint, updateComplaint, reloadComplaints: loadComplaints }}
    >
      {children}
    </RentGuardContext.Provider>
  );
}

export function useRentGuard() {
  return useContext(RentGuardContext);
}

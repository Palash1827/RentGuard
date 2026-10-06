const BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
const API_URL = `${BASE}/api`;
const TOKEN_KEY = "rentguard_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

let unauthorizedHandler = null;
export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

async function readError(response) {
  try {
    const data = await response.json();
    const details = data.details ? ` (${Object.entries(data.details).map(([k, v]) => `${k}: ${v}`).join(", ")})` : "";
    return (data.error || data.message || `Request failed: ${response.status}`) + details;
  } catch {
    return `Request failed: ${response.status}`;
  }
}

async function request(endpoint, options = {}) {
  const token = tokenStore.get();
  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  if (response.status === 401 && token && unauthorizedHandler) {
    unauthorizedHandler(); // token expired / invalid -> back to login
  }
  if (!response.ok) {
    const error = new Error(await readError(response));
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const api = {
  // auth
  register: (data) => request("/auth/register", json("POST", data)),
  login: (data) => request("/auth/login", json("POST", data)),
  me: () => request("/auth/me"),

  health: () => request("/health"),

  // complaints
  getComplaints: () => request("/complaints"),
  getComplaint: (id) => request(`/complaints/${id}`),
  createComplaint: (data) => request("/complaints", json("POST", data)),
  updateComplaint: (id, data) => request(`/complaints/${id}`, json("PUT", data)),
  deleteComplaint: (id) => request(`/complaints/${id}`, { method: "DELETE" }),

  // rent
  getPayments: () => request("/payments"),
  createPayment: (data) => request("/payments", json("POST", data)),
  deletePayment: (id) => request(`/payments/${id}`, { method: "DELETE" }),
  getRepairs: () => request("/repairs"),
  getAgreement: () => request("/agreement"),
  saveAgreement: (data) => request("/agreement", json("PUT", data)),

  // evidence (photos / videos linked to a complaint)
  getEvidence: (complaintId) => request(`/evidence/complaint/${complaintId}`),
  uploadEvidence: (complaintId, file) => {
    const form = new FormData();
    form.append("complaintId", complaintId);
    form.append("file", file);
    return request("/evidence/upload", { method: "POST", body: form });
  },

  aiChat: (message) => request("/ai/chat", json("POST", { message })),

  // fetch a protected image/video as a Blob (<img src> cannot send the auth header)
  fetchBlob: async (path) => {
    const token = tokenStore.get();
    const response = await fetch(`${BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!response.ok) throw new Error(`Could not load file (${response.status})`);
    return response.blob();
  },
};

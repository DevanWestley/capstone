// lib/mock-data.js
/**
 * Centralized in-memory mock store for dev/testing.
 *
 * WARNING: This is in-memory only. Data will be lost when the process restarts.
 * For persistence in dev, replace with a JSON file writer or a lightweight DB.
 */

export const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Smart Air Quality Monitor",
    category: "IoT & Smart City",
    group: "Kelompok A",
    date: new Date().toISOString(),
    summary: "Integrasi sensor untuk pengukuran kualitas udara.",
    thumbnail: "/assets/thumb-placeholder.png",
    status: "Approved",
    rating: 4.5,
    driveLink: "https://example.com/doc/1",
  },
  {
    id: "2",
    title: "Dashboard Kesehatan Digital",
    category: "Kesehatan Digital",
    group: "Kelompok B",
    date: new Date(Date.now() - 86400000).toISOString(),
    summary: "Implementasi dashboard pemantauan energi.",
    thumbnail: "/assets/thumb-placeholder.png",
    status: "Waiting for Response",
    rating: 3.8,
    driveLink: null,
  },
  {
    id: "3",
    title: "IoT Waste Management",
    category: "IoT & Smart City",
    group: "Kelompok C",
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    summary: "Rencana pengelolaan sampah berbasis IoT.",
    thumbnail: "/assets/thumb-placeholder.png",
    status: "Rejected",
    rating: 2.9,
    driveLink: null,
  },
];

export const MOCK_REQUESTS = [
  {
    id: "r-1",
    projectId: "1",
    projectTitle: "Smart Air Quality Monitor",
    requester: "Budi",
    message: "Saya mau lanjutkan dan implementasi sensor tambahan.",
    status: "Waiting for Response",
    createdAt: new Date().toISOString(),
    // optional proposalFile: { name, mime, size, base64 }
  },
];

/**
 * Helpers (small convenience functions)
 * - getProjectById(id)
 * - createProject(payload) -> new project
 * - getRequestById(id)
 * - createRequest(payload) -> new request
 * - updateRequestStatus(id, status) -> updated request or null
 */

export function getProjectById(id) {
  return MOCK_PROJECTS.find((p) => String(p.id) === String(id)) || null;
}

export function createProject(payload = {}) {
  const newProject = {
    id: String(Date.now()),
    title: String(payload.title || "Untitled Project"),
    category: payload.category || "-",
    group: payload.group || "-",
    date: new Date().toISOString(),
    summary: payload.summary || "",
    thumbnail: payload.thumbnail || "/assets/thumb-placeholder.png",
    status: payload.status || "Waiting for Response",
    rating: typeof payload.rating === "number" ? payload.rating : 0,
    driveLink: payload.driveLink || null,
  };
  MOCK_PROJECTS.unshift(newProject);
  return newProject;
}

export function getRequestById(id) {
  return MOCK_REQUESTS.find((r) => String(r.id) === String(id)) || null;
}

export function createRequest(payload = {}) {
  const newReq = {
    id: `r-${Date.now()}`,
    projectId: String(payload.projectId || ""),
    projectTitle: String(payload.projectTitle || ""),
    subject: payload.subject || "",
    message: String(payload.message || ""),
    status: "Waiting for Response",
    createdAt: new Date().toISOString(),
    proposalFile: payload.proposalFile
      ? {
          name: String(payload.proposalFile.name || ""),
          mime: String(payload.proposalFile.mime || "application/octet-stream"),
          size: Number(payload.proposalFile.size || 0),
          base64: String(payload.proposalFile.base64 || ""), // base64 string WITHOUT data:* prefix
        }
      : null,
  };
  MOCK_REQUESTS.unshift(newReq);
  return newReq;
}

export function updateRequestStatus(id, status) {
  const valid = ["Waiting for Response", "Approved", "Rejected"];
  if (!valid.includes(status)) throw new Error("Invalid status");
  const idx = MOCK_REQUESTS.findIndex((r) => String(r.id) === String(id));
  if (idx === -1) return null;
  MOCK_REQUESTS[idx].status = status;
  return MOCK_REQUESTS[idx];
}

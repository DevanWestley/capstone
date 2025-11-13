"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import RequestFormClient from "../../../components/RequestFormClient";

const PLACEHOLDER_THUMB = "/assets/thumb-placeholder.png";

export default function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Robust id extraction: take last non-empty segment of path
  const getIdFromPath = () => {
    if (typeof window === "undefined") return null;
    const seg = window.location.pathname.split("/").filter(Boolean);
    if (seg.length === 0) return null;
    return seg[seg.length - 1]; // last segment
  };

  useEffect(() => {
    const id = getIdFromPath();
    if (!id) {
      setErr("Id project tidak ditemukan di URL.");
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setErr(null);

    // debug
    console.debug("Fetching project detail for id:", id);

    fetch(`/api/projects/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          // try to read body for more info
          const text = await res.text().catch(() => "");
          const msg = text ? text : `HTTP ${res.status}`;
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        console.error("Failed to fetch project:", e);
        setErr(e.message || "Gagal memuat project.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:underline">Homepage</Link>
          <span className="mx-2">›</span>
          <Link href="/projects" className="hover:underline">Projects</Link>
        </nav>

        {loading && <p className="text-sm text-slate-500">Memuat project…</p>}
        {err && <p className="text-sm text-red-600">Error: {err}</p>}

        {!loading && project && (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="w-full h-48 bg-slate-100 rounded overflow-hidden">
                  <img
                    src={project.thumbnail || PLACEHOLDER_THUMB}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
                <p className="text-sm text-slate-500 mt-1">{project.category}</p>

                <p className="mt-4 text-slate-700">{project.summary || "—"}</p>

                <div className="mt-6 flex items-center gap-3">
                  {/* RequestFormClient handles opening modal and POST */}
                    <Link href={`/project/${project.id}/request`}>
                        <button className="px-3 py-2 bg-[#004A74] text-white rounded hover:opacity-95">
                            Request Lanjutkan
                        </button>
                    </Link>


                  <Link href="/history-request" className="px-3 py-2 border rounded text-sm">
                    Lihat Riwayat Request
                  </Link>
                </div>
              </div>
            </div>

            {/* other meta */}
            <div className="mt-6 text-sm text-slate-500">
              <div>Kelompok: {project.group || "-"}</div>
              <div>Tanggal: {project.date ? new Date(project.date).toLocaleString() : "-"}</div>
              <div className="mt-4">
                {project.driveLink && (
                  <a href={project.driveLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    Lihat Dokumen Capstone
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {!loading && !project && !err && (
          <p className="text-sm text-slate-500">Project tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}

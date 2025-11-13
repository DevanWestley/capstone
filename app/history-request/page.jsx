"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLACEHOLDER_THUMB = "/assets/thumb-placeholder.png";
const ICONS = {
  approved: "/assets/icons/v.svg",
  rejected: "/assets/icons/x.svg",
  waiting: "/assets/icons/w.svg",
  progress: "/assets/icons/progress.svg",
};

const Stars = ({ rating = 0 }) => {
  const r = Math.max(0, Math.min(5, Number(rating || 0)));
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={i < Math.round(r) ? "/assets/icons/star-filled.png" : "/assets/icons/star-empty.png"}
          alt="star"
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter & search
  const [filter, setFilter] = useState("semua"); // normalized values
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // map the API project shape into the shape the UI expects
        const mapped = Array.isArray(data)
          ? data.map((p) => ({
              id: p.id,
              title: p.title || "—",
              status: p.status || "-",
              category: p.category || "-",
              group: p.group || "-",
              thumbnail: p.thumbnail || PLACEHOLDER_THUMB,
              rating: typeof p.rating === "number" ? p.rating : 0,
              driveLink: p.driveLink || null,
            }))
          : [];
        setRequests(mapped);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Error");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const fallback = useMemo(
    () => [
      {
        id: "tmp-1",
        title: "Loading…",
        status: "Pending",
        category: "-",
        group: "-",
        thumbnail: PLACEHOLDER_THUMB,
        rating: 0,
      },
    ],
    []
  );

  const dataToShow = Array.isArray(requests) && requests.length ? requests : fallback;

  // apply filter + search (both case-insensitive)
  const filteredItems = dataToShow.filter((item) => {
    const s = String(item.status || "").toLowerCase();

    // filter: if not 'semua', compare normalized
    if (filter && filter !== "semua") {
      if (s !== String(filter).toLowerCase()) return false;
    }

    // search: check title, group, category
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      const inTitle = (item.title || "").toLowerCase().includes(q);
      const inGroup = (item.group || "").toLowerCase().includes(q);
      const inCategory = (item.category || "").toLowerCase().includes(q);
      if (!(inTitle || inGroup || inCategory)) return false;
    }

    return true;
  });

  const recordViewedThread = (id) => {
    try {
      const key = "viewed_threads_history";
      const raw = sessionStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      if (arr[arr.length - 1] !== id) arr.push(id);
      sessionStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {}
  };

  const openDetail = (id) => {
    recordViewedThread(id);
    // redirect to your detail page. Update path if your detail route differs.
    router.push(`/detail/${id}`);
  };

  const getStatusStyle = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "approved") return { color: "text-green-600", bg: "bg-green-50", icon: ICONS.approved };
    if (s === "rejected") return { color: "text-red-600", bg: "bg-red-50", icon: ICONS.rejected };
    if (s.includes("waiting")) return { color: "text-amber-600", bg: "bg-amber-50", icon: ICONS.waiting };
    if (s === "in progress" || s === "progress") return { color: "text-blue-600", bg: "bg-blue-50", icon: ICONS.progress };
    return { color: "text-slate-600", bg: "bg-slate-100", icon: ICONS.progress };
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* BREADCRUMB */}
        <nav className="text-xs text-slate-500 mb-3">
          <Link href="/" className="hover:underline">Homepage</Link>
          <span className="mx-2">›</span>
          <Link href="/history-request" className="font-semibold hover:underline">History Request</Link>
          <button onClick={() => router.back()} className="ml-4 px-2 py-1 bg-gray-100 rounded text-xs" title="Kembali ke halaman sebelumnya">Back</button>
        </nav>

        <div className="flex items-center justify-between mb-4">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-[#004A74] relative">
              History Request
            </h2>
            <div className="h-1 bg-[#FED400] rounded mt-2"></div>
          </div>
        </div>

        {/* Filter + Search box */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <label className="relative block">
                <span className="sr-only">Cari</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                    <img
                        src="/assets/icons/search.png"
                        alt="search"
                        className="w-4 h-4 opacity-70"
                    />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari berdasarkan kata kunci, judul, atau nama kelompok"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-sm"
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">Filter berdasarkan status</div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border p-2 shadow-sm bg-white text-sm">
                <option value="semua">Semua</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="waiting for response">Waiting for Response</option>
              </select>
            </div>
          </div>
        </div>

        {loading && <p className="text-sm text-slate-500">Memuat data...</p>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}

        {(!loading && filteredItems.length === 0) && <p className="text-sm text-slate-500 mb-6">Tidak ada hasil yang cocok.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredItems.map((item) => {
            const st = getStatusStyle(item.status);
            const rating = Math.max(0, Math.min(5, Number(item.rating || 0)));

            return (
              <article key={item.id ?? Math.random()} className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition cursor-pointer" onClick={() => openDetail(item.id)}>
                <div className="p-3">
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                    <img src={item.thumbnail || PLACEHOLDER_THUMB} alt={item.title || "thumb"} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="px-4 pb-5">
                  {/* CATEGORY must appear here */}
                  <p className="text-xs font-semibold text-[#004A74] uppercase tracking-wide">{item.category || "-"}</p>

                  <h3 className="text-base font-bold text-blue-900 mt-2 leading-tight">{item.title || "—"}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <Stars rating={rating} />
                    <span className="text-slate-400 text-xs">({rating})</span>
                  </div>

                  {/* Group */}
                  <p className="text-xs text-gray-500 mt-2">{item.group || "-"}</p>

                  {/* Lihat Detail Capstone */}
                  <div className="flex items-center gap-2 mt-3 text-[#004A74] font-semibold hover:text-[#FED400] cursor-pointer group">
                    <span className="text-sm">Lihat Detail Capstone</span>
                    <img
                      src="/assets/icons/arrow-right.png"
                      alt="arrow"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    />
                  </div>

                  {/* bottom row: status (left) and optional drive link (right) */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium w-fit ${st.bg} ${st.color}`}>
                        <img src={st.icon} alt={item.status} className="w-4 h-4" />
                        <span>{item.status || "-"}</span>
                      </div>
                    </div>

                    <div className="min-w-0 text-right">
                      {String(item.status || "").toLowerCase() === "approved" && item.driveLink ? (
                        <a href={item.driveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-amber-700 text-sm font-medium hover:underline whitespace-nowrap pr-2">
                          Lihat Dokumen Capstone →
                        </a>
                      ) : (
                        <div style={{ width: 1, height: 1 }} aria-hidden />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

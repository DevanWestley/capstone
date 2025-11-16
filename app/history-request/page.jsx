"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FixLayout from "../../components/FixLayout.jsx";

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
          src={
            i < Math.round(r)
              ? "/assets/icons/star-filled.png"
              : "/assets/icons/star-empty.png"
          }
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
  const [filter, setFilter] = useState("semua");
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

  const dataToShow =
    Array.isArray(requests) && requests.length ? requests : fallback;

  const filteredItems = dataToShow.filter((item) => {
    const s = String(item.status || "").toLowerCase();

    if (filter && filter !== "semua") {
      if (s !== String(filter).toLowerCase()) return false;
    }

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
    router.push(`/detail/${id}`);
  };

  const getStatusStyle = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "approved")
      return {
        color: "text-green-600",
        bg: "bg-green-50",
        icon: ICONS.approved,
      };
    if (s === "rejected")
      return { color: "text-red-600", bg: "bg-red-50", icon: ICONS.rejected };
    if (s.includes("waiting"))
      return {
        color: "text-amber-600",
        bg: "bg-amber-50",
        icon: ICONS.waiting,
      };
    if (s === "in progress" || s === "progress")
      return { color: "text-blue-600", bg: "bg-blue-50", icon: ICONS.progress };
    return {
      color: "text-slate-600",
      bg: "bg-slate-100",
      icon: ICONS.progress,
    };
  };

  return (
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span
              className="hover:text-[#004A74] cursor-pointer"
              onClick={() => router.push("/")}
            >
              Homepage
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold">
              History Request
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-block">
              <h1 className="text-3xl font-bold text-[#004A74]">
                History Request
              </h1>
              <div className="h-1 bg-[#FED400] rounded mt-2"></div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg border border-gray-200">
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-[#5B585829] rounded-lg px-3 py-0.5">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Cari berdasarkan kata kunci, judul, atau nama kelompok"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-none bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Filter Section */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                Filter berdasarkan status
              </span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] bg-white text-sm text-gray-800"
              >
                <option value="semua">Semua Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="waiting for response">Waiting for Response</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 text-sm text-gray-600">
            Menampilkan {filteredItems.length} capstone
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
              <p className="text-gray-500 mt-4">Memuat data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Tidak ada capstone yang ditemukan.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Coba ubah kata kunci pencarian atau filter status
              </p>
            </div>
          )}

          {/* Capstone Grid */}
          {!loading && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredItems.map((item) => {
                const st = getStatusStyle(item.status);
                const rating = Math.max(0, Math.min(5, Number(item.rating || 0)));

                return (
                  <article
                    key={item.id ?? Math.random()}
                    className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                    onClick={() => openDetail(item.id)}
                  >
                    {/* Thumbnail */}
                    <div className="p-4">
                      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                        <img
                          src={item.thumbnail || PLACEHOLDER_THUMB}
                          alt={item.title || "thumb"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-5 flex flex-col h-full">
                      <p className="text-xs font-regular text-[#004A74] tracking-wide">
                        {item.category || "-"}
                      </p>
                      <h3 className="text-base font-bold text-[#004A74] mt-2 leading-tight line-clamp-2">
                        {item.title || "—"}
                      </h3>

                      {/* Rating */}
                      <div className="mt-2">
                        <Stars rating={rating} />
                      </div>

                      {/* Group name */}
                      <p className="text-xs text-gray-500 mt-2">
                        {item.group || "-"}
                      </p>

                      {/* Bottom section */}
                      <div className="flex items-center justify-between mt-auto pt-4">
                        {/* Lihat Detail Capstone */}
                        <div className="flex items-center gap-2 text-[#004A74] font-semibold group">
                          <span className="text-sm relative">
                            Lihat Detail Capstone
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FED400] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          <img
                            src="/assets/icons/arrow-right.png"
                            alt="arrow"
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          />
                        </div>

                        {/* Status + Link dokumen */}
                        <div className="flex flex-col items-end gap-1">
                          {/* Status pill */}
                          <div
                            className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium w-fit ${st.bg} ${st.color}`}
                          >
                            <img
                              src={st.icon}
                              alt={item.status}
                              className="w-4 h-4"
                            />
                            <span>{item.status || "-"}</span>
                          </div>

                          {/* Link dokumen */}
                          {String(item.status || "").toLowerCase() === "approved" &&
                            item.driveLink && (
                              <a
                                href={item.driveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-amber-700 text-xs font-medium hover:underline whitespace-nowrap"
                              >
                                Lihat Dokumen Capstone →
                              </a>
                            )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </FixLayout>
  );
}
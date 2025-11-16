"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FixLayout from "../../components/FixLayout";

// Star Rating Component
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

export default function ProyekSayaPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");

  useEffect(() => {
    setLoading(true);
    fetch("/api/my-projects")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchStatus = filterStatus === "semua" || project.status === filterStatus;
    const matchSearch =
      searchQuery === "" ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.group?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Approved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span className="hover:text-[#004A74] cursor-pointer" onClick={() => router.push("/")}>
              Homepage
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold">Proyek Saya</span>
          </div>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-block">
              <h1 className="text-3xl font-bold text-[#004A74]">Proyek Saya</h1>
              <div className="h-1 bg-[#FED400] rounded mt-2"></div>
            </div>

            <button
              onClick={() => router.push("/proyek-saya/add")}
              className="flex items-center gap-2 px-4 py-2 bg-[#004A74] text-white rounded-lg shadow hover:bg-[#003d5e] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-semibold">Tambah Proyek</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg border border-gray-200">
            {/* Search */}
            <div className="flex-1 flex items-center bg-[#5B585829] rounded-lg px-3 py-0.5">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari berdasarkan kata kunci, judul, atau kategori"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-none bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">Filter berdasarkan status</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] bg-white text-sm text-gray-800"
              >
                <option value="semua">Semua Status</option>
                <option value="Draft">Draft</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 text-sm text-gray-600">
            Menampilkan {filteredProjects.length} proyek
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
              <p className="text-gray-500 mt-4">Memuat data...</p>
            </div>
          )}

          {/* Empty */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Tidak ada proyek yang ditemukan.</p>
              <p className="text-gray-400 text-sm mt-2">Coba ubah kata kunci pencarian atau filter status</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                  onClick={() => router.push(`/proyek-saya/detail?id=${project.id}`)}
                >
                  {/* Thumbnail */}
                  <div className="p-4">
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                      <img
                        src={project.thumbnail || "/assets/thumb-placeholder.png"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-regular text-[#004A74] tracking-wide">
                        {project.category || "Tanpa Kategori"}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#004A74] mt-1 leading-tight line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Rating */}
                    <div className="mt-2">
                      <Stars rating={project.rating} />
                    </div>

                    {/* Group & Year */}
                    <p className="text-xs text-gray-500 mt-2">{project.group} • {project.year}</p>

                    {/* Description */}
                    <p className="text-sm text-[#332C2B] mt-3 leading-relaxed line-clamp-3">
                      {project.summary || "Tidak ada deskripsi."}
                    </p>

                    {/* Link */}
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center gap-2 text-[#004A74] font-semibold group">
                        <span className="text-sm relative">
                          Lihat Detail
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FED400] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <img
                          src="/assets/icons/arrow-right.png"
                          alt="arrow"
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FixLayout>
  );
}

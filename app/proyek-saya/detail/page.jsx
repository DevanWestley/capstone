"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FixLayout from "../../../components/FixLayout";
import { getMyProjectById } from "../../../lib/mock-data";

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
          className="w-6 h-6"
        />
      ))}
    </div>
  );
};

export default function DetailProyekPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = getMyProjectById(id);
      setProject(data || null);
    } catch (err) {
      console.error("Error loading project from mock:", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handlePrevImage = () => {
    if (project?.images?.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (project?.images?.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getMilestoneIcon = (status) => {
    if (status === "Completed") {
      return (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (status === "In Progress") {
      return (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <FixLayout>
        <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
            <p className="text-gray-500 mt-4">Memuat detail proyek...</p>
          </div>
        </div>
      </FixLayout>
    );
  }

  if (!project) {
    return (
      <FixLayout>
        <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Proyek tidak ditemukan</p>
            <button
              onClick={() => router.push("/proyek-saya")}
              className="mt-4 px-6 py-2 bg-[#004A74] text-white rounded-lg hover:bg-[#003d5e] transition"
            >
              Kembali ke Proyek Saya
            </button>
          </div>
        </div>
      </FixLayout>
    );
  }

  const currentImage = project.images?.[selectedImageIndex] || project.thumbnail;

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
            <span
              className="hover:text-[#004A74] cursor-pointer"
              onClick={() => router.push("/proyek-saya")}
            >
              Proyek Saya
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold line-clamp-1">
              {project.title}
            </span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 mb-12">
            {/* Left: Hero Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden h-[400px] group">
                <img
                  src={currentImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                {project.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-6 h-6 text-[#004A74]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-6 h-6 text-[#004A74]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                {project.images?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImageIndex === idx
                            ? "bg-[#FED400] w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                      selectedImageIndex === idx
                        ? "border-[#004A74]"
                        : "border-gray-200 hover:border-[#004A74]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Project Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#004A74] mb-3">
                  {project.title}
                </h1>
                <div className="mb-0">
                  <span className="inline-block text-lg font-regular text-[#004A74] py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-md text-gray-600 mb-2 font-regular">
                  {project.group}
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Stars rating={project.rating} />
                      <span className="text-sm text-gray-500">
                        ({Math.floor(project.rating * 3.4)})
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push(`/proyek-saya/request?projectId=${project.id}`)}
                className="px-4 py-2 border border-[#004A74] text-[#004A74] rounded-lg hover:bg-blue-50 transition text-sm font-semibold"
              >
                Lihat Request Masuk
              </button>
              <button
                onClick={() => router.push(`/proyek-saya/add?id=${project.id}`)}
                className="px-4 py-2 bg-[#004A74] text-white rounded-lg hover:bg-[#003d5e] transition text-sm font-semibold"
              >
                Edit Proyek
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
                    console.log("Proyek dihapus");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
              >
                Hapus Proyek
              </button>
            </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-3 text-sm font-semibold transition ${
                  activeTab === "info"
                    ? "text-[#004A74] border-b-2 border-[#FED400]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Informasi Proyek
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`px-6 py-3 text-sm font-semibold transition ${
                  activeTab === "members"
                    ? "text-[#004A74] border-b-2 border-[#FED400]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Anggota ({project.members?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-6 py-3 text-sm font-semibold transition ${
                  activeTab === "documents"
                    ? "text-[#004A74] border-b-2 border-[#FED400]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Dokumen ({project.documents?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("milestones")}
                className={`px-6 py-3 text-sm font-semibold transition ${
                  activeTab === "milestones"
                    ? "text-[#004A74] border-b-2 border-[#FED400]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Timeline
              </button>
            </div>

            <div className="p-6">
              {activeTab === "info" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#004A74] mb-2">Deskripsi Proyek</h3>
                    <p className="text-gray-700 leading-relaxed text-justify">{project.description}</p>
                  </div>

                  {project.evaluation && (
                    <div>
                      <h3 className="text-lg font-bold text-[#004A74] mb-2">Evaluasi</h3>
                      <p className="text-gray-700 leading-relaxed text-justify">{project.evaluation}</p>
                    </div>
                  )}

                  {project.developmentSuggestion && (
                    <div>
                      <h3 className="text-lg font-bold text-[#004A74] mb-2">Saran Pengembangan</h3>
                      <p className="text-gray-700 leading-relaxed text-justify">{project.developmentSuggestion}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "members" && (
                <div className="space-y-4">
                  {project.members && project.members.length > 0 ? (
                    project.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#004A74]">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.nim}</div>
                          <div className="text-sm text-gray-500">{member.role} • {member.jurusan}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">Belum ada anggota</p>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-3">
                  {project.documents && project.documents.length > 0 ? (
                    project.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-semibold text-gray-800">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.type} • {doc.size} • {doc.uploadedAt}</div>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#004A74] text-white rounded-lg hover:bg-[#003d5e] transition text-sm font-semibold"
                        >
                          Download
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">Belum ada dokumen</p>
                  )}
                </div>
              )}

              {activeTab === "milestones" && (
                <div className="space-y-4">
                  {project.milestones && project.milestones.length > 0 ? (
                    project.milestones.map((milestone, idx) => (
                      <div key={milestone.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getMilestoneIcon(milestone.status)}
                          {idx < project.milestones.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 my-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-[#004A74]">{milestone.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              milestone.status === "Completed" ? "bg-green-100 text-green-700" :
                              milestone.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              {milestone.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Target: {milestone.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">Belum ada milestone</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FixLayout>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import FixLayout from "../../../components/FixLayout";

export default function ProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([
    { id: 1, name: "Anggota 1", nim: "115230129", jurusan: "Teknik Biomedis" },
    { id: 2, name: "Anggota 2", nim: "115230130", jurusan: "Teknologi Informasi" },
    { id: 3, name: "Anggota 3", nim: "115230131", jurusan: "Teknik Elektro" }
  ]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        // mock data supaya sesuai design
        const data = {
          title: "Kelompok Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          email: "kelompok@example.com",
          angkatan: "2023",
          thumbnail: "/assets/images/profile-banner-placeholder.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur congue odio, eget luctus diam molestie eget. Nulla non orci finibus ex suscipit ullamcorper non in lacus. Phasellus quam elit, convallis nec pellentesque in, congue in diam.",
        };

        setTimeout(() => {
          setProject(data);
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleEdit = () => {
    router.push(`/profil/${id}/edit`);
  };

  const handleAddMember = () => {
    const nextId = Date.now();
    setMembers([
      ...members,
      { id: nextId, name: `Anggota ${members.length + 1}`, nim: "-", jurusan: "-" }
    ]);
  };

  if (loading) return (
    <FixLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
          <p className="text-gray-500 mt-3">Memuat profil...</p>
        </div>
      </div>
    </FixLayout>
  );

  if (!project) return (
    <FixLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
        <p className="text-gray-500">Profil tidak ditemukan</p>
      </div>
    </FixLayout>
  );

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
            <span className="text-[#004A74] font-semibold">Profile</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="inline-block">
                <h1 className="text-3xl font-bold text-[#004A74]">Profile Kelompok</h1>
                <div className="h-1 bg-[#FED400] rounded mt-2"></div>
              </div>
              
              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#004A74] text-white rounded-lg shadow hover:bg-[#003d5e] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span className="text-sm font-semibold">Edit</span>
              </button>
            </div>
          </div>

          {/* Header: banner left + info right */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Banner */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                <div className="rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-red-100 via-orange-50 to-pink-100">
                  <img
                    src={project.thumbnail}
                    alt="banner"
                    className="w-full h-44 object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#004A74] leading-snug">
                  {project.title}
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <div className="text-gray-600 mt-1">{project.email}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Angkatan:</span>
                    <div className="text-gray-600 mt-1">{project.angkatan}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-[#004A74] mb-3">
                    Deskripsi Kelompok
                  </h3>
                  <p className="text-gray-700 text-justify leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Anggota */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#004A74]">Detail Anggota</h3>
              <button
                onClick={handleAddMember}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#004A74] text-[#004A74] font-semibold rounded-lg hover:bg-blue-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm">Tambah Anggota</span>
              </button>
            </div>

            <div className="space-y-4">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#004A74] text-base">
                        {m.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        NIM: {m.nim}
                      </div>
                      <div className="text-sm text-gray-500">{m.jurusan}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Lihat Portofolio
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#0077B5] text-[#0077B5] rounded-lg text-sm hover:bg-blue-50 transition font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FixLayout>
  );
}
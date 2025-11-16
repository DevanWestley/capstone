"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([
    { id: 1, name: "Anggota 1", nim: "115230129", jurusan: "Teknik Informatika" },
    { id: 2, name: "Anggota 2", nim: "115230130", jurusan: "Sistem Informasi" },
    { id: 3, name: "Anggota 3", nim: "115230131", jurusan: "Teknik Elektro" }
  ]);

  useEffect(() => {
    // contoh fetch; jika tidak ada API, gunakan mock
    const fetchProject = async () => {
      try {
        setLoading(true);
        // const res = await fetch(`/api/projects/${id}`);
        // const data = await res.json();
        // setProject(data);

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
    // navigasi ke halaman edit, atau buka modal
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
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
        <p className="text-gray-500 mt-3">Memuat profil...</p>
      </div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
      <p className="text-gray-500">Profil tidak ditemukan</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <span className="cursor-pointer hover:text-[#004A74]" onClick={() => router.push('/')}>Homepage</span>
          <span className="mx-2">›</span>
          <span className="cursor-pointer hover:text-[#004A74]" onClick={() => router.push('/katalog')}>Profile</span>
        </div>

        {/* Header: banner left + info right */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex gap-8 items-start">
          {/* Banner */}
          <div className="w-[420px] flex-shrink-0">
            <div className="rounded-md overflow-hidden border border-gray-200">
              <img src={project.thumbnail} alt="banner" className="w-full h-44 object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 relative">
            {/* Floating edit button like design */}
            <div className="absolute right-0 top-0 -translate-y-6">
              <div className="flex items-center gap-3">
                
                <button onClick={handleEdit} className="flex items-center gap-2 px-3 py-2 bg-[#004A74] text-white rounded-md shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4h-1a2 2 0 00-2 2v1m0 6v5a2 2 0 002 2h5m4-12l-7 7" />
                  </svg>
                  <span className="text-sm">Edit</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#004A74] leading-snug">
              {project.title}
            </h1>
            <div className="mt-3 text-gray-500">
              <div>
                <span className="font-medium text-gray-700">Email</span>
                <div className="text-sm">{project.email}</div>
              </div>
              <div className="mt-2">
                <span className="font-medium text-gray-700">Angkatan</span>
                <div className="text-sm">{project.angkatan}</div>
              </div>
            </div>

            {/* small divider */}
            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-semibold text-[#004A74] mb-2">Deskripsi Kelompok</h2>
              <p className="text-gray-700 text-justify leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Detail Anggota */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#004A74]">Detail Anggota</h3>
            <div className="flex items-center gap-3">
              <button onClick={handleAddMember} className="text-sm px-3 py-1.5 border border-[#004A74] text-[#004A74] rounded hover:bg-blue-50">+ Tambah Anggota</button>
            </div>
          </div>

          <div className="space-y-4">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between bg-white shadow-sm border border-gray-100 rounded p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"> </div>
                  <div>
                    <div className="font-medium text-[#004A74]">{m.name}</div>
                    <div className="text-sm text-gray-500">{m.nim}</div>
                    <div className="text-sm text-gray-500">{m.jurusan}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v.01M12 20h.01M7 8h10M7 12h10" />
                    </svg>
                    Lihat Portofolio
                  </button>
                  <button className="px-3 py-1.5 border border-[#004A74] text-[#004A74] rounded text-sm hover:bg-blue-50 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.3a1.7 1.7 0 110-3.4 1.7 1.7 0 010 3.4zm13 11.3h-3v-5.5c0-1.3-.5-2.2-1.8-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9v5.4h-3v-10h3v1.4c.4-.6 1.3-1.4 3-1.4 2.2 0 3.8 1.4 3.8 4.4v5.6z" />
                    </svg>
                    Lihat Linkedin
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

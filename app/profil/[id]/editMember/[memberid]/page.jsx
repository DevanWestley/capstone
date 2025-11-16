"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FixLayout from "../../../../../components/FixLayout";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = params?.id;          // /profil/[id]
  const memberId = params?.memberId;     // /editMember/[memberId]

  const [form, setForm] = useState({
    name: "",
    nim: "",
    jurusan: "",
    linkedin: "",
    portofolio: "",
  });

  // Simulasi ambil data member (bisa ganti dengan fetch/localStorage)
  useEffect(() => {
    // Dummy member data
    const dummyMember = {
      name: "Anggota 1",
      nim: "115230129",
      jurusan: "Teknik Informatika",
      linkedin: "https://linkedin.com/in/example",
      portofolio: "https://portfolio.com/me",
    };

    setForm(dummyMember);
  }, [memberId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated member:", form);

    // Redirect back to profile detail page
    router.push(`/profil/${projectId}`);
  };

  return (
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-10">

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
              onClick={() => router.push(`/profil/${projectId}`)}
            >
              Profil
            </span>
            <span>›</span>

            <span className="text-[#004A74] font-semibold">Edit Anggota</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#004A74] mb-2">
            Edit Anggota
          </h1>
          <div className="h-1 bg-[#FED400] rounded mb-8"></div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg shadow p-6 space-y-8"
          >
            {/* BOX 1 – Informasi Dasar */}
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-700 mb-4">
                Informasi Dasar Anggota
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nama Anggota
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004A74]"
                    placeholder="Masukkan nama anggota"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    NIM
                  </label>
                  <input
                    name="nim"
                    value={form.nim}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004A74]"
                    placeholder="Masukkan NIM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Jurusan
                  </label>
                  <input
                    name="jurusan"
                    value={form.jurusan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004A74]"
                    placeholder="Masukkan jurusan"
                  />
                </div>
              </div>
            </div>

            {/* BOX 2 – Link LinkedIn & Portofolio */}
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-700 mb-4">
                Link & Portofolio
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Link LinkedIn
                  </label>
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004A74]"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Link Portofolio
                  </label>
                  <input
                    name="portofolio"
                    value={form.portofolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004A74]"
                    placeholder="https://portfolio.com/..."
                  />
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/profil/${projectId}`)}
                className="px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#004A74] text-white rounded-lg font-semibold hover:bg-[#003d5e]"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>

        </div>
      </div>
    </FixLayout>
  );
}

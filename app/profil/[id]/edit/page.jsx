"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProfileEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    title: "",
    email: "",
    angkatan: "",
    description: "",
  });

  useEffect(() => {
    // Mock fetch data profil
    const data = {
      title: "Kelompok Lorem ipsum",
      email: "kelompok@example.com",
      angkatan: "2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };
    setForm(data);
  }, [id]);

  const handleSave = () => {
    alert("Data tersimpan!");
    router.push(`/profil/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">

        <h1 className="text-2xl font-bold text-[#004A74] mb-4">
          Edit Profil Kelompok
        </h1>

        <div className="space-y-4">

          <div>
            <label className="text-sm font-medium text-gray-700">Judul</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Angkatan</label>
            <input
              value={form.angkatan}
              onChange={(e) =>
                setForm({ ...form, angkatan: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Deskripsi Kelompok
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 h-32"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#004A74] text-white rounded shadow"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

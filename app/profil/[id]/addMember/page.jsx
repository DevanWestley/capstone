"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AddMember() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    nama: "",
    nim: "",
    linkedin: "",
    portofolio: "",
  });

  const handleSave = () => {
    alert("Anggota berhasil ditambahkan!");
    router.push(`/profil/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">

        <h1 className="text-2xl font-bold text-[#004A74] mb-4">
          Tambah Anggota Baru
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nama Anggota</label>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Nama anggota"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">NIM</label>
            <input
              value={form.nim}
              onChange={(e) => setForm({ ...form, nim: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Masukkan NIM"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Link LinkedIn</label>
            <input
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Link Portofolio</label>
            <input
              value={form.portofolio}
              onChange={(e) => setForm({ ...form, portofolio: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="https://portfolio.com/..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#004A74] text-white rounded shadow"
          >
            Tambahkan Anggota
          </button>
        </div>
      </div>
    </div>
  );
}

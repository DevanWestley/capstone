"use client";
import { useParams } from "next/navigation";

export default function AddMember() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#3b3b3b] p-10">
      <h1 className="text-3xl text-white font-semibold mb-4">
        tambah anggota
      </h1>

      <div className="border-4 border-sky-400 rounded-lg p-6 bg-white">
        <div className="text-sm text-gray-500 mb-3">
          Homepage &gt; Profile &gt; Tambah Anggota
        </div>

        <h2 className="text-2xl font-semibold text-sky-700 mb-6">
          Tambah Anggota
        </h2>

        <div className="bg-white shadow-md rounded-lg p-6">
          <label className="block font-medium mb-1">Nama Anggota</label>
          <input
            className="w-full bg-gray-200 p-3 rounded mb-4"
            placeholder="Nama anggota"
          />

          <label className="block font-medium mb-1">NIM</label>
          <input
            className="w-full bg-gray-200 p-3 rounded mb-4"
            placeholder="Masukkan NIM"
          />

          <label className="block font-medium mb-1">Jurusan</label>
          <input
            className="w-full bg-gray-200 p-3 rounded mb-4"
            placeholder="Jurusan"
          />

          <label className="block font-medium mb-1">Link LinkedIn</label>
          <input
            className="w-full bg-gray-200 p-3 rounded mb-4"
            placeholder="LinkedIn"
          />

          <label className="block font-medium mb-1">Link Portofolio (jika ada)</label>
          <input
            className="w-full bg-gray-200 p-3 rounded mb-4"
            placeholder="Portofolio"
          />

          <button className="bg-sky-600 text-white px-6 py-2 rounded">
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  );
}


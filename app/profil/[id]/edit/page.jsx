"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import FixLayout from "../../../../components/FixLayout";

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
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC] py-10 px-6">

        <div className="max-w-4xl mx-auto">

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
              onClick={() => router.push(`/profil/${id}`)}
            >
              Profil
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold">
              Edit Profil
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#004A74] mb-2">
            Edit Profil Kelompok
          </h1>
          <div className="h-1 bg-[#FED400] rounded mb-8"></div>

          {/* Edit Form */}
          <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
            <div className="space-y-5">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#004A74]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#004A74]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Angkatan
                </label>
                <input
                  value={form.angkatan}
                  onChange={(e) =>
                    setForm({ ...form, angkatan: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#004A74]"
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
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 h-32 focus:ring-2 focus:ring-[#004A74]"
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => router.push(`/profil/${id}`)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#004A74] text-white rounded shadow hover:bg-[#003d5e]"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>

        </div>
      </div>
    </FixLayout>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import FixLayout from "../../../components/FixLayout";
import { createMyProject, MOCK_PROJECTS } from "../../../lib/mock-data";

export default function AddProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    group: "",
    year: new Date().getFullYear().toString(),
    semester: "Ganjil",
    summary: "",
    description: "",
    evaluation: "",
    developmentSuggestion: "",
    status: "Draft"
  });

  const [galleryImages, setGalleryImages] = useState([]);
  const [proposalFile, setProposalFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const galleryInputRef = useRef(null);
  const proposalInputRef = useRef(null);

  // Get unique categories from mock projects
  const categories = ["Pilih Kategori", ...new Set(MOCK_PROJECTS.map(p => p.category).filter(Boolean))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Gallery Image Handlers
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} bukan format gambar yang valid (PNG/JPG/JPEG)`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`File ${file.name} terlalu besar. Maksimal 5MB`);
        return false;
      }
      return true;
    });

    const newImages = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setGalleryImages(prev => [...prev, ...newImages]);
  };

  const removeGalleryImage = (id) => {
    setGalleryImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // Proposal File Handlers
  const handleProposalChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan untuk proposal");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert("File terlalu besar. Maksimal 10MB");
      return;
    }

    setProposalFile(file);
    if (errors.proposal) {
      setErrors(prev => ({ ...prev, proposal: "" }));
    }
  };

  const removeProposal = () => {
    setProposalFile(null);
    if (proposalInputRef.current) {
      proposalInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Judul proyek harus diisi";
    }

    if (!formData.category || formData.category === "Pilih Kategori") {
      newErrors.category = "Kategori harus dipilih";
    }

    if (!formData.group.trim()) {
      newErrors.group = "Nama kelompok harus diisi";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Ringkasan harus diisi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi Capstone harus diisi";
    }

    if (!proposalFile) {
      newErrors.proposal = "Proposal (PDF) harus diupload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setSubmitting(true);

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Prepare images array (in real app, upload to server first)
      const imageUrls = galleryImages.map(img => img.preview);

      // Create project with mock data
      const newProject = createMyProject({
        ...formData,
        thumbnail: imageUrls[0] || "/assets/thumb-placeholder.png",
        images: imageUrls.length > 0 ? imageUrls : ["/assets/thumb-placeholder.png"],
        documents: proposalFile ? [{
          id: 1,
          name: proposalFile.name,
          type: "Proposal",
          uploadedAt: new Date().toLocaleDateString("id-ID"),
          size: `${(proposalFile.size / 1024 / 1024).toFixed(2)} MB`,
          url: "#"
        }] : [],
        members: [],
        milestones: []
      });

      alert("Proyek berhasil ditambahkan!");
      router.push("/proyek-saya");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Gagal menambahkan proyek. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
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
            <span
              className="hover:text-[#004A74] cursor-pointer"
              onClick={() => router.push("/proyek-saya")}
            >
              Proyek Saya
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold">Tambah Proyek</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-block">
              <h1 className="text-3xl font-bold text-[#004A74]">Tambah Proyek Baru</h1>
              <div className="h-1 bg-[#FED400] rounded mt-2"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Judul Proyek */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Proyek <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                    errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#004A74] focus:ring-[#004A74]"
                  }`}
                  placeholder="Masukkan judul proyek capstone"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                    errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#004A74] focus:ring-[#004A74]"
                  }`}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} disabled={cat === "Pilih Kategori"}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Nama Kelompok */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Kelompok <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                    errors.group ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#004A74] focus:ring-[#004A74]"
                  }`}
                  placeholder="Masukkan nama kelompok"
                />
                {errors.group && <p className="text-red-500 text-xs mt-1">{errors.group}</p>}
              </div>

              {/* Tahun & Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tahun <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74]"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74]"
                  >
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                  </select>
                </div>
              </div>

              {/* Ringkasan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ringkasan Proyek <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 resize-none ${
                    errors.summary ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#004A74] focus:ring-[#004A74]"
                  }`}
                  placeholder="Ringkasan singkat tentang proyek (maks 200 karakter)"
                  maxLength="200"
                />
                {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
                <p className="text-xs text-gray-500 mt-1">{formData.summary.length}/200 karakter</p>
              </div>

              {/* Deskripsi Capstone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Capstone <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 resize-none ${
                    errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#004A74] focus:ring-[#004A74]"
                  }`}
                  placeholder="Deskripsi lengkap tentang implementasi, teknologi yang digunakan, dan fitur-fitur proyek"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Evaluasi Capstone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Evaluasi Capstone
                </label>
                <textarea
                  name="evaluation"
                  value={formData.evaluation}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] resize-none"
                  placeholder="Hasil evaluasi proyek: performa sistem, pencapaian target, kelebihan dan kekurangan"
                />
              </div>

              {/* Saran Pengembangan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Saran Pengembangan
                </label>
                <textarea
                  name="developmentSuggestion"
                  value={formData.developmentSuggestion}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] resize-none"
                  placeholder="Saran untuk pengembangan lebih lanjut: fitur tambahan, integrasi sistem, atau perbaikan yang bisa dilakukan"
                />
              </div>

              {/* Galeri Gambar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Galeri Gambar (PNG/JPG/JPEG)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    onChange={handleGalleryChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Pilih Gambar
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Maksimal 5MB per gambar. Bisa memilih lebih dari 1 gambar.</p>
                </div>

                {/* Gallery Preview */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Proposal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Proposal (PDF) <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  errors.proposal ? "border-red-500" : "border-gray-300"
                }`}>
                  <input
                    ref={proposalInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleProposalChange}
                    className="hidden"
                  />
                  
                  {!proposalFile ? (
                    <>
                      <button
                        type="button"
                        onClick={() => proposalInputRef.current?.click()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        Pilih File PDF
                      </button>
                      <p className="text-xs text-gray-500 mt-2">Maksimal 10MB. Hanya file PDF.</p>
                    </>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <div className="text-left">
                          <p className="font-medium text-sm">{proposalFile.name}</p>
                          <p className="text-xs text-gray-500">{(proposalFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeProposal}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {errors.proposal && <p className="text-red-500 text-xs mt-1">{errors.proposal}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/proyek-saya")}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[#004A74] text-white font-semibold rounded-lg hover:bg-[#003d5e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Menyimpan..." : "Simpan Proyek"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FixLayout>
  );
}
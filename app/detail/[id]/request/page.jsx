"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

const PLACEHOLDER_THUMB = "/assets/thumb-placeholder.png";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function RequestPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? String(params.id) : null;

  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [projectError, setProjectError] = useState(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  // fetch project detail
  useEffect(() => {
    if (!id) {
      setProjectError("Project ID tidak ditemukan.");
      setLoadingProject(false);
      return;
    }
    let mounted = true;
    setLoadingProject(true);
    setProjectError(null);

    fetch(`/api/projects/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setProject(data);
        setLoadingProject(false);
      })
      .catch((err) => {
        if (!mounted) return;
<<<<<<< HEAD
        setProjectError("Gagal mengambil detail project: " + (err.message || err));
=======
        setProjectError(
          "Gagal mengambil detail project: " + (err.message || err)
        );
>>>>>>> df0f08d (Update header & footer.)
        setLoadingProject(false);
      });

    return () => (mounted = false);
  }, [id]);

  // file handlers
  const handleFilePick = (f) => {
    setFileError(null);
    if (!f) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(f.type)) {
<<<<<<< HEAD
      setFileError("Tipe file tidak didukung. Gunakan PDF atau Word (.pdf, .doc, .docx).");
=======
      setFileError(
        "Tipe file tidak didukung. Gunakan PDF atau Word (.pdf, .doc, .docx)."
      );
>>>>>>> df0f08d (Update header & footer.)
      setFile(null);
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("Ukuran file terlalu besar. Maks 5 MB.");
      setFile(null);
      return;
    }
    setFile(f);
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    handleFilePick(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFilePick(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // read file to base64
  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Gagal membaca file"));
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.split(",")[1] ?? "";
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });

  // submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!project) {
      setSubmitError("Project belum siap. Harap tunggu.");
      return;
    }
    if (!subject.trim()) {
      setSubmitError("Subject harus diisi.");
      return;
    }

    setSubmitting(true);

    let proposalFilePayload = null;
    try {
      if (file) {
        const base64 = await readFileAsBase64(file);
        proposalFilePayload = {
          name: file.name,
          mime: file.type || "application/octet-stream",
          size: file.size,
          base64,
        };
      }

      const payload = {
        projectId: project.id,
        projectTitle: project.title,
        subject: subject.trim(),
        message: message.trim(),
        proposalFile: proposalFilePayload,
      };

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      setSuccess(true);
      setSubject("");
      setMessage("");
      removeFile();

      setTimeout(() => {
        router.push("/history-request");
      }, 900);
    } catch (err) {
      setSubmitError(err.message || "Gagal mengirim request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
            onClick={() => router.push("/katalog")}
          >
            Katalog
          </span>
          <span>›</span>
          <span
            className="hover:text-[#004A74] cursor-pointer"
            onClick={() => router.push(`/detail/${id}`)}
          >
            {project?.title || "Detail Capstone"}
          </span>
          <span>›</span>
          <span className="text-[#004A74] font-semibold">
            Request Lanjutkan
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-3xl font-bold text-[#004A74]">
              Request Lanjutkan
            </h1>
            <div className="h-1 bg-[#FED400] rounded mt-2"></div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Isi form untuk meminta melanjutkan project
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT: Form */}
            <div className="md:col-span-2">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-semibold mb-2">Project</label>
                  <div className="flex items-center gap-3 p-3 border rounded bg-gray-50">
                    <div className="w-16 h-12 rounded overflow-hidden bg-slate-100">
                      <img 
                        src={project?.thumbnail || PLACEHOLDER_THUMB} 
                        alt={project?.title || "thumb"} 
                        className="w-full h-full object-cover" 
=======
                  <label className="block text-xs font-semibold mb-2">
                    Project
                  </label>
                  <div className="flex items-center gap-3 p-3 border rounded bg-gray-50">
                    <div className="w-16 h-12 rounded overflow-hidden bg-slate-100">
                      <img
                        src={project?.thumbnail || PLACEHOLDER_THUMB}
                        alt={project?.title || "thumb"}
                        className="w-full h-full object-cover"
>>>>>>> df0f08d (Update header & footer.)
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">
                        {project?.title || "-"}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {project?.category || "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-semibold mb-2">Subject</label>
=======
                  <label className="block text-xs font-semibold mb-2">
                    Subject
                  </label>
>>>>>>> df0f08d (Update header & footer.)
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white text-sm focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74]"
                    placeholder="Ringkasan singkat permintaan (subject)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Pesan / Rencana Lanjutan
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white text-sm min-h-[120px] focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] resize-none"
                    placeholder="Jelaskan singkat rencana atau alasan Anda ingin melanjutkan project ini"
                  />
                </div>

                {/* Upload box */}
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Upload Proposal (opsional)
                  </label>

                  <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className={`w-full min-h-[120px] flex items-center justify-center border-2 rounded-lg p-4 text-center cursor-pointer transition
<<<<<<< HEAD
                      ${file ? "border-dashed border-slate-300 bg-white" : "border-dashed border-slate-200 bg-gray-50 hover:bg-gray-100"}
=======
                      ${
                        file
                          ? "border-dashed border-slate-300 bg-white"
                          : "border-dashed border-slate-200 bg-gray-50 hover:bg-gray-100"
                      }
>>>>>>> df0f08d (Update header & footer.)
                    `}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
<<<<<<< HEAD
                    onKeyDown={(e) => { if (e.key === "Enter") fileInputRef.current?.click(); }}
=======
                    onKeyDown={(e) => {
                      if (e.key === "Enter") fileInputRef.current?.click();
                    }}
>>>>>>> df0f08d (Update header & footer.)
                  >
                    <div className="w-full">
                      {!file && (
                        <>
                          <div className="text-sm text-slate-500 mb-2">
<<<<<<< HEAD
                            Tarik & lepas file di sini, atau klik untuk pilih file
=======
                            Tarik & lepas file di sini, atau klik untuk pilih
                            file
>>>>>>> df0f08d (Update header & footer.)
                          </div>
                          <div className="text-xs text-slate-400">
                            Dukungan: .pdf, .doc, .docx — max 5MB
                          </div>
                        </>
                      )}

                      {file && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 text-left min-w-0">
<<<<<<< HEAD
                            <div className="font-medium truncate">{file.name}</div>
                            <div className="text-xs text-slate-500">
                              {Math.round(file.size / 1024)} KB • {file.type || "n/a"}
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              removeFile(); 
                            }} 
=======
                            <div className="font-medium truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {Math.round(file.size / 1024)} KB •{" "}
                              {file.type || "n/a"}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
>>>>>>> df0f08d (Update header & footer.)
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition"
                          >
                            Hapus
                          </button>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={onFileChange}
                        className="hidden"
                      />

                      {fileError && (
                        <p className="text-xs text-red-600 mt-2">{fileError}</p>
                      )}
                    </div>
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
                {success && (
                  <p className="text-sm text-green-600">
                    Request berhasil dikirim. Mengalihkan ke History…
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => router.push(`/detail/${id}`)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#004A74] text-white font-semibold rounded-lg hover:bg-[#003d5e] transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Mengirim..." : "Kirim Request"}
                  </button>
                </div>
              </form>
            </div>

<<<<<<< HEAD
{/* RIGHT: Project summary card */}
<aside className="md:col-span-1">
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-8">
    {loadingProject && (
      <p className="text-sm text-slate-500 p-4">Memuat project…</p>
    )}
    {projectError && (
      <p className="text-sm text-red-600 p-4">Error: {projectError}</p>
    )}

    {!loadingProject && project && (
      <>
        {/* Thumbnail dengan padding */}
        <div className="p-4">
          <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
            <img 
              src={project.thumbnail || PLACEHOLDER_THUMB} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-5">
          <p className="text-xs font-regular text-[#004A74] tracking-wide">
            {project.category || "Tanpa Kategori"}
          </p>
          <h3 className="text-base font-bold text-[#004A74] mt-2 leading-tight line-clamp-2">
            {project.title || "—"}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(project.rating || 0)
                    ? "/assets/icons/star-filled.png"
                    : "/assets/icons/star-empty.png"
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>

          {/* Group Name */}
          <p className="text-xs text-gray-500 mt-2">
            {project.group || "Kelompok"}
          </p>

          {/* Description */}
          <p className="text-sm text-[#332C2B] mt-3 leading-relaxed line-clamp-3">
            {project.summary || "Tidak ada deskripsi."}
          </p>

          {/* Status Badge */}
          <div className="mt-4">
            {project.availableForContinuation ? (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Terbuka untuk dilanjutkan</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Sudah dilanjutkan</span>
              </div>
            )}
          </div>
        </div>
      </>
    )}

    {!loadingProject && !project && !projectError && (
      <p className="text-sm text-slate-500 p-4">Project tidak ditemukan.</p>
    )}
  </div>
</aside>

=======
            {/* RIGHT: Project summary card */}
            <aside className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-8">
                {loadingProject && (
                  <p className="text-sm text-slate-500 p-4">Memuat project…</p>
                )}
                {projectError && (
                  <p className="text-sm text-red-600 p-4">
                    Error: {projectError}
                  </p>
                )}

                {!loadingProject && project && (
                  <>
                    {/* Thumbnail dengan padding */}
                    <div className="p-4">
                      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                        <img
                          src={project.thumbnail || PLACEHOLDER_THUMB}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-5">
                      <p className="text-xs font-regular text-[#004A74] tracking-wide">
                        {project.category || "Tanpa Kategori"}
                      </p>
                      <h3 className="text-base font-bold text-[#004A74] mt-2 leading-tight line-clamp-2">
                        {project.title || "—"}
                      </h3>

                      {/* Rating */}
                      <div className="mt-2 flex gap-1 items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <img
                            key={i}
                            src={
                              i < Math.round(project.rating || 0)
                                ? "/assets/icons/star-filled.png"
                                : "/assets/icons/star-empty.png"
                            }
                            alt="star"
                            className="w-4 h-4"
                          />
                        ))}
                      </div>

                      {/* Group Name */}
                      <p className="text-xs text-gray-500 mt-2">
                        {project.group || "Kelompok"}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#332C2B] mt-3 leading-relaxed line-clamp-3">
                        {project.summary || "Tidak ada deskripsi."}
                      </p>

                      {/* Status Badge */}
                      <div className="mt-4">
                        {project.availableForContinuation ? (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-medium">
                              Terbuka untuk dilanjutkan
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600 text-xs">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-medium">
                              Sudah dilanjutkan
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {!loadingProject && !project && !projectError && (
                  <p className="text-sm text-slate-500 p-4">
                    Project tidak ditemukan.
                  </p>
                )}
              </div>
            </aside>
>>>>>>> df0f08d (Update header & footer.)
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> df0f08d (Update header & footer.)

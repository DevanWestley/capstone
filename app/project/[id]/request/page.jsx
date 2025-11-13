"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
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

  const [file, setFile] = useState(null); // File object
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
        setProjectError("Gagal mengambil detail project: " + (err.message || err));
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
      setFileError("Tipe file tidak didukung. Gunakan PDF atau Word (.pdf, .doc, .docx).");
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

  // read file to base64 (without prefix)
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
        subject: subject.trim(), // field name requested
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
      // clear form lightly
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
    <div className="min-h-screen bg-gray-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="text-xs text-slate-500 mb-3 flex items-center gap-2">
          <Link href="/" className="hover:underline">Homepage</Link>
          <span>›</span>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <span>›</span>
          <span className="font-semibold">Request Lanjutkan</span>
        </nav>

        <div className="flex items-center justify-between mb-4">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-[#004A74] relative">
              Request Lanjutkan
            </h2>
            <div className="h-1 bg-[#FED400] rounded mt-2"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">Isi form untuk meminta melanjutkan project</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT: Form */}
            <div className="md:col-span-2">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">Project</label>
                  <div className="flex items-center gap-3 p-3 border rounded bg-gray-50">
                    <div className="w-16 h-12 rounded overflow-hidden bg-slate-100">
                      <img src={project?.thumbnail || PLACEHOLDER_THUMB} alt={project?.title || "thumb"} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{project?.title || "-"}</div>
                      <div className="text-xs text-slate-500 truncate">{project?.category || "-"}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white text-sm"
                    placeholder="Ringkasan singkat permintaan (subject)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">Pesan / Rencana Lanjutan</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white text-sm min-h-[120px]"
                    placeholder="Jelaskan singkat rencana atau alasan Anda ingin melanjutkan project ini"
                  />
                </div>

                {/* Upload box */}
                <div>
                  <label className="block text-xs font-semibold mb-2">Upload Proposal (opsional)</label>

                  <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className={`w-full min-h-[120px] flex items-center justify-center border-2 rounded-lg p-4 text-center cursor-pointer
                      ${file ? "border-dashed border-slate-300 bg-white" : "border-dashed border-slate-200 bg-gray-50"}
                    `}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") fileInputRef.current?.click(); }}
                  >
                    <div>
                      {!file && (
                        <>
                          <div className="text-sm text-slate-500 mb-2">Tarik & lepas file di sini, atau klik untuk pilih file</div>
                          <div className="text-xs text-slate-400">Dukungan: .pdf, .doc, .docx — max 5MB</div>
                        </>
                      )}

                      {file && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium truncate">{file.name}</div>
                            <div className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB • {file.type || "n/a"}</div>
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className="px-3 py-1 border rounded text-sm">Hapus</button>
                          </div>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={onFileChange}
                        className="hidden"
                      />

                      {fileError && <p className="text-xs text-red-600 mt-2">{fileError}</p>}
                    </div>
                  </div>
                </div>

                {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                {success && <p className="text-sm text-green-600">Request berhasil dikirim. Mengalihkan ke History…</p>}

                <div className="flex items-center justify-end gap-3">
                  <Link href={`/project/${id}`} className="px-4 py-2 border rounded text-sm">Kembali</Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-[#004A74] text-white rounded text-sm disabled:opacity-70"
                  >
                    {submitting ? "Mengirim..." : "Kirim Request"}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: Project summary card */}
            <aside className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {loadingProject && <p className="text-sm text-slate-500">Memuat project…</p>}
                {projectError && <p className="text-sm text-red-600">Error: {projectError}</p>}

                {!loadingProject && project && (
                  <>
                    <div className="w-full h-36 rounded overflow-hidden mb-3 bg-gradient-to-br from-red-100 via-orange-50 to-pink-100">
                      <img src={project.thumbnail || PLACEHOLDER_THUMB} alt={project.title} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-xs font-semibold text-[#004A74] uppercase tracking-wide">{project.category || "-"}</p>
                    <h3 className="text-base font-bold text-blue-900 mt-2 leading-tight">{project.title || "—"}</h3>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="text-xs text-gray-500">{project.group || "-"}</div>
                    </div>

                    <p className="text-sm text-slate-600 mt-3">{project.summary || "-"}</p>

                    <div className="mt-4 text-sm text-slate-500">
                      <div>Tanggal: {project.date ? new Date(project.date).toLocaleDateString() : "-"}</div>
                    </div>
                  </>
                )}

                {!loadingProject && !project && !projectError && (
                  <p className="text-sm text-slate-500">Project tidak ditemukan.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

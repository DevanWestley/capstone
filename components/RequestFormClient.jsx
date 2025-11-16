"use client";

import React, { useState } from "react";

/**
 * Props:
 * - project: { id, title }
 * - onSubmitted?: function(createdRequest) — dipanggil jika submit sukses
 */
export default function RequestFormClient({ project, onSubmitted }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const openForm = () => {
    setName("");
    setMessage("");
    setError(null);
    setSuccessMsg(null);
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    setError(null);
    setSuccessMsg(null);

    if (!name || name.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }

    setLoading(true);

    const payload = {
      projectId: project.id,
      projectTitle: project.title,
      requester: name.trim(),
      message: message.trim(),
    };

    // optimistic UI could be added, but keep simple here
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }

      const created = await res.json();

      setSuccessMsg("Request berhasil dikirim. Tunggu konfirmasi dari tim.");
      setOpen(false);

      if (typeof onSubmitted === "function") onSubmitted(created);
    } catch (err) {
      setError(err.message || "Gagal mengirim request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          openForm();
        }}
        className="px-3 py-2 bg-[#004A74] text-white rounded hover:opacity-95"
      >
        Request Lanjutkan
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeForm}
            aria-hidden
          />
          <form
            onSubmit={submit}
            className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-3">Request Lanjutkan</h3>
            <p className="text-sm text-slate-600 mb-3">Project: <strong>{project.title}</strong></p>

            <label className="block text-xs font-medium">Nama Anda</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="Nama lengkap"
              required
            />

            <label className="block text-xs font-medium">Pesan / Rencana</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              rows={4}
              placeholder="Jelaskan singkat rencana lanjutan atau alasan"
            />

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            {successMsg && <p className="text-sm text-green-600 mb-2">{successMsg}</p>}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="px-3 py-2 border rounded"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-[#004A74] text-white rounded"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Request"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

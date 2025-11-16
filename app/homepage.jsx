"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import FixLayout from "../components/FixLayout.jsx";
>>>>>>> c89257efbe4db11f7d6a3da31309e56ba9288e1f

const features = [
  {
    title: "Jelajahi Showcase Capstone",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet.",
    icon: "showcase-icon",
  },
  {
    title: "Lanjutkan Capstone Sebelumnya",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet.",
    icon: "lanjutkan-icon",
  },
  {
    title: "Review Penerus Capstone",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet.",
    icon: "review-icon",
  },
  {
    title: "Beri Rating dan Komentar",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet.",
    icon: "rating-icon",
  },
];

const Stars = ({ rating = 0 }) => {
  const r = Math.max(0, Math.min(5, Number(rating || 0)));
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={
            i < Math.round(r)
              ? "/assets/icons/star-filled.png"
              : "/assets/icons/star-empty.png"
          }
          alt="star"
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const [capstones, setCapstones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 6 capstone terbaru dengan status "Approved"
  useEffect(() => {
    setLoading(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Filter hanya yang Approved, sort by date (terbaru), ambil 6
        const approved = data
          .filter((p) => p.status === "Approved")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        setCapstones(approved);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const handleDetailClick = (id) => {
    router.push(`/detail/${id}`);
  };

  const handleViewAllClick = () => {
    router.push("/katalog");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900">
      {/* CONTAINER WITH PADDING */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* HERO SECTION */}
        <section className="relative h-80 rounded-lg overflow-hidden shadow-lg mb-16">
          {/* Background Image */}
          <img
            src="/assets/images/hero-bg.jpg"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay - dari kiri gelap ke kanan transparan */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full flex items-center px-8 md:px-12">
            <div className="max-w-xl">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight italic">
                Selamat Datang di Capstone Connector DTETI FT UGM
              </h1>
              <p className="mt-3 text-sm md:text-base text-white/95 leading-relaxed">
                Capstone Connector merupakan sebuah platform yang dirancang
                untuk mendukung kesinambungan proyek capstone di lingkungan
                DTETI FT UGM.
              </p>
              <button 
              onClick={() => router.push("/login")}
              className="mt-5 px-5 py-2 bg-white text-[#004A74] font-semibold rounded shadow hover:bg-gray-100 transition">
                Gabung Sekarang
              </button>
            </div>
          </div>
        </section>

        {/* DAFTAR CAPSTONE SECTION */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-block">
              <h2 className="text-3xl font-bold text-[#004A74] relative">
                Daftar Capstone
              </h2>
              <div className="h-1 bg-[#FED400] rounded mt-2"></div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
              <p className="text-gray-500 mt-4">Memuat capstone...</p>
            </div>
          )}

          {/* Capstone Grid */}
          {!loading && capstones.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {capstones.map((capstone) => (
                  <div
                    key={capstone.id}
                    className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleDetailClick(capstone.id)}
                  >
                    {/* Thumbnail dengan padding sesuai content card */}
                    <div className="p-4">
                      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                        <img
                          src={capstone.thumbnail || "/assets/thumb-placeholder.png"}
                          alt={capstone.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-5">
                      <p className="text-xs font-regular text-[#004A74] tracking-wide">
                        {capstone.category || "Tanpa Kategori"}
                      </p>
                      <h3 className="text-base font-bold text-[#004A74] mt-2 leading-tight line-clamp-2">
                        {capstone.title}
                      </h3>

                      {/* Rating */}
                      <div className="mt-2">
                        <Stars rating={capstone.rating} />
                      </div>

                      {/* Group Name */}
                      <p className="text-xs text-gray-500 mt-2">
                        {capstone.group || "Kelompok"}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#332C2B] mt-3 leading-relaxed line-clamp-3">
                        {capstone.summary ||
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet."}
                      </p>

                      {/* Link & Status Badge */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-[#004A74] font-semibold group">
                          <span className="text-sm relative">
                            Lihat Detail Capstone
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FED400] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          <img
                            src="/assets/icons/arrow-right.png"
                            alt="arrow"
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          />
                        </div>

                        {/* Status Badge */}
                        {capstone.availableForContinuation ? (
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
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <button
                  onClick={handleViewAllClick}
                  className="px-8 py-2.5 bg-[#004A74] text-white font-semibold rounded-[6px] hover:bg-[#FED400] transition shadow"
                >
                  Lihat Semua Capstone
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && capstones.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Belum ada capstone yang tersedia.</p>
            </div>
          )}
        </section>

        {/* FITUR SECTION */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl font-bold text-[#004A74] relative">
                Fitur Capstone Connector
              </h2>
              <div className="h-1 bg-[#FED400] mt-2"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] border border-gray-200 p-10 text-center hover:shadow-lg transition"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <img
                    src={`/assets/icons/${feature.icon}.png`}
                    alt={feature.title}
                    className="w-auto h-auto object-contain "
                  />
                </div>

                {/* Title */}
                <div className="inline-block">
                  <h3 className="font-bold text-[#004A74] text-lg leading-tight mb-2">
                    {feature.title}
                  </h3>
                  <div className="h-0.5 bg-[#FED400] rounded mb-3"></div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
=======
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC] text-slate-900">
        {/* CONTAINER WITH PADDING */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* HERO SECTION */}
          <section className="relative h-80 rounded-lg overflow-hidden shadow-lg mb-16">
            {/* Background Image */}
            <img
              src="/assets/images/hero-bg.jpg"
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay - dari kiri gelap ke kanan transparan */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative h-full flex items-center px-8 md:px-12">
              <div className="max-w-xl">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight italic">
                  Selamat Datang di Capstone Connector DTETI FT UGM
                </h1>
                <p className="mt-3 text-sm md:text-base text-white/95 leading-relaxed">
                  Capstone Connector merupakan sebuah platform yang dirancang
                  untuk mendukung kesinambungan proyek capstone di lingkungan
                  DTETI FT UGM.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="mt-5 px-5 py-2 bg-white text-[#004A74] font-semibold rounded shadow hover:bg-gray-100 transition"
                >
                  Gabung Sekarang
                </button>
              </div>
            </div>
          </section>

          {/* DAFTAR CAPSTONE SECTION */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block">
                <h2 className="text-3xl font-bold text-[#004A74] relative">
                  Daftar Capstone
                </h2>
                <div className="h-1 bg-[#FED400] rounded mt-2"></div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
                <p className="text-gray-500 mt-4">Memuat capstone...</p>
              </div>
            )}

            {/* Capstone Grid */}
            {!loading && capstones.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {capstones.map((capstone) => (
                    <div
                      key={capstone.id}
                      className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition cursor-pointer"
                      onClick={() => handleDetailClick(capstone.id)}
                    >
                      {/* Thumbnail dengan padding sesuai content card */}
                      <div className="p-4">
                        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                          <img
                            src={
                              capstone.thumbnail ||
                              "/assets/thumb-placeholder.png"
                            }
                            alt={capstone.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-5">
                        <p className="text-xs font-regular text-[#004A74] tracking-wide">
                          {capstone.category || "Tanpa Kategori"}
                        </p>
                        <h3 className="text-base font-bold text-[#004A74] mt-2 leading-tight line-clamp-2">
                          {capstone.title}
                        </h3>

                        {/* Rating */}
                        <div className="mt-2">
                          <Stars rating={capstone.rating} />
                        </div>

                        {/* Group Name */}
                        <p className="text-xs text-gray-500 mt-2">
                          {capstone.group || "Kelompok"}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-[#332C2B] mt-3 leading-relaxed line-clamp-3">
                          {capstone.summary ||
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet."}
                        </p>

                        {/* Link & Status Badge */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 text-[#004A74] font-semibold group">
                            <span className="text-sm relative">
                              Lihat Detail Capstone
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FED400] transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            <img
                              src="/assets/icons/arrow-right.png"
                              alt="arrow"
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            />
                          </div>

                          {/* Status Badge */}
                          {capstone.availableForContinuation ? (
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
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                  <button
                    onClick={handleViewAllClick}
                    className="px-8 py-2.5 bg-[#004A74] text-white font-semibold rounded-[6px] hover:bg-[#FED400] transition shadow"
                  >
                    Lihat Semua Capstone
                  </button>
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && capstones.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  Belum ada capstone yang tersedia.
                </p>
              </div>
            )}
          </section>

          {/* FITUR SECTION */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-3xl font-bold text-[#004A74] relative">
                  Fitur Capstone Connector
                </h2>
                <div className="h-1 bg-[#FED400] mt-2"></div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[12px] border border-gray-200 p-10 text-center hover:shadow-lg transition"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto flex items-center justify-center">
                    <img
                      src={`/assets/icons/${feature.icon}.png`}
                      alt={feature.title}
                      className="w-auto h-auto object-contain "
                    />
                  </div>

                  {/* Title */}
                  <div className="inline-block">
                    <h3 className="font-bold text-[#004A74] text-lg leading-tight mb-2">
                      {feature.title}
                    </h3>
                    <div className="h-0.5 bg-[#FED400] rounded mb-3"></div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </FixLayout>
  );
}
>>>>>>> c89257efbe4db11f7d6a3da31309e56ba9288e1f

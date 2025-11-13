import React from "react";

const capstones = [
  {
    id: 1,
    category: "Transportasi Ramah Lingkungan",
    title: "judul kepstong anjay gurinjay",
    rating: 5,
    group: "nama kelompok",
  },
  {
    id: 2,
    category: "Kesehatan",
    title: "judul kepstong anjay gurinjay",
    rating: 4,
    group: "nama kelompok",
  },
  {
    id: 3,
    category: "Pengelolaan Sampah",
    title: "judul kepstong anjay gurinjay",
    rating: 4,
    group: "nama kelompok",
  },
  {
    id: 4,
    category: "Energi Terbarukan",
    title: "judul kepstong anjay gurinjay",
    rating: 4,
    group: "nama kelompok",
  },
  {
    id: 5,
    category: "IoT & Smart City",
    title: "judul kepstong anjay gurinjay",
    rating: 5,
    group: "nama kelompok",
  },
  {
    id: 6,
    category: "Manajemen Data",
    title: "judul kepstong anjay gurinjay",
    rating: 3,
    group: "nama kelompok",
  },
];

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
    title: "Beri Rating & Komentar",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit est, eu posuere tellus ornare in. Fusce feugiat ligula eu orci fringilla imperdiet.",
    icon: "rating-icon",
  },
];

const Stars = ({ rating = 0 }) => {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={
            i < rating
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
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900">
      {/* CONTAINER WITH PADDING */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* HERO SECTION - dengan padding kanan kiri sama seperti card */}
        <section className="relative h-90 rounded-[4px] overflow-hidden shadow-lg mb-16">
          {/* Background Image */}
          <img
            src="/assets/images/hero-bg.jpg"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay - dari kiri gelap ke kanan transparan */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>

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
              <button className="mt-5 px-5 py-2 bg-white text-[#004A74] font-semibold rounded shadow hover:bg-gray-100 transition">
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

          {/* Capstone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {capstones.map((capstone) => (
              <div
                key={capstone.id}
                className="bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow hover:shadow-lg transition"
              >
                {/* Thumbnail dengan padding sesuai content card */}
                <div className="p-4">
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-red-100 via-orange-50 to-pink-100 rounded-[12px]">
                    <img
                      src="/assets/images/capstone-thumbnail.jpg"
                      alt={capstone.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-5">
                  <p className="text-xs font-semibold text-[#004A74] uppercase tracking-wide">
                    {capstone.category}
                  </p>
                  <h3 className="text-base font-bold text-blue-900 mt-2 leading-tight">
                    {capstone.title}
                  </h3>

                  {/* Rating */}
                  <div className="mt-2">
                    <Stars rating={capstone.rating} />
                  </div>

                  {/* Group Name */}
                  <p className="text-xs text-gray-500 mt-2">{capstone.group}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris fermentum elit est, eu posuere tellus ornare in.
                    Fusce feugiat ligula eu orci fringilla imperdiet.
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 mt-4 text-[#004A74] font-semibold hover:text-[#FED400] cursor-pointer group">
                    <span className="text-sm">Lihat Detail Capstone</span>
                    <img
                      src="/assets/icons/arrow-right.png"
                      alt="arrow"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="px-8 py-2.5 bg-[#004A74] text-white font-semibold rounded-[6px] hover:bg-[#FED400] transition shadow">
              Lihat Semua Capstone
            </button>
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] border border-gray-200 p-6 text-center hover:shadow-lg transition"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-50">
                  <img
                    src={`/assets/icons/${feature.icon}.svg`}
                    alt={feature.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Title */}

                <div className="inline-block">
                  <h3 className="font-bold text-blue-900 text-sm leading-tight mb-2">
                    {feature.title}
                  </h3>
                  <div className="h-0.5 bg-[#FED400] rounded mb-3"></div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
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

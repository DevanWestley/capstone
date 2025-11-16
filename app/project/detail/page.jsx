import React from 'react';
import Link from 'next/link';

// Data disesuaikan agar lebih realistis, terinspirasi dari mock-data.js
const project = {
    title: "Telemedicine untuk Desa",
    category: "Kesehatan",
    group: "Kelompok Med-Tech Alpha",
    rating: 4.8,
    reviews: 87,
    description: `Aplikasi web dan mobile yang memfasilitasi konsultasi medis jarak jauh. Dilengkapi dengan chatbot berbasis NLP untuk triase awal, sistem antrian online, rekam medis elektronik, dan integrasi pembayaran digital.\n\nBerhasil diuji coba di 5 desa dengan 200+ pengguna. Response time chatbot rata-rata 2 detik. Video call stabil pada koneksi 3G. User satisfaction rate mencapai 87%.\n\nSaran pengembangan mencakup integrasi dengan BPJS untuk klaim otomatis, penambahan fitur resep digital yang terintegrasi dengan apotek, dan implementasi AI diagnosis untuk penyakit umum.`,
    images: [
        "/assets/projects/telemedicine-1.jpg",
        "/assets/projects/telemedicine-2.jpg",
        "/assets/projects/telemedicine-3.jpg",
        "/assets/projects/telemedicine-4.jpg",
        "/assets/projects/telemedicine-5.jpg"
    ],
};

const comments = [
    {
        id: 1,
        author: "Budi Haryono",
        text: "Proyek yang sangat menjanjikan! Apakah sudah ada rencana untuk integrasi dengan BPJS?",
        date: "22 November 2025",
    },
];

const Stars = ({ rating = 0, count }) => (
    <div className="flex items-center gap-2">
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-2xl ${i < Math.round(rating) ? "text-[#FED400]" : "text-gray-300"}`}>★</span>
            ))}
        </div>
        <span className="text-sm text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>({count})</span>
    </div>
);

// Komponen galeri diubah untuk menampilkan gambar nyata
const ProjectGallery = ({ images }) => (
    <div className="w-full md:w-2/5">
        <div className="relative mb-3 h-64 w-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src={images[0]} alt="Project Thumbnail" className="w-full h-full object-cover" />
        </div>

        <div className="relative flex items-center justify-center px-8">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black z-10">
                &lt;
            </button>
            <div className="flex gap-3 overflow-hidden">
                {images.slice(1, 5).map((src, index) => (
                    <div key={index} className="w-28 h-20 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src={src} alt={`Project image ${index + 2}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black z-10">
                &gt;
            </button>
        </div>
    </div>
);

const CommentCard = ({ comment }) => (
    <div className="flex gap-4 border-t border-gray-200 py-6">
        <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="w-full">
            <div className="flex items-center justify-between">
                 <h4 className="font-semibold text-[#332C2B]" style={{ fontFamily: "Gama-Sans" }}>{comment.author}</h4>
                 <span className="text-xs text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>{comment.date}</span>
            </div>
            <p className="mt-1 text-sm text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>{comment.text}</p>
            <button className="mt-2 text-sm font-semibold text-[#004A74] hover:underline" style={{ fontFamily: "Gama-Sans" }}>
                Reply &rarr;
            </button>
        </div>
    </div>
);


export default function ProjectDetailPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                 <nav className="font-gama-sans mb-8 text-sm text-[#5B5858]">
                    <Link href="/" className="hover:underline">Homepage</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/project" className="hover:underline">Proyek Saya</Link>
                    <span className="mx-2">&gt;</span>
                    <span>Detail Proyek</span>
                </nav>

                <main>
                    <section className="flex flex-col md:flex-row gap-8">
                        <ProjectGallery images={project.images} />
                        <div className="flex-1 py-4">
                            <h1 className="text-3xl lg:text-4xl font-bold text-[#004A74] leading-tight" style={{ fontFamily: "Gama-Serif" }}>{project.title}</h1>
                            <p className="mt-4 text-lg font-semibold text-[#004A74]" style={{ fontFamily: "Gama-Sans" }}>{project.category}</p>
                            <p className="mt-1 text-base text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>{project.group}</p>
                            <div className="mt-6 flex items-center justify-between">
                                <Stars rating={project.rating} count={project.reviews} />
                                <Link href="/project/request">
                                    <button className="rounded-lg bg-[#004A74] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003557] whitespace-nowrap" style={{ fontFamily: "Gama-Sans" }}>
                                        Lihat Request
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12">
                         <h2 className="text-2xl font-bold text-[#332C2B] border-b-2 border-gray-200 pb-3" style={{ fontFamily: "Gama-Serif" }}>Deskripsi Capstone</h2>
                         <div className="mt-4 space-y-4 text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Gama-Sans" }}>
                            {project.description.split('\n\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    <section className="mt-12">
                        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
                            <h2 className="text-2xl font-bold text-[#332C2B]" style={{ fontFamily: "Gama-Serif" }}>Komentar ({comments.length})</h2>
                             <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-[#332C2B] hover:bg-gray-100 transition" style={{ fontFamily: "Gama-Sans" }}>
                                <span className="text-xl font-light">+</span> Tulis Komentar
                            </button>
                        </div>
                         <div>
                            {comments.map(comment => (
                                <CommentCard key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </section>
                </main>

                <footer className="mt-16 flex items-center justify-between border-t-2 border-gray-200 pt-8">
                     <button className="rounded-lg bg-[#C41E3A] px-8 py-3 text-sm font-semibold text-white transition hover:bg-opacity-90" style={{ fontFamily: "Gama-Sans" }}>
                        Hapus Proyek
                    </button>
                     <button className="rounded-lg bg-[#004A74] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#003557]" style={{ fontFamily: "Gama-Sans" }}>
                        Edit Proyek
                    </button>
                </footer>

            </div>
        </div>
    );
}

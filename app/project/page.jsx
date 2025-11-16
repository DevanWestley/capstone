import React from "react";
import Link from "next/link";

const projects = [
    { id: 1, title: "Telemedicine untuk Desa", category: "Kesehatan", rating: 5, reviews: 87, image: "/assets/projects/telemedicine-1.jpg" },
    { id: 2, title: "Sistem Bank Sampah Digital", category: "Pengelolaan Sampah", rating: 4, reviews: 76, image: "/assets/projects/waste-management-1.jpg" },
    { id: 3, title: "Aplikasi Kesehatan Mental", category: "Kesehatan", rating: 5, reviews: 92, image: "/assets/projects/mental-health-1.jpg" },
    { id: 4, title: "Smart Parking System", category: "Smart City", rating: 4, reviews: 65, image: "/assets/projects/smart-parking-1.jpg" },
    { id: 5, title: "Monitoring Kualitas Udara", category: "Smart City", rating: 5, reviews: 102, image: "/assets/projects/air-quality-1.jpg" },
    { id: 6, title: "Jalur Sepeda Cerdas", category: "Transportasi Ramah Lingkungan", rating: 4, reviews: 88, image: "/assets/projects/bike-lane-1.jpg" },
];

const Stars = ({ rating = 0 }) => (
    <div className="flex gap-1 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-lg ${i < rating ? "text-[#FED400]" : "text-gray-300"}`}>★</span>
        ))}
    </div>
);

function ProjectCard({ project }) {
    return (
        <div className="bg-[#FCFCFC] rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">
            <div className="relative overflow-hidden bg-gray-200 h-48">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="px-4 py-5">
                <p className="text-xs font-semibold text-[#004A74] uppercase tracking-wide" style={{ fontFamily: "Gama-Sans" }}>{project.category}</p>
                <h3 className="text-lg font-semibold text-[#332C2B] mt-3" style={{ fontFamily: "Gama-Serif" }}>{project.title}</h3>
                <div className="flex items-center justify-between mt-5">
                    <div>
                        <Stars rating={project.rating} />
                        <Link href="/project/detail">
                            <p className="text-xs text-[#5B5858] mt-3 hover:underline" style={{ fontFamily: "Gama-Sans" }}>Lihat Detail Capstone →</p>
                        </Link>
                    </div>

                    <Link href="/project/request">
                        <button className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#004A74] hover:bg-opacity-90 transition" style={{ fontFamily: "Gama-Sans" }}>Lihat Request</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ProjectPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FCFCFC" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
                <nav className="text-sm text-[#5B5858] mb-6" style={{ fontFamily: "Gama-Sans" }}>
                     <Link href="/" className="hover:underline">Homepage</Link>
                     <span className="mx-2">&gt;</span>
                     <span>Proyek Saya</span>
                </nav>

                <div className="mb-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-[#004A74]" style={{ fontFamily: "Gama-Serif" }}>Proyek Saya</h1>
                        <div className="w-52 h-1 bg-[#FED400] mt-4"></div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-1">
                            <div className="flex gap-3 items-end">
                                <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm flex-1">
                                    <img src="/assets/icons/search.png" alt="search" className="w-4 h-4 mr-3" />
                                    <input 
                                        className="outline-none text-sm bg-transparent w-full" 
                                        placeholder="Cari berdasarkan kata kunci, judul, atau deskripsi"
                                        style={{ fontFamily: "Gama-Sans" }}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#5B5858] whitespace-nowrap" style={{ fontFamily: "Gama-Sans" }}>Filter berdasarkan status</span>
                                    <select className="border border-gray-300 rounded-lg px-3 py-3 text-sm bg-white text-[#332C2B]" style={{ fontFamily: "Gama-Sans" }}>
                                        <option>Semua</option>
                                        <option>Aktif</option>
                                        <option>Selesai</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div></div>
                    </div>

                    <div className="flex justify-end mt-3">
                        <Link href="/project/add">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold bg-[#004A74] hover:bg-[#003557] transition whitespace-nowrap shadow-md" style={{ fontFamily: "Gama-Sans" }}>
                                <span className="text-2xl leading-none">+</span>
                                <span>Tambah Proyek</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <div className="flex items-center gap-4 text-[#004A74]" style={{ fontFamily: "Gama-Sans" }}>
                        <button className="p-2 hover:bg-gray-100 rounded transition">&larr;</button>
                        <div className="flex gap-1 items-center">
                            <span className="inline-block w-3 h-3 bg-[#FED400] rounded-full"></span>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded transition font-medium">1</button>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded transition">2</button>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded transition">3</button>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded transition">4</button>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded transition">5</button>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded transition">&rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

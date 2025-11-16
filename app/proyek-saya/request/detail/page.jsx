'use client';
import React from 'react';
import Link from 'next/link';

const requesterGroup = {
    name: "Kelompok Inovasi Transportasi",
    year: "2023",
    projectImage: "/assets/projects/smart-parking-1.jpg", // Menggunakan gambar proyek terkait
    description: "Kelompok yang berfokus pada pengembangan solusi inovatif untuk tantangan transportasi perkotaan. Kami memiliki anggota dari berbagai disiplin ilmu, termasuk Teknik Informatika, Desain Komunikasi Visual, dan Manajemen Bisnis. Proyek kami sebelumnya mencakup sistem pemantauan lalu lintas berbasis AI dan aplikasi carpooling untuk komunitas kampus.",
    members: [
        { id: 1, name: "Ahmad Zaelani", nim: "123456789", major: "Teknik Informatika" },
        { id: 2, name: "Siti Aminah", nim: "987654321", major: "Desain Komunikasi Visual" },
        { id: 3, name: "Budi Santoso", nim: "112233445", major: "Manajemen Bisnis" },
        { id: 4, name: "Dewi Lestari", nim: "556677889", major: "Sistem Informasi" },
    ],
    message: {
        subject: "Permintaan Kolaborasi untuk Proyek Smart Parking",
        text: "Kami sangat tertarik dengan proyek 'Smart Parking System dengan IoT' Anda dan melihat potensi besar untuk mengadaptasinya di lingkungan kampus kami yang padat. Kami ingin menjadwalkan pertemuan singkat untuk mendiskusikan kemungkinan kolaborasi lebih lanjut dan memahami aspek teknis yang perlu kami persiapkan."
    }
};

const MemberCard = ({ member }) => (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 py-4 px-4">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div>
                <h4 className="font-semibold text-base text-[#332C2B]" style={{ fontFamily: "Gama-Sans" }}>{member.name}</h4>
                <p className="text-sm text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>NIM: {member.nim}</p>
                <p className="text-sm text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>Jurusan: {member.major}</p>
            </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2" style={{ fontFamily: "Gama-Sans" }}>
                <img src="/assets/icons/portfolio.png" className="w-3 h-3" />
                <span>Lihat Portofolio</span>
            </button>
            <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2" style={{ fontFamily: "Gama-Sans" }}>
                 <img src="/assets/icons/linkedin.png" className="w-3 h-3" />
                 <span>Lihat LinkedIn</span>
            </button>
        </div>
    </div>
);

export default function RequesterDetailPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <nav className="font-gama-sans mb-8 text-sm text-[#5B5858]">
                    <Link href="/" className="hover:underline">Homepage</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/project" className="hover:underline">Proyek Saya</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/project/request" className="hover:underline">Lihat Request</Link>
                    <span className="mx-2">&gt;</span>
                    <span>{requesterGroup.name}</span>
                </nav>

                <main>
                    <section className="flex flex-col md:flex-row items-start gap-8 mb-10">
                        <div className="w-full md:w-1/4 h-48 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                           <img src={requesterGroup.projectImage} alt="Project Thumbnail" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl lg:text-4xl font-bold text-[#004A74] leading-tight" style={{ fontFamily: "Gama-Serif" }}>{requesterGroup.name}</h1>
                            <p className="mt-2 text-base text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>Angkatan {requesterGroup.year}</p>
                            <div className="mt-5 flex gap-3">
                                <button className="rounded-lg border-2 border-[#004A74] bg-white px-8 py-2.5 text-sm font-semibold text-[#004A74] transition hover:bg-gray-50" style={{ fontFamily: "Gama-Sans" }}>
                                    Tolak
                                </button>
                                <button className="rounded-lg bg-[#004A74] px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-opacity-90 flex items-center gap-2" style={{ fontFamily: "Gama-Sans" }}>
                                    <span className="text-lg">✔</span>
                                    <span>Terima</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#332C2B] border-b-2 border-gray-200 pb-3 mb-4" style={{ fontFamily: "Gama-Serif" }}>Deskripsi Kelompok</h2>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Gama-Sans" }}>{requesterGroup.description}</p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-2xl font-bold text-[#332C2B] border-b-2 border-gray-200 pb-3" style={{ fontFamily: "Gama-Serif" }}>Detail Anggota</h2>
                        <div>
                            {requesterGroup.members.map(member => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </section>

                     <section className="mt-10">
                        <h2 className="text-2xl font-bold text-[#332C2B] border-b-2 border-gray-200 pb-3 mb-4" style={{ fontFamily: "Gama-Serif" }}>Pesan</h2>
                        <div className="p-4 border rounded-md bg-gray-50">
                            <h3 className="font-bold text-[#332C2B]" style={{ fontFamily: "Gama-Sans" }}>{requesterGroup.message.subject}</h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Gama-Sans" }}>{requesterGroup.message.text}</p>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

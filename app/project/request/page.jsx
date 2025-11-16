import React from 'react';
import Link from 'next/link';

const project = {
    title: "Smart Parking System dengan IoT",
    category: "Smart City",
    group: "Kelompok Smart E",
    rating: 4.6,
    reviews: 65,
    images: [
        "/assets/projects/smart-parking-1.jpg",
        "/assets/projects/smart-parking-2.jpg",
        "/assets/projects/smart-parking-3.jpg",
        "/assets/projects/smart-parking-4.jpg",
    ],
};

const requesters = [
    {
        id: 1,
        name: "Kelompok Inovasi Transportasi",
        message: "Tertarik untuk mengadaptasi sistem ini di area kampus kami.",
    },
    {
        id: 2,
        name: "Urban Tech Solutions",
        message: "Ingin menjajaki kemungkinan kolaborasi untuk proyek percontohan di pusat kota.",
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

const ProjectSummary = () => (
    <section className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Project Gallery */}
        <div className="w-full md:w-2/5">
            <div className="relative mb-3 h-52 w-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                 <img src={project.images[0]} alt="Project Thumbnail" className="w-full h-full object-cover" />
            </div>
            <div className="relative flex items-center justify-center px-8">
                <button className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black z-10">&lt;</button>
                <div className="flex gap-3 overflow-hidden">
                    {project.images.map((src, index) => (
                        <div key={index} className="w-24 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img src={src} alt={`Project image ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black z-10">&gt;</button>
            </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 py-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#004A74] leading-tight" style={{ fontFamily: "Gama-Serif" }}>{project.title}</h1>
            <p className="mt-3 text-lg font-semibold text-[#004A74]" style={{ fontFamily: "Gama-Sans" }}>{project.category}</p>
            <p className="mt-1 text-base text-[#5B5858]" style={{ fontFamily: "Gama-Sans" }}>Oleh: {project.group}</p>
            <div className="mt-5 flex items-center justify-between">
                <Stars rating={project.rating} count={project.reviews} />
                 <Link href="/project/detail">
                    <button className="rounded-lg bg-[#004A74] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003557] whitespace-nowrap" style={{ fontFamily: "Gama-Sans" }}>
                        Lihat Detail
                    </button>
                </Link>
            </div>
        </div>
    </section>
);


const RequesterCard = ({ requester }) => (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 py-5 px-4">
        <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div>
                <h4 className="font-semibold text-[#332C2B]" style={{ fontFamily: "Gama-Sans" }}>{requester.name}</h4>
                <p className="text-sm text-[#5B5858] mt-1" style={{ fontFamily: "Gama-Sans" }}>{requester.message}</p>
                <Link href="/project/request/detail">
                    <button className="mt-2 text-xs font-semibold text-[#004A74] hover:underline" style={{ fontFamily: "Gama-Sans" }}>
                        Lihat Detail &rarr;
                    </button>
                </Link>
            </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition" style={{ fontFamily: "Gama-Sans" }}>
                Tolak
            </button>
            <button className="rounded-md bg-[#004A74] px-4 py-2 text-xs font-semibold text-white hover:bg-opacity-90 transition" style={{ fontFamily: "Gama-Sans" }}>
                Terima
            </button>
        </div>
    </div>
);

export default function RequestPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <nav className="font-gama-sans mb-8 text-sm text-[#5B5858]">
                    <Link href="/" className="hover:underline">Homepage</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/project" className="hover:underline">Proyek Saya</Link>
                    <span className="mx-2">&gt;</span>
                    <span>Lihat Request</span>
                </nav>

                <main>
                    <ProjectSummary />
                    
                    <section>
                        <h2 className="text-2xl font-bold text-[#332C2B] border-b-2 border-gray-200 pb-3" style={{ fontFamily: "Gama-Serif" }}>
                            Requester ({requesters.length})
                        </h2>
                        <div>
                            {requesters.map(req => (
                                <RequesterCard key={req.id} requester={req} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

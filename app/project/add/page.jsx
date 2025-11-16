
import React from 'react';
import Link from 'next/link';

const InputField = ({ label, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-[#332C2B] mb-2" style={{ fontFamily: 'Gama-Sans' }}>
            {label}
        </label>
        <input
            type="text"
            className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-sm"
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, placeholder, rows = 4 }) => (
    <div>
        <label className="block text-sm font-medium text-[#332C2B] mb-2" style={{ fontFamily: 'Gama-Sans' }}>
            {label}
        </label>
        <textarea
            rows={rows}
            className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-sm"
            placeholder={placeholder}
        ></textarea>
    </div>
);

const SelectField = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium text-[#332C2B] mb-2" style={{ fontFamily: 'Gama-Sans' }}>
            {label}
        </label>
        <select className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-sm" style={{ fontFamily: 'Gama-Sans' }}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

const FileUpload = ({ label, formats }) => (
    <div>
        <label className="block text-sm font-medium text-[#332C2B] mb-1" style={{ fontFamily: 'Gama-Sans' }}>
            {label}
        </label>
        <p className="text-xs text-[#5B5858] mb-2" style={{ fontFamily: 'Gama-Sans' }}>{formats}</p>
        <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                </div>
                <input type="file" className="hidden" />
            </label>
        </div>
    </div>
);


export default function AddProjectPage() {
    const temaOptions = ["Kesehatan", "Pengelolaan Sampah", "Smart City", "Transportasi Ramah Lingkungan"];
    const startYear = 2015;
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

    return (
        <div className="min-h-screen bg-[#FCFCFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <nav className="font-gama-sans mb-6 text-sm text-[#5B5858]">
                    <Link href="/" className="hover:underline">Homepage</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/project" className="hover:underline">Proyek Saya</Link>
                    <span className="mx-2">&gt;</span>
                    <span>Tambah Proyek Baru</span>
                </nav>

                <div className="mb-8">
                    <h1 className="font-gama-serif text-4xl font-bold text-[#004A74]">Tambah Proyek Baru</h1>
                    <div className="mt-2 h-1 w-83 bg-[#FED400]"></div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <form className="space-y-6">
                        <InputField label="Nama Proyek" />
                        <TextAreaField label="Deskripsi Singkat" rows={3} />
                        <TextAreaField label="Saran Pengembangan dan Evaluasi project" rows={5} />
                        
                        <SelectField label="Tema" options={temaOptions} />
                        <SelectField label="Tahun" options={yearOptions} />

                        <FileUpload label="Galeri Gambar" formats="(Unggah Foto Proyek .jpg/.jpeg/.png)" />
                        <FileUpload label="Dokumen Proposal" formats="(Unggah File .pdf)" />

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="rounded-lg bg-[#004A74] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#003557]"
                                style={{ fontFamily: 'Gama-Sans' }}
                            >
                                Tambahkan Proyek
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

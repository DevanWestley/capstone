"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname(); // cek halaman aktif
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("user", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const menu = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Katalog", href: "/katalog" },
    { name: "Riwayat", href: "/history-request" },
  ];

  return (
    <header className="w-full bg-[#08375E] text-white shadow-md border-b border-[#0f4c75]">
      <div className="max-w-7xl mx-auto flex items-center gap-4 py-4 px-6">
        <img
          src="/assets/images/ugm-logo.png"
          alt="Logo UGM"
          className="h-14 w-auto"
        />
        <div>
          <h1 className="text-lg font-semibold leading-tight tracking-wide">
            CAPSTONE CONNECTOR
          </h1>
          <h2 className="text-sm tracking-wide">
            DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI
          </h2>
          <h2 className="text-sm tracking-wide">UNIVERSITAS GADJAH MADA</h2>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="w-full bg-[#0A3E66] text-white text-sm font-medium select-none">
        <ul className="max-w-7xl mx-auto flex items-center">
          {menu.map((item) => {
            const active = pathname === item.href;

            return (
              <li
                key={item.name}
                className={`
                  px-6 py-4 cursor-pointer border-r border-[#0f4c75]
                  ${
                    active
                      ? "bg-[#FED400] text-black font-semibold"
                      : "hover:text-[#FED400] hover:bg-[#0d4f82]"
                  }
                `}
              >
                <Link href={item.href}>{item.name.toUpperCase()}</Link>
              </li>
            );
          })}

          <li className="flex-1"></li>

          {/* LOGIN / LOGOUT */}
          {!isLoggedIn ? (
            <li
              onClick={handleLogin}
              className="px-6 py-4 cursor-pointer hover:text-[#FED400] hover:bg-[#0d4f82] border-l border-[#0f4c75]"
            >
              LOGIN
            </li>
          ) : (
            <li
              onClick={handleLogout}
              className="px-6 py-4 cursor-pointer hover:bg-red-700 border-l border-[#0f4c75]"
            >
              LOGOUT
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

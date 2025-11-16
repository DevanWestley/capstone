'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  function showToast(message, kind = 'info') {
    const id = 'capstone-toast';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className =
        'fixed bottom-6 right-6 z-50 max-w-xs rounded-md p-3 shadow-lg text-sm';
      document.body.appendChild(el);
    }
    el.innerHTML = `<div class="px-4 py-2 rounded ${
      kind === 'destructive' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
    }">${message}</div>`;
    setTimeout(() => {
      if (el) el.innerHTML = '';
    }, 3000);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    let email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '').trim();

    if (!email) {
      showToast('Email/UGM ID diperlukan', 'destructive');
      return;
    }
    if (!password) {
      showToast('Password diperlukan', 'destructive');
      return;
    }

    // Tambahkan @ugm.ac.id jika user hanya input "devanw"
    if (!email.includes('@')) email = `${email}@ugm.ac.id`;

    // === DUMMY LOGIN (tanpa API) ===
    const validUser = "devanw@ugm.ac.id";
    const validPass = "12345678";

    if (email === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      showToast("Login Successful — Welcome back!");
      router.push("/");
      return;
    }

    // Jika salah
    showToast("Username atau password salah", "destructive");
  }

  return (
    <div className="min-h-screen relative flex">

      {/* === GLOBAL BACKGROUND === */}
      <img
        src="https://simaster.ugm.ac.id/ugmfw-assets-metronics8/media/ugm/bg-1200.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="bg"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* MAIN CONTENT */}
      <div className="relative flex w-full">

        {/* LEFT HERO */}
        <aside className="hidden lg:flex w-1/2 relative items-center justify-center text-white">
          <div className="relative z-10 max-w-lg text-center px-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src="https://simaster.ugm.ac.id/ugmfw-assets/images/maskot-simaster.png"
                alt="maskot"
                className="w-16 h-16"
              />
              <img
                src="https://simaster.ugm.ac.id/ugmfw-assets/images/logo-ugm.png"
                alt="ugm"
                className="w-14 h-14"
              />
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              CAPSTONE <span className="text-yellow-400">CONNECTOR</span>
            </h1>

            <p className="text-lg leading-relaxed text-slate-100 mb-8">
              Portal Informasi Capstone Berkelanjutan adalah platform untuk mendukung
              kesinambungan proyek capstone di lingkungan perguruan tinggi DTETI UGM.
            </p>

            <div className="mb-8 flex items-center justify-center gap-4">
              <a href="#"><img src="https://simaster.ugm.ac.id/ugmfw-assets/images/simaster/playstore.png" className="h-10" /></a>
              <a href="#"><img src="https://simaster.ugm.ac.id/ugmfw-assets/images/simaster/appstore.png" className="h-10" /></a>
            </div>

            <p className="text-sm text-slate-200 mb-6">Made by Kelompok 1 PAW</p>

            <div className="flex gap-6 justify-center text-sm text-slate-200">
              <a href="#" className="hover:underline">Terms &amp; Conditions</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </aside>

        {/* RIGHT LOGIN FORM */}
        <main className="flex-1 relative flex items-center justify-center p-6">
          <div
            className="relative z-20 w-full max-w-[560px] bg-white rounded-2xl shadow-2xl p-8 pb-36"
            style={{
              backgroundImage:
                "url('https://simaster.ugm.ac.id/ugmfw-assets-metronics8/media/ugm/artwork-ugm-revisi-600.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom center',
              backgroundSize: 'contain',
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">SIGN IN</h2>
              <p className="text-sm text-slate-500 mt-2">Akun Capstone Anda</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md -mt-6">
              <form onSubmit={onSubmit} className="space-y-4" autoComplete="off" noValidate>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    UGM ID (tanpa @ugm.ac.id atau full email)
                  </label>
                  <input
                    name="email"
                    defaultValue="devanw"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="devanw"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    defaultValue="12345678"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700"
                >
                  LOGIN
                </button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">Or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-600 mb-2">Belum punya akun?</p>
                <a
                  href="/register"
                  className="inline-block w-full rounded-md border px-4 py-2 text-center hover:bg-slate-50"
                >
                  Registrasi Akun Baru
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

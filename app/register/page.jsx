'use client';

export default function RegisterPage() {
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

  function validate(values) {
    const errors = {};
    if (!values.firstName) errors.firstName = 'First name required';
    if (!values.lastName) errors.lastName = 'Last name required';
    if (!values.username || values.username.length < 3)
      errors.username = 'Username must be at least 3 characters';
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email))
      errors.email = 'Invalid email';
    if (!values.password || values.password.length < 6)
      errors.password = 'Password must be at least 6 characters';
    return errors;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const values = {
      firstName: fd.get('firstName')?.trim(),
      lastName: fd.get('lastName')?.trim(),
      username: fd.get('username')?.trim(),
      email: fd.get('email')?.trim(),
      password: fd.get('password'),
    };

    document.querySelectorAll('.field-error').forEach(n => (n.textContent = ''));

    const errors = validate(values);
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([k, v]) => {
        const node = document.getElementById(`err-${k}`);
        if (node) node.textContent = v;
      });
      showToast('Perbaiki field merah', 'destructive');
      return;
    }

    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!resp.ok) throw new Error('Registration failed');

      showToast('Registration Successful — Please log in');
      window.location.href = '/login';
    } catch (err) {
      showToast(err.message || 'Error registering', 'destructive');
    }
  }

  return (
    <div className="min-h-screen relative flex">

      {/* GLOBAL BACKGROUND */}
      <img
        src="https://simaster.ugm.ac.id/ugmfw-assets-metronics8/media/ugm/bg-1200.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative flex w-full">

        {/* LEFT HERO – SAME AS LOGIN */}
        <aside className="hidden lg:flex w-1/2 relative items-center justify-center text-white">
          <div className="relative z-10 max-w-lg text-center px-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src="https://simaster.ugm.ac.id/ugmfw-assets/images/maskot-simaster.png"
                className="w-16 h-16"
              />
              <img
                src="https://simaster.ugm.ac.id/ugmfw-assets/images/logo-ugm.png"
                className="w-14 h-14"
              />
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              CAPSTONE <span className="text-yellow-400">CONNECTOR</span>
            </h1>

            <p className="text-lg text-slate-100 mb-8">
              Portal Informasi Capstone Berkelanjutan mendukung kesinambungan
              proyek capstone di lingkungan perguruan tinggi DTETI UGM.
            </p>

            <div className="mb-8 flex items-center justify-center gap-4">
              <img src="https://simaster.ugm.ac.id/ugmfw-assets/images/simaster/playstore.png" className="h-10"/>
              <img src="https://simaster.ugm.ac.id/ugmfw-assets/images/simaster/appstore.png" className="h-10"/>
            </div>

            <p className="text-sm text-slate-200 mb-6">Made by Kelompok 1 PAW</p>

            <div className="flex gap-6 justify-center text-sm">
              <a href="#" className="hover:underline">Terms & Conditions</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </aside>

        {/* RIGHT FORM */}
        <main className="flex-1 relative flex items-center justify-center p-6">
          <div
            className="relative z-20 w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 pb-36"
            style={{
              backgroundImage:
                "url('https://simaster.ugm.ac.id/ugmfw-assets-metronics8/media/ugm/artwork-ugm-revisi-600.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom center',
              backgroundSize: 'contain',
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">REGISTER</h2>
              <p className="text-sm text-slate-500 mt-2">Buat akun Capstone Anda</p>
            </div>

            {/* FORM CARD */}
            <div className="bg-white rounded-lg p-6 shadow-md -mt-6">
              <form onSubmit={onSubmit} className="space-y-4" noValidate>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input name="firstName" className="w-full border rounded-md px-3 py-2" />
                    <p id="err-firstName" className="text-xs text-red-600 field-error"></p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input name="lastName" className="w-full border rounded-md px-3 py-2" />
                    <p id="err-lastName" className="text-xs text-red-600 field-error"></p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Username</label>
                  <input name="username" className="w-full border rounded-md px-3 py-2" />
                  <p id="err-username" className="text-xs text-red-600 field-error"></p>
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input name="email" type="email" className="w-full border rounded-md px-3 py-2" />
                  <p id="err-email" className="text-xs text-red-600 field-error"></p>
                </div>

                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input name="password" type="password" className="w-full border rounded-md px-3 py-2" />
                  <p id="err-password" className="text-xs text-red-600 field-error"></p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700"
                >
                  REGISTER
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-600">
                Sudah punya akun?{' '}
                <a href="/login" className="font-semibold text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

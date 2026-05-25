"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../lib/supabase'; 

export default function AuthPage() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLoginTab) {
        // ================= LOGIKA MASUK (SUPABASE) =================
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // ================= LOGIKA DAFTAR (SUPABASE) =================
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name, // Simpan nama lengkap ke dalam metadata user
            },
          },
        });
        if (error) throw error;
        alert("Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi (jika diaktifkan) atau langsung beralih ke tab Login.");
        setIsLoginTab(true);
        setLoading(false);
        return;
      }

      // Berhasil masuk -> arahkan ke halaman generator studio
      router.push('/generate');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 bg-surface-white relative overflow-y-auto pt-16">
      <div 
        className="fixed inset-0 pointer-events-none select-none z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/loginBackground.png')" }}
      />

      <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl  border border-white p-8 relative z-10">

        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <Image src="/canting.png" alt="Batik AI Logo" width={35} height={35} className="object-contain" />
          <h2 className="text-headline-sm font-bold text-soga-brown tracking-wide">Batik AI Studio</h2>
          <p className="text-body-sm text-on-surface-variant">
            {isLoginTab ? 'Masuk untuk mulai mensintesis motif' : 'Daftar akun baru untuk studio kreasi'}
          </p>
        </div>

        {/* Notifikasi Error jika login gagal */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-2 bg-soga-brown/5 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setIsLoginTab(true)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${isLoginTab ? 'bg-soga-brown text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLoginTab(false)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${!isLoginTab ? 'bg-soga-brown text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Sign In / Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginTab && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-soga-brown tracking-wider uppercase">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant/60 focus:outline-none focus:border-soga-brown text-sm transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-soga-brown tracking-wider uppercase">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant/60 focus:outline-none focus:border-soga-brown text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-soga-brown tracking-wider uppercase">Password</label>
              {isLoginTab && <a href="#" className="text-[11px] text-indigo-blue hover:underline">Lupa Password?</a>}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant/60 focus:outline-none focus:border-soga-brown text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-soga-brown text-on-primary py-3 rounded-xl font-semibold text-sm hover:bg-surface-tint transition-colors shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">
              {loading ? 'sync' : 'login'}
            </span>
            {loading ? 'Memproses...' : isLoginTab ? 'Masuk ke Studio' : 'Buat Akun Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}
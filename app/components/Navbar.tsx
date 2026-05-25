"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Menggunakan jalur relatif agar aman dari error path alias tsconfig
import { supabase } from '../lib/supabase'; 

export default function Navbar() {
  // State untuk kontrol menu hamburger di mobile
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk menyimpan data user dari Supabase secara dinamis
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Ambil sesi aktif user saat komponen pertama kali dirender
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getInitialSession();

    // 2. Pasang Listener Real-Time untuk memantau status Login/Logout secara instan
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fungsi penanganan tombol keluar
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push('/');
  };

  // Parsing nama user secara dinamis dari database metadata Supabase
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  return (
    <nav className="fixed top-0 w-full bg-surface-white/80 backdrop-blur-md z-50 border-b border-outline-variant shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* ================= Bagian Kiri: Logo ================= */}
          <div className="flex-shrink-0 lg:flex-1 flex items-center">
            <Link href="/" className="text-xl font-bold text-soga-brown flex items-center gap-2">
              <Image src="/canting.png" alt="Batik AI Logo" width={25} height={25} className="object-contain" />
              <span className="tracking-wide">Batik AI Studio</span>
            </Link>
          </div>

          {/* ================= Bagian Tengah: Navigasi (Desktop) ================= */}
          <div className="hidden md:flex lg:flex-1 justify-center gap-8">
            <Link href="/" className="text-on-surface hover:text-soga-brown font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-soga-brown hover:after:w-full after:transition-all">
              Home
            </Link>
            <Link href="/generate" className="text-on-surface hover:text-soga-brown font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-soga-brown hover:after:w-full after:transition-all">
              Generate Motif
            </Link>
          </div>

          {/* ================= Bagian Kanan: Autentikasi / Profil (Desktop) ================= */}
          <div className="hidden md:flex lg:flex-1 justify-end items-center gap-4">
            {user ? (
              /* TAMPILAN DESKTOP: Jika User Sudah Terautentikasi di Supabase */
              <div className="flex items-center gap-3 group relative">
                <div className="text-right">
                  <p className="text-xs font-semibold text-on-surface max-w-[140px] truncate">{displayName}</p>
                  <button 
                    onClick={handleLogout} 
                    className="text-[10px] text-red-500 hover:underline block ml-auto transition-colors"
                  >
                    Logout
                  </button>
                </div>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-soga-brown shadow-sm transition-transform group-hover:scale-105 relative">
                  <Image 
                    src="/canting.png"
                    alt="User Profile" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              /* TAMPILAN DESKTOP: Jika User Belum Login */
              <>
                <Link href="/login" className="text-sm font-medium text-on-surface hover:text-soga-brown transition-colors px-3 py-2 rounded-lg">
                  Sign In
                </Link>
                <Link href="/login" className="text-sm font-semibold bg-soga-brown text-on-primary px-4 py-2 rounded-xl hover:bg-surface-tint transition-colors shadow-sm">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* ================= Tombol Hamburger (Mobile Only) ================= */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-on-surface hover:text-soga-brown p-2 rounded-xl focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl font-bold">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* ================= MENU DROP DOWN RESPONSIVE (Mobile Only) ================= */}
      {isOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-on-surface hover:bg-soga-brown/5 hover:text-soga-brown transition-all"
            >
              Home
            </Link>
            <Link 
              href="/generate" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-on-surface hover:bg-soga-brown/5 hover:text-soga-brown transition-all"
            >
              Generate Motif
            </Link>
            
            {/* Sektor Autentikasi Dinamis Mobile */}
            <div className="border-t border-outline-variant/40 pt-4 mt-2">
              {user ? (
                /* TAMPILAN MOBILE: Komponen Profil & Tombol Keluar */
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 px-3 py-2 bg-soga-brown/5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-soga-brown relative flex-shrink-0">
                      <Image 
                        src="/canting.png"
                        alt="User Profile" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-on-surface truncate">{displayName}</p>
                      <p className="text-xs text-on-surface-variant/70 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-600 bg-red-50/50 hover:bg-red-50 transition-colors"
                  >
                    Keluar Sesi (Logout)
                  </button>
                </div>
              ) : (
                /* TAMPILAN MOBILE: Tombol Masuk */
                <div className="grid grid-cols-2 gap-3 px-2">
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-soga-brown text-on-primary text-sm font-semibold hover:bg-surface-tint transition-colors shadow-sm"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
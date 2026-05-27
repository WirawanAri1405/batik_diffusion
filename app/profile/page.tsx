"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../lib/supabase'; // Sesuaikan dengan letak folder lib Anda
import BatikCardTCG, { TCGCardProps } from '../components/BatikCard'; // Sesuaikan jalur impor komponen TCG Anda

// Gabungkan tipe data id unik ke dalam properti TCGCardProps
type SavedBatik = TCGCardProps & { id: string };


export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [motifs, setMotifs] = useState<SavedBatik[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProfileAndData = async () => {
            setLoading(true);

            // 1. Cek Sesi Autentikasi Supabase
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/login');
                return;
            }

            setUser(session.user);


            setMotifs([
                {
                    id: '1',
                    title: 'Parang Rusak Modernitas',
                    prompt: 'Modern abstract batik parang motif, brown soga color palette, high contrast, clean vector line art, generative diffusion model style --v 6.0 Modern abstract batik parang motif, brown soga color palette, high contrast, clean vector line art, generative diffusion model style --v 6.0Modern abstract batik parang motif, brown soga color palette, high contrast, clean vector line art, generative diffusion model style --v 6.0Modern abstract batik parang motif, brown soga color palette, high contrast, clean vector line art, generative diffusion model style --v 6.0',
                    gender: 'Pria',
                    context: 'Kemeja Formal',
                    lora: 'Batik_Parang_v2.5',
                    loraScale: 0.85, // Selesai: Mengisi property loraScale yang tadinya missing
                    guidance: 7.5,
                    seed: 4829104812,
                    rarity: 'Legendary',
                    imageUrl: '/batik/batik_parang_0096.jpg'
                },
                {
                    id: '2',
                    title: 'Mega Mendung Fractal Shift',
                    prompt: 'Mega mendung batik cloud pattern, mathematical fractal integration, deep indigo blue and ivory white colors, geometric symmetry',
                    gender: 'Unisex',
                    context: 'Busana Kasual',
                    lora: 'Mendung_Fractal_v1',
                    loraScale: 0.75, // Dilengkapi juga
                    guidance: 6.0,
                    seed: 1094827491,
                    rarity: 'Epic',
                    imageUrl: '/batik/batik_parang_0096.jpg'
                },
                {
                    id: '3',
                    title: 'Kawung Geometric Pancer',
                    prompt: 'Symmetrical kawung pattern, cross-section of palm fruit, corporate minimal layout, warm earth tones, neo-nusantara aesthetic',
                    gender: 'Wanita',
                    context: 'Blouse Kerja',
                    lora: 'Kawung_Base_v1.2',
                    loraScale: 0.60, // Dilengkapi juga
                    guidance: 8.0,
                    seed: 9928130491,
                    rarity: 'Common',
                    imageUrl: '/batik/batik_parang_0096.jpg'
                }
            ]);

            setLoading(false);
        };

        fetchProfileAndData();
    }, [router]);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-surface-white gap-3">
                <div className="w-10 h-10 border-4 border-soga-brown border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-soga-brown tracking-wide">Memuat Profil...</p>
            </div>
        );
    }

    const displayName = user?.user_metadata?.full_name || "User";
    const displayEmail = user?.email || "user@email.com";

    return (
        <div className="min-h-screen w-full bg-background relative overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8 bg-[url('/background.png')] bg-cover bg-center bg-fixed">

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row lg:items-stretch gap-8 mt-6">

                <div className="w-full lg:w-1/3 flex flex-col">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(139,69,19,0.04)] text-center relative overflow-hidden flex flex-col h-full">

                        {/* Aksen Hiasan Atas */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-soga-brown" />

                        {/* Sektor Atas: Profil & Detail Akun */}
                        <div>
                            {/* Foto Profil / Avatar */}
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-soga-brown mx-auto shadow-md relative bg-soga-brown/5 mb-4 group transition-transform hover:scale-105">
                                <Image
                                    src="/canting.png"
                                    alt="Profile Avatar"
                                    fill
                                    className="object-cover p-2"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-soga-brown tracking-wide mb-1">{displayName}</h2>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-soga-brown/5 text-soga-brown text-[11px] font-bold tracking-wider uppercase mb-5">
                                Studio Creator
                            </div>

                            {/* Detail Informasi */}
                            <div className="border-t border-outline-variant/40 pt-4 text-left space-y-3">
                                <div>
                                    <span className="text-[10px] font-bold text-soga-brown/60 tracking-widest uppercase block">Nama Pengguna</span>
                                    <span className="text-sm font-semibold text-on-surface">{displayName}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-soga-brown/60 tracking-widest uppercase block">Alamat Email</span>
                                    <span className="text-sm font-semibold text-on-surface break-all">{displayEmail}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sektor Bawah: Studio Analytics (Otomatis Terkunci Menetap di Dasar Bawah Kartu) */}
                        <div className="border-t border-outline-variant/40 pt-4 text-left mt-8">
                            <h3 className="text-xs font-bold text-soga-brown tracking-widest uppercase mb-4">Studio Analytics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-soga-brown/5 p-4 rounded-2xl text-center">
                                    <span className="text-2xl font-black text-soga-brown">{motifs.length}</span>
                                    <p className="text-[11px] font-medium text-on-surface-variant mt-1">Motif Tersintesis</p>
                                </div>
                                <div className="bg-soga-brown/5 p-4 rounded-2xl text-center">
                                    <span className="text-2xl font-black text-soga-brown">Aktif</span>
                                    <p className="text-[11px] font-medium text-on-surface-variant mt-1">Status Akun</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= KOLOM KANAN: GALERI MOTIF TCG ================= */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(139,69,19,0.04)] h-full flex flex-col justify-between">

                        <div>
                            <div className="flex items-center justify-between mb-6 border-b border-outline-variant/40 pb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-soga-brown tracking-wide">Galeri Motif Pribadi</h3>
                                    <p className="text-xs text-on-surface-variant">Daftar warisan seni digital yang telah Anda buat lewat Generative AI</p>
                                </div>
                                <Link href="/generate" className="text-xs font-bold bg-soga-brown text-on-primary px-4 py-2 rounded-xl hover:bg-surface-tint transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0">
                                    <span className="material-symbols-outlined text-xs">add</span> Sintesis Baru
                                </Link>
                            </div>

                            {motifs.length === 0 ? (
                                <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">image_search</span>
                                    <p className="text-sm font-medium text-on-surface-variant">Belum ada batik yang disimpan di studio ini.</p>
                                </div>
                            ) : (
                                /* Grid Pemanggilan Komponen TCG Berdasarkan Data Array Supabase */
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mx-auto place-items-center">
                                    {motifs.map((motif) => (
                                        <BatikCardTCG
                                            key={motif.id}
                                            title={motif.title}
                                            prompt={motif.prompt}
                                            gender={motif.gender}
                                            context={motif.context}
                                            lora={motif.lora}
                                            loraScale={motif.loraScale} // 1. PASTIKAN PROP INI ADA AGAR TIDAK MISSING
                                            guidance={motif.guidance}
                                            seed={motif.seed}
                                            rarity={motif.rarity}
                                            imageUrl={motif.imageUrl}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
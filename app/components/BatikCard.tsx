"use client";

import Image from 'next/image';

export interface TCGCardProps {
  title: string;
  prompt: string;
  gender: 'Pria' | 'Wanita' | 'Unisex';
  context: string; 
  lora: string;       
  loraScale: number;  // Parameter LoRA Scale kustom
  guidance: number;   // CFG Scale
  seed: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl: string;   
}

const rarityStyles = {
  Common: {
    label: 'Common',
    bgCard: 'bg-gradient-to-b from-slate-100 to-slate-200 border-slate-400/60',
    textTitle: 'text-slate-800',
    badge: 'bg-slate-500 text-white',
    glow: 'shadow-[0_4px_20px_rgba(148,163,184,0.15)]',
  },
  Rare: {
    label: 'Rare',
    bgCard: 'bg-gradient-to-b from-blue-50 to-indigo-100 border-indigo-400/60',
    textTitle: 'text-indigo-900',
    badge: 'bg-indigo-600 text-white animate-pulse',
    glow: 'shadow-[0_8px_25px_rgba(79,70,229,0.2)] border-indigo-300',
  },
  Epic: {
    label: 'Epic',
    bgCard: 'bg-gradient-to-b from-purple-50 via-purple-100/80 to-fuchsia-100 border-purple-400',
    textTitle: 'text-purple-900',
    badge: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
    glow: 'shadow-[0_10px_30px_rgba(168,85,247,0.3)] border-purple-400',
  },
  Legendary: {
    label: 'Legendary',
    bgCard: 'bg-gradient-to-b from-amber-50 via-yellow-100/90 to-orange-100 border-amber-500',
    textTitle: 'text-amber-950',
    badge: 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-black',
    glow: 'shadow-[0_15px_40px_rgba(245,158,11,0.45)] border-amber-400 ring-2 ring-amber-400/20 animate-glow',
  },
};

export default function BatikCardTCG({
  title,
  prompt,
  gender,
  context,
  lora,
  loraScale,
  guidance,
  seed,
  rarity,
  imageUrl,
}: TCGCardProps) {
  
  const style = rarityStyles[rarity] || rarityStyles.Common;

  return (
    <div className={`w-full max-w-[350px] rounded-3xl border p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden h-full justify-between ${style.bgCard} ${style.glow}`}>
      
      {/* ================= BACKGROUND KARTU GAMBAR GENERATE DENGAN STYLE ASLI TETAP TERJAGA ================= */}
      {/* Gambar dimasukkan dengan opasitas super tipis agar warna dasar gradasi rarity di belakangnya tetap dominan */}
                <div 
                    className="absolute inset-0 opacity-[0.1] pointer-events-none select-none z-0 bg-contain bg-center"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                />

      {/* Efek Garis Kilauan Gaib Khusus untuk Legendary & Epic */}
      {(rarity === 'Legendary' || rarity === 'Epic') && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-300/40 via-yellow-200/50 to-transparent pointer-events-none z-20 animate-shine" />
      )}

      {/* Konten Atas & Tengah */}
      <div className="relative z-10 flex flex-col flex-grow">
        
        {/* Header Kartu: Judul & Lencana Rarity */}
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-black text-base tracking-wide truncate max-w-[180px] ${style.textTitle}`}>
            {title}
          </h4>
          <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-sm ${style.badge}`}>
            {style.label}
          </span>
        </div>

        {/* Frame Gambar Hasil Sintesis AI */}
        <div className="w-full aspect-square bg-white rounded-xl overflow-hidden relative shadow-inner border border-black/5 bg-surface-container mb-3 flex items-center justify-center flex-shrink-0">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-contain p-2"
          />
          
          {/* Atribut Gender & Konteks Penggunaan */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            <span className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
              {gender}
            </span>
            <span className="bg-soga-brown text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
              {context}
            </span>
          </div>
        </div>

        {/* Sektor Prompt Teks (Dibuat Khusus Di Atas Parameter & Dijamin Tidak Terputus) */}
        <div className="bg-white/40 border border-black/5 rounded-xl p-3 mb-3 flex flex-col gap-1 flex-grow">
          <span className="text-[8px] font-bold text-black/40 uppercase tracking-widest block">Generation Prompt</span>
          <p className="text-slate-800 italic text-[11px] leading-relaxed font-semibold">
            "{prompt}"
          </p>
        </div>

      </div>

      {/* ================= SEKTOR BAWAH: METADATA PARAMETER TEKNIS TCG ================= */}
      <div className="bg-white/80 border border-black/5 rounded-xl p-3 flex flex-col gap-2 text-[11px] relative z-10 mt-auto shadow-sm">
        
        {/* Baris Parameter LoRA Name & LoRA Scale */}
        <div className="grid grid-cols-2 gap-2 border-b border-black/5 pb-1.5">
          <div>
            <span className="text-[8px] font-bold text-black/40 uppercase block tracking-wider">Model LoRA</span>
            <span className="font-mono text-slate-800 font-bold truncate block mt-0.5">{lora}</span>
          </div>
          <div>
            <span className="text-[8px] font-bold text-black/40 uppercase block tracking-wider">LoRA Scale</span>
            <span className="font-bold text-indigo-700 font-mono block mt-0.5">{loraScale}</span>
          </div>
        </div>

        {/* Baris CFG Guidance & Seed Number */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="col-span-1 border-r border-black/5">
            <span className="text-[8px] font-bold text-black/40 uppercase block tracking-wider">Guidance</span>
            <span className="font-bold text-slate-800 font-mono block mt-0.5">{guidance} <span className="text-[8px] text-slate-400 font-normal">CFG</span></span>
          </div>
          <div className="col-span-2 pl-1">
            <span className="text-[8px] font-bold text-black/40 uppercase block tracking-wider">Seed Number</span>
            <span className="font-mono text-amber-700 font-bold tracking-tight block truncate mt-0.5">{seed}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
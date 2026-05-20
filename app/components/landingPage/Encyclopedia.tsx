"use client";

import { useState, useRef, useEffect } from 'react';
import { batikDatabase, BatikData } from '../../data/batik';
import IndonesiaMap from './IndonesiaMap';

export default function Encyclopedia() {
    const [activeBatik, setActiveBatik] = useState<BatikData>(batikDatabase[0]);
    const [isFading, setIsFading] = useState(false);
    const [activeMotifIndex, setActiveMotifIndex] = useState(0);
    const [selectedMotif, setSelectedMotif] = useState(batikDatabase[0].motifs[0]);

    // DOM Refs untuk interaksi Drag-to-Scroll
    const carouselRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handlePinClick = (data: BatikData | undefined) => {
        if (!data || data.id === activeBatik.id) return;
        setIsFading(true);
        setTimeout(() => {
            setActiveBatik(data);
            setActiveMotifIndex(0);
            setSelectedMotif(data.motifs[0]);
            if (carouselRef.current) carouselRef.current.scrollLeft = 0;
            setIsFading(false);
        }, 300);
    };

    const getPathProps = (svgId: string) => {
        const matchingBatik = batikDatabase.find(b => b.svgIds.includes(svgId));
        const isActive = activeBatik.svgIds.includes(svgId);

        if (matchingBatik) {
            return {
                onClick: () => handlePinClick(matchingBatik),
                className: `cursor-pointer transition-colors duration-300 stroke-surface-white stroke-[0.5px] outline-none ${isActive ? 'fill-indigo-blue' : 'fill-surface-variant hover:fill-soga-brown'
                    }`
            };
        }
        return { className: "fill-surface-dim stroke-surface-white stroke-[0.5px] opacity-50 outline-none" };
    };

    // Logika Drag Carousel 
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return;
        isDown.current = true;
        carouselRef.current.classList.add('cursor-grabbing');
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown.current = false;
        if (carouselRef.current) carouselRef.current.classList.remove('cursor-grabbing');
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !carouselRef.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.8;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    // Logika Tombol Panah
    const handleArrowClick = (direction: 'next' | 'prev') => {
        let newIndex = activeMotifIndex;
        if (direction === 'next') {
            newIndex = activeMotifIndex === activeBatik.motifs.length - 1 ? 0 : activeMotifIndex + 1;
        } else {
            newIndex = activeMotifIndex === 0 ? activeBatik.motifs.length - 1 : activeMotifIndex - 1;
        }
        setActiveMotifIndex(newIndex);
        setSelectedMotif(activeBatik.motifs[newIndex]);
    };

    useEffect(() => {
        if (carouselRef.current && activeBatik.motifs.length > 0) {
            const container = carouselRef.current;
            const activeButton = container.children[activeMotifIndex] as HTMLElement;
            if (activeButton) {
                const scrollPosition = activeButton.offsetLeft - container.offsetLeft;
                container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        }
    }, [activeMotifIndex, activeBatik]);

    return (
        <section className="py-24 px-8 m-4 bg-surface-container-lowest/60 backdrop-blur-sm border-t border-outline-variant rounded-3xl reveal">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Ensiklopedia Motif Nusantara</h2>
                    <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">
                        Eksplorasi kekayaan filosofi dan sejarah di balik setiap goresan canting. <strong>Klik langsung pada area pulau di peta.</strong>
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 min-h-150">
                    {/* SVG Map */}
                    <div className="lg:w-2/3 bg-surface-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white relative overflow-hidden flex items-center justify-center p-4">
                        <IndonesiaMap getPathProps={getPathProps} />
                        <div className="absolute bottom-4 left-4 text-xs font-label-caps text-on-surface-variant bg-white/70 px-3 py-1 rounded-full border border-white">
                            Peta Vektor Interaktif
                        </div>
                    </div>

                    {/* DETAIL PANEL & CAROUSEL */}
                    <div className="lg:w-1/3 bg-surface-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(139,69,19,0.05)] border border-white p-6 flex flex-col h-[600px]">
                        <div className="mb-4 flex-shrink-0">
                            <div className="text-label-caps text-soga-brown mb-1 tracking-widest uppercase">Eksplorasi Wilayah</div>
                            <h2 className="text-headline-md font-headline-md text-on-surface truncate">{activeBatik.region}</h2>
                        </div>

                        {/* KONTANER CAROUSEL */}
                        <div className="relative w-full flex-shrink-0 group/carousel mb-4">

                            {/* Tombol Panah (Diberikan z-30 agar selalu di atas) */}
                            {activeBatik.motifs.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Mencegah event bubbling
                                            handleArrowClick('prev');
                                        }}
                                        className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-outline-variant hover:bg-soga-brown hover:text-white text-soga-brown w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleArrowClick('next');
                                        }}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-outline-variant hover:bg-soga-brown hover:text-white text-soga-brown w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                                    </button>
                                </>
                            )}

                            {/* BARISAN KARTU CAROUSEL */}
                            <div
                                id="carousel-container"
                                ref={carouselRef}
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseLeaveOrUp}
                                onMouseUp={handleMouseLeaveOrUp}
                                onMouseMove={handleMouseMove}
                                style={{
                                    overflowX: 'auto',
                                    scrollbarWidth: 'none',          // Firefox
                                    msOverflowStyle: 'none',         // IE/Edge
                                }}
                                className="flex gap-3 overflow-x-auto pb-2 pt-1 h-36 items-start scrollbar-none select-none scroll-smooth relative cursor-grab active:cursor-grabbing"
                            >
                                {activeBatik.motifs.map((motif, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setActiveMotifIndex(idx);
                                            setSelectedMotif(motif);
                                        }}
                                        className={`relative flex-shrink-0 w-28 p-2.5 rounded-xl border text-left transition-all duration-300 overflow-hidden flex flex-col gap-1.5 justify-start items-center ${activeMotifIndex === idx
                                            ? 'border-soga-brown bg-surface-container shadow-md scale-[1.02]'
                                            : 'border-outline-variant bg-white/40 hover:bg-white/80'
                                            }`}
                                    >
                                        {/* Pastikan pointer-events-none pada elemen dekorasi agar tidak menghalangi klik */}
                                        <div className="absolute -bottom-3 -right-3 w-10 h-10 opacity-5 bg-[url('/background.png')] bg-contain pointer-events-none" />

                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-dim shadow-inner flex-shrink-0">
                                            <img
                                                src={motif.img}
                                                alt={motif.name}
                                                className="w-full h-full object-cover pointer-events-none"
                                                draggable="false"
                                            />
                                        </div>

                                        <span className={`text-[10px] font-bold tracking-wide line-clamp-1 text-center w-full ${activeMotifIndex === idx ? 'text-soga-brown' : 'text-on-surface'
                                            }`}>
                                            {motif.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detail Text Description */}
                        <div className="flex-grow overflow-y-auto min-h-0 border-t border-outline-variant/20 pt-4 relative">
                            <div className={`fade-transition flex flex-col gap-2 h-full ${isFading ? 'fade-out' : ''}`}>
                                <h3 className="text-body-lg font-headline-sm text-on-surface font-bold">
                                    {activeBatik.motifs[activeMotifIndex]?.name || "Memuat..."}
                                </h3>
                                <p className="text-body-md text-on-surface-variant text-justify leading-relaxed text-xs tracking-wide pb-4">
                                    {activeBatik.motifs[activeMotifIndex]?.desc || "Deskripsi tidak ditemukan."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
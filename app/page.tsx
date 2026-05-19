"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

// Data Database Ensiklopedia
const batikDatabase = [
    {
        id: 'jateng',
        region: 'Yogyakarta & Surakarta, Jawa Tengah',
        name: 'Batik Parang',
        position: { top: '65%', left: '33%' },
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl3afoZY58f7sSa9pBcsOpWSKNA52249lPesDfM2habnv1i1NUwv-YCJhjhZlJzzrqONBaSpq904muydcYdiRbhCVLTpvgUXnueMaBO-ICxLNUac5CqSRNbhf-8d3nj_H92_S0Dlt4qdJLGdhfKFGNfLv1MFeMoRF6OhGU1VDjkCQXCMN4T8A4uo7ItMQA9UuK3KrLnYmVV2XgT7ZOwZI-Yk4sBkx8M0nWuswITiXs01Jfgk_8lcA9O8XZ0dBKs7ifrwpSCchyWOQ',
        desc: 'Motif Parang memiliki makna petuah untuk tidak pernah menyerah, ibarat ombak laut yang tak pernah berhenti bergerak. Parang juga menggambarkan jalinan yang tidak pernah putus, baik dalam arti upaya untuk memperbaiki diri, upaya memperjuangkan kesejahteraan, maupun bentuk pertalian keluarga.'
    },
    {
        id: 'jabar',
        region: 'Cirebon, Jawa Barat',
        name: 'Batik Megamendung',
        position: { top: '60%', left: '27%' },
        img: 'https://placehold.co/600x400/1E3A8A/FFF?text=Batik+Megamendung',
        desc: 'Motif Megamendung melambangkan awan pembawa hujan sebagai lambang kesuburan dan pemberi kehidupan. Gradasi warnanya yang berlapis (biasanya 7 lapis warna) melambangkan tujuh lapis langit dan kepemimpinan yang mengayomi masyarakat bawah.'
    },
    {
        id: 'bali',
        region: 'Denpasar, Bali',
        name: 'Batik Singa Barong',
        position: { top: '70%', left: '42%' },
        img: 'https://placehold.co/600x400/93000a/FFF?text=Batik+Singa+Barong',
        desc: 'Batik motif ini menggabungkan unsur mitologi Bali. Barong melambangkan kebaikan dan spiritualitas. Diadaptasi ke dalam kanvas kain, motif ini sering dipadukan dengan ukiran flora yang kaya warna, melambangkan keharmonisan antara manusia, alam, dan roh penjaga.'
    },
    {
        id: 'sumut',
        region: 'Tapanuli, Sumatera Utara',
        name: 'Batik Motif Gorga',
        position: { top: '35%', left: '12%' },
        img: 'https://placehold.co/600x400/54433a/FFF?text=Batik+Gorga',
        desc: 'Diadaptasi dari seni ukir rumah adat Batak (Gorga). Biasanya menggunakan tiga warna utama (Tridatu): Merah (Kekuatan), Hitam (Kewibawaan/Misteri), dan Putih (Kesucian). Motifnya meliuk tanpa putus melambangkan ikatan kekerabatan masyarakat Batak yang kuat.'
    },
    {
        id: 'kaltim',
        region: 'Kalimantan Timur',
        name: 'Batik Shaho',
        position: { top: '35%', left: '46%' },
        img: 'https://placehold.co/600x400/004662/FFF?text=Batik+Shaho',
        desc: 'Motif Shaho banyak mengadaptasi bentuk-bentuk dari kebudayaan suku Dayak seperti tameng (perisai), rumah betang, serta flora dan fauna endemik Kalimantan seperti Burung Enggang. Mewakili keberanian, kekuatan, dan kedekatan dengan alam.'
    },
    {
        id: 'papua',
        region: 'Papua',
        name: 'Batik Asmat',
        position: { top: '55%', left: '85%' },
        img: 'https://placehold.co/600x400/6c2f00/FFF?text=Batik+Asmat',
        desc: 'Motif Asmat identik dengan warna-warna tanah (terakota) yang tegas. Polanya mengadaptasi ukiran kayu suku Asmat yang sering berupa siluet manusia atau hewan, melambangkan penghormatan kepada arwah nenek moyang dan keberanian para ksatria.'
    }
];

export default function Home() {
    const [activeBatik, setActiveBatik] = useState(batikDatabase[0]);
    const [isFading, setIsFading] = useState(false);
    
    useEffect(() => {
        // Animasi Background menggunakan GSAP
        gsap.to(".bg-batik-top", {
            scale: 1.05,
            rotation: 1.5,
            xPercent: -2,
            yPercent: 2,
            duration: 15,
            ease: "sine.inOut",
            repeat: -1, 
            yoyo: true 
        });

        gsap.to(".bg-batik-bottom", {
            scale: 1.05,
            rotation: -1.5,
            xPercent: 2,
            yPercent: -2,
            duration: 15,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        // Intersection Observer untuk elemen reveal
        const reveals = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });
        
        reveals.forEach(reveal => {
            observer.observe(reveal);
        });

        return () => {
            observer.disconnect();
            gsap.killTweensOf(".bg-batik-top");
            gsap.killTweensOf(".bg-batik-bottom");
        };
    }, []);

    const handlePinClick = (data: any) => {
        if (data.id === activeBatik.id) return;
        setIsFading(true);
        setTimeout(() => {
            setActiveBatik(data);
            setIsFading(false);
        }, 300);
    };

    return (
        <div className="relative">
            {/* Background Animations */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
                <div className="bg-batik-top"></div>
                <div className="bg-batik-bottom"></div>
            </div>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 min-h-[819px] reveal">
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <h1 className="text-headline-lg font-headline-lg text-on-surface bg-white/50 backdrop-blur-sm inline-block rounded-xl p-2 -ml-2">
                            Harmoni Tradisi & Teknologi Generatif
                        </h1>
                        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                            Batik AI Studio mensintesis filosofi motif leluhur Nusantara dengan kecerdasan buatan. Rancang, visualisasikan, dan proyeksikan motif unik Anda secara real-time ke dalam model pakaian 3D dengan presisi studio.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/generate" className="bg-soga-brown text-on-primary px-6 py-3 rounded-lg hover:bg-surface-tint transition-colors text-label-caps font-label-caps flex items-center gap-2 shadow-md">
                                <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                                Mulai Generasi
                            </Link>
                            <button className="bg-white/80 backdrop-blur border border-indigo-blue text-indigo-blue px-6 py-3 rounded-lg hover:bg-surface-container transition-colors text-label-caps font-label-caps">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full aspect-square relative rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(139,69,19,0.08)] bg-surface-white flex items-center justify-center p-8">
                        <img alt="3D Batik Shirt Preview" className="w-full h-full object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaqfMhdmsllQDNofN7IHbFMfPV3-6aXTPMPhmTzKn7bNApwscfUI1hOZgA1cbKqzuQINi5N_FrYdkxPOxTwXQSinpbi2s-pdzI0sJRKClsPraiE-f3VGcQngpUceEQzefIm9J8qre5eguGKwn5w_-fvcEUchqkTTMtcPD9lPI-S8j4b4IYBi1aYbc1bMxvYTC586wQJHYZR0_o2VK0tOW7XkL--rhjPNxNz9btCE4HgpTqxLcCLWja8R31JyknOQD0Ql6UoFpppMk" />
                        <div className="absolute bottom-6 right-6 bg-surface-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-outline-variant">
                            <span className="w-3 h-3 rounded-full bg-soga-brown animate-pulse"></span>
                            <span className="text-label-caps font-label-caps text-on-surface">Rendering 3D...</span>
                        </div>
                    </div>
                </section>

                {/* Value Proposition */}
                <section className="py-20 px-8 bg-surface-container-low/80 backdrop-blur-md border-t border-outline-variant reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Nilai Inti Penciptaan</h2>
                            <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">Menggabungkan keandalan sistematis dengan keanggunan organik dari warisan nenek moyang.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-surface-white/90 p-8 rounded-xl shadow-[0_4px_16px_rgba(139,69,19,0.08)] border border-outline-variant flex flex-col gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-soga-brown mb-2">
                                    <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">Custom Meaning</h3>
                                <p className="text-body-md font-body-md text-on-surface-variant">Setiap motif digenerasikan berdasarkan input makna filosofis spesifik, memastikan kedalaman kultural pada setiap piksel desain.</p>
                            </div>
                            <div className="bg-surface-white/90 p-8 rounded-xl shadow-[0_4px_16px_rgba(139,69,19,0.08)] border border-outline-variant flex flex-col gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-indigo-blue mb-2">
                                    <span className="material-symbols-outlined" data-icon="view_in_ar">view_in_ar</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">Real-time 3D Preview</h3>
                                <p className="text-body-md font-body-md text-on-surface-variant">Visualisasikan drape dan tekstur secara instan. Kanvas 3D interaktif kami mengeliminasi noise teknis untuk fokus pada estetika.</p>
                            </div>
                            <div className="bg-surface-white/90 p-8 rounded-xl shadow-[0_4px_16px_rgba(139,69,19,0.08)] border border-outline-variant flex flex-col gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined" data-icon="account_balance">account_balance</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">Cultural Preservation</h3>
                                <p className="text-body-md font-body-md text-on-surface-variant">Menjaga pakem tradisi sambil mendorong batas inovasi. AI kami dilatih khusus untuk menghormati integritas motif klasik Nusantara.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-24 px-8 max-w-7xl mx-auto reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Alur Kerja Cerdas</h2>
                        <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">Tiga langkah sederhana dari ide konseptual menuju purwarupa pakaian digital siap pakai.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -z-10 -translate-y-1/2"></div>
                        
                        <div className="flex-1 bg-surface-white/90 rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6 border-4 border-surface">1</div>
                            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Input Makna</h3>
                            <p className="text-body-md font-body-md text-on-surface-variant">Tentukan filosofi, palet warna Nusantara, dan struktur motif dasar melalui panel kendali intuitif.</p>
                        </div>
                        
                        <div className="flex-1 bg-surface-white/90 rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6 border-4 border-surface">2</div>
                            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">AI Processing</h3>
                            <p className="text-body-md font-body-md text-on-surface-variant">Model generatif kami mensintesis permintaan Anda menjadi pola mulus beresolusi tinggi secara instan.</p>
                        </div>
                        
                        <div className="flex-1 bg-surface-white/90 rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6 border-4 border-surface">3</div>
                            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">3D Render</h3>
                            <p className="text-body-md font-body-md text-on-surface-variant">Motif diaplikasikan pada kanvas 3D interaktif. Sesuaikan skala dan orientasi dengan pencahayaan studio realistis.</p>
                        </div>
                    </div>
                </section>

                {/* Encyclopedia Section (Interactive) */}
                <section className="py-24 px-8 bg-surface-container-lowest/80 backdrop-blur-md border-t border-outline-variant reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Ensiklopedia Motif Nusantara</h2>
                            <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">Eksplorasi kekayaan filosofi dan sejarah di balik setiap goresan canting dari berbagai daerah di Indonesia. Klik titik pada peta.</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
                            
                            {/* Interactive Map */}
                            <div className="lg:w-2/3 bg-surface-white rounded-xl shadow-[0_4px_16px_rgba(139,69,19,0.08)] border border-outline-variant relative overflow-hidden flex items-center justify-center bg-[#eef6fc]">
                                <img alt="Map of Indonesia" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa7ZE79OLxSwj1iVwGlH3tVu45c-n4L_sFHVTmPYBkbJPQ8n2vBYOju-gJQsZbLSSTAx14-J2k341HsKE4fnxZXdlvRKRiisdrpN_K5bCOYuvCwlAQFeQymIo6uGt48fP6_JIdplzXu6KjcaiGaV-WXzAqhRG8DVWFQvxPk8CCfjZmnITr3qwFGW3GqFIqh9cKSFRLuNYYrw4jmf7wK7ecC2vFL4TebQyQ-PfczQN5GfjHTtL-GCsr8x-YAqmFi0hynPv_sVVjAh0" />
                                
                                <div className="absolute inset-0 w-full h-full">
                                    {batikDatabase.map((data) => (
                                        <button
                                            key={data.id}
                                            onClick={() => handlePinClick(data)}
                                            style={{ top: data.position.top, left: data.position.left }}
                                            className={`map-pin absolute w-6 h-6 bg-soga-brown text-on-primary rounded-full shadow-lg border-2 border-surface-white hover:scale-110 hover:bg-indigo-blue transition-all duration-300 flex items-center justify-center cursor-pointer group ${activeBatik.id === data.id ? 'active' : ''}`}
                                        >
                                            <span className="absolute -top-8 bg-surface-white text-soga-brown text-label-caps px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                                {data.region.split(',')[1] || data.region}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Detail Panel */}
                            <div className="lg:w-1/3 bg-surface-white rounded-xl shadow-[0_4px_16px_rgba(139,69,19,0.08)] border border-outline-variant p-8 flex flex-col gap-6 overflow-y-auto">
                                <div className={`fade-transition flex flex-col gap-6 h-full ${isFading ? 'fade-out' : ''}`}>
                                    <div>
                                        <div className="text-label-caps text-soga-brown mb-2 tracking-widest uppercase">Motif Terpilih</div>
                                        <h3 className="text-headline-sm font-headline-sm text-on-surface">{activeBatik.name}</h3>
                                        <p className="text-sm text-on-surface-variant mt-1">{activeBatik.region}</p>
                                    </div>
                                    <div className="w-full aspect-video bg-surface-container rounded-lg overflow-hidden border border-outline-variant flex-shrink-0">
                                        <img alt="Batik Preview" className="w-full h-full object-cover" src={activeBatik.img} />
                                    </div>
                                    <div>
                                        <h4 className="text-body-lg font-bold text-on-surface mb-2">Makna Filosofis</h4>
                                        <p className="text-body-md text-on-surface-variant">{activeBatik.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-20 px-8 bg-surface-tint text-on-primary text-center reveal">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                        <span className="material-symbols-outlined text-4xl opacity-50" data-icon="format_quote">format_quote</span>
                        <p className="text-philosophy-quote font-philosophy-quote italic">
                            "Teknologi tidak seharusnya menggantikan tradisi, melainkan memberikan kanvas baru bagi warisan budaya untuk terus bernapas dan berevolusi di era modern."
                        </p>
                        <span className="text-label-caps font-label-caps mt-4 tracking-wider">BATIK AI STUDIO MANIFESTO</span>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-low/90 backdrop-blur-md border-t border-outline-variant full-width bottom-0 reveal">
                <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
                    <div className="text-headline-sm font-headline-sm text-soga-brown">
                        Batik AI Studio
                    </div>
                    <div className="text-body-md font-body-md text-on-surface text-center md:text-left">
                        © 2024 Batik AI Studio. Crafting heritage through intelligence.
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps focus:ring-2 focus:ring-soga-brown rounded outline-none px-1" href="#">Privacy Policy</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps focus:ring-2 focus:ring-soga-brown rounded outline-none px-1" href="#">Terms of Service</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps focus:ring-2 focus:ring-soga-brown rounded outline-none px-1" href="#">Nusantara Map</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps focus:ring-2 focus:ring-soga-brown rounded outline-none px-1" href="#">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
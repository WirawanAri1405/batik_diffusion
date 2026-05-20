export default function Features() {
    return (
        <>
            {/* Value Proposition */}
            <section className="my-20 mx-4 py-16 px-8 bg-surface-container-low/60 backdrop-blur-sm border border-white/40 rounded-3xl  reveal">
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
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-8  relative">

                    <div className="flex-1 bg-surface-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6">1</div>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Input Makna</h3>
                        <p className="text-body-md font-body-md text-on-surface-variant">Tentukan filosofi, palet warna Nusantara, dan struktur motif dasar melalui panel kendali intuitif.</p>
                    </div>

                    <div className="flex-1 bg-surface-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6">2</div>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">AI Processing</h3>
                        <p className="text-body-md font-body-md text-on-surface-variant">Model generatif kami mensintesis permintaan Anda menjadi pola mulus beresolusi tinggi secara instan.</p>
                    </div>

                    <div className="flex-1 bg-surface-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col items-center text-center relative z-10 group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-sm font-headline-sm font-bold mb-6">3</div>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">3D Render</h3>
                        <p className="text-body-md font-body-md text-on-surface-variant">Motif diaplikasikan pada kanvas 3D interaktif. Sesuaikan skala dan orientasi dengan pencahayaan studio realistis.</p>
                    </div>
                </div>
            </section>

        </>
    );
}
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="py-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 reveal">
            <div className="lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-headline-lg font-headline-lg text-on-surface inline-block rounded-xl p-2 -ml-2">
                    Harmoni Tradisi & Teknologi Generatif
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl p-4 rounded-xl">
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

    );
}
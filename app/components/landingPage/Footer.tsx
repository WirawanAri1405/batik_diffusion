export default function Footer() {
    return (
        <>
            <section className="py-20 px-8 bg-surface-tint text-on-primary text-center reveal">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <span className="material-symbols-outlined text-4xl opacity-50">format_quote</span>
                    <p className="text-philosophy-quote font-philosophy-quote italic">
                        "Teknologi tidak seharusnya menggantikan tradisi, melainkan memberikan kanvas baru bagi warisan budaya untuk terus bernapas dan berevolusi di era modern."
                    </p>
                    <span className="text-label-caps font-label-caps mt-4 tracking-wider">BATIK AI STUDIO MANIFESTO</span>
                </div>
            </section>
            <footer className="bg-surface-container-low/90 backdrop-blur-md border-t border-outline-variant full-width bottom-0 reveal">
                <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
                    <div className="text-headline-sm font-headline-sm text-soga-brown">Batik AI Studio</div>
                    <div className="text-body-md font-body-md text-on-surface text-center md:text-left">
                        © 2026 Batik AI Studio. Crafting heritage through intelligence.
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps" href="#">Privacy Policy</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps" href="#">Terms of Service</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-label-caps" href="#">Contact Support</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
"use client";

import { useEffect } from 'react';
import gsap from 'gsap';

// Impor komponen yang sudah kita pisahkan
import Hero from './components/landingPage/Hero';
import Features from './components/landingPage/Features';
import Encyclopedia from './components/landingPage/Encyclopedia';
import Footer from './components/landingPage/Footer';

export default function Home() {
    useEffect(() => {
        // Animasi GSAP Background
        gsap.to(".bg-batik-top", { scale: 1.05, rotation: 1.5, xPercent: -2, yPercent: 2, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".bg-batik-bottom", { scale: 1.05, rotation: -1.5, xPercent: 2, yPercent: -2, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true });

        // Intersection Observer (Scroll Reveal)
        const reveals = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("active");
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => observer.observe(reveal));

        return () => {
            observer.disconnect();
            gsap.killTweensOf(".bg-batik-top");
            gsap.killTweensOf(".bg-batik-bottom");
        };
    }, []);

    return (
        <div className="relative">
            {/* Background Animations */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
                <div className="bg-batik-top"></div>
                <div className="bg-batik-bottom"></div>
            </div>

            <main className="flex-grow">
                {/* Memanggil Komponen-komponen Patahan */}
                <Hero />
                <Features />
                <Encyclopedia />
                <Footer />
            </main>
        </div>
    );
}
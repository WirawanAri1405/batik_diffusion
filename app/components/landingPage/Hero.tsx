"use client";

import { Suspense, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Center, Stage, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeroShirtModel({ textureUrl, modelPath }: { textureUrl: string; modelPath: string }) {
    // Memuat file cetakan 3D kemeja
    const { scene } = useGLTF(modelPath);
    
    // Memuat gambar siluet motif batik sebagai tekstur awal pelapis baju
    const texture = useLoader(THREE.TextureLoader, textureUrl);
    
    // Kloning objek agar manipulasi material bersifat independen dan aman dari cache
    const copiedScene = useMemo(() => scene.clone(), [scene, modelPath]);

    useEffect(() => {
        if (texture) {
            // Mengunci pembungkusan berulang agar motif batik tidak kebesaran/melar
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            
            // Mengatur skala kerapatan motif batik (Set 3x3 atau 4x4 agar motif terlihat pas dan detail)
            texture.repeat.set(3.5, 3.5); 
            texture.colorSpace = THREE.SRGBColorSpace;
            
            // Menjaga orientasi motif tegak (tidak terbalik atas-bawah)
            texture.flipY = true; 

            // Sisipkan material kain katun batik ke seluruh permukaan mesh kemeja 3D
            copiedScene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        roughness: 0.85, // Mengunci tekstur kain doff (tidak mengkilap seperti plastik)
                    });
                    mesh.material.needsUpdate = true;
                }
            });
        }
    }, [copiedScene, texture]);

    return <primitive object={copiedScene} />;
}

// 2. KOMPONEN UTAMA HERO SECTION
export default function Hero() {
    // Definisi aset konstan awal sebagai fallback statis halaman depan
    const defaultTexture = "/batik/batik_parang_0096.jpg"; 
    const defaultModelPath = "/models/mens_shirt.glb"; 

    return (
        <section className="py-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 reveal">
            {/* Sisi Kiri: Informasi Studio */}
            <div className="lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-headline-lg font-headline-lg text-on-surface inline-block rounded-xl p-2 -ml-2">
                    Harmoni Tradisi & Teknologi Generatif
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl p-4 rounded-xl">
                    Batik AI Studio mensintesis filosofi motif leluhur Nusantara dengan kecerdasan buatan. Rancang, visualisasikan, dan proyeksikan motif unik Anda secara real-time ke dalam model pakaian 3D dengan presisi studio.
                </p>
                <div className="flex gap-4 pt-4">
                    <Link href="/generate" className="bg-soga-brown text-on-primary px-6 py-3 rounded-lg hover:bg-surface-tint transition-colors text-label-caps font-label-caps flex items-center gap-2 shadow-md">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        Mulai Generasi
                    </Link>
                    <button className="bg-white/80 backdrop-blur border border-indigo-blue text-indigo-blue px-6 py-3 rounded-lg hover:bg-surface-container transition-colors text-label-caps font-label-caps">
                        Pelajari Lebih Lanjut
                    </button>
                </div>
            </div>

            {/* Sisi Kanan: KANVAS PREVIEW 3D (Neo-Nusantara Spatial Glassmorphism) */}
            {/* Ukuran box dikunci mati menggunakan max-w-[450px] aspect-square agar seimbang */}
            <div className="lg:w-1/2 w-full max-w-[450px] aspect-square bg-surface-white/60 rounded-3xl shadow-[0_12px_40px_rgba(139,69,19,0.06)] border border-white relative overflow-hidden backdrop-blur-sm flex flex-col items-center justify-center">
                
                {/* Wrapping Background Layer (Siluet motif transparan) */}
                <div 
                    className="absolute inset-0 opacity-[0.04] pointer-events-none select-none z-0 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${defaultTexture}')` }}
                />

                {/* Glass Label Status Studio */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-soga-brown shadow-sm border border-outline-variant/30 tracking-widest uppercase select-none">
                    Preview 3D
                </div>
                
                {/* INTERACTIVE CANVAS THREE.JS */}
                <div className="w-full h-full relative z-10">
                    <Canvas 
                        camera={{ position: [0, 0, 3], fov: 45 }} 
                        className="w-full h-full" 
                        dpr={[1, 2]} 
                        gl={{ antialias: true, powerPreference: "high-performance" }}
                    >
                        <ambientLight intensity={0.4} />
                        
                        <Suspense fallback={null}>
                            {/* Memanfaatkan Center & Stage Drei agar penempatan baju otomatis presisi di tengah */}
                            <Center>
                                <Stage adjustCamera={false} intensity={0.6} environment="city">
                                    <HeroShirtModel textureUrl={defaultTexture} modelPath={defaultModelPath} />
                                </Stage>
                            </Center>
                        </Suspense>
                        
                        {/* OrbitControls Pembatas Kamera Putar */}
                        <OrbitControls 
                            enablePan={false} 
                            enableZoom={false}
                            minDistance={1.25}
                            maxDistance={1.25}
                            minPolarAngle={Math.PI / 3} 
                            maxPolarAngle={Math.PI / 1.5} 
                            makeDefault
                        />
                    </Canvas>
                </div>
                
                {/* Footer Guide Label */}
                <div className="absolute bottom-4 w-full text-center text-[10px] font-label-caps text-on-surface-variant/50 pointer-events-none z-10 select-none tracking-wider flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-xs animate-pulse">move_item</span>
                    Klik & Seret untuk memutar model pakaian 3D
                </div>
            </div>
        </section>
    );
}
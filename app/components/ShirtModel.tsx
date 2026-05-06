"use client";
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';

// 1. Komponen jika AI sudah selesai men-generate gambar
function TexturedBaju({ scene, url }: { scene: THREE.Group, url: string }) {
  // useLoader menangani antrean download gambar
  const texture = useLoader(THREE.TextureLoader, url);
  
  useEffect(() => {
    // Pengaturan tekstur
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3); // Ganti angka ini jika motif batik kebesaran/kekecilan di baju
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // SANGAT PENTING: File .glb/.gltf membungkus tekstur secara terbalik. 
    // Harus disetel false agar motif tidak terbalik atas-bawah.
    texture.flipY = false; 
    
    // Cari semua bagian baju (mesh) dan timpa dengan kain batik
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9, // Mirip kain asli
        });
        mesh.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  // Render objek 3D
  return <primitive object={scene} />;
}

// 2. Komponen default (Baju polos sebelum tombol Generate ditekan)
function PolosBaju({ scene }: { scene: THREE.Group }) {
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#d1d5db", // Warna abu-abu terang
          roughness: 0.9,
        });
        mesh.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// 3. Komponen Utama
interface ShirtModelProps {
  textureUrl: string | null;
}

export default function ShirtModel({ textureUrl }: ShirtModelProps) {
  // Load file .glb dari folder public/models/
  const { scene } = useGLTF('/models/shirt_baked.glb');
  
  // SANGAT PENTING: Clone (Gandakan) objek agar kita bisa memanipulasi materialnya 
  // tanpa merusak cache bawaan React Three Fiber.
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    // Atur Scale (ukuran) dan Position (posisi y) jika baju Anda kekecilan atau melayang.
    // Skala 1.5 artinya 1,5x lebih besar dari aslinya.
    <group position={[0, 0, 0]} scale={1.5}>
      {textureUrl ? (
        <TexturedBaju scene={copiedScene} url={textureUrl} />
      ) : (
        <PolosBaju scene={copiedScene} />
      )}
    </group>
  );
}

// Pre-load model agar saat web dibuka, model baju sudah langsung siap
useGLTF.preload('/models/shirt_baked.glb');
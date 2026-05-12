"use client";
import * as THREE from 'three';
import { useGLTF, Center, Stage } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';

// 1. Komponen jika AI sudah selesai men-generate gambar
function TexturedBaju({ scene, url }: { scene: THREE.Group, url: string }) {
  // useLoader aman di sini karena komponen ini HANYA dipanggil jika url ada isinya
  const texture = useLoader(THREE.TextureLoader, url);
  
  useEffect(() => {
    // Pengaturan tekstur
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3); // Ganti angka ini jika motif batik kebesaran/kekecilan di baju
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // SANGAT PENTING: File .glb/.gltf membungkus tekstur secara terbalik. 
    // Harus disetel true agar motif tidak terbalik atas-bawah (karena ini base64 external)
    texture.flipY = true; 
    
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
  modelPath: string; // Tambahan agar path model bisa dilempar dari page.tsx
}

export default function ShirtModel({ textureUrl, modelPath }: ShirtModelProps) {
  // Load file .glb secara dinamis sesuai pilihan (dress/kebaya/mens_shirt)
  const { scene } = useGLTF(modelPath);
  
  // Clone (Gandakan) objek agar kita bisa memanipulasi materialnya 
  // tanpa merusak cache bawaan React Three Fiber saat ganti-ganti baju.
  const copiedScene = useMemo(() => scene.clone(), [scene, modelPath]);

  return (
    // Mempertahankan Center dan Stage agar otomatis berada di tengah tanpa manual "position"
    <Center>
      {/* environment bisa disesuaikan (misal: "city", "sunset", "studio") */}
      <Stage adjustCamera intensity={0.5} environment="city">
        {textureUrl ? (
          <TexturedBaju scene={copiedScene} url={textureUrl} />
        ) : (
          <PolosBaju scene={copiedScene} />
        )}
      </Stage>
    </Center>
  );
}
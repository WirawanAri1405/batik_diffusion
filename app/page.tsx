"use client";
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import ShirtModel from './components/ShirtModel';

export default function Home() {
  const [makna, setMakna] = useState("");
  const [konteks, setKonteks] = useState("Pakaian Sehari-hari");
  const [loading, setLoading] = useState(false);
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!makna) return alert("Harap isi makna batik!");
    setLoading(true);
    
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ makna, konteks })
      });
      
      const data = await res.json();
      if (data.status === "success") {
        setTextureUrl(data.imageUrl);
      } else {
        alert(data.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Batik AI Studio</h1>
        <p className="text-gray-600">Sintesis Motif Berbasis Makna dengan Preview 3D</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PANEL KIRI: FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 col-span-1 flex flex-col h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Parameter Desain</h2>
          
          <label className="block text-sm font-medium text-gray-700 mb-1">Makna / Filosofi</label>
          <input 
            type="text" 
            value={makna}
            onChange={(e) => setMakna(e.target.value)}
            placeholder="Cth: Keberanian, Kesuburan, dll" 
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Konteks Penggunaan</label>
          <select 
            value={konteks}
            onChange={(e) => setKonteks(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option value="formal wear">Acara Resmi / Formal</option>
            <option value="wedding attire">Pernikahan</option>
            <option value="casual wear">Pakaian Sehari-hari</option>
          </select>

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800'
            }`}
          >
            {loading ? 'Sistem AI Sedang Memproses...' : 'Generate Motif Batik'}
          </button>

          {/* PREVIEW 2D */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hasil Motif 2D</h3>
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
              {textureUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={textureUrl} alt="Batik 2D" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Belum ada motif</span>
              )}
            </div>
          </div>
        </div>

        {/* PANEL KANAN: 3D PREVIEW */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm">
            Preview 3D Interaktif
          </div>
          
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="w-full h-full bg-neutral-50">
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" /> {/* Pencahayaan realistis */}
            
            <Suspense fallback={null}>
              <ShirtModel textureUrl={textureUrl} />
              {/* Bayangan di bawah baju */}
              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
            </Suspense>
            
            <OrbitControls enablePan={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.5} />
          </Canvas>
          
          <div className="absolute bottom-4 w-full text-center text-xs text-gray-400 pointer-events-none">
            Klik & Geser untuk memutar objek
          </div>
        </div>

      </div>
    </main>
  );
}
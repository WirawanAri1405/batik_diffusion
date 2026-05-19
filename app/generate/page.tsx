"use client";
import { useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import ShirtModel from '../components/ShirtModel';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  // State untuk Pilihan Pengguna
  const [gender, setGender] = useState("perempuan");
  const [konteks, setKonteks] = useState("kasual"); // kasual, formal, pernikahan

  useEffect(() => {
    const savedImage = localStorage.getItem("savedBatikImage");
    if (savedImage) {
      setTextureUrl(savedImage);
    }
  }, []);

  // State untuk Parameter AI SD3
  const [params, setParams] = useState({
    prompt: "batik_parang, diagonal rows of interlocking S-shaped motifs, high contrast",
    negative_prompt: "blurry, low quality, distorted, messy lines, modern style",
    lora_scale: 0.6,
    guidance_scale: 7.0,
    seed: 42
  });

// Logika Cerdas: Pemetaan semua kemungkinan model 3D
const currentModelPath = useMemo(() => {
  // Definisikan peta model berdasarkan [gender][konteks]
  const modelMap: Record<string, Record<string, string>> = {
    "laki-laki": {
      "kasual": "/models/shirt_baked.glb",
      "formal": "/models/mens_shirt.glb",      // Bisa diganti kemeja batik lengan panjang jika ada
      "pernikahan": "/models/mens_shirt.glb",   // Bisa diganti beskap jika ada
    },
    "perempuan": {
      "kasual": "/models/dress.glb",
      "formal": "/models/kebaya.glb",
      "pernikahan": "/models/kebaya.glb",
    }
  };

  // Ambil model berdasarkan pilihan, berikan fallback jika tidak ditemukan
  return modelMap[gender]?.[konteks] || "/models/dress.glb";
}, [gender, konteks]);

  const handleGenerate = async () => {
    if (!params.prompt) return alert("Harap isi prompt batik!");
    setLoading(true);
    
    // Kita sisipkan 'konteks' ke dalam payload agar backend juga tahu tujuannya
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...params, gender, konteks })
      });
      
      const data = await res.json();
      if (data.status === "success") {
        setTextureUrl(data.imageUrl);
        localStorage.setItem("savedBatikImage", data.imageUrl);
      } else {
        alert(data.message || "Terjadi kesalahan pada server");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi server Colab");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTextureUrl(null);
    localStorage.removeItem("savedBatikImage");
  };

  return (
    <main className="min-h-screen bg-neutral-100 p-8 font-sans text-gray-800 bg-[url('/background.png')] bg-cover bg-center bg-fixed">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Batik AI Studio</h1>
        <p className="text-gray-600">Sintesis Motif Berbasis AI dengan Preview 3D Interaktif</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL KIRI: FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 col-span-1 flex flex-col h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Parameter Desain</h2>
          
          {/* Pilihan Gender & Konteks Penggunaan */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-gray-50"
              >
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konteks</label>
              <select 
                value={konteks}
                onChange={(e) => setKonteks(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-gray-50"
              >
                <option value="kasual">Kasual / Harian</option>
                <option value="formal">Acara Formal</option>
                <option value="pernikahan">Pernikahan</option>
              </select>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt / Makna Motif</label>
          <textarea 
            value={params.prompt}
            onChange={(e) => setParams({...params, prompt: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-amber-500 outline-none h-20 text-sm bg-gray-50"
            placeholder="Cth: motif parang dipadukan dengan bunga melati..."
          />
          {/*          
          <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
          <textarea 
            value={params.negative_prompt}
            onChange={(e) => setParams({...params, negative_prompt: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-amber-500 outline-none h-16 text-sm bg-gray-50"
          /> 
          */}


          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LoRA ({params.lora_scale})</label>
              <input 
                type="range" min="0" max="2" step="0.1"
                value={params.lora_scale}
                onChange={(e) => setParams({...params, lora_scale: parseFloat(e.target.value)})}
                className="w-full accent-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guidance ({params.guidance_scale})</label>
              <input 
                type="range" min="1" max="20" step="0.5"
                value={params.guidance_scale}
                onChange={(e) => setParams({...params, guidance_scale: parseFloat(e.target.value)})}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Seed</label>
          <input 
            type="number"
            value={params.seed}
            onChange={(e) => setParams({...params, seed: parseInt(e.target.value)})}
            className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-gray-50"
          />

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800 active:scale-[0.98]'
            }`}
          >
            {loading ? 'AI Sedang Memproses...' : 'Generate Motif Batik'}
          </button>

          {textureUrl && (
            <button 
              onClick={handleReset}
              className="w-full py-2 mt-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              Bersihkan Hasil (Reset)
            </button>
          )}

          {/* PREVIEW 2D */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hasil Motif 2D</h3>
            <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
              {textureUrl ? (
                <img src={textureUrl} alt="Batik 2D" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Belum ada motif</span>
              )}
            </div>
          </div>
        </div>

        {/* PANEL KANAN: 3D PREVIEW */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 col-span-1 lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm border border-gray-100">
            Preview 3D ({konteks === 'kasual' ? 'Kasual' : konteks === 'formal' ? 'Formal' : 'Pernikahan'})
          </div>
          
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="w-full h-full bg-neutral-50" dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" /> 
            
            <Suspense fallback={null}>
              <ShirtModel textureUrl={textureUrl} modelPath={currentModelPath} />
              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} frames={1} resolution={256}/>
            </Suspense>
            
            <OrbitControls enablePan={true} minPolarAngle={0} maxPolarAngle={Math.PI/1.5} makeDefault/>
          </Canvas>
          
          <div className="absolute bottom-4 w-full text-center text-xs text-gray-400 pointer-events-none">
            Klik & Geser untuk memutar objek 3D
          </div>
        </div>

      </div>
    </main>
  );
}
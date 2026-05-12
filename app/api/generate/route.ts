import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { makna, konteks } = await request.json();
    
    // 1. Racik prompt khusus untuk SD3 + LoRA Batik
    const promptText = `${makna}`;

    // 2. Tentukan URL Ngrok Anda
    // Sangat disarankan untuk memindahkan URL ini ke file .env.local 
    // Contoh di .env.local: COLAB_API_URL="https://chantal-...ngrok-free.dev/generate"
    const COLAB_API_URL = process.env.COLAB_API_URL || "https://chantal-preglacial-nonlacteally.ngrok-free.dev/generate";

    console.log(`Mengirim request ke Colab: ${COLAB_API_URL}`);

    // 3. Kirim request POST ke FastAPI di Colab
    const colabResponse = await fetch(COLAB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptText,
        lora_scale: 1, // Sesuaikan kekuatan LoRA Batik (0.1 - 1.0)
        seed: 42// Math.floor(Math.random() * 1000000)  Seed acak agar hasil selalu unik
      }),
      // Tambahkan timeout yang agak panjang karena AI butuh waktu proses (contoh: 60 detik)
      // Note: Next.js fetch API bawaan kadang butuh konfigurasi AbortController jika ingin presisi
    });

    if (!colabResponse.ok) {
      throw new Error(`Server Colab menolak dengan status: ${colabResponse.status}`);
    }

    // 4. Parse respons JSON dari Colab
    const data = await colabResponse.json();

    if (data.status === "success") {
      // 5. Ubah Base64 string menjadi Data URL yang bisa dibaca tag <img> HTML
      const imageFormat = `data:image/png;base64,${data.image_base64}`;
      
      // Langsung kembalikan format ini ke frontend
      return NextResponse.json({ 
          status: "success", 
          imageUrl: imageFormat 
      });
    } else {
      throw new Error("Colab membalas, tapi statusnya gagal.");
    }

  } catch (error: any) {
    console.error("Generate Error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses gambar dari Colab AI.", details: error.message },
      { status: 500 }
    );
  }
}
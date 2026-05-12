import { NextResponse } from 'next/server';

const BANNED_WORDS = [
  "nude", "naked", "nsfw", "blood", "gore", "sexy", "porn",
  "robot", "anime", "manga", "realistic photo", "person", "face"
];

export async function POST(request: Request) {
  try {
    const { prompt, negative_prompt, lora_scale, guidance_scale, seed } = await request.json();

    const userInput = prompt.toLowerCase();

// 1. Text Normalization: Hapus simbol/tanda baca pengecoh
    // dan jadikan 1 spasi rapi agar mudah dideteksi
    const cleanInput = userInput.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ');

    // 2. Blacklist Lapis 1: Kategori NSFW & Anatomi (Menggunakan Regex Word Boundary \b)
    // Ini akan menangkap kata yang berdiri sendiri maupun typo umum
    const nsfwPattern = /\b(boob|boobs|tits|breast|cleavage|nude|naked|nsfw|porn|hentai|jav|milf|waifu|sexy|sex|fuck|pussy|dick|cock|erotic)\b/i;

    // 3. Blacklist Lapis 2: Kategori Out-of-Context (Mencegah AI menggambar orang/benda)
    // Karena kita hanya butuh tekstur kain/batik!
    const outOfContextPattern = /\b(car|robot|anime|manga|cosplay|realistic photo|person|face|girl|boy|woman|man|lady|japanese)\b/i;

    // 4. Eksekusi Pengecekan
    if (nsfwPattern.test(cleanInput)) {
      return NextResponse.json(
        { status: "error", message: "Prompt ditolak: Mengandung unsur NSFW atau kata yang tidak pantas." },
        { status: 400 }
      );
    }

    if (outOfContextPattern.test(cleanInput)) {
      return NextResponse.json(
        { status: "error", message: "Prompt ditolak: Tolong fokus pada deskripsi filosofi, makna, atau motif kain Batik saja (contoh: keberanian, bunga, laut)." },
        { status: 400 }
      );
    }
    // --- END OF GUARDRAILS ---
    // Kita kunci AI agar HANYA fokus membuat tekstur kain batik
    const promptText = `A beautiful batik pattern ${prompt} highly detailed, high contrast, 8k resolution`;
    
    const COLAB_API_URL = process.env.COLAB_API_URL;

    if (!COLAB_API_URL) {
      return NextResponse.json(
        { status: "error", message: "URL API Colab belum diatur" },
        { status: 500 }
      );
    }

    const colabResponse = await fetch(`${COLAB_API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText,
        negative_prompt: negative_prompt,
        lora_scale: parseFloat(lora_scale),
        guidance_scale: parseFloat(guidance_scale),
        seed: parseInt(seed)
      }),
    });

    if (!colabResponse.ok) {
      throw new Error(`Colab Error: ${colabResponse.statusText}`);
    }

    const data = await colabResponse.json();
    
    return NextResponse.json({ 
      status: "success", 
      imageUrl: `data:image/png;base64,${data.image_base64}` 
    });

  } catch (error: any) {
    console.error("Generate Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
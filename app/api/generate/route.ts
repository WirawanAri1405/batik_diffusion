import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { makna, konteks } = await request.json();
    
    // Prompt yang spesifik untuk batik
    const prompt = `A seamless traditional Indonesian batik pattern representing ${makna}, suitable for ${konteks}, highly detailed, flat lay`;

    // Kita gunakan Pollinations API (Gratis, Tanpa Token, Tanpa Error 404)
    // Parameter width dan height disetel ke 1024 agar teksturnya tajam di 3D
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;

    // Langsung kembalikan URL tersebut ke frontend
    return NextResponse.json({ status: "success", imageUrl: imageUrl });

  } catch (error) {
    console.error("Generate Error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses gambar dari AI." },
      { status: 500 }
    );
  }
}
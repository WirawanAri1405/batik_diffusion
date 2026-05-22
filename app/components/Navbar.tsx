import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-surface-white/80 backdrop-blur-md z-50 border-b border-outline-variant shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
        {/* Bagian Kiri: Logo (Flex-1) */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-soga-brown flex items-center gap-2">
            <span className="material-symbols-outlined">auto_awesome</span>
            Batik AI Studio
          </Link>
        </div>

        {/* Bagian Tengah: Navigasi (Flex-1 dan Text-center) */}
        <div className="flex-1 flex justify-center gap-6">
          <Link href="/" className="text-on-surface hover:text-soga-brown font-medium transition-colors">
            Home
          </Link>
          <Link href="/generate" className="text-on-surface hover:text-soga-brown font-medium transition-colors">
            Generate Motif
          </Link>
        </div>

        {/* Bagian Kanan: Placeholder (Flex-1 agar simetris) */}
        <div className="flex-1" />
      </div>
    </nav>
  );
}
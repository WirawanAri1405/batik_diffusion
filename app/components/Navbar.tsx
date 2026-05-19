import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-surface-white/80 backdrop-blur-md z-50 border-b border-outline-variant shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-soga-brown flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              Batik AI Studio
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-on-surface hover:text-soga-brown font-medium transition-colors">
              Home
            </Link>
            <Link href="/generate" className="text-on-surface hover:text-soga-brown font-medium transition-colors">
              Generate Motif
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
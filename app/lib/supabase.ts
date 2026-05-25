import { createClient } from '@supabase/supabase-js';

// Mengambil variabel lingkungan secara aman dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi darurat jika Anda lupa mengisi file .env
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Kredensial Supabase tidak ditemukan di .env.local! Periksa kembali konfigurasi Anda.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
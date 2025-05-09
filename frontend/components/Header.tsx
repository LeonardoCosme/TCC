'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition duration-300 cursor-pointer">
            Marido de Aluguel
          </span>
        </Link>

        <nav className="space-x-4">
          <Link href="/login">
            <span className="hover:text-orange-600 transition">Login</span>
          </Link>
          <Link href="/cadastro">
            <span className="hover:text-orange-600 transition">Cadastrar</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

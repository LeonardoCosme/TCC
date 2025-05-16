'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo_projeto.jpeg"
            alt="Logo Marido de Aluguel"
            width={60}
            height={20}
            className="cursor-pointer"
          />
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
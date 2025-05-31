'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../utils/auth';
import { useRouter } from 'next/router';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<'cliente' | 'prestador' | null>(null);
  const router = useRouter();

  const rotaAtual = router.pathname;

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLogged(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(user => {
          setTipoUsuario(user.tipoUsuario);
        })
        .catch(() => {
          setIsLogged(false);
          removeToken();
        });
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLogged(false);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo_projeto.jpeg"
            alt="Logo Marido de Aluguel"
            width={60}
            height={60}
            style={{ width: 'auto', height: 'auto' }}
            className="cursor-pointer"
          />
        </Link>

        <nav className="space-x-4 text-sm md:text-base text-gray-700">
          {!isLogged && rotaAtual !== '/login' && (
            <Link href="/login">
              <span className="hover:text-orange-600 transition">Login</span>
            </Link>
          )}

          {!isLogged && rotaAtual !== '/cadastro' && (
            <Link href="/cadastro">
              <span className="hover:text-orange-600 transition">Cadastrar</span>
            </Link>
          )}

          {isLogged && tipoUsuario === 'cliente' && (
            <>
              {rotaAtual !== '/meus-servicos' && (
                <Link href="/meus-servicos">
                  <span className="hover:text-orange-600 transition">Meus Serviços</span>
                </Link>
              )}
              {rotaAtual !== '/meus-agendamentos' && (
                <Link href="/meus-agendamentos">
                  <span className="hover:text-orange-600 transition">Meus Agendamentos</span>
                </Link>
              )}
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 ml-4">Sair</button>
            </>
          )}

          {isLogged && tipoUsuario === 'prestador' && (
            <>
              {rotaAtual !== '/agendamentos-prestador' && (
                <Link href="/agendamentos-prestador">
                  <span className="hover:text-orange-600 transition">Agendamentos</span>
                </Link>
              )}
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 ml-4">Sair</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

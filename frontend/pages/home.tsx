import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Briefcase, Hammer } from 'lucide-react';
import FloatingLogoutButton from '../components/FloatingLogoutButton';

export default function HomePage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-orange-100 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
          {/* Card - Prestador */}
          <button
            type="button"
            onClick={() => router.push('/prestador')}
            className="cursor-pointer bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <Hammer className="w-12 h-12 text-orange-500 mb-4 animate-bounce" />
            <h2 className="text-xl font-semibold text-orange-600">Sou Prestador de Serviço</h2>
            <p className="text-sm text-gray-600 mt-2">Cadastre-se como profissional e veja oportunidades.</p>
          </button>

          {/* Card - Contratar */}
          <button
            type="button"
            onClick={() => router.push('/contratar-prestador')}
            className="cursor-pointer bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <Briefcase className="w-12 h-12 text-orange-500 mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold text-orange-600">Contratar Prestador</h2>
            <p className="text-sm text-gray-600 mt-2">Visualize serviços disponíveis e contrate facilmente.</p>
          </button>
        </div>
      </div>

      {/* Botão flutuante de logout */}
      <FloatingLogoutButton />
    </Layout>
  );
}

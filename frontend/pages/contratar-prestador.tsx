import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import CadastrarServicoPopup from '../components/CadastrarServicoPopup';

export default function ContratarPrestadorPage() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  console.log('Página Contratar Prestador carregada');

  return (
    <Layout>
      <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md text-center space-y-6">
          <h2 className="text-2xl font-bold text-orange-500">Contratar Prestador</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded transition"
            >
              Cadastrar Serviço
            </button>

            <button
              onClick={() => router.push('/meus-servicos')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition"
            >
              Ver meus serviços
            </button>
          </div>
        </div>
      </div>

      <CadastrarServicoPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

interface Servico {
  id: number;
  nome: string;
  telefone: string;
  tipo: string;
  observacao: string;
  local: string;
  valor: string;
  urgente: boolean;
  userId: number;
}

export default function ServicosDisponiveis() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [popupServico, setPopupServico] = useState<Servico | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/servicos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(err => console.error('Erro ao buscar serviços:', err));
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Serviços Disponíveis</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicos.map(servico => (
            <button
              key={servico.id}
              type="button"
              onClick={() => setPopupServico(servico)}
              className={`p-4 rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 flex flex-col items-start text-left 
                cursor-pointer border-2 focus:outline-none focus:ring-4 focus:ring-orange-300
                ${servico.urgente ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
            >
              <h2 className="text-xl font-semibold text-orange-600 capitalize">{servico.tipo}</h2>
              <p className="text-sm text-gray-700 mt-2">{servico.observacao}</p>
              <p className="text-xs text-gray-500 mt-1">
                <strong>Cliente:</strong> {servico.nome}
              </p>
              <p className="text-xs text-gray-500">{servico.local}</p>
              <p className="text-xs text-gray-600 font-semibold mt-1">
                R$ {parseFloat(servico.valor).toFixed(2)}
              </p>

              {servico.urgente && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow animate-pulse">
                  URGENTE 🔥
                </span>
              )}
            </button>
          ))}
        </div>

        {popupServico && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative animate-fade-in">
              <h2 className="text-xl font-bold text-orange-600 mb-4 capitalize">{popupServico.tipo}</h2>
              <p className="mb-2">
                <strong>Descrição:</strong> {popupServico.observacao}
              </p>
              <p className="mb-2">
                <strong>Cliente:</strong> {popupServico.nome}
              </p>
              <p className="mb-2">
                <strong>Local:</strong> {popupServico.local}
              </p>
              <p className="mb-2">
                <strong>Valor:</strong> R$ {parseFloat(popupServico.valor).toFixed(2)}
              </p>
              <p className="mb-2">
                <strong>Urgente:</strong> {popupServico.urgente ? 'Sim' : 'Não'}
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setPopupServico(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPopupServico(null);
                    alert('Você se candidatou a esse serviço!');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Me candidatar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}

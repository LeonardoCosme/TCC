'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface ServicoDisponivel {
  id: number;
  tipo: string;
  descricao: string;
}

export default function ServicosDisponiveis() {
  const [servicos, setServicos] = useState<ServicoDisponivel[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/servicos-disponiveis`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar serviços disponíveis');
        return res.json();
      })
      .then((data) => setServicos(data))
      .catch((err) => {
        console.error('Erro ao carregar serviços disponíveis:', err);
        alert('Erro ao buscar os serviços disponíveis.');
      });
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Serviços da Plataforma</h1>

        {servicos.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum serviço disponível no momento.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-orange-600">{servico.tipo}</h2>
                  <p className="text-sm text-gray-700 mt-2">{servico.descricao}</p>
                </div>

                <button
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
                  onClick={() =>
                    router.push(`/agendamento?servico=${encodeURIComponent(servico.tipo)}`)
                  }
                >
                  Agendar serviço
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

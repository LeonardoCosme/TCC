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

export default function MeusServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [meuId, setMeuId] = useState<number | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    // 1º passo: buscar ID do usuário
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(user => {
        setMeuId(user.id);

        // 2º passo: buscar todos os serviços
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then(res => res?.json())
      .then(data => {
        if (meuId !== null) {
          const meusServicos = data.filter((s: Servico) => s.userId === meuId);
          setServicos(meusServicos);
        }
      })
      .catch(err => console.error('Erro ao carregar serviços:', err));
  }, [meuId]);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Meus Serviços Cadastrados</h1>

        {servicos.length === 0 ? (
          <p className="text-center text-gray-600">Você ainda não cadastrou nenhum serviço.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className={`p-4 rounded-xl shadow-md border-2 ${
                  servico.urgente ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              >
                <h2 className="text-xl font-semibold text-orange-600 capitalize">{servico.tipo}</h2>
                <p className="text-sm text-gray-700 mt-2">{servico.observacao}</p>
                <p className="text-xs text-gray-500 mt-2">{servico.local}</p>
                <p className="text-xs text-gray-600 font-semibold mt-1">R$ {parseFloat(servico.valor).toFixed(2)}</p>
                {servico.urgente && (
                  <span className="inline-block text-xs text-white bg-red-500 px-2 py-1 rounded mt-2">
                    Urgente
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

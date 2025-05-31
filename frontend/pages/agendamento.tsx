'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

interface Servico {
  id: number;
  tipo: string;
  observacao: string;
  valor: string;
  local: string;
  urgente: boolean;
  nome: string;
  telefone: string;
  userId: number;
}

export default function AgendamentoPage() {
  const router = useRouter();
  const { servicoId } = router.query;

  const [servico, setServico] = useState<Servico | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [dataAgendada, setDataAgendada] = useState('');
  const [horaAgendada, setHoraAgendada] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token || !servicoId) return;

    // Buscar informações do usuário logado (cliente)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => setClienteId(user.id))
      .catch(err => {
        console.error('Erro ao buscar cliente:', err);
        alert('Erro ao buscar informações do cliente.');
      });

    // Buscar serviço
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicos/${servicoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setServico(data))
      .catch(err => {
        console.error('Erro ao carregar serviço:', err);
        alert('Erro ao carregar dados do serviço.');
        router.push('/servicos-disponiveis');
      });
  }, [servicoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !servico || !clienteId) return;

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clienteId,
          prestadorId: servico.userId,
          servico: servico.tipo,
          dataAgendada,
          horaAgendada,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Agendamento realizado com sucesso!');
        router.push('/meus-agendamentos');
      } else {
        alert(result.error ?? 'Erro ao agendar o serviço.');
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao processar o agendamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-orange-600 text-center">Agendar Serviço</h2>

          {servico ? (
            <>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Tipo:</strong> {servico.tipo}</p>
                <p><strong>Descrição:</strong> {servico.observacao}</p>
                <p><strong>Valor:</strong> R$ {parseFloat(servico.valor).toFixed(2)}</p>
                <p><strong>Local:</strong> {servico.local}</p>
                <p><strong>Urgente:</strong> {servico.urgente ? 'Sim' : 'Não'}</p>
                <p><strong>Prestador:</strong> {servico.nome}</p>
                <p><strong>Telefone:</strong> {servico.telefone}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="data" className="block mb-1 text-gray-700">Data</label>
                  <input
                    id="data"
                    type="date"
                    required
                    value={dataAgendada}
                    onChange={(e) => setDataAgendada(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label htmlFor="hora" className="block mb-1 text-gray-700">Hora</label>
                  <input
                    id="hora"
                    type="time"
                    required
                    value={horaAgendada}
                    onChange={(e) => setHoraAgendada(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
                >
                  {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-gray-500">Carregando serviço...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

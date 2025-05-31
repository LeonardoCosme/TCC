'use client';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

interface Agendamento {
  id: number;
  clienteNome: string;
  clienteTelefone: string;
  servico: string;
  dataAgendada: string;
  horaAgendada: string;
  status: string;
}

export default function AgendamentosRecebidos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/prestador/agendamentos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAgendamentos(data))
      .catch(() => setErro('Erro ao buscar agendamentos.'));
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-50 pt-28 pb-12 px-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Agendamentos Recebidos</h1>

        {erro && <p className="text-red-600 text-center">{erro}</p>}

        {agendamentos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum agendamento recebido ainda.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {agendamentos.map(ag => (
              <div key={ag.id} className="bg-white rounded-xl shadow-md p-4 border border-orange-200">
                <h2 className="text-lg font-bold text-orange-600 mb-2">{ag.servico}</h2>
                <p><strong>Cliente:</strong> {ag.clienteNome}</p>
                <p><strong>Telefone:</strong> {ag.clienteTelefone}</p>
                <p><strong>Data:</strong> {ag.dataAgendada}</p>
                <p><strong>Hora:</strong> {ag.horaAgendada}</p>
                <p><strong>Status:</strong> {ag.status}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

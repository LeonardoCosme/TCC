import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

interface Agendamento {
  id: number;
  servico: string;
  dataAgendada: string;
  horaAgendada: string;
  status: string;
  prestador: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos/cliente`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(data => setAgendamentos(data))
      .catch(err => {
        console.error('Erro ao carregar agendamentos:', err);
        alert('Erro ao buscar seus agendamentos.');
      });
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Meus Agendamentos</h1>

        {agendamentos.length === 0 ? (
          <p className="text-center text-gray-600">Você ainda não possui agendamentos.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="p-4 rounded-xl shadow-md bg-white border border-gray-200">
                <h2 className="text-xl font-semibold text-orange-600 capitalize mb-2">
                  {agendamento.servico}
                </h2>
                <p className="text-sm text-gray-700">
                  <strong>Data:</strong> {agendamento.dataAgendada}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Hora:</strong> {agendamento.horaAgendada}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> {agendamento.status}
                </p>
                <div className="mt-3 text-xs text-gray-600">
                  <p><strong>Prestador:</strong> {agendamento.prestador.name}</p>
                  <p><strong>Telefone:</strong> {agendamento.prestador.phone}</p>
                  <p><strong>Email:</strong> {agendamento.prestador.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

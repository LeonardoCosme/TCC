import { useState } from 'react';
import Layout from '../components/Layout';

const servicos = [
  {
    id: 1,
    titulo: 'Instalação de chuveiro',
    descricao: 'Precisa instalar um chuveiro elétrico no banheiro.',
    local: 'Rua A, 123',
    data: '10/04/2025',
    horario: '14:00'
  },
  {
    id: 2,
    titulo: 'Montagem de móveis',
    descricao: 'Montar guarda-roupa de 6 portas.',
    local: 'Av. Brasil, 987',
    data: '11/04/2025',
    horario: '09:00'
  },
  {
    id: 3,
    titulo: 'Reparo elétrico',
    descricao: 'Trocar tomadas e interruptores em apartamento.',
    local: 'Rua das Palmeiras, 321',
    data: '12/04/2025',
    horario: '13:00'
  }
];

export default function ServicosDisponiveis() {
  const [popupServico, setPopupServico] = useState<any>(null);

  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Serviços Disponíveis</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => setPopupServico(servico)}
            >
              <h2 className="text-xl font-semibold text-orange-600">{servico.titulo}</h2>
              <p className="text-sm text-gray-700 mt-2">{servico.descricao}</p>
              <p className="text-xs text-gray-500 mt-2">{servico.local}</p>
              <p className="text-xs text-gray-500">{servico.data} às {servico.horario}</p>
            </div>
          ))}
        </div>

        {popupServico && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative animate-fade-in">
              <h2 className="text-xl font-bold text-orange-600 mb-4">{popupServico.titulo}</h2>
              <p className="mb-2"><strong>Descrição:</strong> {popupServico.descricao}</p>
              <p className="mb-2"><strong>Local:</strong> {popupServico.local}</p>
              <p className="mb-2"><strong>Data:</strong> {popupServico.data} às {popupServico.horario}</p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setPopupServico(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    setPopupServico(null);
                    alert('Você se candidatou a esse serviço!');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}

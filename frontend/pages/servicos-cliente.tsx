// pages/servicos-cliente.tsx
import Layout from '../components/Layout';

const categorias = [
  { tipo: 'Eletricista', descricao: 'Instalações e manutenções elétricas' },
  { tipo: 'Encanador', descricao: 'Problemas hidráulicos, vazamentos e entupimentos' },
  { tipo: 'Pintor', descricao: 'Serviços de pintura em geral' },
  { tipo: 'Montador', descricao: 'Montagem de móveis e objetos' },
];

export default function ServicosCliente() {
  return (
    <Layout>
      <main className="min-h-screen bg-orange-100 pt-28 pb-20 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Serviços Disponíveis</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categorias.map((cat) => (
            <div key={cat.tipo} className="p-6 rounded-xl bg-white shadow-md">
              <h2 className="text-xl font-bold text-orange-600">{cat.tipo}</h2>
              <p className="text-sm text-gray-700 mt-2">{cat.descricao}</p>
              <p className="mt-4 text-sm text-gray-500">Disponível para contratação</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

export default function PrestadorPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    endereco_residencial: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco_comercial: '',
    profissao: '',
    empresa: '',
    entrada: '',
    saida: '',
    cnpj: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchUserData = async () => {
      const token = getToken();
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const resUser = await fetch('http://localhost:3001/api/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (resUser.ok) {
          const data = await resUser.json();
          setFormData((prev) => ({
            ...prev,
            nome: data.name,
            email: data.email,
            telefone: data.phone,
            endereco_residencial: data.address
          }));
        }

        const resPrestador = await fetch('http://localhost:3001/api/prestador/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (resPrestador.ok) {
          const prestador = await resPrestador.json();
          console.log('Dados do prestador:', prestador);

          setFormData((prev) => ({
            ...prev,
            cpf: prestador.cpf || '',
            endereco_residencial: prestador.enderecoResidencial || '',
            endereco_comercial: prestador.enderecoComercial || '',
            profissao: prestador.profissao || '',
            empresa: prestador.empresa || '',
            entrada: prestador.entrada || '',
            saida: prestador.saida || '',
            cnpj: prestador.cnpj || ''
          }));

          const camposObrigatorios = ['cpf', 'telefone', 'enderecoResidencial', 'profissao'];
          const preenchidos = camposObrigatorios.every((campo) => prestador[campo]);

          if (preenchidos) {
            setLoading(true);
            setTimeout(() => {
              router.push('/servicos-disponiveis');
            }, 6000);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getToken();

    try {
      const response = await fetch('http://localhost:3001/api/prestador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/servicos-disponiveis');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao salvar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao salvar os dados.');
    }
  };

  return (
    <Layout>
      {/* Toast centralizado */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-orange-300 text-orange-600 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up">
            <svg
              className="animate-spin h-6 w-6 text-orange-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-base font-medium">Carregando serviços... Por favor, aguarde.</span>
          </div>
        </div>
      )}

      {/* Formulário principal */}
      <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">
            Cadastro do Prestador de Serviço
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nome" value={formData.nome} readOnly className="input-field bg-gray-100" placeholder="Nome completo" />
            <input name="email" value={formData.email} readOnly className="input-field bg-gray-100" placeholder="E-mail" />
            <input name="telefone" value={formData.telefone} readOnly className="input-field bg-gray-100" placeholder="Telefone" />
            <input name="endereco_residencial" value={formData.endereco_residencial} readOnly className="input-field bg-gray-100" placeholder="Endereço residencial" />
            <input name="cpf" value={formData.cpf} onChange={handleChange} className="input-field" placeholder="CPF" />
            <input name="endereco_comercial" value={formData.endereco_comercial} onChange={handleChange} className="input-field" placeholder="Endereço comercial (opcional)" />
            <input name="profissao" value={formData.profissao} onChange={handleChange} className="input-field" placeholder="Profissão" />
            <input name="empresa" value={formData.empresa} onChange={handleChange} className="input-field" placeholder="Empresa atual ou anterior" />
            <input name="entrada" type="date" value={formData.entrada} onChange={handleChange} className="input-field" />
            <input name="saida" type="date" value={formData.saida} onChange={handleChange} className="input-field" />
            <input name="cnpj" value={formData.cnpj} onChange={handleChange} className="input-field" placeholder="CNPJ (se houver)" />

            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded transition">
                Salvar e ver serviços disponíveis
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #ccc;
          width: 100%;
          outline: none;
        }
        .input-field:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 1px #f97316;
        }
      `}</style>
    </Layout>
  );
}

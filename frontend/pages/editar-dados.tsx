import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getToken } from '../utils/auth';

export default function EditarDadosPage() {
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

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/api/prestador/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({
          nome: data.nome || '',
          endereco_residencial: data.enderecoResidencial || '',
          telefone: data.telefone || '',
          email: data.email || '',
          cpf: data.cpf || '',
          endereco_comercial: data.enderecoComercial || '',
          profissao: data.profissao || '',
          empresa: data.empresa || '',
          entrada: data.entrada || '',
          saida: data.saida || '',
          cnpj: data.cnpj || ''
        });
      }
    };

    fetchData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        alert('Dados atualizados com sucesso!');
        router.push('/home');
      } else {
        alert('Erro ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao atualizar os dados.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">Editar Dados do Prestador</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nome" value={formData.nome} onChange={handleChange} className="input-field" placeholder="Nome completo" />
            <input name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="E-mail" />
            <input name="telefone" value={formData.telefone} onChange={handleChange} className="input-field" placeholder="Telefone" />
            <input name="endereco_residencial" value={formData.endereco_residencial} onChange={handleChange} className="input-field" placeholder="Endereço residencial" />
            <input name="cpf" value={formData.cpf} onChange={handleChange} className="input-field" placeholder="CPF" />
            <input name="endereco_comercial" value={formData.endereco_comercial} onChange={handleChange} className="input-field" placeholder="Endereço comercial" />
            <input name="profissao" value={formData.profissao} onChange={handleChange} className="input-field" placeholder="Profissão" />
            <input name="empresa" value={formData.empresa} onChange={handleChange} className="input-field" placeholder="Empresa" />
            <input name="entrada" type="date" value={formData.entrada} onChange={handleChange} className="input-field" />
            <input name="saida" type="date" value={formData.saida} onChange={handleChange} className="input-field" />
            <input name="cnpj" value={formData.cnpj} onChange={handleChange} className="input-field" placeholder="CNPJ" />
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded transition">
                Atualizar Dados
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
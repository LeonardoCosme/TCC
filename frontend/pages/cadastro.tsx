import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  const [validations, setValidations] = useState({
    name: false,
    phone: false,
    email: false,
    password: false
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return /^[A-Za-zÀ-ÿ\s]+$/.test(value);
      case 'phone':
        return /^\d{11}$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
      default:
        return true;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidations({ ...validations, [name]: validateInput(name, value) });

    if (name === 'password') {
      setPasswordCriteria({
        length: value.length >= 6,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = Object.values(validations).every(Boolean);

    if (formData.password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!isValid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      router.push('/');
    } else {
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-orange-100 pt-28 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-96 space-y-4 backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold text-center text-orange-500">Cadastro</h1>

          <input name="name" placeholder="Nome completo" onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2" required />
          <p className={formData.name && !validations.name ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>
            {formData.name && (validations.name ? 'Nome válido.' : 'Apenas letras são permitidas.')}
          </p>

          <input name="address" placeholder="Endereço" onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2" required />

          <input name="phone" placeholder="Telefone (somente números)" maxLength={11} onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2" required />
          <p className={formData.phone && !validations.phone ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>
            {formData.phone && (validations.phone ? 'Telefone válido.' : 'Digite exatamente 11 números (DDD + número).')}
          </p>

          <input name="email" type="email" placeholder="E-mail" onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2" required />
          <p className={formData.email && !validations.email ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>
            {formData.email && (validations.email ? 'E-mail válido.' : 'Formato de e-mail inválido.')}
          </p>

          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Senha" onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 pr-10" required />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <ul className="text-sm space-y-1">
            <li className={passwordCriteria.length ? 'text-green-600' : 'text-red-600'}>• Pelo menos 6 caracteres</li>
            <li className={passwordCriteria.upper ? 'text-green-600' : 'text-red-600'}>• Pelo menos 1 letra maiúscula</li>
            <li className={passwordCriteria.lower ? 'text-green-600' : 'text-red-600'}>• Pelo menos 1 letra minúscula</li>
            <li className={passwordCriteria.number ? 'text-green-600' : 'text-red-600'}>• Pelo menos 1 número</li>
            <li className={passwordCriteria.special ? 'text-green-600' : 'text-red-600'}>• Pelo menos 1 caractere especial</li>
          </ul>

          <div className="relative">
            <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar Senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 pr-10" required />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <p className={`text-sm ${confirmPassword === formData.password ? 'text-green-600' : 'text-red-600'}`}>
            {confirmPassword && (confirmPassword === formData.password ? 'Senhas coincidem.' : 'As senhas não coincidem.')}
          </p>

          <button type="submit"
            className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500 transition duration-200">
            Cadastrar
          </button>
        </form>
      </div>
    </Layout>
  );
}

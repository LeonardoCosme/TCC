import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';

export default function FloatingLogoutButton() {
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      console.log('Token encontrado:', token);
      setShowButton(!!token);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que deseja sair da sua conta?');
    if (confirmLogout) {
      localStorage.removeItem('auth_token');
      router.push('/login');
    }
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="relative">
        <button
          title="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-white shadow-2xl rounded-full hover:scale-110 transition-transform duration-300 ring-2 ring-orange-400/30 hover:ring-orange-500"
        >
          <User size={24} className="text-orange-500" />
        </button>
        {menuOpen && (
          <div className="absolute bottom-16 right-0 bg-white border rounded-xl shadow-lg px-4 py-2 transition-all animate-fade-in">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:underline"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

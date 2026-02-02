import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://minutes-production.up.railway.app';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      });

      const { token } = response.data;
      if (token) {
        onLogin(token);
        toast.success('Inicio de sesión exitoso');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1633] rounded-2xl border border-purple-900/50 shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
            Brain Studio
          </h1>
          <p className="text-purple-300 mt-2">Ingresa para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0a1a] border border-purple-900/50 rounded-lg text-white placeholder-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0a1a] border border-purple-900/50 rounded-lg text-white placeholder-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

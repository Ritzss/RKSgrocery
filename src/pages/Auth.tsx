import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TEST_ACCOUNTS } from '../utils/testAccounts';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'dealer' | 'customer'>('customer');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password, role);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
    }
  };

  const handleTestAccount = async (type: 'admin' | 'dealer' | 'customer') => {
    const account = TEST_ACCOUNTS[type];
    try {
      await login(account.email, account.password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-500 font-medium"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 text-center">Test Accounts:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleTestAccount('admin')}
                className="px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
              >
                Admin Login
              </button>
              <button
                onClick={() => handleTestAccount('dealer')}
                className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
              >
                Dealer Login
              </button>
              <button
                onClick={() => handleTestAccount('customer')}
                className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
              >
                Customer Login
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    role === 'customer'
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('dealer')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    role === 'dealer'
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <Store className="h-5 w-5 mr-2" />
                  Dealer
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu as MenuIcon, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/deals', label: 'Deals' },
  { path: '/recipes', label: 'Recipes' },
  { path: '/admin', label: 'Admin' },
];

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="bg-green-600 text-white shadow-md relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
              <Link to="/" className="text-2xl font-bold">R.K.S GROCERY</Link>
            </div>

            <nav className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-green-200 transition py-2 ${
                    location.pathname === item.path ? 'border-b-2 border-white' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-green-700 text-white placeholder-green-200 rounded-full py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4" />
                </button>
              </form>

              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="hover:text-green-200 transition"
                >
                  <User className="h-6 w-6" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <button 
                className="hover:text-green-200 transition relative"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartState.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        />
        <div
          className={`md:hidden fixed top-0 left-0 bottom-0 w-64 bg-green-600 z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-xl font-bold" onClick={closeMobileMenu}>
                R.K.S GROCERY
              </Link>
              <button onClick={closeMobileMenu} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-green-700 text-white placeholder-green-200 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 px-4 rounded-lg hover:bg-green-700 transition ${
                    location.pathname === item.path ? 'bg-green-700' : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-500">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center text-white hover:text-green-200 transition"
                  onClick={closeMobileMenu}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </Link>
                <button 
                  className="flex items-center text-white hover:text-green-200 transition"
                  onClick={() => {
                    closeMobileMenu();
                    toggleCart();
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>Cart ({cartState.items.reduce((total, item) => total + item.quantity, 0)})</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-red-200 transition"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
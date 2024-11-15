import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Deals from './pages/Deals';
import Recipes from './pages/Recipes';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import DealerDashboard from './pages/DealerDashboard';

const ProtectedRoute: React.FC<{ 
  element: React.ReactElement; 
  allowedRoles?: ('admin' | 'dealer' | 'customer')[];
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/deals" element={<ProtectedRoute element={<Deals />} />} />
            <Route path="/recipes" element={<ProtectedRoute element={<Recipes />} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute 
                  element={<Admin />} 
                  allowedRoles={['admin']} 
                />
              } 
            />
            <Route 
              path="/dealer" 
              element={
                <ProtectedRoute 
                  element={<DealerDashboard />} 
                  allowedRoles={['dealer']} 
                />
              } 
            />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
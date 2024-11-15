import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TEST_ACCOUNTS } from '../utils/testAccounts';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'dealer' | 'customer';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'dealer' | 'customer') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Check test accounts
    const testAccount = Object.values(TEST_ACCOUNTS).find(
      account => account.email === email && account.password === password
    );

    if (testAccount) {
      const loggedInUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: testAccount.name,
        email: testAccount.email,
        role: testAccount.role
      };
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return;
    }

    throw new Error('Invalid credentials');
  };

  const signup = async (name: string, email: string, password: string, role: 'dealer' | 'customer') => {
    // Check if email is already used in test accounts
    if (Object.values(TEST_ACCOUNTS).some(account => account.email === email)) {
      throw new Error('Email already in use');
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
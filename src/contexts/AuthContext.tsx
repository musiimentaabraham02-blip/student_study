import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('study_finder_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, name?: string) => {
    // Simulate JWT/API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Strict Admin Role Checking
    const adminEmail = "musiimentaabraham02@gmail.com";
    const role: User['role'] = email.toLowerCase() === adminEmail.toLowerCase() ? "admin" : "student";
    
    // Resolve name: Use provided name, or format from email, or special admin name
    let displayName = name || email.split('@')[0];
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      displayName = "Abraham Musiimenta"; // Official Admin Identity
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: displayName,
      email: email,
      role: role,
      program: role === 'admin' ? 'System Administrator' : 'Information Technology',
      yearOfStudy: role === 'admin' ? 0 : 2,
    };

    localStorage.setItem('study_finder_user', JSON.stringify(mockUser));
    localStorage.setItem('study_finder_token', 'mock-jwt-token-' + Date.now());
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('study_finder_user');
    localStorage.removeItem('study_finder_token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
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

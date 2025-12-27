import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserLogged, getAccessToken, putAccessToken } from '../utils/network-data';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setUser(data);
        } else {
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (accessToken) => {
    putAccessToken(accessToken);
    
    const { error, data } = await getUserLogged();
    if (!error) {
      setUser(data);
    } else {
      localStorage.removeItem('accessToken');
      throw new Error('Failed to get user data');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
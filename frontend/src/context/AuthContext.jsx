import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatUserData = (rawUser) => {
    if (!rawUser) return null;
    return {
      id: rawUser._id || rawUser.id,
      name: rawUser.name || rawUser.username || '',
      email: rawUser.email || '',
      createdAt: rawUser.createdAt || null,
      updatedAt: rawUser.updatedAt || null,
    };
  };

  // Auto-check authentication state on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const data = await authApi.getMe();
        if (isMounted && data?.user) {
          setUser(formatUserData(data.user));
        }
      } catch (err) {
        // Not authenticated or token expired - clean state
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshUser = async () => {
    try {
      const data = await authApi.getMe();
      if (data?.user) {
        const formatted = formatUserData(data.user);
        setUser(formatted);
        return formatted;
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
    return null;
  };

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    if (data?.user) {
      setUser(formatUserData(data.user));
    }
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authApi.register(name, email, password);
    if (data?.user) {
      setUser(formatUserData(data.user));
    }
    return data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;


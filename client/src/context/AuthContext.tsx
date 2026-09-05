import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI, getUser, getToken, setUser as setStoredUser, removeToken, removeUser } from '@/services/api';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'recruiter' | 'candidate' | 'company' | 'super-admin' | string;
  phone?: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (userData: any) => Promise<any>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  getDashboardRoute: () => string;
  getProfileRoute: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getDashboardPathForRole = (role?: string): string => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return '/admin/dashboard';
    case 'super-admin':
      return '/super-admin/dashboard';
    case 'recruiter':
      return '/recruiter/dashboard';
    case 'company':
      return '/company/dashboard';
    case 'candidate':
    case 'user':
    default:
      return '/candidate/dashboard';
  }
};

export const getProfilePathForRole = (role?: string): string => {
  switch (role?.toLowerCase()) {
    case 'company':
      return '/company/profile';
    case 'candidate':
    case 'user':
      return '/candidate/profile';
    case 'recruiter':
      return '/recruiter/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'super-admin':
      return '/super-admin/dashboard';
    default:
      return '/candidate/profile';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getToken());
  const [loading, setLoading] = useState<boolean>(true);

  // Sync state from storage or on event
  const syncAuthState = () => {
    const storedToken = getToken();
    const storedUser = getUser();
    setIsAuthenticated(!!storedToken);
    setUser(storedUser);
  };

  useEffect(() => {
    syncAuthState();
    setLoading(false);

    const handleAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await authAPI.login(credentials);
    if (res.success) {
      setUser(res.user);
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('auth-change'));
    }
    return res;
  };

  const register = async (userData: any) => {
    const res = await authAPI.register(userData);
    if (res.success && res.user) {
      setUser(res.user);
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('auth-change'));
    }
    return res;
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event('auth-change'));
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...userData };
      setUser(updated);
      setStoredUser(updated);
      window.dispatchEvent(new Event('auth-change'));
    }
  };

  const refreshUser = async () => {
    try {
      if (getToken()) {
        const res = await userAPI.getProfile();
        if (res.success && res.user) {
          setUser(res.user);
          setStoredUser(res.user);
        }
      }
    } catch (err) {
      console.warn('Could not refresh user profile:', err);
    }
  };

  const getDashboardRoute = () => getDashboardPathForRole(user?.role);
  const getProfileRoute = () => getProfilePathForRole(user?.role);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
        getDashboardRoute,
        getProfileRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

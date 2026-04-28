import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  // Handle session expiry from axios interceptor
  useEffect(() => {
    const onExpired = () => {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        setUser(null);
        toast.error('Your session expired. Please log in again.', { duration: 4000 });
      }
    };
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, []);

  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      setUserData(data);
      toast.success(`Welcome back, ${data.name}!`);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', payload);
      setUserData(data);
      toast.success('Account created! Verify your email next.');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out');
  };

  const refreshUser = async () => {
    try {
      const { data } = await API.get('/auth/me');
      const merged = { ...user, ...data };
      setUserData(merged);
      return merged;
    } catch {}
  };

  const updateProfile = async (payload) => {
    try {
      const { data } = await API.put('/auth/me', payload);
      setUserData(data);
      toast.success('Profile updated');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, setUserData, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

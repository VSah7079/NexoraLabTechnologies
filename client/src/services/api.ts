const API_BASE_URL = 'http://localhost:8000/api';

// Get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Set token in localStorage
const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Remove token from localStorage
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Get user from localStorage
const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Set user in localStorage
const setUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Remove user from localStorage
const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: string;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success) {
      setToken(response.token);
      setUser(response.user);
    }

    return response;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success) {
      setToken(response.token);
      setUser(response.user);
    }

    return response;
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return await apiRequest('/user/profile');
  },

  updateProfile: async (userData: any) => {
    const response = await apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (response.success) {
      setUser(response.user);
    }

    return response;
  },
};

export { getToken, setToken, removeToken, getUser, setUser, removeUser };

const API_BASE_URL = 'http://localhost:8000/api';

// Get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Dispatch auth change event helper
const dispatchAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'));
  }
};

// Set token in localStorage
const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    dispatchAuthChange();
  }
};

// Remove token from localStorage
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    dispatchAuthChange();
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
    dispatchAuthChange();
  }
};

// Remove user from localStorage
const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    dispatchAuthChange();
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

  forgotPassword: async (email: string) => {
    return await apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (data: { token: string; password: string }) => {
    return await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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

// AI API (Connected with Google Gemini)
export const aiAPI = {
  analyzeResume: async (text: string, role?: string) => {
    return await apiRequest('/ai/analyze-resume', {
      method: 'POST',
      body: JSON.stringify({ text, role }),
    });
  },

  calculateATSScore: async (resumeText: string, jobDescription: string) => {
    return await apiRequest('/ai/ats-score', {
      method: 'POST',
      body: JSON.stringify({ resumeText, jobDescription }),
    });
  },

  chatCareerCoach: async (message: string, history?: { sender: string; text: string }[]) => {
    return await apiRequest('/ai/career-coach', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  },

  evaluateInterview: async (params: {
    question: string;
    idealAnswer?: string;
    userAnswer: string;
    topic?: string;
  }) => {
    return await apiRequest('/ai/evaluate-interview', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  benchmarkSkillGap: async (params: {
    currentRole?: string;
    targetRole: string;
    currentSkills: string;
    experienceYears?: string;
  }) => {
    return await apiRequest('/ai/skill-gap', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  predictSalary: async (params: {
    role: string;
    experience: string;
    location?: string;
  }) => {
    return await apiRequest('/ai/salary-prediction', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  optimizeBullet: async (params: { text: string; context?: string }) => {
    return await apiRequest('/ai/optimize-bullet', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
};

export { getToken, setToken, removeToken, getUser, setUser, removeUser };


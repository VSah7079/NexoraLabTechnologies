const API_BASE_URL = 'http://localhost:8000/api';

const ADMIN_TOKEN_KEY = 'nexoralab_admin_token';
const ADMIN_USER_KEY = 'nexoralab_admin_user';

export const getAdminToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  }
  return null;
};

export const setAdminToken = (token: string, user?: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    if (user) {
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    }
  }
};

export const removeAdminToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem('nexora_admin_token');
    localStorage.removeItem('nexora_admin_profile');
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
  }
};

export const isAdminAuthenticated = (): boolean => {
  return !!getAdminToken();
};

const adminFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAdminToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401 || res.status === 403) {
      removeAdminToken();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
      throw new Error('Session expired. Please log in again.');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (err: any) {
    console.error('Admin API error:', err);
    throw err;
  }
};

export const adminService = {
  // Auth (Supports ID & Password or Passkey)
  login: async (credentials: string | { id?: string; username?: string; email?: string; password?: string; passkey?: string; pin?: string }) => {
    const payload = typeof credentials === 'string'
      ? { passkey: credentials, pin: credentials, password: credentials }
      : credentials;

    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Authentication failed');
    }
    setAdminToken(data.token, data.admin);
    return data;
  },

  getProfile: () => adminFetch('/admin/profile'),

  updateCredentials: (payload: { username?: string; email?: string; newPassword?: string; name?: string }) =>
    adminFetch('/admin/credentials', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  logout: () => {
    removeAdminToken();
  },

  // Dashboard Stats
  getDashboardStats: () => adminFetch('/admin/dashboard-stats'),

  // Submissions Hub
  getSubmissions: (params?: { type?: string; status?: string; search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.type) query.append('type', params.type);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    return adminFetch(`/admin/submissions?${query.toString()}`);
  },

  updateSubmissionStatus: (id: string, status: string, priority?: string) =>
    adminFetch(`/admin/submissions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, priority }),
    }),

  addSubmissionNote: (id: string, text: string) =>
    adminFetch(`/admin/submissions/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),

  deleteSubmission: (id: string) =>
    adminFetch(`/admin/submissions/${id}`, {
      method: 'DELETE',
    }),

  // CMS Content
  getContent: (type: 'service' | 'services' | 'product' | 'products' | 'portfolio' | 'insight' | 'insights' | 'testimonial' | 'testimonials' | 'faq' | 'faqs' | 'section' | 'sections' | string) =>
    adminFetch(`/admin/content/${type}`),

  createContent: (type: string, payload: any) =>
    adminFetch(`/admin/content/${type}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateContent: (type: string, id: string, payload: any) =>
    adminFetch(`/admin/content/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  deleteContent: (type: string, id: string) =>
    adminFetch(`/admin/content/${type}/${id}`, {
      method: 'DELETE',
    }),

  // Site Settings
  getSettings: () => adminFetch('/admin/settings'),

  updateSettings: (settings: any) =>
    adminFetch('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  // Export CSV download URL
  getExportUrl: (type?: string) => {
    const token = getAdminToken();
    return `${API_BASE_URL}/admin/export?${type ? `type=${type}&` : ''}token=${token}`;
  },
};

const API_BASE_URL = 'http://localhost:8000/api';

export interface PublicSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  hqAddress: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
  };
  stats: {
    uptimeSLA?: string;
    productionSystems?: string;
    aiResumesProcessed?: string;
    supportAvailability?: string;
  };
}

export const contentService = {
  getContent: async (type: 'services' | 'products' | 'portfolio' | 'insights' | 'testimonials' | 'faqs' | 'sections' | string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/content/${type}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        return data.items;
      }
      return [];
    } catch (err) {
      console.warn(`Content API fallback for ${type}:`, err);
      return [];
    }
  },

  getSettings: async (): Promise<PublicSettings | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/content/meta/settings`);
      const data = await res.json();
      if (data.success && data.settings) {
        return data.settings;
      }
      return null;
    } catch (err) {
      console.warn('Settings API fallback:', err);
      return null;
    }
  },
};

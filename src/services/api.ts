import axios from 'axios';

const rawApiUrl = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://api.jaipurpropertywala.in'
).replace(/\/+$/, '');

export const BACKEND_URL = rawApiUrl.endsWith('/api')
  ? rawApiUrl.slice(0, -4)
  : rawApiUrl;

export const API_BASE_URL = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : `${rawApiUrl}/api`;

/**
 * Format image URL: Cloudinary/External URLs remain untouched,
 * relative upload paths are prefixed with the backend URL.
 */
export const formatImageUrl = (url?: string): string => {
  if (!url) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000
});

// Attach JWT token to admin requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jpw_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('jpw_admin_token');
      localStorage.removeItem('jpw_admin_user');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const propertyService = {
  getAll: (params?: Record<string, any>) => api.get('/properties', { params }),
  getFeatured: () => api.get('/properties/featured'),
  getBySlug: (slug: string) => api.get(`/properties/${slug}`),
  create: (formData: FormData) => api.post('/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id: string, formData: FormData) => api.put(`/properties/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/properties/${id}`)
};

export const enquiryService = {
  create: (data: Record<string, any>) => api.post('/enquiries', data),
  getAll: (params?: Record<string, any>) => api.get('/enquiries', { params }),
  updateStatus: (id: string, data: { status?: string; note?: string }) => api.put(`/enquiries/${id}`, data),
  delete: (id: string) => api.delete(`/enquiries/${id}`),
  exportCSV: () => `${API_BASE_URL}/enquiries/export`
};

export const careerService = {
  getActive: () => api.get('/careers'),
  getBySlug: (slug: string) => api.get(`/careers/${slug}`),
  apply: (formData: FormData) => api.post('/careers/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAllAdmin: () => api.get('/careers/admin/all'),
  create: (data: any) => api.post('/careers/admin/create', data),
  update: (id: string, data: any) => api.put(`/careers/admin/${id}`, data),
  delete: (id: string) => api.delete(`/careers/admin/${id}`),
  getApplications: (params?: any) => api.get('/careers/admin/applications', { params }),
  updateAppStatus: (id: string, data: any) => api.put(`/careers/admin/applications/${id}`, data),
  getResumeDownloadUrl: (id: string) => `${API_BASE_URL}/careers/admin/applications/${id}/resume`
};

export const galleryService = {
  getAll: (params?: { category?: string; location?: string } | string) => {
    if (typeof params === 'string') {
      return api.get('/gallery', { params: { category: params } });
    }
    return api.get('/gallery', { params });
  },
  create: (formData: FormData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/gallery/${id}`)
};

export const blogService = {
  getAll: (params?: Record<string, any>) => api.get('/blogs', { params }),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  getAllAdmin: () => api.get('/blogs/admin/all'),
  create: (data: any) => api.post('/blogs/admin', data),
  update: (id: string, data: any) => api.put(`/blogs/admin/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/admin/${id}`)
};

let locationsPromise: Promise<any> | null = null;
let locationsCache: any = null;
let locationsCacheTime = 0;
const LOCATIONS_CACHE_TTL = 5 * 60 * 1000;

export const locationService = {
  getAll: (params?: Record<string, any>, forceRefresh = false) => {
    if (params && Object.keys(params).length > 0) {
      return api.get('/locations', { params });
    }
    const now = Date.now();
    if (!forceRefresh && locationsCache && (now - locationsCacheTime < LOCATIONS_CACHE_TTL)) {
      return Promise.resolve({ data: { data: locationsCache } });
    }
    if (!forceRefresh && locationsPromise) {
      return locationsPromise;
    }
    locationsPromise = api.get('/locations')
      .then((res) => {
        locationsCache = res.data?.data;
        locationsCacheTime = Date.now();
        locationsPromise = null;
        return res;
      })
      .catch((err) => {
        locationsPromise = null;
        throw err;
      });
    return locationsPromise;
  }
};

let settingsPromise: Promise<any> | null = null;
let settingsCache: any = null;
let settingsCacheTime = 0;
const SETTINGS_CACHE_TTL = 5 * 60 * 1000;

export const settingsService = {
  getSettings: (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && settingsCache && (now - settingsCacheTime < SETTINGS_CACHE_TTL)) {
      return Promise.resolve({ data: { data: settingsCache } });
    }
    if (!forceRefresh && settingsPromise) {
      return settingsPromise;
    }
    settingsPromise = api.get('/settings')
      .then((res) => {
        settingsCache = res.data?.data;
        settingsCacheTime = Date.now();
        settingsPromise = null;
        return res;
      })
      .catch((err) => {
        settingsPromise = null;
        throw err;
      });
    return settingsPromise;
  },
  clearCache: () => {
    settingsCache = null;
    settingsPromise = null;
    settingsCacheTime = 0;
  }
};

export const adminService = {
  login: (credentials: { email: string; password: string }) => api.post('/admin/auth/login', credentials),
  getProfile: () => api.get('/admin/auth/me'),
  getStats: () => api.get('/admin/stats'),
  getSettings: () => api.get('/settings'),
  updateSettings: (data: any) => api.put('/admin/settings', data)
};

export default api;


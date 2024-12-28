import api from './api';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', { email, password });
    return data;
  }
};
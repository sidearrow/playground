import { apiClient } from 'api/apiClient';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem('token');
  },
  async login(mail: string, password: string): Promise<boolean> {
    try {
      const { token } = await apiClient.login(mail, password);
      localStorage.setItem('token', token);
      return true;
    } catch {
      return false;
    }
  },
  async isLogin(): Promise<boolean> {
    try {
      await apiClient.isLogin();
      return true;
    } catch {
      return false;
    }
  },
};

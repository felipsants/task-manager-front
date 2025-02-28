import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('auth_token'),
  }),
  actions: {
    login(token) {
      localStorage.setItem('auth_token', token);
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      this.isAuthenticated = false;
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('auth_token');
    }
  }
});

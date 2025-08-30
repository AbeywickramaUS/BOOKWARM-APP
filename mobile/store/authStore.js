import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,  
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  register: async ({ username, email, password }) => { // Fix: destructure the object parameter
    set({ isLoading: true });
    try {
      const response = await fetch('${API_URL}/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message || 'Registration failed' };
    }
  },

  login: async ({ email, password }) => { // Fix: destructure the object parameter
    set({ isLoading: true });
    try {
      const response = await fetch('${API_URL}/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message || 'Login failed' };
    }
  },

  checkAuth: async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      const user = userJson ? JSON.parse(userJson) : null;
      if (user && token) {
        set({ user, token });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  },

  logout: async () => {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null });
    },
}));


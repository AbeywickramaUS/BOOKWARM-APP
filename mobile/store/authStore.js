import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,  
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  register: async ({ username, email, password }) => { // Fix: destructure the object parameter
    set({ isLoading: true });
    try {
      const response = await fetch('https://localhost:3000/BOOKWARM-APP.com/api/register', {
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
}));


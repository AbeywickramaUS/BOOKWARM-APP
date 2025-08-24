import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,  
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      const response = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      set({ isLoading: false });
      // You may want to handle successful registration here
    } catch (error) {
      set({ isLoading: false });
      console.error('Registration failed:', error);
    }
  },
}));


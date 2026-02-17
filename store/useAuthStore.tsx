import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email) =>
                set({
                    user: { id: 'user-1', email, name: 'Intern User' },
                    isAuthenticated: true,
                }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

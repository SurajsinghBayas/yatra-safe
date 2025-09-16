import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role, User } from "@/lib/auth";

type AuthState = {
	user: User | null;
	isAuthenticated: boolean;
	login: (name: string, role: Role) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			login: (name, role) =>
				set({
					user: {
						id: Math.random().toString(36).slice(2),
						name,
						role,
					},
					isAuthenticated: true,
				}),
			logout: () => set({ user: null, isAuthenticated: false }),
		}),
		{ name: "auth-store" }
	)
);



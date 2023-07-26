import { vanApi } from "~/utils/api";
import { unknown } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Account = {
    rank: "admin" | "user";
    id: number;
    username: string;
    password: string;
    ip: string | null;
    createdAt: Date;
};

interface AuthState {
    isAuthenticated: boolean;
    user: null | Account;
    actions: {
        login: (username: string, password: string) => Promise<void | Error>;
        register: (username: string, password: string) => Promise<void | Error>;
        logout: () => void;
    };
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => {
            return {
                isAuthenticated: false,
                user: null,
                actions: {
                    login: async (username, password) => {
                        try {
                            const user = await vanApi.user.login.mutate({
                                username,
                                password,
                            });
                            console.log("Login", username, password, user);
                            set(() => ({
                                user,
                                isAuthenticated: true,
                            }));
                        } catch (err) {
                            if (err instanceof Error) {
                                throw new Error(err.message, {
                                    cause: err.cause || unknown,
                                });
                            }
                        }
                    },
                    register: async (username, password) => {
                        console.log("Register");
                        try {
                            const user = await vanApi.user.register.mutate({
                                username,
                                password,
                            });
                            console.log("Register", username, password, user);
                            set(() => ({
                                user,
                                isAuthenticated: true,
                            }));
                        } catch (err) {
                            if (err instanceof Error) {
                                throw new Error(err.message, {
                                    cause: err.cause || unknown,
                                });
                            }
                        }
                    },
                    logout: () => {
                        console.log("Logout!!");

                        set(() => ({ isAuthenticated: false, user: null }));
                    },
                },
            };
        },
        {
            name: "auth",
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !["actions"].includes(key))
                ),
        }
    )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Account = {
  rank: "admin" | "user";
  id: number;
  username: string;
  password: string;
  ip: string | null;
  createdAt: Date;
};

interface authStore {
  session: Account | null;
  setSession: (session: Account | null) => void;
}

export const authStore = create<authStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set(() => ({ session: session })),
    }),
    {
      name: "auth-storage",
    }
  )
);

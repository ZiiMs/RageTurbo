"use client";

import { authStore } from "~/stores/authStore";
import { useAsyncStore } from "~/stores/useStore";
import Register from "./register";

export default function Home() {
  const session = useAsyncStore(authStore, (state) => state.session);

  if (session === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-base">
      <Register />
    </div>
  );
}

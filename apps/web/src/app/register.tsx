"use client";

import { authStore } from "~/stores/authStore";
import { useStore } from "~/stores/useStore";
import { api } from "~/utils/api";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const session = useStore(authStore, (state) => state.session);
  const setSession = authStore((state) => state.setSession);
  // const setSession = useStore(authStore, (state) => state.setSession);

  const { mutate } = api.user.register.useMutation({
    onError: (err) => {
      console.warn("IsThisLogging ", err);
      setError(err.message);
    },
    onSuccess: (res) => {
      console.log("Succes?", res);
      if (res !== null) {
        setSession({
          id: res.id,
          username: res.username,
          password: res.password,
          ip: res.ip,
          createdAt: res.createdAt,
          rank: res.rank,
        });
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-base">
      {session ? (
        <div>
          <span>This is working? {session.username}</span>
        </div>
      ) : null}
      <span className="text-3xl text-basercontent-2 font-bold">Register</span>
      <input
        className="flex rounded-md border text-input-content border-line bg-input py-2 px-3 text-sm placeholder:text-input-content-2/25 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-line-focus focus:ring-offset-2 focus:ring-offset-secondary focus-visible"
        value={username}
        placeholder="Username"
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
        }}
      />
      <input
        className="flex rounded-md border text-input-content border-line bg-input py-2 px-3 text-sm placeholder:text-input-content-2/25 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-line-focus focus:ring-offset-2 focus:ring-offset-secondary"
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
      />
      <button
        className="w-fit items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-line focus:ring-offset-2 bg-primary text-primary-content hover:bg-primary-focus h-10 py-2 px-4"
        onClick={(e) => {
          e.preventDefault();
          mutate({
            username: username,
            password: password,
          });
          console.log("Sending");
        }}
      >
        Submit
      </button>
      {error ? (
        <div className="bg-error rounded p-2">
          <span className="text-white p-2 font-semibold">{error}</span>
        </div>
      ) : null}
    </div>
  );
}

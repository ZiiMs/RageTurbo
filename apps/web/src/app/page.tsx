"use client";

import { useAuthStore } from "~/stores/authStore";
import { useAsyncStore } from "~/stores/useStore";
import { api } from "~/utils/api";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const user = useAsyncStore(useAuthStore, (state) => state.user);

  const actions = useAuthStore((state) => state.actions);
  const { data } = api.user.get.useQuery();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-base">
      {user === null ? (
        <div className="flex flex-col">
          {showLogin ? (
            <div>
              <Login />
              <span>
                Don't have an account?{" "}
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLogin(false);
                  }}
                >
                  Click here to register.
                </button>
              </span>
            </div>
          ) : (
            <div>
              <Register />
              <span>
                Already have an account?{" "}
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLogin(true);
                  }}
                >
                  Click here to login.
                </button>
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <span>You are signed in! Attempting to fetch for testing</span>
          <span>{data}</span>
          <button
            onClick={() => {
              actions.logout();
            }}
          >
            Logout!
          </button>
        </div>
      )}
    </div>
  );
}

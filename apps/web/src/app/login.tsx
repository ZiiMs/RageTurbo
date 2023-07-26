"use client";

import { useAuthStore } from "~/stores/authStore";
import { useStore } from "~/stores/useStore";
import aes from "crypto-js/aes";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const user = useStore(useAuthStore, (state) => state.user);
    const actions = useAuthStore((state) => state.actions);

    if (actions.login === undefined) {
        return <div>Loading actions</div>;
    }
    // const setSession = useStore(authStore, (state) => state.setSession);

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-2 bg-base">
            {user ? (
                <div>
                    <span>This is working? {user.username}</span>
                </div>
            ) : null}
            <span className="text-3xl text-basercontent-2 font-bold">Login</span>
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
                    const nonce = crypto.randomUUID();
                    const hashedPass = aes.encrypt(password, nonce).toString();

                    actions
                        .login(username, nonce + hashedPass)
                        .then(() => {
                            setError(null);
                        })
                        .catch((err: Error) => {
                            console.error("Inside Login", err);
                            setError(err.message);
                        });
                    console.log("Sending");
                }}
            >
                Login
            </button>
            {error ? (
                <div className="bg-red-800 rounded p-3 flex-col flex">
                    <span className="text-white  font-bold text-lg pb-2">Error:</span>
                    <span className="text-white  font-normal">{error}</span>
                </div>
            ) : null}
        </div>
    );
}

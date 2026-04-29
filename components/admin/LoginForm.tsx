"use client";

import { FormEvent, useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setPending(false);

    if (!response.ok) {
      setError("Invalid admin credentials.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form className="admin-auth-card" onSubmit={handleSubmit}>
      <div>
        <p className="admin-kicker">Admin Access</p>
        <h1>Sign in to manage case studies and blogs.</h1>
      </div>
      <label className="admin-field">
        <span>Username</span>
        <input value={username} onChange={(event) => setUsername(event.target.value)} required />
      </label>
      <label className="admin-field">
        <span>Password</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      {error ? <p className="admin-error">{error}</p> : null}
      <button className="button button--primary" type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { collect, setUser } from "./collect";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUser(email);
    collect(mode === "signup" ? "sign_up" : "log_in", { method: "password" });
    router.push("/dashboard");
  }

  return (
    <main style={{ maxWidth: 460, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#6366f1" }} />
        <strong style={{ fontSize: 18, letterSpacing: "-0.02em" }}>Northbank</strong>
      </div>

      <h1 style={{ fontSize: 30, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 10px" }}>
        The workspace where projects actually ship.
      </h1>
      <p style={{ color: "#9aa0aa", margin: "0 0 32px", fontSize: 15 }}>
        Plan work, assign tasks, and keep every team moving in one place.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={primaryBtn}>
          {mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        style={{ marginTop: 18, background: "none", border: 0, color: "#8b90f5", cursor: "pointer", fontSize: 14 }}
      >
        {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}
      </button>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #262a33",
  background: "#161922",
  color: "#e8e9ec",
  fontSize: 15,
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: 0,
  background: "#6366f1",
  color: "#fff",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};

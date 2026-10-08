"use client";

import { useState } from "react";
import { collect } from "../collect";

type Task = { id: number; title: string; project: string; done: boolean };

const SEED: Task[] = [
  { id: 1, title: "Draft Q3 launch brief", project: "Marketing", done: false },
  { id: 2, title: "Ship onboarding redesign", project: "Product", done: false },
  { id: 3, title: "Close design review", project: "Product", done: true },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("Product");

  function createTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const task = { id: Date.now(), title: title.trim(), project, done: false };
    setTasks((t) => [task, ...t]);
    collect("create_task", { project: task.project });
    setTitle("");
  }

  function toggleTask(id: number) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
    const task = tasks.find((x) => x.id === id);
    if (task && !task.done) collect("complete_task", { task_id: id, project: task.project });
  }

  function inviteMember() {
    collect("invite_member", { source: "dashboard_header" });
    alert("Invite link copied.");
  }

  function upgradePlan() {
    collect("upgrade_plan", { plan: "pro" });
    alert("Redirecting to billing…");
  }

  const open = tasks.filter((t) => !t.done).length;

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: "#6366f1" }} />
          <strong style={{ letterSpacing: "-0.02em" }}>Northbank</strong>
          <span style={{ color: "#6b7080", fontSize: 14 }}>· {open} open tasks</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={inviteMember} style={ghostBtn}>Invite</button>
          <button onClick={upgradePlan} style={primaryBtn}>Upgrade</button>
        </div>
      </header>

      <form onSubmit={createTask} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <input
          placeholder="Add a task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <select value={project} onChange={(e) => setProject(e.target.value)} style={inputStyle}>
          <option>Product</option>
          <option>Marketing</option>
          <option>Engineering</option>
        </select>
        <button type="submit" style={primaryBtn}>Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {tasks.map((t) => (
          <li key={t.id} style={row}>
            <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
              <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#6b7080" : "#e8e9ec" }}>
                {t.title}
              </span>
            </label>
            <span style={{ color: "#6b7080", fontSize: 13 }}>{t.project}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 9,
  border: "1px solid #262a33",
  background: "#161922",
  color: "#e8e9ec",
  fontSize: 14,
};

const primaryBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 9,
  border: 0,
  background: "#6366f1",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 9,
  border: "1px solid #262a33",
  background: "transparent",
  color: "#e8e9ec",
  fontSize: 14,
  cursor: "pointer",
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #1e222b",
  background: "#13161d",
};

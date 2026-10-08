// First-party event collection. Events are posted to /api/events and end up in the warehouse.
function anonymousId(): string {
  if (typeof window === "undefined") return "server";
  const k = "northbank.anon";
  let id = window.localStorage.getItem(k);
  if (!id) {
    id = "anon_" + Math.random().toString(36).slice(2, 12);
    window.localStorage.setItem(k, id);
  }
  return id;
}

let currentUser: string | null = null;

export function setUser(userId: string) {
  currentUser = userId;
}

export function collect(event: string, properties: Record<string, unknown> = {}) {
  const payload = JSON.stringify({ event, userId: currentUser, anonymousId: anonymousId(), properties });
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
  } else {
    void fetch("/api/events", { method: "POST", body: payload, headers: { "content-type": "application/json" }, keepalive: true });
  }
}

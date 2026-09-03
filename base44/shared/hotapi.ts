import { secrets } from "base44:runtime";

const BASE = "https://api.hotapi.ai/v1";
const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

function authHeaders() {
  const key = secrets.get("HOTAPI_API_KEY");
  if (!key) throw new Error("Chave da HotAPI não configurada (HOTAPI_API_KEY).");
  return { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" };
}

function errorMessage(res, fallback) {
  return res?.error?.message || (res?.error?.type ? `HotAPI: ${res.error.type}` : fallback);
}

export async function createTask(modelPath, body) {
  const res = await fetch(`${BASE}/${modelPath}`, {
    method: "POST",
    headers: { ...authHeaders(), "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(errorMessage(json, `HotAPI ${res.status}`));
  if (!json.id) throw new Error("HotAPI não retornou o id da tarefa.");
  return json;
}

export async function pollTask(id, deadlineMs = 100000, intervalMs = 2500) {
  const start = Date.now();
  let backoff = intervalMs;
  while (Date.now() - start < deadlineMs) {
    const res = await fetch(`${BASE}/tasks/${id}`, { headers: { "Authorization": `Bearer ${secrets.get("HOTAPI_API_KEY")}` } });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(errorMessage(json, `HotAPI ${res.status}`));
    if (TERMINAL.has(json.status)) return json;
    await new Promise((r) => setTimeout(r, backoff));
    backoff = Math.min(backoff + 1000, 5000);
  }
  return null;
}

export function firstAssetUrl(task) {
  const assets = task?.output?.assets;
  if (Array.isArray(assets) && assets.length && assets[0].url) return assets[0].url;
  throw new Error(task?.error?.message || "HotAPI: nenhum arquivo retornado pela tarefa.");
}
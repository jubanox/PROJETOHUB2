import { secrets } from 'base44:runtime';

const BASE = 'https://queue.fal.run';
const FAIL_STATUSES = new Set(['FAILED', 'ERROR', 'FAILURE']);

function authHeaders(): Record<string, string> {
  const key = secrets.get('FAL_KEY');
  if (!key) throw new Error('FAL_KEY não configurada.');
  return {
    Authorization: `Key ${key}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function readError(res: Response): Promise<string> {
  try {
    const j = await res.json();
    return j?.message || j?.error?.message || j?.error || j?.detail || `Erro ${res.status}`;
  } catch {
    return `Erro ${res.status}`;
  }
}

function resolve(url: string): string {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `${BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function submit(modelId: string, input: Record<string, unknown>) {
  const res = await fetch(`${BASE}/${modelId.replace(/^\/+/, '')}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Fal.ai submissão: ${await readError(res)}`);
  return await res.json();
}

export async function runQueue(
  modelId: string,
  input: Record<string, unknown>,
  timeoutMs = 180000,
): Promise<any> {
  const submitted = await submit(modelId, input);
  const statusUrl = resolve(submitted.status_url);
  const responseUrl = resolve(submitted.response_url);
  const deadline = Date.now() + timeoutMs;
  let delay = 2000;
  let completed = false;

  while (Date.now() < deadline) {
    const sres = await fetch(statusUrl, { headers: authHeaders() });
    if (sres.ok) {
      const sj = await sres.json();
      const status = String(sj.status || '');
      if (status === 'COMPLETED') {
        completed = true;
        break;
      }
      if (FAIL_STATUSES.has(status)) throw new Error('A geração falhou no provedor Fal.ai.');
    } else if (sres.status === 404) {
      throw new Error('Tarefa não encontrada na Fal.ai.');
    }
    await new Promise((r) => setTimeout(r, delay));
    delay = Math.min(Math.round(delay * 1.4), 6000);
  }

  if (!completed) return null;
  const rres = await fetch(responseUrl, { headers: authHeaders() });
  if (!rres.ok) throw new Error(`Fal.ai resultado: ${await readError(rres)}`);
  return await rres.json();
}

export function firstImageFile(output: any): string {
  const img = output?.images?.[0] ?? output?.image;
  const url = img?.url;
  if (typeof url !== 'string' || !url) throw new Error('Falha ao obter a imagem gerada.');
  return url;
}

export function videoFile(output: any): string {
  const url = output?.video?.url ?? output?.videos?.[0]?.url;
  if (typeof url !== 'string' || !url) throw new Error('Falha ao obter o vídeo gerado.');
  return url;
}
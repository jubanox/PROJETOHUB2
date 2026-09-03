import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { createTask, pollTask, firstAssetUrl } from '../../shared/hotapi.ts';
import { runQueue, videoFile } from '../../shared/fal.ts';

const RESOLUTIONS = new Set(['480p', '720p']);
const FAL_MODEL = 'fal-ai/minimax/hailuo-02/standard/text-to-video';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Não autorizado' }, { status: 401 });

    const { prompt, resolution = '720p', duration = 5, provider = 'hotapi' } = await req.json();
    if (typeof prompt !== 'string' || prompt.trim().length < 3 || prompt.length > 1000) {
      return Response.json({ error: 'O prompt deve ter entre 3 e 1000 caracteres.' }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();

    if (provider === 'fal') {
      const falDuration = Number(duration) >= 8 ? '10' : '6';
      const output = await runQueue(FAL_MODEL, {
        prompt: cleanPrompt,
        duration: falDuration,
        prompt_optimizer: true,
      }, 240000);
      if (!output) return Response.json({ error: 'O vídeo ainda está sendo processado. Tente novamente em instantes.' }, { status: 504 });
      return Response.json({ url: videoFile(output) });
    }

    if (!RESOLUTIONS.has(resolution)) return Response.json({ error: 'Resolução inválida.' }, { status: 400 });
    if (!Number.isInteger(duration) || duration < 4 || duration > 15) {
      return Response.json({ error: 'Duração deve estar entre 4 e 15 segundos.' }, { status: 400 });
    }

    const task = await createTask('seedance-2.0-fast-spicy/text-to-video', {
      prompt: cleanPrompt, duration_seconds: duration, resolution, generate_audio: false,
    });
    const done = await pollTask(task.id, 110000);
    if (!done) return Response.json({ error: 'O vídeo ainda está sendo processado. Tente novamente em instantes.' }, { status: 504 });
    if (done.status !== 'succeeded') return Response.json({ error: done?.error?.message || 'Falha ao gerar vídeo.' }, { status: 502 });

    return Response.json({ url: firstAssetUrl(done) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Falha ao gerar vídeo.' }, { status: 500 });
  }
}
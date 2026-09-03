import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { createTask, pollTask, firstAssetUrl } from '../../shared/hotapi.ts';
import { runQueue, firstImageFile } from '../../shared/fal.ts';

const SIZES = { '1:1': [1024, 1024], '16:9': [1024, 576], '9:16': [576, 1024] };
const FAL_MODEL = 'fal-ai/flux/schnell';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Não autorizado' }, { status: 401 });

    const { prompt, aspectRatio = '1:1', provider = 'hotapi' } = await req.json();
    if (typeof prompt !== 'string' || prompt.trim().length < 3 || prompt.length > 1000) {
      return Response.json({ error: 'O prompt deve ter entre 3 e 1000 caracteres.' }, { status: 400 });
    }
    if (!Object.prototype.hasOwnProperty.call(SIZES, aspectRatio)) {
      return Response.json({ error: 'Formato inválido.' }, { status: 400 });
    }

    const [width, height] = SIZES[aspectRatio as keyof typeof SIZES];
    const cleanPrompt = prompt.trim();

    if (provider === 'fal') {
      const output = await runQueue(FAL_MODEL, {
        prompt: cleanPrompt,
        image_size: { width, height },
        num_images: 1,
        output_format: 'png',
      }, 120000);
      if (!output) return Response.json({ error: 'A imagem ainda está sendo processada. Tente novamente em instantes.' }, { status: 504 });
      return Response.json({ url: firstImageFile(output) });
    }

    const task = await createTask('z-image-spicy', { prompt: cleanPrompt, width, height });
    const done = await pollTask(task.id, 90000);
    if (!done) return Response.json({ error: 'A imagem ainda está sendo processada. Tente novamente em instantes.' }, { status: 504 });
    if (done.status !== 'succeeded') return Response.json({ error: done?.error?.message || 'Falha ao gerar imagem.' }, { status: 502 });

    return Response.json({ url: firstAssetUrl(done) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Falha ao gerar imagem.' }, { status: 500 });
  }
}
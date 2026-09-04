import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, ImageIcon, Video, Clock3 } from 'lucide-react';
import SettingsSelect from '@/components/studio/SettingsSelect';
import ResultPreview from '@/components/studio/ResultPreview';
import RecentsGrid from '@/components/studio/RecentsGrid';

export default function GeneratorStudio({ kind = 'image' }) {
  const isVideo = kind === 'video';

  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState(isVideo ? '720p' : '1:1');
  const [duration, setDuration] = useState(4);
  const [provider, setProvider] = useState('hotapi');

  const [result, setResult] = useState(null);
  const [recents, setRecents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async (event) => {
    event.preventDefault();

    if (prompt.trim().length < 3) {
      setError('Descreva o que você deseja criar.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const functionName = isVideo
        ? 'generateAiVideo'
        : 'generateAiImage';

      const payload = isVideo
        ? {
            prompt: prompt.trim(),
            resolution: format,
            duration,
            provider,
          }
        : {
            prompt: prompt.trim(),
            aspectRatio: format,
            provider,
          };

      const response = await base44.functions.invoke(
        functionName,
        payload
      );

      const url = response?.data?.url;

      if (!url) {
        throw new Error(
          response?.data?.error ||
          'A API não retornou uma URL para a mídia.'
        );
      }

      setResult(url);

     setRecents((previous) => [
  {
    id: Date.now(),
    type: kind,
    url,
    prompt: prompt.trim(),
  },
  ...previous,
].slice(0, 4));

    } catch (err) {
      console.error('Erro ao gerar mídia:', err);

      setError(
        err?.response?.data?.error ||
        err?.message ||
        'Não foi possível concluir a geração. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Título */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          {isVideo ? (
            <Video size={18} className="text-red-500" />
          ) : (
            <ImageIcon size={18} className="text-red-500" />
          )}

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            Criar conteúdo
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Transforme sua ideia em {isVideo ? 'vídeo' : 'imagem'}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Descreva o que você deseja criar e deixe a inteligência
          artificial fazer o resto.
        </p>
      </div>

      {/* Área principal */}
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">

        {/* Painel de criação */}
        <form
          onSubmit={generate}
          className="rounded-3xl border border-white/[0.08] bg-[#090909] p-5 shadow-2xl shadow-black/30 sm:p-6"
        >

          {/* Prompt */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-200">
                Seu prompt
              </label>

              <span className="text-[11px] text-zinc-700">
                {prompt.length}/1000
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={1000}
              rows={9}
              placeholder={
                isVideo
                  ? 'Descreva a cena, movimento, ambiente, iluminação e estilo do vídeo...'
                  : 'Descreva detalhadamente a imagem que você deseja criar...'
              }
              className="w-full resize-none rounded-2xl border border-white/[0.08] bg-black/60 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/5"
            />
          </div>

          {/* Configurações */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <SettingsSelect
              label="Modelo"
              value={provider}
              onChange={setProvider}
              options={[
                { value: 'hotapi', label: 'HotAPI' },
                { value: 'fal', label: 'Fal.ai' },
              ]}
            />

            <SettingsSelect
              label={isVideo ? 'Resolução' : 'Formato'}
              value={format}
              onChange={setFormat}
              options={
                isVideo
                  ? [
                      { value: '720p', label: '720p' },
                      { value: '480p', label: '480p' },
                    ]
                  : [
                      { value: '1:1', label: 'Quadrado · 1:1' },
                      { value: '16:9', label: 'Paisagem · 16:9' },
                      { value: '9:16', label: 'Vertical · 9:16' },
                    ]
              }
            />

            {isVideo && (
              <SettingsSelect
                label="Duração"
                value={duration}
                onChange={setDuration}
                options={[
                  { value: 4, label: '4 segundos' },
                  { value: 6, label: '6 segundos' },
                  { value: 8, label: '8 segundos' },
                ]}
              />
            )}
          </div>

          {/* Informações */}
          <div className="mt-5 flex items-center gap-2 text-[11px] text-zinc-600">
            <Clock3 size={13} />

            {isVideo
              ? `Vídeos usam créditos conforme a duração de ${duration}s.`
              : 'A geração pode levar alguns instantes.'}
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading || prompt.trim().length < 3}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Sparkles size={17} />

            {loading
              ? 'Criando...'
              : `Gerar ${isVideo ? 'vídeo' : 'imagem'}`}
          </button>

        </form>

        {/* Resultado */}
        <ResultPreview
          kind={kind}
          url={result}
          loading={loading}
          error={error}
        />

      </div>

      {/* Recentes */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Criações recentes
            </h2>

            <p className="mt-1 text-xs text-zinc-600">
              Seus últimos conteúdos gerados nesta sessão.
            </p>
          </div>
        </div>

        <RecentsGrid items={recents} />
      </div>

    </div>
  );
}
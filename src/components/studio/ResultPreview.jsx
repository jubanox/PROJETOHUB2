import { Download, ImageIcon, LoaderCircle, Sparkles, Video } from 'lucide-react';

export default function ResultPreview({ kind, url, loading, error }) {
  const isVideo = kind === 'video';

  return (
    <section className="relative min-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-[#080808] shadow-2xl shadow-black/40">
      
      {/* Glow vermelho */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

      {/* Cabeçalho */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Resultado
          </p>

          <h3 className="mt-1 text-sm font-semibold text-white">
            {url ? 'Criação concluída' : 'Pré-visualização'}
          </h3>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
          {isVideo ? (
            <Video size={15} className="text-red-500" />
          ) : (
            <ImageIcon size={15} className="text-red-500" />
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative flex min-h-[430px] items-center justify-center p-4 sm:p-6">

        {/* Loading */}
        {loading && (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5">
              <LoaderCircle
                size={28}
                className="animate-spin text-red-500"
              />
            </div>

            <p className="text-sm font-medium text-zinc-200">
              Criando sua {isVideo ? 'vídeo' : 'imagem'}...
            </p>

            <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-600">
              A inteligência artificial está processando sua criação.
              Isso pode levar alguns instantes.
            </p>
          </div>
        )}

        {/* Erro */}
        {!loading && error && (
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5">
              <span className="text-xl text-red-500">!</span>
            </div>

            <p className="text-sm font-medium text-red-400">
              Não foi possível gerar
            </p>

            <p className="mt-2 text-xs leading-5 text-zinc-600">
              {error}
            </p>
          </div>
        )}

        {/* Resultado */}
        {!loading && !error && url && (
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              {isVideo ? (
                <video
                  src={url}
                  controls
                  playsInline
                  className="mx-auto max-h-[470px] w-full object-contain"
                />
              ) : (
                <img
                  src={url}
                  alt="Imagem gerada por IA"
                  className="mx-auto max-h-[470px] w-full object-contain"
                />
              )}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm font-medium text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-white"
            >
              <Download size={16} />
              Abrir para baixar
            </a>
          </div>
        )}

        {/* Estado vazio */}
        {!loading && !error && !url && (
          <div className="max-w-xs text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
              <Sparkles size={25} className="text-zinc-700" />
            </div>

            <p className="text-sm font-medium text-zinc-500">
              Sua criação aparecerá aqui
            </p>

            <p className="mt-2 text-xs leading-5 text-zinc-700">
              Escreva um prompt, escolha as configurações e clique em
              <span className="text-zinc-500"> Gerar</span>.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
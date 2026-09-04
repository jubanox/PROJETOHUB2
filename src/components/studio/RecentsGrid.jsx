import { Clock3, ImageIcon, Video, ExternalLink } from 'lucide-react';

export default function RecentsGrid({ items = [], onSelect }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500">
            Biblioteca
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Criações recentes
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <Clock3 size={14} />
          Esta sessão
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0c0c0c] px-6 py-14 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
            <ImageIcon size={20} className="text-zinc-700" />
          </div>

          <p className="text-sm font-medium text-zinc-500">
            Nenhuma criação ainda
          </p>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-700">
            As imagens e vídeos que você gerar aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item) => {
            const isVideo = item.kind === 'video' || item.type === 'video';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect?.(item)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] text-left transition duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20"
              >
                {isVideo ? (
                  <video
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt="Criação recente"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

                {/* Gradiente */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3 pt-14">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    {isVideo ? (
                      <Video size={12} className="text-red-500" />
                    ) : (
                      <ImageIcon size={12} className="text-red-500" />
                    )}

                    {isVideo ? 'Vídeo' : 'Imagem'}
                  </div>
                </div>

                {/* Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                  <div className="scale-75 rounded-full border border-white/10 bg-black/70 p-3 opacity-0 backdrop-blur transition group-hover:scale-100 group-hover:opacity-100">
                    <ExternalLink
                      size={16}
                      className="text-white"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
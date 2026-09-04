import {
  Clapperboard,
  Clock3,
  FolderOpen,
  Heart,
  ImageIcon,
  Settings,
  Video,
  WandSparkles,
} from 'lucide-react';

export default function StudioSidebar({ kind, setKind }) {
  const menu = [
    {
      label: 'Criar',
      icon: WandSparkles,
      action: () => setKind('image'),
      active: true,
    },
    {
      label: 'Imagens',
      icon: ImageIcon,
      action: () => setKind('image'),
      active: kind === 'image',
    },
    {
      label: 'Vídeos',
      icon: Video,
      action: () => setKind('video'),
      active: kind === 'video',
    },
  ];

  const library = [
    {
      label: 'Biblioteca',
      icon: FolderOpen,
    },
    {
      label: 'Histórico',
      icon: Clock3,
    },
    {
      label: 'Favoritos',
      icon: Heart,
    },
  ];

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-white/[0.07] bg-[#080808] lg:block">
      <div className="sticky top-16 flex h-[calc(100vh-64px)] flex-col px-3 py-5">

        {/* STUDIO */}
        <div className="mb-8">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            Studio
          </div>

          <nav className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.label === 'Criar'
                  ? true
                  : item.active;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
                    isActive
                      ? 'bg-red-500/10 text-white'
                      : 'text-zinc-500 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-red-500" />
                  )}

                  <Icon
                    size={18}
                    className={
                      isActive
                        ? 'text-red-500'
                        : 'text-zinc-600 group-hover:text-zinc-300'
                    }
                  />

                  <span className="font-medium">
                    {item.label}
                  </span>

                  {item.label === 'Criar' && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BIBLIOTECA */}
        <div>
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            Biblioteca
          </div>

          <nav className="space-y-1">
            {library.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-500 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <Icon
                    size={18}
                    className="text-zinc-600 transition group-hover:text-zinc-300"
                  />

                  <span>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ESPAÇO */}
        <div className="flex-1" />

        {/* CRÉDITOS */}
        <div className="mb-3 rounded-2xl border border-red-500/10 bg-gradient-to-br from-red-500/[0.06] to-transparent p-4">

          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/10">
              <Clapperboard
                size={14}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-zinc-300">
                Seus créditos
              </p>

              <p className="text-[10px] text-zinc-700">
                Plano atual
              </p>
            </div>
          </div>

          <div className="mb-2 flex items-end justify-between">
            <span className="text-2xl font-bold tracking-tight text-white">
              120
            </span>

            <span className="mb-1 text-[10px] text-zinc-600">
              créditos
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-red-700 to-red-500" />
          </div>

          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-red-500/20 bg-red-500/[0.03] py-2 text-xs font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            Comprar créditos
          </button>
        </div>

        {/* CONFIGURAÇÕES */}
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-500 transition hover:bg-white/[0.04] hover:text-white"
        >
          <Settings
            size={18}
            className="text-zinc-600 transition group-hover:text-zinc-300"
          />

          <span>
            Configurações
          </span>
        </button>

      </div>
    </aside>
  );
}
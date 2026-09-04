import { Bell, CircleUserRound, CreditCard, Sparkles } from 'lucide-react';

export default function StudioTopBar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-950/40">
            <Sparkles size={18} className="text-white" />
          </div>

          <div className="leading-none">
            <div className="text-lg font-black tracking-tight text-white">
              HUB
            </div>

            <div className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600 sm:block">
              AI CREATIVE STUDIO
            </div>
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* CRÉDITOS */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-red-500/30 hover:bg-red-500/5"
          >
            <CreditCard size={15} className="text-red-500" />

            <div className="hidden text-left sm:block">
              <div className="text-[10px] uppercase tracking-wider text-zinc-600">
                Créditos
              </div>

              <div className="text-xs font-semibold text-white">
                120
              </div>
            </div>

            <span className="text-xs font-semibold text-white sm:hidden">
              120
            </span>
          </button>

          {/* NOTIFICAÇÕES */}
          <button
            type="button"
            aria-label="Notificações"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-500 transition hover:border-white/20 hover:text-white"
          >
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* PERFIL */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-500 transition hover:border-red-500/30 hover:text-white"
            aria-label="Perfil"
          >
            <CircleUserRound size={19} />
          </button>

        </div>
      </div>
    </header>
  );
}
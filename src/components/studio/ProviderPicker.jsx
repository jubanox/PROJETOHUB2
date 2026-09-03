import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const PROVIDERS = [
  { id: 'hotapi', label: 'HotAPI' },
  { id: 'fal', label: 'Fal.ai' },
  { id: 'crebots', label: 'Crebots' },
];

export default function ProviderPicker({ provider, setProvider }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current =
    PROVIDERS.find((p) => p.id === provider) || PROVIDERS[0];

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () =>
      document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div>
      <div className="mb-2 text-xs font-medium text-slate-400">
        Provedor de IA
      </div>

      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-medium text-white transition hover:border-violet-400/50"
        >
          <span>{current.label}</span>

          <ChevronDown
            size={18}
            className={`text-slate-400 transition ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setProvider(p.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-sm text-white transition hover:bg-violet-500/15"
              >
                <span>{p.label}</span>

                {provider === p.id && (
                  <Check
                    size={16}
                    className="text-violet-400"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { Sparkles } from 'lucide-react';

export default function StudioHeader() {
  return (
    <header className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20"><Sparkles size={21} /></span>
        <div><p className="text-lg font-semibold tracking-tight text-white">Luma Studio</p><p className="text-xs text-slate-500">Criação com inteligência artificial</p></div>
      </div>
      <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 sm:block">Estúdio criativo</span>
    </header>
  );
}
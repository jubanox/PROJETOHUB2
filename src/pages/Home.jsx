import StudioHeader from '@/components/studio/StudioHeader';
import GeneratorStudio from '@/components/studio/GeneratorStudio';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090f] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.1),transparent_32%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8"><StudioHeader /><div className="mb-8 max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-violet-400">Imagine. Descreva. Crie.</p><h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Transforme palavras em <span className="text-slate-500">imagens e vídeos.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Dê forma às suas ideias com prompts detalhados e geração por inteligência artificial.</p></div><GeneratorStudio /></div>
    </main>
  );
}
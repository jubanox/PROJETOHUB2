import { useState } from 'react';
import {
  ImageIcon,
  Video,
  History,
  Heart,
  Settings,
  Sparkles,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

import { base44 } from '@/api/base44Client';
import PromptForm from '@/components/studio/PromptForm';
import ResultPreview from '@/components/studio/ResultPreview';

export default function GeneratorStudio() {
  const [kind, setKind] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState('1:1');
  const [duration, setDuration] = useState(4);
  const [provider, setProvider] = useState('hotapi');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [mobileMenu, setMobileMenu] = useState(false);

  const changeKind = (next) => {
    setKind(next);
    setFormat(next === 'video' ? '720p' : '1:1');
    setResult(null);
    setError('');
  };

  const generate = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const name =
        kind === 'image'
          ? 'generateAiImage'
          : 'generateAiVideo';

      const payload =
        kind === 'image'
          ? {
              prompt,
              aspectRatio: format,
              provider
            }
          : {
              prompt,
              resolution: format,
              duration,
              provider
            };

      const response = await base44.functions.invoke(
        name,
        payload
      );

      setResult(response.data.url);

    } catch (err) {
      setError(
        err?.response?.data?.error ||
        'Não foi possível concluir a geração. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white">

      {/* MOBILE HEADER */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#090909] px-5 lg:hidden">

        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-red-600">
            <Sparkles size={18} />
          </div>

          <span className="text-lg font-bold tracking-tight">
            HUB
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>

      </header>

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64
            border-r border-white/10
            bg-[#090909]
            transition-transform duration-300
            lg:static lg:translate-x-0
            ${
              mobileMenu
                ? 'translate-x-0'
                : '-translate-x-full'
            }
          `}
        >

          {/* LOGO */}
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-600 shadow-lg shadow-red-900/30">
              <Sparkles size={20} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                HUB
              </div>

              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                AI Studio
              </div>
            </div>

          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 p-4">

            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Workspace
            </p>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl bg-red-600/10 px-3 py-3 text-sm font-medium text-red-400"
            >
              <Sparkles size={18} />
              Criar
            </button>

            <button
              type="button"
              onClick={() => changeKind('image')}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <ImageIcon size={18} />
              Imagens
            </button>

            <button
              type="button"
              onClick={() => changeKind('video')}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <Video size={18} />
              Vídeos
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <History size={18} />
              Histórico
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <Heart size={18} />
              Favoritos
            </button>

            <div className="my-4 h-px bg-white/5" />

            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Sistema
            </p>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <Settings size={18} />
              Configurações
            </button>

          </nav>

          {/* SIDEBAR BOTTOM */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Créditos
                </span>

                <span className="text-xs font-semibold text-white">
                  100
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[65%] rounded-full bg-red-600" />
              </div>

              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-white/10 py-2 text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                Comprar créditos
              </button>

            </div>

          </div>

        </aside>

        {/* OVERLAY MOBILE */}
        {mobileMenu && (
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          />
        )}

        {/* MAIN */}
        <main className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="hidden h-20 items-center justify-between border-b border-white/10 bg-[#090909] px-8 lg:flex">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
                Workspace
              </p>

              <h1 className="mt-1 text-lg font-semibold">
                Criar conteúdo
              </h1>
            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">

                <span className="text-xs text-zinc-500">
                  Créditos
                </span>

                <span className="ml-2 text-sm font-semibold text-white">
                  100
                </span>

              </div>

              <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-800 text-xs font-bold">
                U
              </div>

            </div>

          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1500px] p-5 sm:p-8">

            {/* TITLE */}
            <div className="mb-8">

              <div className="flex items-center gap-2 text-sm text-red-500">
                <Sparkles size={16} />

                <span>
                  AI Studio
                </span>
              </div>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Transforme ideias em conteúdo.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                Crie imagens e vídeos utilizando inteligência
                artificial através de uma única interface.
              </p>

            </div>

            {/* MEDIA SWITCHER */}
            <div className="mb-6 flex rounded-xl border border-white/10 bg-[#0d0d0d] p-1 w-fit">

              <button
                type="button"
                onClick={() => changeKind('image')}
                className={`
                  flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition
                  ${
                    kind === 'image'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/30'
                      : 'text-zinc-500 hover:text-white'
                  }
                `}
              >
                <ImageIcon size={16} />
                Imagem
              </button>

              <button
                type="button"
                onClick={() => changeKind('video')}
                className={`
                  flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition
                  ${
                    kind === 'video'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/30'
                      : 'text-zinc-500 hover:text-white'
                  }
                `}
              >
                <Video size={16} />
                Vídeo
              </button>

            </div>

            {/* WORKSPACE */}
            <div className="grid gap-6 xl:grid-cols-[minmax(380px,0.85fr)_minmax(500px,1.15fr)]">

              {/* LEFT */}
              <div>

                <PromptForm
                  kind={kind}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  format={format}
                  setFormat={setFormat}
                  duration={duration}
                  setDuration={setDuration}
                  provider={provider}
                  setProvider={setProvider}
                  loading={loading}
                  onSubmit={generate}
                />

              </div>

              {/* RIGHT */}
              <div>

                <ResultPreview
                  kind={kind}
                  url={result}
                  loading={loading}
                  error={error}
                />

              </div>

            </div>

            {/* RECENT */}
            <section className="mt-12">

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Biblioteca
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Criações recentes
                  </h3>
                </div>

                <button
                  type="button"
                  className="text-xs text-zinc-500 transition hover:text-white"
                >
                  Ver tudo →
                </button>

              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      aspect-square
                      overflow-hidden
                      rounded-2xl
                      border border-white/5
                      bg-[#0d0d0d]
                    "
                  >
                    <div className="flex h-full items-center justify-center text-zinc-800">
                      <LayoutDashboard size={28} />
                    </div>
                  </div>
                ))}

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}
import { WandSparkles } from 'lucide-react';
import OptionPicker from '@/components/studio/OptionPicker';
import ProviderPicker from '@/components/studio/ProviderPicker';

export default function PromptForm({ kind, prompt, setPrompt, format, setFormat, duration, setDuration, provider, setProvider, loading, onSubmit }) {
  const isVideo = kind === 'video';
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7">
      <div className="mb-4"><ProviderPicker provider={provider} setProvider={setProvider} /></div>
      <label className="mb-3 block text-sm font-medium text-slate-200">Descreva sua ideia</label>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={1000} rows={7} placeholder={isVideo ? 'Ex: Uma nave atravessando nuvens douradas ao pôr do sol, movimento cinematográfico...' : 'Ex: Uma cidade futurista coberta por jardins, luz suave da manhã, estilo editorial...'} className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10" />
      <div className="mt-5 flex flex-col gap-5"><OptionPicker label={isVideo ? 'Resolução' : 'Formato'} options={isVideo ? ['720p', '480p'] : ['1:1', '16:9', '9:16']} value={format} onChange={setFormat} />{isVideo && <OptionPicker label="Duração" options={[4, 6, 8]} value={duration} onChange={setDuration} />}</div>
      <button disabled={loading || prompt.trim().length < 3} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"><WandSparkles size={18} />{loading ? 'Criando sua mídia...' : `Gerar ${isVideo ? 'vídeo' : 'imagem'}`}</button>
      {isVideo && <p className="mt-3 text-center text-xs text-slate-600">Vídeos usam créditos conforme a duração escolhida.</p>}
    </form>
  );
}
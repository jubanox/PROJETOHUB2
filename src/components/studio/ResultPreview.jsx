import { Download, ImageIcon, LoaderCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ResultPreview({ kind, url, loading, error }) {
  return (
    <section className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:min-h-[540px]">
      {loading ? <div className="text-center"><LoaderCircle className="mx-auto mb-4 animate-spin text-violet-400" size={30} /><p className="text-sm text-slate-300">Transformando seu prompt em {kind === 'video' ? 'vídeo' : 'imagem'}...</p><p className="mt-1 text-xs text-slate-600">Isso pode levar alguns instantes</p></div> : error ? <p className="max-w-sm text-center text-sm text-rose-300">{error}</p> : url ? <div className="w-full"><div className="overflow-hidden rounded-2xl bg-black">{kind === 'image' ? <Image src={url} alt="Imagem gerada por IA" className="max-h-[470px] w-full" fittingType="fit" /> : <video src={url} controls className="max-h-[470px] w-full" />}</div><a href={url} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"><Download size={16} /> Abrir para baixar</a></div> : <div className="max-w-xs text-center"><span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-600"><ImageIcon size={24} /></span><p className="text-sm font-medium text-slate-400">Sua criação aparecerá aqui</p><p className="mt-2 text-xs leading-5 text-slate-600">Escreva um prompt detalhado e escolha o formato.</p></div>}
    </section>
  );
}
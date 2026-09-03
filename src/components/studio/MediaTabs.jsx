import { ImageIcon, Video } from 'lucide-react';

export default function MediaTabs({ active, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-slate-950/70 p-1">
      <button onClick={() => onChange('image')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${active === 'image' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'}`}><ImageIcon size={16} /> Imagem</button>
      <button onClick={() => onChange('video')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${active === 'video' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'}`}><Video size={16} /> Vídeo</button>
    </div>
  );
}
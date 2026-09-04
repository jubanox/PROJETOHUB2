import { ImageIcon, Video } from 'lucide-react';

export default function MediaTabs({ active, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-red-500/20 bg-black/80 p-1 shadow-lg shadow-red-950/10">
      
      {/* IMAGEM */}
      <button
        type="button"
        onClick={() => onChange('image')}
        className={`
          flex items-center gap-2
          rounded-lg
          px-4 py-2
          text-sm font-medium
          transition-all duration-200
          ${
            active === 'image'
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
              : 'text-zinc-500 hover:bg-white/5 hover:text-white'
          }
        `}
      >
        <ImageIcon size={16} />
        Imagem
      </button>

      {/* VÍDEO */}
      <button
        type="button"
        onClick={() => onChange('video')}
        className={`
          flex items-center gap-2
          rounded-lg
          px-4 py-2
          text-sm font-medium
          transition-all duration-200
          ${
            active === 'video'
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
              : 'text-zinc-500 hover:bg-white/5 hover:text-white'
          }
        `}
      >
        <Video size={16} />
        Vídeo
      </button>

    </div>
  );
}
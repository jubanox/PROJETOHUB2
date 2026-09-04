import { Download, ImageIcon, LoaderCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ResultPreview({ kind, url, loading, error }) {
  return (
    <section
      className="
        flex min-h-[420px]
        items-center justify-center
        overflow-hidden
        rounded-3xl
        border border-red-500/15
        bg-black/70
        p-4
        shadow-2xl shadow-red-950/10
        backdrop-blur-xl
        sm:min-h-[540px]
      "
    >
      {/* CARREGANDO */}
      {loading ? (
        <div className="text-center">
          <LoaderCircle
            className="mx-auto mb-4 animate-spin text-red-500"
            size={34}
          />

          <p className="text-sm font-medium text-white">
            Transformando seu prompt em{' '}
            {kind === 'video' ? 'vídeo' : 'imagem'}...
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            Isso pode levar alguns instantes
          </p>
        </div>

      ) : error ? (

        /* ERRO */
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <span className="text-xl text-red-500">!</span>
          </div>

          <p className="text-sm font-medium text-red-400">
            Não foi possível concluir a geração
          </p>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            {error}
          </p>
        </div>

      ) : url ? (

        /* RESULTADO */
        <div className="w-full">

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-black
              shadow-2xl
              shadow-black/50
            "
          >
            {kind === 'image' ? (
              <Image
                src={url}
                alt="Imagem gerada por IA"
                className="max-h-[470px] w-full object-contain"
                fittingType="fit"
              />
            ) : (
              <video
                src={url}
                controls
                className="max-h-[470px] w-full"
              />
            )}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border border-red-500/20
              bg-red-500/5
              py-3
              text-sm
              font-medium
              text-zinc-300
              transition-all
              hover:border-red-500/40
              hover:bg-red-500/10
              hover:text-white
            "
          >
            <Download size={16} />
            Abrir para baixar
          </a>
        </div>

      ) : (

        /* ESTADO VAZIO */
        <div className="max-w-xs text-center">

          <span
            className="
              mx-auto mb-4
              grid h-16 w-16
              place-items-center
              rounded-2xl
              border border-red-500/20
              bg-red-500/5
              text-red-500/50
            "
          >
            <ImageIcon size={26} />
          </span>

          <p className="text-sm font-medium text-zinc-300">
            Sua criação aparecerá aqui
          </p>

          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Escreva um prompt detalhado e escolha o formato.
          </p>

        </div>
      )}
    </section>
  );
}
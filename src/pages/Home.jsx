import { useState } from 'react';
import StudioTopBar from '@/components/studio/StudioTopBar';
import StudioSidebar from '@/components/studio/StudioSidebar';
import GeneratorStudio from '@/components/studio/GeneratorStudio';

export default function Home() {
  const [kind, setKind] = useState('image');

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Barra superior */}
      <StudioTopBar />

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <StudioSidebar
          kind={kind}
          setKind={setKind}
        />

        {/* Conteúdo */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">

            <GeneratorStudio
              kind={kind}
              setKind={setKind}
            />

          </div>
        </main>

      </div>
    </div>
  );
}
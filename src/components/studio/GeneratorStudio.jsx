import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import MediaTabs from '@/components/studio/MediaTabs';
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
  const changeKind = (next) => { setKind(next); setFormat(next === 'video' ? '720p' : '1:1'); setResult(null); setError(''); };
  const generate = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setResult(null);
    try {
      const name = kind === 'image' ? 'generateAiImage' : 'generateAiVideo';
      const payload = kind === 'image' ? { prompt, aspectRatio: format, provider } : { prompt, resolution: format, duration, provider };
      const response = await base44.functions.invoke(name, payload); setResult(response.data.url);
    } catch (err) { setError(err?.response?.data?.error || 'Não foi possível concluir a geração. Tente novamente.'); }
    finally { setLoading(false); }
  };
  return <><div className="mb-6"><MediaTabs active={kind} onChange={changeKind} /></div><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><PromptForm kind={kind} prompt={prompt} setPrompt={setPrompt} format={format} setFormat={setFormat} duration={duration} setDuration={setDuration} provider={provider} setProvider={setProvider} loading={loading} onSubmit={generate} /><ResultPreview kind={kind} url={result} loading={loading} error={error} /></div></>;
}
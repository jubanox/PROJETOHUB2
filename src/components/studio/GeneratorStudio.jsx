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
  const [provider, setProvider] = useState('crebots');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeKind = (next) => {
    setKind(next);
    setFormat(next === 'video' ? '720p' : '1:1');
    setResult(null);
    setError('');
  };

  // Consulta uma tarefa da Crebots até ela terminar
  const waitForCrebotsTask = async (taskId) => {
    const maxAttempts = 60;
    const interval = 5000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetch(
        `/api/crebots/task/${encodeURIComponent(taskId)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
          data?.detail ||
          'Erro ao consultar a tarefa da Crebots.'
        );
      }

      // Se já temos o resultado, terminou
      if (data.output_url) {
        return data;
      }

      const status = String(data.status || '').toUpperCase();

      // Estados de erro
      if (
        status.includes('FAILED') ||
        status.includes('ERROR') ||
        status.includes('CANCEL')
      ) {
        throw new Error(
          data.task_message ||
          'A Crebots não conseguiu concluir a geração.'
        );
      }

      // Aguarda antes da próxima consulta
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(
      'A geração demorou mais do que o esperado. Tente consultar novamente.'
    );
  };

  const generateWithCrebots = async () => {
    let endpoint;
    let payload;

    if (kind === 'image') {
      endpoint = '/api/crebots/image';

      payload = {
        preset_name: 'custom',
        prompt: prompt.trim(),
        expand_prompt: true,
        quality: 'high',
        age_check: true
      };
    } else {
      endpoint = '/api/crebots/video';

      payload = {
        preset_name: 'custom',
        prompt: prompt.trim(),
        quality: 'high',
        age_check: true
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
        data?.detail ||
        'A Crebots recusou a solicitação.'
      );
    }

    if (!data.id) {
      throw new Error(
        'A Crebots não retornou o ID da tarefa.'
      );
    }

    // Algumas tarefas podem retornar o resultado imediatamente
    if (data.output_url) {
      return data.output_url;
    }

    // Caso contrário, acompanha a tarefa
    const finishedTask = await waitForCrebotsTask(data.id);

    if (!finishedTask.output_url) {
      throw new Error(
        finishedTask.task_message ||
        'A Crebots terminou a tarefa, mas não retornou o arquivo.'
      );
    }

    return finishedTask.output_url;
  };

  const generate = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // CREBOTS
      if (provider === 'crebots') {
        const url = await generateWithCrebots();

        setResult(url);
        return;
      }

      // PROVEDORES ANTIGOS
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
      console.error('Erro na geração:', err);

      setError(
        err?.message ||
        err?.response?.data?.error ||
        'Não foi possível concluir a geração. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <MediaTabs
          active={kind}
          onChange={changeKind}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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

        <ResultPreview
          kind={kind}
          url={result}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}
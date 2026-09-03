export default function OptionPicker({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`rounded-lg border px-3 py-2 text-xs transition ${value === option ? 'border-violet-400/70 bg-violet-500/15 text-violet-200' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20'}`}>{option}{label === 'Duração' ? 's' : ''}</button>)}
      </div>
    </div>
  );
}
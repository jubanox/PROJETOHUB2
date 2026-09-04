import { ChevronDown } from 'lucide-react';

export default function SettingsSelect({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => {
  const selected = options.find((option) => {
    const item =
      typeof option === 'object'
        ? option
        : {
            value: option,
            label: option,
          };

    return String(item.value) === e.target.value;
  });

  const item =
    typeof selected === 'object'
      ? selected
      : {
          value: selected,
          label: selected,
        };

  onChange(item?.value ?? e.target.value);
}}
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm font-medium text-white outline-none transition hover:border-white/20 focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5"
        >
          {options.map((option) => {
            const item =
              typeof option === 'object'
                ? option
                : {
                    value: option,
                    label: option,
                  };

            return (
              <option
                key={item.value}
                value={item.value}
                className="bg-[#111111] text-white"
              >
                {item.label}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>
    </div>
  );
}
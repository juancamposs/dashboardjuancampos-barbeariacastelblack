import { useState } from "react";
import logo from "@/assets/logo-castel-black.png";

const periods = [
  { label: "Hoje", days: 1 },
  { label: "7 dias", days: 7 },
  { label: "14 dias", days: 14 },
  { label: "30 dias", days: 30 },
];

interface DateRange {
  since: string;
  until: string;
}

interface DashboardHeaderProps {
  selectedDays: number;
  onSelectDays: (days: number) => void;
  customRange?: DateRange;
  onCustomRange: (range: DateRange | undefined) => void;
}

export function DashboardHeader({
  selectedDays,
  onSelectDays,
  customRange,
  onCustomRange,
}: DashboardHeaderProps) {
  const [showCustom, setShowCustom] = useState(!!customRange);
  const [since, setSince] = useState(customRange?.since || "");
  const [until, setUntil] = useState(customRange?.until || "");

  function handlePreset(days: number) {
    setShowCustom(false);
    onCustomRange(undefined);
    onSelectDays(days);
  }

  function handleApply() {
    if (since && until && since <= until) {
      onCustomRange({ since, until });
    }
  }

  function handleToggleCustom() {
    if (showCustom) {
      setShowCustom(false);
      onCustomRange(undefined);
    } else {
      setShowCustom(true);
    }
  }

  const isCustomActive = !!customRange;

  return (
    <header className="w-full pt-8 sm:pt-12 pb-6 sm:pb-10 opacity-0 animate-fade-in">
      {/* Identidade Castel Black */}
      <div className="flex flex-col items-center gap-3 sm:gap-5 mb-8 sm:mb-12">
        <img
          src={logo}
          alt="Barbearia Castel Black"
          className="h-20 sm:h-28 w-auto object-contain drop-shadow-lg"
        />
        <p className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.3em] uppercase text-center">
          Performance sob controle
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Botões de período — grid 2 cols no mobile, flex no desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {periods.map((p) => (
            <button
              key={p.days}
              onClick={() => handlePreset(p.days)}
              className={`px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                !isCustomActive && selectedDays === p.days
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={handleToggleCustom}
            className={`col-span-2 sm:col-span-1 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
              isCustomActive || showCustom
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Personalizado
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-muted-foreground/70 text-center sm:text-left">
          {isCustomActive
            ? `${new Date(customRange!.since + "T12:00:00").toLocaleDateString(
                "pt-BR"
              )} – ${new Date(customRange!.until + "T12:00:00").toLocaleDateString(
                "pt-BR"
              )}`
            : "Resultados atualizados há poucos minutos"}
        </p>

        {showCustom && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 p-3 sm:p-4 rounded-xl bg-secondary/30 border border-border/30 animate-fade-in">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-wider w-8">
                De
              </label>
              <input
                type="date"
                value={since}
                onChange={(e) => setSince(e.target.value)}
                className="flex-1 sm:flex-none bg-secondary/60 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <label className="text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-wider w-8">
                Até
              </label>
              <input
                type="date"
                value={until}
                onChange={(e) => setUntil(e.target.value)}
                className="flex-1 sm:flex-none bg-secondary/60 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!since || !until || since > until}
              className="w-full sm:w-auto px-5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

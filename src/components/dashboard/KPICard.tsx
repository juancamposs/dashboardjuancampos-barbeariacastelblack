import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DeltaInfo {
  /** Variação em %, positivo ou negativo */
  pct: number;
  /** Se a variação é positiva pro negócio (ex: leads subindo = bom, CPA subindo = ruim) */
  isGood: boolean;
}

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
  description?: string;
  delta?: DeltaInfo;
  /** Quando highlight=true, o card recebe mais peso visual (usado no hero) */
  highlight?: boolean;
}

export function KPICard({
  title,
  value,
  icon,
  delay = 0,
  description,
  delta,
  highlight = false,
}: KPICardProps) {
  const deltaDirection = delta ? (delta.pct > 0 ? "up" : delta.pct < 0 ? "down" : "flat") : null;
  const DeltaIcon =
    deltaDirection === "up" ? TrendingUp : deltaDirection === "down" ? TrendingDown : Minus;

  return (
    <div
      className={cn(
        "card-vault gold-border-glow opacity-0 animate-fade-in",
        "hover:border-primary/20 transition-all duration-300",
        highlight ? "p-5 sm:p-7" : "p-5 sm:p-7"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <span className="text-muted-foreground/80 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase">
          {title}
        </span>
        <span className="text-primary/40">{icon}</span>
      </div>
      <p
        className={cn(
          "font-extrabold tracking-tight gold-text gold-glow leading-none",
          highlight ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        )}
      >
        {value}
      </p>

      {delta && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold",
              delta.isGood
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            <DeltaIcon className="w-3 h-3" />
            {delta.pct > 0 ? "+" : ""}
            {delta.pct.toFixed(0)}%
          </span>
          <span className="text-[10px] text-muted-foreground/50">vs período anterior</span>
        </div>
      )}

      {description && (
        <p className="text-[10px] sm:text-[11px] text-muted-foreground/50 mt-3 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

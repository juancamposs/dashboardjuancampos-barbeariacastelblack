import { Sparkles } from "lucide-react";

interface HeroSummaryProps {
  spend: number;
  leads: number;
  cpa: number;
  periodLabel: string;
}

/**
 * Manchete de entrada — resume em linguagem do dono o que o investimento gerou.
 * Fica no topo da página, antes de qualquer grade de KPI.
 */
export function HeroSummary({ spend, leads, cpa, periodLabel }: HeroSummaryProps) {
  const spendFmt = spend.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const cpaFmt = cpa.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="card-vault gold-border-glow p-6 sm:p-10 mb-8 sm:mb-12 relative overflow-hidden opacity-0 animate-fade-in">
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/80">
            Resumo · {periodLabel}
          </span>
        </div>

        <p className="text-xl sm:text-3xl leading-snug sm:leading-tight font-light text-foreground/90">
          Você investiu{" "}
          <span className="font-bold gold-text">R$ {spendFmt}</span>
          {leads > 0 ? (
            <>
              {" "}e gerou{" "}
              <span className="font-bold gold-text">
                {leads} {leads === 1 ? "conversa" : "conversas"}
              </span>{" "}
              no WhatsApp por{" "}
              <span className="font-bold gold-text">R$ {cpaFmt}</span> cada.
            </>
          ) : (
            <>
              {" "}em campanhas esse período.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

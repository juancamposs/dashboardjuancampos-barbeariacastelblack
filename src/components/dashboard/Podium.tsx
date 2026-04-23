import { Trophy, Zap } from "lucide-react";
import type { Campaign, Ad } from "@/lib/mock-data";

interface PodiumProps {
  bestCampaign: Campaign | null;
  bestAd: (Ad & { campanha: string }) | null;
}

/**
 * Bloco "pódio" que destaca a campanha e o anúncio com melhor resultado.
 * Pensado pro dono da barbearia: foco em nome + número-chave + contexto.
 */
export function Podium({ bestCampaign, bestAd }: PodiumProps) {
  if (!bestCampaign && !bestAd) return null;

  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {bestCampaign && (
        <div className="card-vault gold-border-glow p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/80">
                Campanha campeã
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold gold-text leading-tight break-words">
              {bestCampaign.name}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Stat label="Leads" value={bestCampaign.leads.toString()} />
              <Stat label="CPA" value={`R$ ${bestCampaign.cpa.toFixed(2)}`} />
              <Stat
                label="Investido"
                value={`R$ ${bestCampaign.spend.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
              />
            </div>
          </div>
        </div>
      )}

      {bestAd && bestAd.leads > 0 && (
        <div className="card-vault p-6 sm:p-7 border border-primary/10 relative overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/80">
                Anúncio que mais funcionou
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-foreground leading-tight break-words">
              {bestAd.name}
            </p>
            <p className="text-[11px] text-muted-foreground/60 mt-1 break-words">
              da campanha {bestAd.campanha}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Stat label="Leads" value={bestAd.leads.toString()} />
              <Stat label="Cliques" value={bestAd.clicks.toString()} />
              <Stat label="CTR" value={`${bestAd.ctr.toFixed(2)}%`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50">{label}</p>
      <p className="text-sm sm:text-base font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Campaign } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<keyof Campaign>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const toggle = (id: string) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  const handleSort = (key: keyof Campaign) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...campaigns].sort((a, b) => {
    const av = a[sortKey],
      bv = b[sortKey];
    if (typeof av === "number" && typeof bv === "number")
      return sortAsc ? av - bv : bv - av;
    return sortAsc
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const statusLabel = (s: string) =>
    s === "active" ? "Ativo" : s === "paused" ? "Pausado" : "Concluído";
  const cpaColor = (cpa: number) =>
    cpa <= 15
      ? "text-emerald-400/90"
      : cpa <= 20
      ? "text-amber-400/90"
      : "text-red-400/90";

  const th = (label: string, key: keyof Campaign) => (
    <th
      className="px-5 py-4 text-left text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.15em] cursor-pointer hover:text-muted-foreground transition-colors whitespace-nowrap"
      onClick={() => handleSort(key)}
    >
      {label} {sortKey === key && (sortAsc ? "↑" : "↓")}
    </th>
  );

  return (
    <div
      className="card-vault overflow-hidden opacity-0 animate-fade-in p-0 mb-8 sm:mb-10"
      style={{ animationDelay: "800ms" }}
    >
      <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <h3 className="text-[10px] sm:text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em]">
          Visão clara das campanhas
        </h3>
      </div>

      {/* MOBILE: cards por campanha */}
      <div className="lg:hidden px-4 pb-4 space-y-3">
        {sorted.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border border-border/40 bg-surface/40 overflow-hidden"
          >
            <button
              className="w-full flex items-start justify-between gap-3 p-4 text-left"
              onClick={() => toggle(c.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/90 break-words">
                  {c.name}
                </p>
                <p
                  className={cn(
                    "text-[10px] mt-1 uppercase tracking-wider",
                    c.status === "active"
                      ? "text-emerald-400/80"
                      : "text-muted-foreground/50"
                  )}
                >
                  {statusLabel(c.status)}
                </p>
              </div>
              {expanded.has(c.id) ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" />
              )}
            </button>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 pb-4 text-xs">
              <MobileStat label="Gasto" value={`R$ ${c.spend.toFixed(2)}`} />
              <MobileStat label="Leads" value={c.leads.toString()} />
              <MobileStat
                label="CPA"
                value={`R$ ${c.cpa.toFixed(2)}`}
                className={cpaColor(c.cpa)}
              />
              <MobileStat label="CTR" value={`${c.ctr}%`} />
              <MobileStat
                label="Impressões"
                value={c.impressions.toLocaleString("pt-BR")}
              />
              <MobileStat
                label="Cliques"
                value={c.clicks.toLocaleString("pt-BR")}
              />
            </div>

            {expanded.has(c.id) && c.ads.length > 0 && (
              <div className="border-t border-border/30 bg-surface/30 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 mb-2">
                  Anúncios
                </p>
                <div className="space-y-3">
                  {c.ads.map((ad) => (
                    <div key={ad.id} className="text-[11px]">
                      <p className="text-foreground/80 break-words">{ad.name}</p>
                      <p className="text-muted-foreground/50 mt-0.5">
                        R$ {ad.spend.toFixed(2)} · {ad.clicks} cliques · {ad.ctr}%
                        CTR · {ad.leads} leads
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP: tabela completa */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="w-10" />
              {th("Nome", "name")}
              {th("Status", "status")}
              {th("Gasto", "spend")}
              {th("Impressões", "impressions")}
              {th("Cliques", "clicks")}
              {th("CTR", "ctr")}
              {th("CPC", "cpc")}
              {th("Leads", "leads")}
              {th("CPA", "cpa")}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <Fragment key={c.id}>
                <tr
                  className="border-b border-border/30 hover:bg-surface/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggle(c.id)}
                >
                  <td className="px-3 py-4 text-muted-foreground/50">
                    {expanded.has(c.id) ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium text-foreground/90">
                    {c.name}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 text-xs",
                      c.status === "active"
                        ? "text-emerald-400/80"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {statusLabel(c.status)}
                  </td>
                  <td className="px-5 py-4 text-foreground/70">
                    R$ {c.spend.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-foreground/70">
                    {c.impressions.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-5 py-4 text-foreground/70">
                    {c.clicks.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-5 py-4 text-foreground/70">{c.ctr}%</td>
                  <td className="px-5 py-4 text-foreground/70">
                    R$ {c.cpc.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-foreground/70">{c.leads}</td>
                  <td
                    className={cn("px-5 py-4 font-semibold", cpaColor(c.cpa))}
                  >
                    R$ {c.cpa.toFixed(2)}
                  </td>
                </tr>
                {expanded.has(c.id) &&
                  c.ads.map((ad) => (
                    <tr
                      key={ad.id}
                      className="bg-surface/30 border-b border-border/20"
                    >
                      <td />
                      <td className="px-5 py-3.5 pl-12 text-muted-foreground/60 text-xs">
                        {ad.name}
                      </td>
                      <td />
                      <td className="px-5 py-3.5 text-xs text-foreground/50">
                        R$ {ad.spend.toFixed(2)}
                      </td>
                      <td />
                      <td className="px-5 py-3.5 text-xs text-foreground/50">
                        {ad.clicks}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-foreground/50">
                        {ad.ctr}%
                      </td>
                      <td />
                      <td className="px-5 py-3.5 text-xs text-foreground/50">
                        {ad.leads}
                      </td>
                      <td />
                    </tr>
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/50">
        {label}
      </p>
      <p
        className={cn(
          "text-[13px] font-medium text-foreground/80 mt-0.5",
          className
        )}
      >
        {value}
      </p>
    </div>
  );
}

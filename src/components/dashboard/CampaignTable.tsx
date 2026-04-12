import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Campaign } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
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
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...campaigns].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
    return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const statusColor = (s: string) =>
    s === "active" ? "text-emerald-400" : s === "paused" ? "text-amber-400" : "text-muted-foreground";

  const cpaIndicator = (cpa: number) =>
    cpa <= 15 ? "text-emerald-400" : cpa <= 20 ? "text-amber-400" : "text-red-400";

  const th = (label: string, key: keyof Campaign) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(key)}
    >
      {label} {sortKey === key && (sortAsc ? "↑" : "↓")}
    </th>
  );

  return (
    <div className="card-vault overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6 px-2">
        Campanhas
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-8" />
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
              <>
                <tr
                  key={c.id}
                  className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors cursor-pointer"
                  onClick={() => toggle(c.id)}
                >
                  <td className="px-2 py-3 text-muted-foreground">
                    {expanded.has(c.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className={cn("px-4 py-3 capitalize", statusColor(c.status))}>{c.status === "active" ? "Ativo" : c.status === "paused" ? "Pausado" : "Concluído"}</td>
                  <td className="px-4 py-3">R$ {c.spend.toFixed(2)}</td>
                  <td className="px-4 py-3">{c.impressions.toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-3">{c.clicks.toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-3">{c.ctr}%</td>
                  <td className="px-4 py-3">R$ {c.cpc.toFixed(2)}</td>
                  <td className="px-4 py-3">{c.leads}</td>
                  <td className={cn("px-4 py-3 font-semibold", cpaIndicator(c.cpa))}>R$ {c.cpa.toFixed(2)}</td>
                </tr>
                {expanded.has(c.id) && c.ads.map((ad) => (
                  <tr key={ad.id} className="bg-surface/50 border-b border-border/30">
                    <td />
                    <td className="px-4 py-2.5 pl-10 text-muted-foreground text-xs">{ad.name}</td>
                    <td />
                    <td className="px-4 py-2.5 text-xs">R$ {ad.spend.toFixed(2)}</td>
                    <td />
                    <td className="px-4 py-2.5 text-xs">{ad.clicks}</td>
                    <td className="px-4 py-2.5 text-xs">{ad.ctr}%</td>
                    <td />
                    <td className="px-4 py-2.5 text-xs">{ad.leads}</td>
                    <td />
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

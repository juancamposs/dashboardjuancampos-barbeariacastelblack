import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Campaign } from "@/lib/mock-data";

const COLORS = ["#d4af37", "#7c3aed", "#06b6d4", "#f97316", "#22c55e", "#ec4899", "#eab308", "#8b5cf6", "#14b8a6", "#f43f5e"];

export function CampaignDonut({ campaigns }: { campaigns: Campaign[] }) {
  const data = campaigns.map((c) => ({ name: c.name, value: c.spend }));

  return (
    <div className="card-vault opacity-0 animate-fade-in p-5 sm:p-8" style={{ animationDelay: "700ms" }}>
      <h3 className="text-[10px] sm:text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-5 sm:mb-8">
        Distribuição por campanha
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" stroke="none">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 18%)", borderRadius: "8px", color: "#f5f7fb", fontSize: 12 }} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, "Gasto"]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-3 gap-y-2 mt-5 sm:mt-6 justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground/70 max-w-full">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="truncate max-w-[160px] sm:max-w-[180px]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Campaign } from "@/lib/mock-data";

const COLORS = ["#d4af37", "#a08520", "#6b5814"];

export function CampaignDonut({ campaigns }: { campaigns: Campaign[] }) {
  const data = campaigns.map((c) => ({ name: c.name, value: c.spend }));

  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "700ms" }}>
      <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-8">
        Distribuição por campanha
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={65} outerRadius={105} dataKey="value" stroke="none">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 18%)", borderRadius: "8px", color: "#f5f7fb", fontSize: 12 }} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, "Gasto"]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="truncate max-w-[140px]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

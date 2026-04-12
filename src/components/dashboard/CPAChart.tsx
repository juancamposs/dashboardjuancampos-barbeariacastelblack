import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

export function CPAChart({ data }: { data: DailyMetric[] }) {
  const avg = data.reduce((s, m) => s + m.cpa, 0) / data.length;

  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "600ms" }}>
      <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-8">
        CPA diário
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 14%)" vertical={false} />
          <XAxis dataKey="date" stroke="hsl(220 10% 30%)" fontSize={10} tickFormatter={(v) => new Date(v).getDate().toString()} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(220 10% 30%)" fontSize={10} tickFormatter={(v) => `R$${v}`} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 18%)", borderRadius: "8px", color: "#f5f7fb", fontSize: 12 }} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, "CPA"]} labelFormatter={(l) => new Date(l).toLocaleDateString("pt-BR")} />
          <ReferenceLine y={avg} stroke="#d4af37" strokeDasharray="5 5" opacity={0.3} />
          <Line type="monotone" dataKey="cpa" stroke="#d4af37" strokeWidth={1.5} dot={false} activeDot={{ fill: "#d4af37", r: 3, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

export function SpendChart({ data }: { data: DailyMetric[] }) {
  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "400ms" }}>
      <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-8">
        Investimento diário
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 14%)" vertical={false} />
          <XAxis dataKey="date" stroke="hsl(220 10% 30%)" fontSize={10} tickFormatter={(v) => new Date(v).getDate().toString()} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(220 10% 30%)" fontSize={10} tickFormatter={(v) => `R$${v}`} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 18%)", borderRadius: "8px", color: "#f5f7fb", fontSize: 12 }} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, "Investimento"]} labelFormatter={(l) => new Date(l).toLocaleDateString("pt-BR")} />
          <Area type="monotone" dataKey="spend" stroke="#d4af37" strokeWidth={1.5} fill="url(#goldGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

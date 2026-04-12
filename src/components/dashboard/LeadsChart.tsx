import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

export function LeadsChart({ data }: { data: DailyMetric[] }) {
  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "500ms" }}>
      <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-8">
        Leads por dia
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 14%)" vertical={false} />
          <XAxis dataKey="date" stroke="hsl(220 10% 30%)" fontSize={10} tickFormatter={(v) => new Date(v).getDate().toString()} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(220 10% 30%)" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 18%)", borderRadius: "8px", color: "#f5f7fb", fontSize: 12 }} formatter={(v: number) => [v, "Leads"]} labelFormatter={(l) => new Date(l).toLocaleDateString("pt-BR")} />
          <Bar dataKey="leads" fill="#d4af37" radius={[3, 3, 0, 0]} opacity={0.75} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

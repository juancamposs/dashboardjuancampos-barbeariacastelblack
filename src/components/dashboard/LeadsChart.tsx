import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

interface LeadsChartProps {
  data: DailyMetric[];
}

export function LeadsChart({ data }: LeadsChartProps) {
  return (
    <div className="card-vault opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
        Leads por dia
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 18%)" />
          <XAxis
            dataKey="date"
            stroke="hsl(220 10% 40%)"
            fontSize={11}
            tickFormatter={(v) => new Date(v).getDate().toString()}
          />
          <YAxis stroke="hsl(220 10% 40%)" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "hsl(230 20% 9%)",
              border: "1px solid hsl(230 12% 18%)",
              borderRadius: "8px",
              color: "#f5f7fb",
            }}
            formatter={(value: number) => [value, "Leads"]}
            labelFormatter={(label) => new Date(label).toLocaleDateString("pt-BR")}
          />
          <Bar dataKey="leads" fill="#d4af37" radius={[4, 4, 0, 0]} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

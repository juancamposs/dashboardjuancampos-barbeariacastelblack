import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

interface CPAChartProps {
  data: DailyMetric[];
}

export function CPAChart({ data }: CPAChartProps) {
  const avgCPA = data.reduce((s, m) => s + m.cpa, 0) / data.length;

  return (
    <div className="card-vault opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
        CPA por dia
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 18%)" />
          <XAxis
            dataKey="date"
            stroke="hsl(220 10% 40%)"
            fontSize={11}
            tickFormatter={(v) => new Date(v).getDate().toString()}
          />
          <YAxis stroke="hsl(220 10% 40%)" fontSize={11} tickFormatter={(v) => `R$${v}`} />
          <Tooltip
            contentStyle={{
              background: "hsl(230 20% 9%)",
              border: "1px solid hsl(230 12% 18%)",
              borderRadius: "8px",
              color: "#f5f7fb",
            }}
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "CPA"]}
            labelFormatter={(label) => new Date(label).toLocaleDateString("pt-BR")}
          />
          <ReferenceLine
            y={avgCPA}
            stroke="#d4af37"
            strokeDasharray="5 5"
            opacity={0.5}
            label={{ value: "Média", fill: "#a1a8b3", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="cpa"
            stroke="#d4af37"
            strokeWidth={2}
            dot={false}
            activeDot={{ fill: "#d4af37", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

interface SpendChartProps {
  data: DailyMetric[];
}

export function SpendChart({ data }: SpendChartProps) {
  return (
    <div className="card-vault opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
        Investimento por dia
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Investimento"]}
            labelFormatter={(label) => new Date(label).toLocaleDateString("pt-BR")}
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#d4af37"
            strokeWidth={2}
            fill="url(#goldGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

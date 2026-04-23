import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 20%)", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ color: "hsl(220 10% 50%)", marginBottom: 6 }}>
        {new Date(label + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: <strong>R$ {Number(p.value).toFixed(2)}</strong>
        </p>
      ))}
    </div>
  );
}

export function SpendChart({ data }: { data: DailyMetric[] }) {
  return (
    <div className="card-vault opacity-0 animate-fade-in p-5 sm:p-8" style={{ animationDelay: "400ms" }}>
      <h3 className="text-[10px] sm:text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-5 sm:mb-8">
        Investimento diário
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 12% 14%)" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="hsl(220 10% 28%)"
            fontSize={10}
            tickFormatter={(v) => new Date(v + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="hsl(220 10% 28%)"
            fontSize={10}
            tickFormatter={(v) => `R$${v}`}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="spend"
            name="Investimento"
            stroke="#d4af37"
            strokeWidth={2}
            fill="url(#goldGrad)"
            dot={false}
            activeDot={{ fill: "#d4af37", r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

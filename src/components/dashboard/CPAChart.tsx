import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
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

export function CPAChart({ data }: { data: DailyMetric[] }) {
  const withLeads = data.filter((d) => d.cpa > 0);
  const avg = withLeads.length > 0 ? withLeads.reduce((s, m) => s + m.cpa, 0) / withLeads.length : 0;

  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "600ms" }}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em]">
          CPA diário
        </h3>
        {avg > 0 && (
          <span className="text-xs text-muted-foreground/50">
            média R$ {avg.toFixed(2)}
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
          {avg > 0 && (
            <ReferenceLine y={avg} stroke="#d4af37" strokeDasharray="5 5" opacity={0.35} />
          )}
          <Line
            type="monotone"
            dataKey="cpa"
            name="CPA"
            stroke="#d4af37"
            strokeWidth={2}
            dot={false}
            activeDot={{ fill: "#d4af37", r: 4, strokeWidth: 0 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

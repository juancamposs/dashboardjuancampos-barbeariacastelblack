import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DailyMetric } from "@/lib/mock-data";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 12% 20%)", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ color: "hsl(220 10% 50%)", marginBottom: 6 }}>
        {new Date(label + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: "#d4af37", margin: "2px 0" }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

export function LeadsChart({ data }: { data: DailyMetric[] }) {
  const maxLeads = Math.max(...data.map((d) => d.leads), 1);

  return (
    <div className="card-vault opacity-0 animate-fade-in p-8" style={{ animationDelay: "500ms" }}>
      <h3 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-[0.15em] mb-8">
        Leads por dia
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
          <YAxis stroke="hsl(220 10% 28%)" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} width={32} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="leads" name="Leads" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill="#d4af37"
                opacity={entry.leads === 0 ? 0.12 : 0.5 + (entry.leads / maxLeads) * 0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

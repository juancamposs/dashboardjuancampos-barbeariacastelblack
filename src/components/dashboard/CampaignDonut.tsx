import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Campaign } from "@/lib/mock-data";

const COLORS = ["#d4af37", "#a08520", "#7a6518", "#544710", "#f0d060"];

interface CampaignDonutProps {
  campaigns: Campaign[];
}

export function CampaignDonut({ campaigns }: CampaignDonutProps) {
  const data = campaigns.map((c) => ({ name: c.name, value: c.spend }));

  return (
    <div className="card-vault opacity-0 animate-fade-in" style={{ animationDelay: "700ms" }}>
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
        Distribuição por campanha
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(230 20% 9%)",
              border: "1px solid hsl(230 12% 18%)",
              borderRadius: "8px",
              color: "#f5f7fb",
            }}
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Gasto"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="truncate max-w-[120px]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

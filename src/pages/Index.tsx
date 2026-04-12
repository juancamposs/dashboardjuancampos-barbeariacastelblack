import { useState } from "react";
import { DollarSign, Users, Target, MousePointerClick } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { SpendChart } from "@/components/dashboard/SpendChart";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { CPAChart } from "@/components/dashboard/CPAChart";
import { CampaignDonut } from "@/components/dashboard/CampaignDonut";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { useMetaAds } from "@/hooks/useMetaAds";
import { mockDailyMetrics, mockCampaigns, getKPIs } from "@/lib/mock-data";

export default function Index() {
  const [days, setDays] = useState(30);
  const { data, isLoading, error } = useMetaAds(days);

  // Use real data if available, fallback to mock
  const metrics = data?.dailyMetrics ?? mockDailyMetrics.slice(-days);
  const campaigns = data?.campaigns ?? mockCampaigns;
  const kpis = data?.kpis ?? getKPIs(days);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <DashboardHeader selectedDays={days} onSelectDays={setDays} />

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <KPICard
            title="Investido"
            value={`R$ ${kpis.totalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<DollarSign className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Leads"
            value={kpis.totalLeads.toString()}
            icon={<Users className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="CPA Médio"
            value={`R$ ${kpis.avgCPA.toFixed(2)}`}
            icon={<Target className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="CTR Médio"
            value={`${kpis.avgCTR}%`}
            icon={<MousePointerClick className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <SpendChart data={metrics} />
          <LeadsChart data={metrics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <CPAChart data={metrics} />
          <CampaignDonut campaigns={campaigns} />
        </div>

        {/* Campaigns */}
        <CampaignTable campaigns={campaigns} />

        {/* Footer */}
        <div className="text-center mt-16 text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
          {data?.updatedAt
            ? `Atualizado às ${new Date(data.updatedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} · Dados em tempo real · Castel Black`
            : "Dados em tempo real · Castel Black"}
        </div>
      </div>
    </div>
  );
}

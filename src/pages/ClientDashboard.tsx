import { useState } from "react";
import { DollarSign, Users, Target, MousePointerClick } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { SpendChart } from "@/components/dashboard/SpendChart";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { CPAChart } from "@/components/dashboard/CPAChart";
import { CampaignDonut } from "@/components/dashboard/CampaignDonut";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { mockDailyMetrics, mockCampaigns, getKPIs } from "@/lib/mock-data";

export default function ClientDashboard() {
  const [days, setDays] = useState(30);
  const metrics = mockDailyMetrics.slice(-days);
  const kpis = getKPIs(days);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <DashboardHeader
          selectedDays={days}
          onSelectDays={setDays}
          clientName="Barbearia Castel Black"
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Investido"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <SpendChart data={metrics} />
          <LeadsChart data={metrics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <CPAChart data={metrics} />
          <CampaignDonut campaigns={mockCampaigns} />
        </div>

        {/* Campaign Table */}
        <CampaignTable campaigns={mockCampaigns} />

        {/* Footer */}
        <div className="text-center mt-12 text-xs text-muted-foreground">
          <p>Dados em tempo real · ClientMetrics Vault</p>
        </div>
      </div>
    </div>
  );
}

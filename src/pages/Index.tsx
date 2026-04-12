import { useState } from "react";
import { DollarSign, Users, Target, MousePointerClick, Eye, UserPlus, Zap, Trophy } from "lucide-react";
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

  // Separar campanhas por tipo
  const campanhasMacete = campaigns.filter(c => c.tipo === "macete" || c.objective === "LINK_CLICKS");
  const campanhasLead = campaigns.filter(c => c.tipo === "lead" || c.objective !== "LINK_CLICKS");

  // KPIs Macete do Milhão
  const maceteInvestido = campanhasMacete.reduce((s, c) => s + c.spend, 0);
  const maceteCliques = campanhasMacete.reduce((s, c) => s + c.clicks, 0);
  const maceteImpressions = campanhasMacete.reduce((s, c) => s + c.impressions, 0);
  const maceteCTR = maceteImpressions > 0 ? Math.round((maceteCliques / maceteImpressions) * 10000) / 100 : 0;

  // KPIs Campanhas de Lead
  const leadInvestido = campanhasLead.reduce((s, c) => s + c.spend, 0);
  const leadLeads = campanhasLead.reduce((s, c) => s + c.leads, 0);
  const leadCliques = campanhasLead.reduce((s, c) => s + c.clicks, 0);
  const leadCPA = leadLeads > 0 ? Math.round((leadInvestido / leadLeads) * 100) / 100 : 0;
  const leadImpressions = campanhasLead.reduce((s, c) => s + c.impressions, 0);
  const leadCTR = leadImpressions > 0 ? Math.round((leadCliques / leadImpressions) * 10000) / 100 : 0;

  // Melhor campanha de lead
  const melhorCampanha = campanhasLead.length > 0
    ? campanhasLead.reduce((best, c) => (c.leads > best.leads ? c : best), campanhasLead[0])
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <DashboardHeader selectedDays={days} onSelectDays={setDays} />

        {/* VISÃO GERAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <KPICard
            title="Total Investido"
            value={`R$ ${kpis.totalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<DollarSign className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Total Leads"
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

        {/* SEÇÃO 1: MACETE DO MILHÃO */}
        {campanhasMacete.length > 0 && (
          <>
            <div className="mb-6 mt-14">
              <h2 className="text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
                Macete do Milhão
              </h2>
              <p className="text-xs text-muted-foreground/50 mt-1 tracking-wider">
                Captação · Visitas ao perfil · Crescimento de base
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <KPICard
                title="Investido"
                value={`R$ ${maceteInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                delay={100}
              />
              <KPICard
                title="Cliques no Link"
                value={maceteCliques.toLocaleString("pt-BR")}
                icon={<MousePointerClick className="w-5 h-5" />}
                delay={200}
              />
              <KPICard
                title="Custo por Clique"
                value={`R$ ${maceteCliques > 0 ? (maceteInvestido / maceteCliques).toFixed(2) : "0.00"}`}
                icon={<Target className="w-5 h-5" />}
                delay={300}
              />
              <KPICard
                title="CTR"
                value={`${maceteCTR}%`}
                icon={<Eye className="w-5 h-5" />}
                delay={400}
              />
            </div>
            <CampaignTable campaigns={campanhasMacete} />
          </>
        )}

        {/* SEÇÃO 2: CAMPANHAS DE LEAD */}
        {campanhasLead.length > 0 && (
          <>
            <div className="mb-6 mt-14">
              <h2 className="text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
                Campanhas de Lead
              </h2>
              <p className="text-xs text-muted-foreground/50 mt-1 tracking-wider">
                Captação de leads · Mensagens WhatsApp · Conversão
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <KPICard
                title="Investido"
                value={`R$ ${leadInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                delay={100}
              />
              <KPICard
                title="Leads"
                value={leadLeads.toString()}
                icon={<Users className="w-5 h-5" />}
                delay={200}
              />
              <KPICard
                title="CPA"
                value={`R$ ${leadCPA.toFixed(2)}`}
                icon={<Target className="w-5 h-5" />}
                delay={300}
              />
              <KPICard
                title="CTR"
                value={`${leadCTR}%`}
                icon={<MousePointerClick className="w-5 h-5" />}
                delay={400}
              />
            </div>

            {melhorCampanha && (
              <div className="card-vault gold-border-glow p-6 mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/80">
                    Campanha que deu mais resultado
                  </span>
                </div>
                <p className="text-lg font-bold gold-text">{melhorCampanha.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {melhorCampanha.leads} leads · CPA R$ {melhorCampanha.cpa.toFixed(2)} · R$ {melhorCampanha.spend.toFixed(2)} investido
                </p>
              </div>
            )}

            <CampaignTable campaigns={campanhasLead} />
          </>
        )}

        {/* Gráficos */}
        <div className="mb-6 mt-14">
          <h2 className="text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
            Evolução Diária
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <SpendChart data={metrics} />
          <LeadsChart data={metrics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <CPAChart data={metrics} />
          <CampaignDonut campaigns={campaigns} />
        </div>

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

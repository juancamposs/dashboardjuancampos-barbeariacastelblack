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
  const [customRange, setCustomRange] = useState<{ since: string; until: string } | undefined>();
  const { data, isLoading, error } = useMetaAds(days, customRange);

  // Use real data if available, fallback to mock
  const metrics = data?.dailyMetrics ?? mockDailyMetrics.slice(-days);
  const campaigns = data?.campaigns ?? mockCampaigns;
  const kpis = data?.kpis ?? getKPIs(days);

  // Separar campanhas por tipo
  const campanhasMacete = campaigns.filter(c => c.tipo === "macete" || c.objective === "LINK_CLICKS");
  const campanhasLead = campaigns.filter(c => c.tipo === "lead" || c.objective !== "LINK_CLICKS");

  // KPIs Impulsionamento Instagram
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
        <DashboardHeader selectedDays={days} onSelectDays={setDays} customRange={customRange} onCustomRange={setCustomRange} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10 text-muted-foreground/50 text-sm animate-pulse">
            Carregando dados em tempo real...
          </div>
        )}

        {/* VISÃO GERAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <KPICard
            title="Total Investido"
            value={`R$ ${kpis.totalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<DollarSign className="w-5 h-5" />}
            delay={100}
            description="Valor total gasto em todas as campanhas no período"
          />
          <KPICard
            title="Total Leads"
            value={kpis.totalLeads.toString()}
            icon={<Users className="w-5 h-5" />}
            delay={200}
            description="Pessoas que mandaram mensagem via anúncio"
          />
          <KPICard
            title="CPA Médio"
            value={`R$ ${kpis.avgCPA.toFixed(2)}`}
            icon={<Target className="w-5 h-5" />}
            delay={300}
            description="Custo médio para conseguir cada lead"
          />
          <KPICard
            title="CTR Médio"
            value={`${kpis.avgCTR}%`}
            icon={<MousePointerClick className="w-5 h-5" />}
            delay={400}
            description="Porcentagem de pessoas que clicaram no anúncio"
          />
        </div>

        {/* SEÇÃO 1: MACETE DO MILHÃO */}
        {campanhasMacete.length > 0 && (
          <>
            <div className="mb-6 mt-14">
              <h2 className="text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
                Impulsionamento Instagram
              </h2>
              <p className="text-xs text-muted-foreground/50 mt-1 tracking-wider">
                Alcance · Engajamento · Crescimento de base
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <KPICard
                title="Investido"
                value={`R$ ${maceteInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                delay={100}
                description="Valor investido em campanhas de captação"
              />
              <KPICard
                title="Visitas ao Perfil"
                value={maceteCliques.toLocaleString("pt-BR")}
                icon={<Eye className="w-5 h-5" />}
                delay={200}
                description="Cliques que levaram ao perfil do Instagram"
              />
              <KPICard
                title="Custo por Visita"
                value={`R$ ${maceteCliques > 0 ? (maceteInvestido / maceteCliques).toFixed(2) : "0.00"}`}
                icon={<Target className="w-5 h-5" />}
                delay={300}
                description="Quanto custa cada visita ao perfil"
              />
              <KPICard
                title="CTR"
                value={`${maceteCTR}%`}
                icon={<MousePointerClick className="w-5 h-5" />}
                delay={400}
                description="Taxa de clique dos anúncios de captação"
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
                description="Valor investido em campanhas de conversão"
              />
              <KPICard
                title="Leads"
                value={leadLeads.toString()}
                icon={<Users className="w-5 h-5" />}
                delay={200}
                description="Mensagens recebidas via WhatsApp dos anúncios"
              />
              <KPICard
                title="CPA"
                value={`R$ ${leadCPA.toFixed(2)}`}
                icon={<Target className="w-5 h-5" />}
                delay={300}
                description="Custo por lead — quanto custa cada mensagem"
              />
              <KPICard
                title="CTR"
                value={`${leadCTR}%`}
                icon={<MousePointerClick className="w-5 h-5" />}
                delay={400}
                description="Taxa de clique nos anúncios de lead"
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

            {/* Melhor anúncio */}
            {(() => {
              const todosAnuncios = campanhasLead.flatMap(c => c.ads.map(a => ({ ...a, campanha: c.name })));
              const melhorAnuncio = todosAnuncios.length > 0
                ? todosAnuncios.reduce((best, a) => (a.leads > best.leads ? a : best), todosAnuncios[0])
                : null;
              if (!melhorAnuncio || melhorAnuncio.leads === 0) return null;
              return (
                <div className="card-vault p-6 mb-10 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/80">
                      Melhor anúncio
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{melhorAnuncio.name}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Campanha: {melhorAnuncio.campanha}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {melhorAnuncio.leads} leads · {melhorAnuncio.clicks} cliques · CTR {melhorAnuncio.ctr.toFixed(2)}% · R$ {melhorAnuncio.spend.toFixed(2)} gasto
                  </p>
                </div>
              );
            })()}

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

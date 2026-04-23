import { useState } from "react";
import {
  DollarSign,
  Users,
  Target,
  MessageCircle,
  Eye,
  MousePointerClick,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { HeroSummary } from "@/components/dashboard/HeroSummary";
import { Podium } from "@/components/dashboard/Podium";
import { SpendChart } from "@/components/dashboard/SpendChart";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { CPAChart } from "@/components/dashboard/CPAChart";
import { CampaignDonut } from "@/components/dashboard/CampaignDonut";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { useMetaAds } from "@/hooks/useMetaAds";
import { useMetaAdsPrevious, pctChange } from "@/hooks/useMetaAdsPrevious";
import { mockDailyMetrics, mockCampaigns, getKPIs } from "@/lib/mock-data";

export default function Index() {
  const [days, setDays] = useState(30);
  const [customRange, setCustomRange] = useState<{ since: string; until: string } | undefined>();
  const { data, isLoading } = useMetaAds(days, customRange);
  const { data: prevData } = useMetaAdsPrevious(days, customRange);

  // Use real data if available, fallback to mock
  const metrics = data?.dailyMetrics ?? mockDailyMetrics.slice(-days);
  const campaigns = data?.campaigns ?? mockCampaigns;
  const kpis = data?.kpis ?? getKPIs(days);
  const prevKpis = prevData?.kpis;

  // Separar campanhas por tipo
  const campanhasMacete = campaigns.filter(
    (c) => c.tipo === "macete" || c.objective === "LINK_CLICKS"
  );
  const campanhasLead = campaigns.filter(
    (c) => c.tipo === "lead" || c.objective !== "LINK_CLICKS"
  );

  // KPIs Impulsionamento Instagram
  const maceteInvestido = campanhasMacete.reduce((s, c) => s + c.spend, 0);
  const maceteCliques = campanhasMacete.reduce((s, c) => s + c.clicks, 0);
  const maceteImpressions = campanhasMacete.reduce((s, c) => s + c.impressions, 0);
  const maceteCTR =
    maceteImpressions > 0
      ? Math.round((maceteCliques / maceteImpressions) * 10000) / 100
      : 0;

  // KPIs Campanhas de Lead
  const leadInvestido = campanhasLead.reduce((s, c) => s + c.spend, 0);
  const leadLeads = campanhasLead.reduce((s, c) => s + c.leads, 0);
  const leadCliques = campanhasLead.reduce((s, c) => s + c.clicks, 0);
  const leadCPA =
    leadLeads > 0 ? Math.round((leadInvestido / leadLeads) * 100) / 100 : 0;
  const leadImpressions = campanhasLead.reduce((s, c) => s + c.impressions, 0);
  const leadCTR =
    leadImpressions > 0
      ? Math.round((leadCliques / leadImpressions) * 10000) / 100
      : 0;

  // Melhor campanha de lead
  const melhorCampanha =
    campanhasLead.length > 0
      ? campanhasLead.reduce(
          (best, c) => (c.leads > best.leads ? c : best),
          campanhasLead[0]
        )
      : null;

  // Melhor anúncio de lead
  const todosAnuncios = campanhasLead.flatMap((c) =>
    c.ads.map((a) => ({ ...a, campanha: c.name }))
  );
  const melhorAnuncio =
    todosAnuncios.length > 0
      ? todosAnuncios.reduce(
          (best, a) => (a.leads > best.leads ? a : best),
          todosAnuncios[0]
        )
      : null;

  // Deltas vs período anterior
  const spendDelta = prevKpis
    ? pctChange(kpis.totalSpend, prevKpis.totalSpend)
    : null;
  const leadsDelta = prevKpis
    ? pctChange(kpis.totalLeads, prevKpis.totalLeads)
    : null;
  const cpaDelta = prevKpis ? pctChange(kpis.avgCPA, prevKpis.avgCPA) : null;
  const ctrDelta = prevKpis ? pctChange(kpis.avgCTR, prevKpis.avgCTR) : null;

  // Label do período pro hero
  const periodLabel = customRange
    ? `${new Date(customRange.since + "T12:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })} – ${new Date(customRange.until + "T12:00:00").toLocaleDateString(
        "pt-BR",
        { day: "2-digit", month: "short" }
      )}`
    : days === 1
    ? "hoje"
    : `últimos ${days} dias`;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <DashboardHeader
          selectedDays={days}
          onSelectDays={setDays}
          customRange={customRange}
          onCustomRange={setCustomRange}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10 text-muted-foreground/50 text-sm animate-pulse">
            Carregando dados em tempo real...
          </div>
        )}

        {/* HERO — manchete do período */}
        <HeroSummary
          spend={kpis.totalSpend}
          leads={kpis.totalLeads}
          cpa={kpis.avgCPA}
          periodLabel={periodLabel}
        />

        {/* VISÃO GERAL — linguagem do dono */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
            Visão Geral
          </h2>
          <p className="text-[10px] sm:text-xs text-muted-foreground/50 mt-1 tracking-wider">
            Os números que importam · {periodLabel}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-12">
          <KPICard
            title="Investimento"
            value={`R$ ${kpis.totalSpend.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`}
            icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
            delay={100}
            description="Quanto foi gasto em anúncios no período"
            delta={
              spendDelta !== null
                ? { pct: spendDelta, isGood: spendDelta <= 0 }
                : undefined
            }
            highlight
          />
          <KPICard
            title="Clientes que chamaram"
            value={kpis.totalLeads.toString()}
            icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
            delay={200}
            description="Pessoas que mandaram mensagem pelo anúncio"
            delta={
              leadsDelta !== null
                ? { pct: leadsDelta, isGood: leadsDelta >= 0 }
                : undefined
            }
            highlight
          />
          <KPICard
            title="Custo por cliente"
            value={`R$ ${kpis.avgCPA.toFixed(2)}`}
            icon={<Target className="w-4 h-4 sm:w-5 sm:h-5" />}
            delay={300}
            description="Quanto custou, em média, cada conversa no WhatsApp"
            delta={
              cpaDelta !== null
                ? { pct: cpaDelta, isGood: cpaDelta <= 0 }
                : undefined
            }
            highlight
          />
          <KPICard
            title="Interesse (CTR)"
            value={`${kpis.avgCTR}%`}
            icon={<MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />}
            delay={400}
            description="% de pessoas que clicaram ao ver o anúncio"
            delta={
              ctrDelta !== null
                ? { pct: ctrDelta, isGood: ctrDelta >= 0 }
                : undefined
            }
            highlight
          />
        </div>

        {/* PÓDIO — destaque dos melhores */}
        {(melhorCampanha || (melhorAnuncio && melhorAnuncio.leads > 0)) && (
          <Podium bestCampaign={melhorCampanha} bestAd={melhorAnuncio} />
        )}

        {/* SEÇÃO 1: MACETE DO MILHÃO */}
        {campanhasMacete.length > 0 && (
          <>
            <div className="mb-4 sm:mb-6 mt-10 sm:mt-14">
              <h2 className="text-base sm:text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
                Impulsionamento Instagram
              </h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground/50 mt-1 tracking-wider">
                Alcance · Engajamento · Crescimento de base
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
              <KPICard
                title="Investido"
                value={`R$ ${maceteInvestido.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={100}
                description="Valor investido em campanhas de captação"
              />
              <KPICard
                title="Visitas ao Perfil"
                value={maceteCliques.toLocaleString("pt-BR")}
                icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={200}
                description="Cliques que levaram ao perfil do Instagram"
              />
              <KPICard
                title="Custo por Visita"
                value={`R$ ${
                  maceteCliques > 0 ? (maceteInvestido / maceteCliques).toFixed(2) : "0.00"
                }`}
                icon={<Target className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={300}
                description="Quanto custa cada visita ao perfil"
              />
              <KPICard
                title="CTR"
                value={`${maceteCTR}%`}
                icon={<MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={400}
                description="Taxa de clique dos anúncios de captação"
              />
            </div>
            <CampaignTable campaigns={campanhasMacete} showLeads={false} />
          </>
        )}

        {/* SEÇÃO 2: CAMPANHAS DE LEAD */}
        {campanhasLead.length > 0 && (
          <>
            <div className="mb-4 sm:mb-6 mt-10 sm:mt-14">
              <h2 className="text-base sm:text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
                Campanhas de Lead
              </h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground/50 mt-1 tracking-wider">
                Captação de leads · Mensagens WhatsApp · Conversão
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
              <KPICard
                title="Investido"
                value={`R$ ${leadInvestido.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={100}
                description="Valor investido em campanhas de conversão"
              />
              <KPICard
                title="Leads"
                value={leadLeads.toString()}
                icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={200}
                description="Mensagens recebidas via WhatsApp dos anúncios"
              />
              <KPICard
                title="CPA"
                value={`R$ ${leadCPA.toFixed(2)}`}
                icon={<Target className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={300}
                description="Custo por lead — quanto custa cada mensagem"
              />
              <KPICard
                title="CTR"
                value={`${leadCTR}%`}
                icon={<MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />}
                delay={400}
                description="Taxa de clique nos anúncios de lead"
              />
            </div>

            <CampaignTable campaigns={campanhasLead} />
          </>
        )}

        {/* Gráficos */}
        <div className="mb-4 sm:mb-6 mt-10 sm:mt-14">
          <h2 className="text-base sm:text-xl font-bold tracking-[0.1em] uppercase text-primary/80">
            Evolução Diária
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <SpendChart data={metrics} />
          <LeadsChart data={metrics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <CPAChart data={metrics} />
          <CampaignDonut campaigns={campaigns} />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16 text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
          {data?.updatedAt
            ? `Atualizado às ${new Date(data.updatedAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })} · Dados em tempo real · Castel Black`
            : "Dados em tempo real · Castel Black"}
        </div>
      </div>
    </div>
  );
}

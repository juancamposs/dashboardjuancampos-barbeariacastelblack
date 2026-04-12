export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  objective?: string;
  tipo?: "macete" | "lead";
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  leads: number;
  cpa: number;
  ads: Ad[];
}

export interface Ad {
  id: string;
  name: string;
  spend: number;
  clicks: number;
  ctr: number;
  leads: number;
}

export interface DailyMetric {
  date: string;
  spend: number;
  leads: number;
  cpa: number;
}

export const mockDailyMetrics: DailyMetric[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    spend: Math.round(80 + Math.random() * 120),
    leads: Math.round(5 + Math.random() * 20),
    cpa: Math.round((15 + Math.random() * 25) * 100) / 100,
  };
});

export const mockCampaigns: Campaign[] = [
  {
    id: "1", name: "Corte Premium — Captação", status: "active",
    spend: 1245.80, impressions: 48320, clicks: 1890, ctr: 3.91, cpc: 0.66, leads: 87, cpa: 14.32,
    ads: [
      { id: "1a", name: "Criativo Barba — Stories", spend: 520.30, clicks: 820, ctr: 4.2, leads: 38 },
      { id: "1b", name: "Criativo Corte — Feed", spend: 725.50, clicks: 1070, ctr: 3.7, leads: 49 },
    ],
  },
  {
    id: "2", name: "Barba Completa — Remarketing", status: "active",
    spend: 890.45, impressions: 32100, clicks: 1420, ctr: 4.42, cpc: 0.63, leads: 62, cpa: 14.36,
    ads: [
      { id: "2a", name: "Vídeo Testimonial", spend: 450.20, clicks: 780, ctr: 4.8, leads: 35 },
      { id: "2b", name: "Carrossel Antes/Depois", spend: 440.25, clicks: 640, ctr: 3.9, leads: 27 },
    ],
  },
  {
    id: "3", name: "Combo VIP — Lookalike", status: "paused",
    spend: 560.20, impressions: 21800, clicks: 780, ctr: 3.58, cpc: 0.72, leads: 28, cpa: 20.01,
    ads: [
      { id: "3a", name: "Imagem Ambiente Premium", spend: 320.10, clicks: 440, ctr: 3.8, leads: 16 },
      { id: "3b", name: "Stories Promoção", spend: 240.10, clicks: 340, ctr: 3.2, leads: 12 },
    ],
  },
];

export function getKPIs(days: number) {
  const metrics = mockDailyMetrics.slice(-days);
  const totalSpend = metrics.reduce((s, m) => s + m.spend, 0);
  const totalLeads = metrics.reduce((s, m) => s + m.leads, 0);
  return {
    totalSpend: Math.round(totalSpend * 100) / 100,
    totalLeads,
    avgCPA: Math.round((totalSpend / totalLeads) * 100) / 100,
    avgCTR: 3.83,
  };
}

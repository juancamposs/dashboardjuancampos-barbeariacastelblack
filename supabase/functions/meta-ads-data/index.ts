import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GRAPH_API = "https://graph.facebook.com/v25.0";

// Castel Black - hardcoded por enquanto, depois migra pra tabela
const META_ACCOUNT_ID = "act_994354533471788";
const META_TOKEN = "EAANieUTuCjMBRAQOqcYvoFseolsbc6YcEwkbOgZAgAeEBCG6mZCaHfyrN1asCUCwEjizyGKgwZBcwTLZCifZBJpZA6fLGQO8JV4HRzWts9hlWCua43nUBPrSeZChlu4HzG9GTqK1LsXmG0DlxDha31gMc6lrCUOH58B7JnNKLiRiZAPLh2CRJH3tmuTZBKIDhGXkN7AZDZD";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const since = url.searchParams.get("since");
    const until = url.searchParams.get("until");
    const days = parseInt(url.searchParams.get("days") || "30");

    // Usar time_range para datas específicas, ou date_preset para períodos
    let dateParam: string;
    if (since && until) {
      dateParam = `time_range={"since":"${since}","until":"${until}"}`;
    } else {
      const datePreset = days <= 1 ? "today" : days <= 7 ? "last_7d" : days <= 14 ? "last_14d" : "last_30d";
      dateParam = `date_preset=${datePreset}`;
    }

    // 1. Buscar insights por campanha
    const campaignResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=campaign_id,campaign_name,spend,impressions,clicks,cpc,cpm,ctr,actions&${dateParam}&level=campaign&limit=50&access_token=${META_TOKEN}`
    );
    const campaignData = await campaignResp.json();

    if (campaignData.error) {
      throw new Error(campaignData.error.message);
    }

    // 2. Buscar insights por anúncio
    const adResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=campaign_id,campaign_name,ad_id,ad_name,spend,impressions,clicks,cpc,ctr,actions&${dateParam}&level=ad&limit=50&access_token=${META_TOKEN}`
    );
    const adData = await adResp.json();

    // 3. Buscar insights diários
    const dailyResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=spend,impressions,clicks,actions&${dateParam}&time_increment=1&limit=60&access_token=${META_TOKEN}`
    );
    const dailyData = await dailyResp.json();

    // 4. Buscar status e objetivo das campanhas
    const statusResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/campaigns?fields=id,name,status,objective&limit=50&access_token=${META_TOKEN}`
    );
    const statusData = await statusResp.json();
    const statusMap = new Map(
      (statusData.data || []).map((c: any) => [c.id, { status: c.status.toLowerCase(), objective: c.objective }])
    );

    // Processar campanhas
    const adsByCampaign = new Map<string, any[]>();
    for (const ad of adData.data || []) {
      const cid = ad.campaign_id;
      if (!adsByCampaign.has(cid)) adsByCampaign.set(cid, []);
      const leads = getLeads(ad.actions);
      adsByCampaign.get(cid)!.push({
        id: ad.ad_id,
        name: ad.ad_name,
        spend: parseFloat(ad.spend || "0"),
        clicks: parseInt(ad.clicks || "0"),
        ctr: parseFloat(ad.ctr || "0"),
        leads,
      });
    }

    const campaigns = (campaignData.data || []).map((c: any) => {
      const leads = getLeads(c.actions);
      const spend = parseFloat(c.spend || "0");
      const info = statusMap.get(c.campaign_id) || { status: "active", objective: "" };
      const status = info.status;
      const objective = info.objective || "";
      const tipo = objective === "LINK_CLICKS" ? "macete" : "lead";
      return {
        id: c.campaign_id,
        name: c.campaign_name,
        status: status === "active" ? "active" : status === "paused" ? "paused" : "completed",
        objective,
        tipo,
        spend,
        impressions: parseInt(c.impressions || "0"),
        clicks: parseInt(c.clicks || "0"),
        ctr: parseFloat(c.ctr || "0"),
        cpc: parseFloat(c.cpc || "0"),
        leads,
        cpa: leads > 0 ? Math.round((spend / leads) * 100) / 100 : 0,
        ads: adsByCampaign.get(c.campaign_id) || [],
      };
    });

    // Processar métricas diárias
    const dailyMetrics = (dailyData.data || []).map((d: any) => {
      const spend = parseFloat(d.spend || "0");
      const leads = getLeads(d.actions);
      return {
        date: d.date_start,
        spend,
        leads,
        cpa: leads > 0 ? Math.round((spend / leads) * 100) / 100 : 0,
      };
    });

    // Calcular KPIs
    const totalSpend = dailyMetrics.reduce((s: number, m: any) => s + m.spend, 0);
    const totalLeads = dailyMetrics.reduce((s: number, m: any) => s + m.leads, 0);
    const totalClicks = campaigns.reduce((s: number, c: any) => s + c.clicks, 0);
    const totalImpressions = campaigns.reduce((s: number, c: any) => s + c.impressions, 0);

    const result = {
      kpis: {
        totalSpend: Math.round(totalSpend * 100) / 100,
        totalLeads,
        avgCPA: totalLeads > 0 ? Math.round((totalSpend / totalLeads) * 100) / 100 : 0,
        avgCTR: totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 10000) / 100 : 0,
      },
      dailyMetrics,
      campaigns,
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function getLeads(actions: any[]): number {
  if (!actions) return 0;
  const find = (type: string) => {
    const a = actions.find((a: any) => a.action_type === type);
    return a ? parseInt(a.value || "0") : 0;
  };
  // Prioridade: conversas iniciadas no WhatsApp (não soma com first_reply para evitar duplicação)
  const whatsapp = find("onsite_conversion.messaging_conversation_started_7d");
  if (whatsapp > 0) return whatsapp;
  // Fallback para formulários de lead
  const leadForm = find("lead") || find("offsite_conversion.fb_pixel_lead");
  return leadForm;
}

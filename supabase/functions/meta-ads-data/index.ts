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
    const days = parseInt(url.searchParams.get("days") || "30");

    const datePreset = days <= 1 ? "today" : days <= 7 ? "last_7d" : days <= 14 ? "last_14d" : "last_30d";

    // 1. Buscar insights por campanha
    const campaignResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=campaign_id,campaign_name,spend,impressions,clicks,cpc,cpm,ctr,actions&date_preset=${datePreset}&level=campaign&limit=50&access_token=${META_TOKEN}`
    );
    const campaignData = await campaignResp.json();

    if (campaignData.error) {
      throw new Error(campaignData.error.message);
    }

    // 2. Buscar insights por anúncio
    const adResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=campaign_id,campaign_name,ad_id,ad_name,spend,impressions,clicks,cpc,ctr,actions&date_preset=${datePreset}&level=ad&limit=50&access_token=${META_TOKEN}`
    );
    const adData = await adResp.json();

    // 3. Buscar insights diários
    const dailyResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/insights?fields=spend,impressions,clicks,actions&date_preset=${datePreset}&time_increment=1&limit=60&access_token=${META_TOKEN}`
    );
    const dailyData = await dailyResp.json();

    // 4. Buscar status das campanhas
    const statusResp = await fetch(
      `${GRAPH_API}/${META_ACCOUNT_ID}/campaigns?fields=id,name,status&limit=50&access_token=${META_TOKEN}`
    );
    const statusData = await statusResp.json();
    const statusMap = new Map(
      (statusData.data || []).map((c: any) => [c.id, c.status.toLowerCase()])
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
      const status = statusMap.get(c.campaign_id) || "active";
      return {
        id: c.campaign_id,
        name: c.campaign_name,
        status: status === "active" ? "active" : status === "paused" ? "paused" : "completed",
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
  let leads = 0;
  for (const a of actions) {
    if (
      a.action_type === "onsite_conversion.messaging_conversation_started_7d" ||
      a.action_type === "onsite_conversion.messaging_first_reply" ||
      a.action_type === "lead" ||
      a.action_type === "offsite_conversion.fb_pixel_lead"
    ) {
      leads += parseInt(a.value || "0");
    }
  }
  return leads;
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Campaign, DailyMetric } from "@/lib/mock-data";

interface KPIs {
  totalSpend: number;
  totalLeads: number;
  avgCPA: number;
  avgCTR: number;
}

interface MetaAdsData {
  kpis: KPIs;
  dailyMetrics: DailyMetric[];
  campaigns: Campaign[];
  updatedAt: string;
}

export function useMetaAds(days: number) {
  return useQuery<MetaAdsData>({
    queryKey: ["meta-ads", days],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("meta-ads-data", {
        body: null,
        method: "GET",
      });

      // Workaround: supabase.functions.invoke doesn't support query params well
      // So we call the function URL directly
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vnamxmndwxwqybhswzox.supabase.co";
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

      const resp = await fetch(
        `${supabaseUrl}/functions/v1/meta-ads-data?days=${days}`,
        {
          headers: {
            "Authorization": `Bearer ${supabaseKey}`,
            "apikey": supabaseKey,
          },
        }
      );

      if (!resp.ok) {
        throw new Error(`Failed to fetch: ${resp.status}`);
      }

      return resp.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider stale after 2 minutes
  });
}

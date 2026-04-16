import { useQuery } from "@tanstack/react-query";
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

interface DateRange {
  since: string;
  until: string;
}

const SUPABASE_URL = "https://vnamxmndwxwqybhswzox.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW14bW5kd3h3cXliaHN3em94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTA3OTUsImV4cCI6MjA5MDcyNjc5NX0.iJG6HW2zNUFEfmuFSLdphe-lJBC9FteDewqTbOGSNkM";

export function useMetaAds(days: number, customRange?: DateRange) {
  return useQuery<MetaAdsData>({
    queryKey: ["meta-ads", days, customRange?.since, customRange?.until],
    queryFn: async () => {
      let queryString: string;
      if (customRange?.since && customRange?.until) {
        queryString = `since=${customRange.since}&until=${customRange.until}`;
      } else {
        queryString = `days=${days}`;
      }

      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/meta-ads-data?${queryString}`,
        {
          headers: {
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "apikey": SUPABASE_KEY,
          },
        }
      );

      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`Fetch failed: ${resp.status} ${err}`);
      }

      return resp.json();
    },
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

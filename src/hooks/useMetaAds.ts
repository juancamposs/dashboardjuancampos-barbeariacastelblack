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

const SUPABASE_URL = "https://vnamxmndwxwqybhswzox.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW14bW5kd3h3cXliaHN3em94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTA3OTUsImV4cCI6MjA5MDcyNjc5NX0.iJG6HW2zNUFEfmuFSLdphe-lJBC9FteDewqTbOGSNkM";

export function useMetaAds(days: number) {
  return useQuery<MetaAdsData>({
    queryKey: ["meta-ads", days],
    queryFn: async () => {
      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/meta-ads-data?days=${days}`,
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

import { useMemo } from "react";
import { useMetaAds } from "./useMetaAds";

interface DateRange {
  since: string;
  until: string;
}

/**
 * Busca os KPIs do período IMEDIATAMENTE ANTERIOR ao selecionado,
 * com a mesma duração — usado pra calcular variação (% vs período anterior).
 *
 * Ex: se o usuário escolheu últimos 30 dias, busca os 30 dias antes desses.
 */
export function useMetaAdsPrevious(days: number, customRange?: DateRange) {
  const previousRange = useMemo<DateRange>(() => {
    if (customRange?.since && customRange?.until) {
      const since = new Date(customRange.since + "T12:00:00");
      const until = new Date(customRange.until + "T12:00:00");
      const diffDays =
        Math.round((until.getTime() - since.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const prevUntil = new Date(since);
      prevUntil.setDate(prevUntil.getDate() - 1);
      const prevSince = new Date(prevUntil);
      prevSince.setDate(prevSince.getDate() - (diffDays - 1));

      return {
        since: prevSince.toISOString().split("T")[0],
        until: prevUntil.toISOString().split("T")[0],
      };
    }

    // Preset por dias: calcula janela imediatamente anterior
    const today = new Date();
    const prevUntil = new Date(today);
    prevUntil.setDate(prevUntil.getDate() - days);
    const prevSince = new Date(prevUntil);
    prevSince.setDate(prevSince.getDate() - (days - 1));

    return {
      since: prevSince.toISOString().split("T")[0],
      until: prevUntil.toISOString().split("T")[0],
    };
  }, [days, customRange?.since, customRange?.until]);

  // Usa o mesmo useMetaAds com o range calculado — força customRange
  return useMetaAds(days, previousRange);
}

/**
 * Calcula variação percentual entre dois valores. Retorna null se não houver base.
 */
export function pctChange(current: number, previous: number): number | null {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useAnalysis } from "@/hooks/useAnalysis";
import { AnalysisOverview } from "@/types/analysis";
import { TransferCardSkeleton } from "@/components/Utils/TransferCard/TransferCardSkeleton";

const chartConfig = {
  entradas: {
    label: "Entradas",
    color: "#16a34a",
  },
  saidas: {
    label: "Saídas",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export function AnalyticsOverview() {
  const [expanded, setExpanded] = useState(true);
  const [chartData, setChartData] = useState<AnalysisOverview[]>([]);
  const { getOverview, loading } = useAnalysis();
  function formatCurrency(value: number) {
    if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(1)}bi`;
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}mi`;
    if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)} mil`;

    return `R$ ${value.toFixed(2)}`;
  }
  
  useEffect(() => {
    const fethOverview = async () => {
      const res = await getOverview();
      
      setChartData(res ?? []);
    };
    fethOverview();
  }, []);


  return (
    <section className="flex flex-col px-6 w-full">
      {loading ? (
        Array.from({ length: 1 }).map((_, i) => <TransferCardSkeleton key={i} />)
      ) : (
        <div
          className={cn(
            "transition-all duration-300 rounded-xl border p-4 bg-background shadow-md",
            expanded ? "h-full" : "h-16 overflow-hidden"
          )}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold text-muted-foreground">Análise rápida das finanças</h2>
            <div className="flex gap-2">
              <Link to="/dashboard/financeiro">
                <Button size="sm" variant="default">
                  Ver mais
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Ocultar" : "Expandir"}
              </Button>
            </div>
          </div>

          <ChartContainer config={chartConfig} className={`w-full h-[24rem] ${expanded ? "block" : "hidden"}`}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={true} />
              <XAxis dataKey="month" tickLine={true} tickMargin={10} axisLine={true} />
              <YAxis tickFormatter={formatCurrency} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent  filterNull />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="entradas" fill="var(--color-entradas)" radius={4} />
              <Bar dataKey="saidas" fill="var(--color-saidas)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </section>
  );
}

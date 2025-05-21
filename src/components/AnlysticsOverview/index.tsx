import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  { month: "Jan", entradas: 4200, saidas: 2900 },
  { month: "Fev", entradas: 5100, saidas: 3300 },
  { month: "Mar", entradas: 4800, saidas: 4000 },
  { month: "Abr", entradas: 5300, saidas: 3500 },
  { month: "Mai", entradas: 6100, saidas: 4200 },
  { month: "Jun", entradas: 4900, saidas: 3700 },
];

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

  return (
    <section className={`flex flex-col px-6 w-full`}>
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
        <ChartContainer config={chartConfig} className={`w-full h-[20rem] ${expanded ? "block" : "hidden"}`}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} />
            <XAxis dataKey="month" tickLine={true} tickMargin={10} axisLine={true} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="entradas" fill="var(--color-entradas)" radius={4} />
            <Bar dataKey="saidas" fill="var(--color-saidas)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </section>
  );
}

import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function BalanceCard() {
  return (
    <div className="p-4">
      <Card className="@container/card h-fit">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground">Saldo atual</CardDescription>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="group flex items-center gap-2 cursor-pointer w-fit"
                  onClick={() => {
                    console.log("Atualizando saldo...");
                  }}
                >
                  <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">R$ 1.250,00</CardTitle>
                  <RefreshCw className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Atualizar saldo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>

        <CardContent className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <TrendingUp className="size-4" />
          <span>+3,5% de rendimento este mês</span>
        </CardContent>

        <CardFooter className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">Seu dinheiro teve um crescimento saudável esse mês.</p>
          <Button variant="outline" size="sm">
            Ver detalhes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

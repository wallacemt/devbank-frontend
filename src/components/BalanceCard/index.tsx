import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RefreshCw } from "lucide-react";
import { useUserContext } from "@/hooks/useUserContext";
import { balanceFormater } from "../Utils/balanceFormater";
export const BalanceCard = () => {
  const { user, handleUpdate } = useUserContext();
  useEffect(() => {
    const lines = document.querySelectorAll(".terminal-line");
    lines.forEach((line, index) => {
      line.setAttribute("style", "opacity: 0;");
      setTimeout(() => {
        line.setAttribute("style", "transition: opacity 0.5s ease; opacity: 1;");
      }, index * 300);
    });

    const pulse = document.querySelector(".pulse");
    if (pulse) {
      setInterval(() => {
        pulse.classList.add("scale-105");
        setTimeout(() => pulse.classList.remove("scale-105"), 500);
      }, 3000);
    }
  }, []);

  return (
    <Card className="bg-gray-900 text-gray-100 w-full max-w-5xl border-none shadow-md relative overflow-hidden rounded-xl mx-auto  p-[0.5rem]">
      <div className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rotate-[25deg] bg-gradient-to-br from-transparent via-cyan-400/10 to-transparent animate-[shine_20s_linear_infinite] duration-[10s]"></div>

      <CardHeader className="flex items-center justify-between space-x-2 px-6 py-4">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <div className="w-4 h-4 rounded-full bg-green-500" />
        </div>
        <CardDescription className="text-sm text-gray-400 font-semibold">devBank Terminal v1.0.3</CardDescription>
        <span>{""}</span>
      </CardHeader>

      {/* Horizontal layout */}
      <CardContent className="flex flex-col md:flex-row gap-6 p-6 ">
        {/* Left side: Terminal & Code */}
        <div className="flex-1 xl:block hidden space-y-6">
          {/* Terminal lines */}
          <div className="terminal-line text-cyan-400 text-sm">
            <span className="text-gray-400">{user?.name.split(" ")[0].toLowerCase()}@devbank:~$</span> check_balance
            --account=personal
          </div>

          <div className="terminal-line text-green-400 text-sm">
            <span className="text-gray-400">system:</span> Account balance retrieved successfully
          </div>

          {/* Code snippet */}
          <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4 text-xs font-mono text-gray-500 space-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
            <div className="relative z-10">// devBank secure transaction</div>
            <div className="relative z-10">function checkBalance() {"{"}</div>
            <div className="ml-4 relative z-10">const account = {user?.account.accountId.slice(0, 8)}...;</div>
            <div className="ml-4 relative z-10">const balance = {user?.account.balance};</div>
            <div className="ml-4 relative z-10">return secureDisplay(balance);</div>
            <div className="relative z-10">{"}"}</div>
          </div>
        </div>

        {/* Right side: Balance Info */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-gray-400 text-sm mb-1">SALDO ATUAL</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group flex items-center gap-2 cursor-pointer w-fit" onClick={() => handleUpdate()}>
                    <CardTitle className="text-xl md:text-4xl font-bold text-cyan-400 text-shadow-neon">
                      {balanceFormater(user?.account.balance!)}
                    </CardTitle>
                    <RefreshCw className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Atualizar saldo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Yield & Account Info */}
          <div className="flex justify-between">
            <div>
              <div className="text-gray-400 text-sm mb-1">RENDIMENTO</div>
              <div className="text-green-400 font-medium">+1,25% este mês</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-sm mb-1">CONTA</div>
              <div className="text-cyan-400">#DEV-{user?.account.accountId.slice(0, 8)}</div>
            </div>
          </div>

          {/* Button */}
          <Button
            variant="outline"
            className="w-full bg-Destaque/50 hover:bg-Destaque/80 flex justify-center gap-2 font-bold"
          >
            Ver mais detalhes <FaArrowRight />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-800 text-xs text-gray-500 justify-center space-x-4">
        <span>SHA-256: a1b2c3d4e5f6</span>
        <span>SSL/TLS 1.3</span>
      </CardFooter>
    </Card>
  );
};

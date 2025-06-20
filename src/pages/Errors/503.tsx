import notFoundSvg from "@/assets/images/503.svg";
import { useEffect } from "react";

export default function ServerMaintenance() {
  useEffect(() => {
    document.title = "DevBank | 503";
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <img
        src={notFoundSvg}
        alt="Ilustração de erro 503 - Servidor em manutenção"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className="w-full lg:w-1/5 animate-float"
      />

      <div className="sm:mt-0 mt-6 text-center w-full flex flex-col gap-2">
        <h1 className="font-bold font-principal text-amber-500 lg:w-[30%] lg:mx-auto " style={{ fontSize: "2.5rem" }}>
          503 - Servidor Em Manutenção
        </h1>
        <p className="text-lg font-secundaria font-semibold text-white mt-4 lg:max-w-[40%] mx-auto">
          Lamentamos o inconveniente, O servidor esta em manutenção, tente novamente mais tarde.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-amber-500/60 hover:bg-amber-600 text-white font-bold rounded transition w-fit"
      >
        Tentar novamente
      </button>
    </div>
  );
}

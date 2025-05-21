import notFoundSvg from "@/assets/images/404-svg.svg";
import { useEffect } from "react";
import { Link } from "react-router";

export default function NotFound() {
  useEffect(() => {
    document.title = "DevBank | 404";
  }, []);
  return (
    <div className={`h-screen bg-no-repeat bg-background flex flex-col items-center justify-center lg:mx-auto`}>
      <img src={notFoundSvg} alt="404 Ilustration" className="w-full lg:w-1/3 animate-float" />

      <div className="sm:mt-0 mt-6 text-center w-full flex flex-col gap-2">
        <h1 className="font-bold font-principal text-amber-500 lg:w-[30%] lg:mx-auto " style={{ fontSize: "3rem" }}>
          404 - Pagina não encontrada!
        </h1>
        <p className="text-lg font-secundaria font-semibold text-white mt-4">
          A pagina que você está procurando não foi encontrada.
        </p>
        <Link
          to={"/"}
          className="bg-Destaque/80 hover:bg-Destaque font-bold py-2 px-4 rounded-md mt-8 w-80 mx-auto"
          style={{ color: "white" }}
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

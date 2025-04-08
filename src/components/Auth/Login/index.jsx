import React, { useEffect, useState } from "react";
import { AuthBanner } from "../../Utils/AuthBanner";
import { Eye, EyeOff, User, Lock, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  document.title = "DevBank | Login";

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Enviado");
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  });
  return (
    <div className="h-screen bg-[#2a3240] flex">
      <div className="h-full">
        <AuthBanner position="left" />
      </div>

      <section
        className="lg:absolute right-[10%] top-4 lg:w-1/3 lg:h-fit sm:w-2/3 w-full max-w-lg rounded-xl p-6 md:p-10 flex flex-col items-center mx-auto text-white bg-[#1e2530]/90 backdrop-blur-md shadow-lg"
        data-aos="fade-down"
      >
        <h2 className="text-5xl sm:text-6xl font-bold font-principal text-center lg:hidden mb-4 ">
          <span className="text-Destaque">Dev</span>BANK
          <span className="text-amber-600">$</span>
        </h2>

        <h3 className="text-3xl font-semibold mb-2 font-secundaria text-center">
          Bem-vindo(a) de volta <span className="text-Destaque/80 font-principal">Dev</span>
        </h3>
        <p className="text-sm mb-6 text-gray-300 text-center">
          Acesse sua conta para continuar sua jornada financeira como um <span className="font-principal">Dev</span> de
          respeito 🚀
        </p>

        <form className="flex flex-col items-center w-full gap-4" onSubmit={handleFormSubmit}>
          {/* Login Input */}
          <div className="relative w-full">
            <User className="absolute left-2 top-2 text-neutra10" size={24} />
            <input
              type="text"
              placeholder="E-mail ou CPF"
              className="pl-10 pr-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <Lock className="absolute left-2 top-2 text-gray-400" size={24} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="pl-10 pr-10 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="w-full text-right">
            <button className="text-sm text-blue-300 hover:underline">Esqueceu a senha?</button>
          </div>

          <button
            type="submit"
            className="bg-primary80/50 hover:bg-primary90/100 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-md w-full"
          >
            Entrar na conta
          </button>
        </form>
        <div className="flex items-center w-full my-4 text-gray-100">
          <div className="flex-grow border-t border-gray-600" />
          <span className="mx-3 text-sm">ou</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        <p className="text-gray-200 text-lg flex items-center gap-2">
          Ainda não tem conta?{" "}
          <button
            type="button"
            className="text-amber-600 hover:underline font-principal"
            onClick={() => navigate("/register")}
          >
            Cadastrar-se
          </button>
        </p>
        <div className="w-48 mt-4">
          <img src="/images/Security.svg" alt="Security Ilustration" className="w-full" />
        </div>
      </section>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { AuthBanner } from "@/components/Utils/AuthBanner";
import { Eye, EyeOff, User, Lock, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";
import Aos from "aos";
import { StepEmailVerify } from "../Register/StepEmailVerify";
import { useLogin } from "../../../hooks/useLogin";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  document.title = "DevBank | Login";

  const { updateField, data, errors, step, handleLogin } = useLogin();

  const navigate = useNavigate();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("Enviado");
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  });

  return (
    <div className="h-screen bg-[#2a3240] overflow-hidden">
      <div className="max-w-full">
        <AuthBanner position="left" />
      </div>

      <section
        className="lg:absolute right-[10%] top-4 lg:w-1/3 h-fit max-h-full sm:w-2/3 w-full max-w-lg rounded-xl p-6 md:p-10 flex flex-col items-center my-auto mx-auto text-white bg-[#1e2530]/90 backdrop-blur-md shadow-lg"
        data-aos="fade-down"
      >
        <h2 className="text-5xl sm:text-6xl font-bold font-principal text-center lg:hidden mb-4 ">
          <span className="text-Destaque">Dev</span>BANK
          <span className="text-amber-600">$</span>
        </h2>

        <h3 className="text-5xl font-semibold mb-2 font-secundaria text-center">
          Bem-vindo(a) de volta{" "}
          <span className="text-Destaque/80 font-principal">Dev</span>
        </h3>
        <p className="text-sm mb-6 text-gray-300 text-center">
          Acesse sua conta para continuar sua jornada financeira como um{" "}
          <span className="font-principal">Dev</span> de respeito 🚀
        </p>

        {step === 0 ? (
          <form
            className="flex flex-col items-center w-full gap-4"
            onSubmit={handleLogin}
          >
            <div className="relative w-full">
              <User className="absolute left-3 top-3 text-neutra10" size={30} />
              <input
                type="text"
                placeholder="E-mail ou CPF"
                onChange={(e) => updateField("email", e.target.value)}
                className={`pl-12 pr-4 py-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full text-lg ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>
            <div className="relative w-full">
              <Lock className="absolute left-3 top-3 text-neutra10" size={30} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                onChange={(e) => updateField("password", e.target.value)}
                className={`pl-12 pr-10 py-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full text-lg ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <div className="w-full text-right">
              <button className="text-base text-blue-300 hover:underline">
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="bg-primary80/50 hover:bg-primary90/100 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-md w-full text-lg"
            >
              Entrar na conta
            </button>
          </form>
        ) : (
          <StepEmailVerify data={data} onChange={updateField} />
        )}
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
      </section>
    </div>
  );
};

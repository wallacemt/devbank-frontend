import { useEffect, useState } from "react";
import { AuthBanner } from "@/components/Utils/AuthBanner";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import Aos from "aos";
import { useLogin } from "../../hooks/useLogin";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { StepEmailVerify } from "@/components/Auth/StepEmailVerify";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { step, handleLogin, form, emailData, handleCodeVerify, error, codeForm, message, loading, reqError } =
    useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "DevBank | Login";
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="h-screen w-screen bg-[#2a3240] overflow-hidden">
      <div className="max-w-full">
        <AuthBanner position="left" />
      </div>
      <section
        className="lg:absolute right-[10%] top-4 lg:w-1/3 h-fit w-full max-w-lg rounded-xl p-6 md:p-10 flex flex-col items-center my-auto mx-auto  text-white bg-[#1e2530]/90 backdrop-blur-md shadow-lg"
        data-aos="fade-down"
      >
        <h2 className="text-5xl sm:text-6xl font-bold font-principal text-center lg:hidden mb-4 ">
          <span className="text-Destaque">Dev</span>BANK <span className="text-amber-600">$</span>{" "}
        </h2>{" "}
        <h3 className="lg:text-5xl text-3xl font-semibold mb-2 font-secundaria text-center">
          Bem-vindo(a) de volta <span className="text-Destaque/80 font-principal">Dev</span>{" "}
        </h3>{" "}
        <p className="text-sm mb-6 text-gray-300 text-center">
          Acesse sua conta para continuar sua jornada financeira como um <span className="font-principal">Dev</span> de
          respeito 🚀{" "}
        </p>
        {step === 0 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col items-center w-full gap-4">
              <FormField
                control={form.control}
                name="emailOrCpf"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="text-white" htmlFor="emailOrCpf">
                      E-mail ou CPF
                    </FormLabel>
                    <div className="relative">
                      <User className="absolute left-2 top-3 text-neutra10" size={30} />
                      <Input
                        {...field}
                        onChange={(e) => {
                          form.setValue(field.name, e.target.value);
                          form.trigger(field.name);
                        }}
                        id="emailOrCpf"
                        placeholder="E-mail ou CPF"
                        className="pl-12 pr-4 py-6 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-lg"
                      />
                    </div>
                    <FormMessage className="text-red-500 text-sm mt-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="text-white" htmlFor="passAuth">
                      Senha
                    </FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-neutra10" size={30} />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          form.setValue(field.name, e.target.value);
                          form.trigger(field.name);
                        }}
                        id="passAuth"
                        placeholder="Senha"
                        className="pl-12 pr-10 py-6 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                      </button>
                    </div>
                    <FormMessage className="text-red-500 text-sm mt-2" />
                  </FormItem>
                )}
              />
              <div className="w-full text-right">
                <button className="text-base text-blue-300 hover:underline">Esqueceu a senha?</button>
              </div>
             
              <Button
                type="submit"
                className="bg-primary80/50 hover:bg-primary90/100 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-md w-full text-lg"
                disabled={!form.formState.isValid}
                onClick={async () => {
                  const msg = message || error;
                  if (msg) {
                    await toast(msg);
                  }
                }}
              >
                {loading ? <span className="inline-block animate-pulse">Carregando...</span> : " Entrar na conta"}
              </Button>
            </form>
          </Form>
        ) : (
          <StepEmailVerify
            data={emailData}
            error={error}
            onChange={(value: any) => codeForm.setValue("code", value)}
            onSubmit={() => handleCodeVerify(emailData.code)}
          />
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

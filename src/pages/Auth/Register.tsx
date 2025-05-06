import { useEffect } from "react";
import { useNavigate } from "react-router";

import Aos from "aos";
import { useRegister } from "@/hooks/useRegister";
import { AuthBanner } from "@/components/Utils/AuthBanner";
import { Stepper } from "@/components/Stepper";
import { StepPersonalInfo } from "@/components/StepPersonalInfo";
import { StepEmailVerify } from "@/components/StepEmailVerify";
import { StepPassword } from "@/components/StepPassoword";
export const Register = () => {
  const navigate = useNavigate();

  const { ...useRes } = useRegister();

  const handleChange = (key: any, value: any) => {
    useRes.updateField(key, value);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const handleSubmit = () => {

  }

  return (
    <div className="h-screen bg-[#2a3240] flex">
      <div className="h-full">
        <AuthBanner position="right" effect="flip-right" />
      </div>
      <section
        className="lg:absolute left-[10%] top-2 lg:w-1/3 w-full max-w-lg  h-fit rounded-xl p-2 md:p-10 flex flex-col items-center mx-auto text-white bg-[#1e2530]/90 backdrop-blur-md shadow-lg"
        data-aos="flip-left"
      >
        <h3 className="text-4xl font-semibold mb-6 mt-1 text-center">
          Crie sua conta e venha ser{" "}
          <span className="text-Destaque font-principal">Dev</span>
          <span className="font-principal">BANK</span>
        </h3>
        <Stepper currentStep={useRes.step} />
        <div className="w-full flex flex-col gap-4">
          {useRes.step === 0 && <StepPersonalInfo />}
          {useRes.step === 1 && (
            <StepEmailVerify data={useRes.data} onChange={handleChange} onSubmit={handleSubmit} />
          )}
          {useRes.step === 2 && (
            <StepPassword data={useRes.data} onChange={handleChange} />
          )}
          <div className="flex flex-row items-center w-full my-4 text-gray-100 ">
            <div className="flex-grow border-t border-gray-600" />
            <div className="flex-grow border-t border-gray-600" />
          </div>
        </div>
        <p className="text-gray-200 text-lg flex items-center gap-2">
          Ja tem conta?{" "}
          <button
            type="button"
            className="text-amber-600 hover:underline font-principal"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </section>
    </div>
  );
};

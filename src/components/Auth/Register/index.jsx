import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "./Stepper";
import { StepPersonalInfo } from "./StepPersonalInfo";
import { StepEmailVerify } from "./StepEmailVerify";
import { StepPassword } from "./StepPassoword";
import { AuthBanner } from "../../Utils/AuthBanner";
import Aos from "aos";
export const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
  return (
    <div className="h-screen bg-[#2a3240] flex">
      <div className="h-full">
        <AuthBanner position="right" effect="flip-right" />
      </div>
      <section className="lg:absolute left-[10%] top-4 lg:w-1/3 w-full max-w-lg rounded-xl p-2 md:p-10 flex flex-col items-center mx-auto text-white bg-[#1e2530]/90 backdrop-blur-md shadow-lg" data-aos="flip-left">
        <h3 className="text-3xl font-semibold mb-6 mt-1 text-center">
          Crie sua conta e venha ser <span className="text-Destaque font-principal">Dev</span>
          <span className="font-principal">BANK</span>
        </h3>
        <Stepper currentStep={step} />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {step === 0 && <StepPersonalInfo data={formData} onChange={handleChange}/>}
          {step === 1 && <StepEmailVerify code={formData.code} onChange={handleChange} />}
          {step === 2 && <StepPassword data={formData} onChange={handleChange} />}
          <div className="flex flex-row items-center w-full my-4 text-gray-100 ">
            <div className="flex-grow border-t border-gray-600" />
            <div className="flex-grow border-t border-gray-600" />
          </div>
        </form>
        <p className="text-gray-200 text-lg flex items-center gap-2">
          Ja tem conta?{" "}
          <button type="button" className="text-amber-600 hover:underline font-principal" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
        <div className="w-48 mt-4 ">
          <img src="/images/Finance.svg" alt="Security Ilustration" className="w-full" />
        </div>
      </section>
    </div>
  );
};

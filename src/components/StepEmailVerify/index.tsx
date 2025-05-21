import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import { useEffect, useRef, useState } from "react";

interface StepEmailVerifyProps {
  data: {
    email: string;
    code: string;
  };
  onChange: (key?: any, value?: any) => void;
  error?: string;
  onSubmit: () => void;
  type?: "register" | "login";
  loading?: boolean;
  useRes?: ReturnType<typeof useRegister>;
}

export const StepEmailVerify = ({
  data,
  onChange,
  error,
  onSubmit,
  type = "register",
  loading,
  useRes
}: StepEmailVerifyProps) => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const { resend2FAVerify } = useLogin();

  const useReg = useRes;

  useEffect(() => {
    const joined = codes.join("");
    onChange(joined);
  }, [codes]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const newCodes = [...codes];
      newCodes[index - 1] = "";
      setCodes(newCodes);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (type === "register") {
      useReg?.resendVerifyEmail();
    } else {
      resend2FAVerify(data.email);
    }
    return;
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4 p-6 bg-transparent md:bg-black/10 rounded-xl shadow-lg text-white"
        data-aos="fade-left"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p className="text-center">
          Digite o código enviado para <span className="text-primary60 underline">{data.email || "seu e-mail"}</span>
        </p>

        <div className="flex justify-center gap-3">
          {codes.map((digit, index) => (
            <div key={index} className="flex items-center gap-1">
              <input
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center bg-gray-800 border-b border-primary50 rounded-md text-white text-2xl focus:outline-none focus:ring-2 focus:ring-primary60"
              />
              {index === 2 && <span className="text-2xl">-</span>}
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-full hover:bg-primary70">
          {loading ? "Carregando..." : "Confirmar"}
        </button>

        <div className="text-center">
          <button type="button" onClick={handleResend} disabled={loading} className="font-bold hover:underline">
            Enviar novamente
          </button>
        </div>
      </form>
    </div>
  );
};

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import { useUserContext } from "@/hooks/useUserContext";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StepEmailVerifyProps {
  data: {
    email: string;
    code: string;
  };
  onChange: (key?: string, value?: number) => void;
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
  useRes,
}: StepEmailVerifyProps) => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { isTrustedDevice, handleDeviceSecure } = useUserContext();
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
        <button
          type="submit"
          className="w-full bg-gray-800 flex items-center justify-center text-white p-2 rounded-full hover:bg-primary70/50"
          >
          {loading ? <Loader2 className="animate-spin text-primary" size={32} /> : "Confirmar"}
        </button>
          {type === "login" && (
            <div className="flex items-center justify-center gap-2">
              <Checkbox
                checked={isTrustedDevice}
                onCheckedChange={handleDeviceSecure}
                className="rounded-full border-Destaque"
                id="secure"
              />
              <Label className="text-sm cursor-pointer" htmlFor="secure">
                Confiar no dispositivo
              </Label>
            </div>
          )}

        <div className="text-center flex flex-col gap-4">
          <p className="text-xs text-gray-400">Codigo expira em 10 minutos</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="font-bold hover:underline disabled:text-gray-400 "
          >
            Enviar novamente
          </button>
        </div>
      </form>
    </div>
  );
};

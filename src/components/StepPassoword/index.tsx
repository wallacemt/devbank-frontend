import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

interface SterPasswordProps {
  data: {
    password: string;
    confirmPassword: string;
  };
  onChange: (key?: any, value?: any) => void;
  handleSubmit: () => void;
  loading?: boolean;
}

export const StepPassword = ({ data, onChange, handleSubmit, loading }: SterPasswordProps) => {
  const [show, setShow] = useState(false);

  const getStrengthColor = (password: string) => {
    if (password.length < 6) return "bg-red-500";
    if (password.match(/[A-Z]/) && password.match(/\d/)) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="relative">
        <Lock className="absolute left-2 top-2.5 text-neutral10" size={20} />
        <input
          type={show ? "text" : "password"}
          placeholder="Senha"
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
          className="pl-10 pr-10 py-2 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className={`h-2 rounded-full ${getStrengthColor(data.password)}`} />
      <div className="relative">
        <Lock className="absolute left-2 top-2.5 text-neutral10" size={20} />
        <input
          type={show ? "text" : "password"}
          placeholder="Confirmar senha"
          value={data.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          className="pl-10 pr-10 py-2 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-800/30 text-white p-3 rounded-full hover:bg-green-900/80 font-secundaria text-2xl"
      >
        <div>
          {loading ? (
            <span className="inline-block w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Criar Conta"
          )}
        </div>
      </button>
    </form>
  );
};

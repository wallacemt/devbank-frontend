import { User, Mail, IdCard } from "lucide-react";
import { formatCPF, unformatCPF } from "@/components/Utils/cpfUtils";
import { useRegister } from "@/hooks/useRegister";
interface StepPersonalInfoProps {
  useRes: ReturnType<typeof useRegister>;
}
export const StepPersonalInfo = ({ useRes }: StepPersonalInfoProps) => {
  const { data, errors, updateField, emailOrCpfVerify, nextStep, validations, loading } = useRes;
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
      <div className="relative">
        <User className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="text"
          placeholder="Ex.: João Silva"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="pl-12 pr-4 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}
      </div>

      <div className="relative">
        <Mail className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="email"
          placeholder="Ex.: joao@email.com"
          value={data.email}
          onChange={(e) => {
            updateField("email", e.target.value);
            emailOrCpfVerify(e.target.value);
            validations(e.target.value, "email");
          }}
          className="pl-12 pr-5 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 focus:text-lg"
        />

        {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
      </div>

      <div className="relative">
        <IdCard className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="text"
          placeholder="Ex.: 123.456.789-01"
          value={formatCPF(data.cpf)}
          onChange={(e) => {
            updateField("cpf", unformatCPF(e.target.value));
            emailOrCpfVerify(unformatCPF(e.target.value));
            validations(unformatCPF(e.target.value), "cpf");
          }}
          className="pl-12 pr-5 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {errors.cpf && <span className="text-red-400 text-sm">{errors.cpf}</span>}
      </div>

      {errors.emailOrCpf && <span className="text-red-400 text-sm">{errors.emailOrCpf}</span>}
      <button
        type="submit"
        disabled={errors.emailOrCpf || errors.email || errors.cpf}
        className="w-full bg-green-500/30 text-white p-3 rounded-full hover:bg-green-600/80 text-2xl font-secundaria disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-gray-800"
      >
        {loading ? "Carregando..." : "Confirmar Informações"}
      </button>
    </form>
  );
};

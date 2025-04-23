
import { User, Mail, IdCard } from "lucide-react";
import { useRegister } from "../../../../hooks/useRegister";

export const StepPersonalInfo = () => {
  const { data, errors, updateField, validateStep } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep("personal")) {
      console.log("Próximo passo 🚀");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <User className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="text"
          placeholder="Nome completo"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="pl-10 pr-4 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}
      </div>

      <div className="relative">
        <Mail className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="email"
          placeholder="E-mail"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="pl-10 pr-5 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 focus:text-lg"
        />
        {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
      </div>

      <div className="relative">
        <IdCard className="absolute left-2 top-3 text-neutral10" size={30} />
        <input
          type="text"
          placeholder="CPF"
          value={data.cpf}
          onChange={(e) => updateField("cpf", e.target.value)}
          className="pl-10 pr-5 py-4 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {errors.cpf && <span className="text-red-400 text-sm">{errors.cpf}</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500/30 text-white p-3 rounded-full hover:bg-green-600/80 text-2xl font-secundaria"
      >
        <span>Confirmar Informações</span>
      </button>
    </form>
  );
};

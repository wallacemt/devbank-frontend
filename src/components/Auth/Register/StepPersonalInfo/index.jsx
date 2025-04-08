import { User, Mail, IdCard } from "lucide-react";

export const StepPersonalInfo = ({ data, onChange }) => (
  <form className="flex flex-col gap-4 w-full">
    <div className="relative">
      <User className="absolute left-2 top-3 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Nome completo"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="pl-10 pr-4 py-3 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
    <div className="relative">
      <Mail className="absolute left-2 top-3 text-gray-400" size={20} />
      <input
        type="email"
        placeholder="E-mail"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        className="pl-10 pr-4 py-3 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
    <div className="relative">
      <IdCard className="absolute left-2 top-3 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="CPF"
        value={data.cpf}
        onChange={(e) => onChange("cpf", e.target.value)}
        className="pl-10 pr-4 py-3 rounded-md bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
    <button className="w-full bg-green-500/30 text-white p-3 rounded-full hover:bg-green-600/80 text-2xl font-secundaria">
      <span>Confirmar Informações</span>
    </button>
  </form>
);


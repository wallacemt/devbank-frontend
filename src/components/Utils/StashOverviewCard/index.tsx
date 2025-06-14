import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Stash } from "@/types/stashType";
import { Badge } from "@/components/ui/badge";

interface StashOverviewCardProps {
  stash: Stash;
}

export const StashOverviewCard: React.FC<StashOverviewCardProps> = ({ stash }) => {
  const { value, goal, name, createdAt } = stash;
  const createdAtF = format(new Date(createdAt), "dd MMM yyyy", {
    locale: ptBR,
  });

  const progress = goal ? (value / goal) * 100 : null;

  return (
    <div className="bg-gradient-to-r from-indigo-500/40 to-purple-600/50 p-4 rounded-xl shadow-md text-white">
      <div className="flex justify-between items-center mb-2 relative">
        <div>
          <Badge className="text-xs bg-gray-600/20 opacity-80">Stash</Badge>
          <h3 className="text-lg font-bold mt-1 truncate max-w-[100%]">{name}</h3>
        </div>
        <p className="text-sm opacity-70 absolute top-0 right-0">{createdAtF}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm opacity-80">Valor atual:</p>
        <p className="text-xl font-semibold">{`R$ ${value.toFixed(2)}`}</p>
      </div>

      {goal ? (
        <div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-1 opacity-80">
            <span>{`${Math.round(progress!)}% da meta`}</span>
            <span>{`Meta: R$ ${goal.toFixed(2)}`}</span>
          </div>
        </div>
      ): ""}
    </div>
  );
};

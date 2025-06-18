import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stash } from "@/types/stashType";
import { Landmark, MinusCircle, Pencil, PlusCircle, Settings, Trash2 } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Separator } from "@radix-ui/react-separator";
import { useStash } from "@/hooks/useStash";
import { Badge } from "@/components/ui/badge";
import { balanceFormater } from "@/utils/balanceFormater";

interface StashCardProps {
  stash: Stash;
  useSth: ReturnType<typeof useStash>;
  setInitalData: React.Dispatch<React.SetStateAction<Stash | null | undefined>>;

  setMode: React.Dispatch<React.SetStateAction<"create" | "update" | "add-amount" | "remove-amount">>;
}

export const StashCard: React.FC<StashCardProps> = ({ stash, useSth, setInitalData, setMode }) => {
  const { value, goal, name, createdAt, lastMovimentation, description } = stash;
  const { handleModalCreateOpen, loading, modaDeleteConfirmDelete, handleModalConfirm, removeStash } = useSth;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const remainingAmount = goal - value;
  const progress = (value / goal) * 100;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const createdAtF = format(new Date(createdAt), "dd MMM yyyy, HH:mm", {
    locale: ptBR,
  });
  const lastMovimentationF = format(new Date(lastMovimentation!), "dd MMM yyyy, HH:mm", {
    locale: ptBR,
  });
  return (
    <Popover>
      <div className="max-w-md w-full">
        <div className="bg-principal rounded-2xl shadow-xl overflow-hidden cursor-pointer t relative">
          <PopoverTrigger onClick={(e) => e.stopPropagation()} className="absolute right-2 top-2 z-5">
            <div className="bg-gray-700 bg-opacity-20 p-2 rounded-lg">
              <Settings className="text-2xl" />
            </div>
          </PopoverTrigger>
          <div
            className="bg-gradient-to-r from-indigo-500/40 to-purple-600/50 p-6 text-white  hover:scale-105 ransform transition-all"
            onClick={handleOpenModal}
          >
            <div className="flex justify-between items-start relative ">
              <div>
                <Badge className="text-xs font-medium  bg-transparent opacity-80 font-principal">Stash</Badge>
                <h2 className="text-2xl font-bold mt-1">{name}</h2>
              </div>
              <PopoverContent className="space-y-4 max-w-50 bg-zinc-800 text-sm">
                <div className="flex flex-col w-full justify-center space-y-2">
                  <Button
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMode("add-amount");
                      setInitalData(stash);
                      handleCloseModal();
                      handleModalCreateOpen();
                    }}
                    className="flex items-center justify-center gap-2 hover:text-green-400 w-fit mx-auto"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <p>Inserir Valor</p>
                  </Button>
                  <Separator />
                  <Button
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMode("remove-amount");
                      setInitalData(stash);
                      handleModalCreateOpen();
                    }}
                    className="flex items-center justify-center gap-2 hover:text-blue-400 w-fit mx-auto"
                  >
                    <MinusCircle className="h-4 w-4" />
                    <p> Sacar Valor</p>
                  </Button>
                  <Separator />
                  <Button
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMode("update");
                      setInitalData(stash);
                      handleModalCreateOpen();
                    }}
                    className="flex items-center justify-center gap-2 hover:text-yellow-400 w-fit mx-auto"
                  >
                    <Pencil className="h-4 w-4" />
                    <p> Editar Dados</p>
                  </Button>
                  <Separator />
                  <Button
                    variant={"ghost"}
                    className="flex items-center justify-center gap-2 hover:text-red-500 w-fit mx-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalConfirm();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <p>Deletar Stash</p>
                  </Button>
                </div>
              </PopoverContent>
            </div>
            <div className="mt-6">
              <p className="text-sm opacity-80">Valor atual</p>
              <p className="text-3xl font-bold mt-1">{`${balanceFormater(value)}`}</p>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-4">
              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {goal ? (
                <div>
                  <p className="text-sm text-gray-500">Meta</p>
                  <p className="font-medium">{`${balanceFormater(goal)}`}</p>
                </div>
              ) : (
                ""
              )}
              <div>
                <p className="text-sm text-gray-500">Criada em</p>
                <p className="font-medium">{createdAtF}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última movimentação</p>
                <p className="font-medium">{lastMovimentationF}</p>
              </div>
              {goal ? (
                <div>
                  <p className="text-sm text-gray-500">Faltam</p>
                  <p className="font-medium text-indigo-600">{`${balanceFormater(remainingAmount)}`}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="bg-principal rounded-2xl w-full max-w-[90%] max-h-[90vh] overflow-y-auto" hideClose>
            <div className="bg-gradient-to-r from-indigo-800/20 to-purple-600/30 p-4 text-white relative rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-800 bg-opacity-20 p-3 rounded-lg">
                  <Landmark className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{name}</h2>
                  <p className="text-sm opacity-90">Caixinha de investimento</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80">Valor acumulado</p>
                    <p className="text-3xl font-bold mt-1">{`${balanceFormater(value)}`}</p>
                  </div>
                  {goal ? (
                    <div className="text-right">
                      <p className="text-sm opacity-80">Meta</p>
                      <p className="text-xs font-bold">{`${balanceFormater(goal)}`}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {goal ? (
                  <>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-4">
                      <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span>{`${Math.round(progress)}%`}</span>
                      <span>100%</span>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="p-6">
              {description && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-300">Descrição: </h3>
                  <p className="text-gray-100">{description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Criada em</p>
                  <p className="font-medium">{createdAtF}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Última movimentação</p>
                  <p className="font-medium">{lastMovimentationF}</p>
                </div>
                {goal ? (
                  <div>
                    <p className="text-sm text-gray-500">Faltam</p>
                    <p className="font-medium text-indigo-200">{`${balanceFormater(remainingAmount)}`}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {modaDeleteConfirmDelete && (
          <Dialog open={modaDeleteConfirmDelete} onOpenChange={handleModalConfirm}>
            <DialogContent className="flex flex-col p-8 font-secundaria gap-9">
              <DialogHeader>
                <DialogTitle className="font-principal font-normal text-3xl text-Destaque">
                  Tem certeza que deseja Deletar essa Stash?
                </DialogTitle>
                <DialogDescription className="font-secundaria text-DarkA1 text-[1rem]">
                  Ao remover uma stash o saldo retornará a conta.
                  <span className="font-bold"> Esta ação é irreversível e não poderá ser desfeita.</span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                {loading ? (
                  <span className="inline-block w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Button
                      variant={"ghost"}
                      disabled={loading}
                      onClick={() => handleModalConfirm()}
                      className="border text-[1rem] p-6 font-bold border-[#171717] cursor-pointer"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant={"destructive"}
                      disabled={loading}
                      onClick={() => removeStash(stash.id)}
                      className="p-6 text-[1rem] cursor-pointer"
                    >
                      Remover
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Popover>
  );
};

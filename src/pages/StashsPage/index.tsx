import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Pencil, Trash2, MinusCircle } from "lucide-react";
import { format } from "date-fns";
import { SiteHeader } from "@/components/ui/site-header";
import { Sidebar } from "@/components/Sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { StashBoxModal } from "@/components/StashBoxCreateModal";
import { useStash } from "@/hooks/useStash";
import { Stash } from "@/types/stashType";
import { TransferCardSkeleton } from "@/components/TransferCard/TransferCardSkeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import stashEmpty from "@/assets/images/stashIlustration.svg";

export default function StashCaixinhaPage() {
  const [boxes, setBoxes] = useState<Stash[]>([]);
  const useSth = useStash();

  const {
    modalCreate,
    handleModalCreateOpen,
    getUserStashs,
    loading,
    update,
    modaDeleteConfirmDelete,
    handleModalConfirm,
    removeStash,
  } = useSth;
  const [mode, setMode] = useState<"create" | "update" | "add-amount" | "remove-amount">("create");
  const [initialData, setInitalData] = useState<Stash | null>();
  useEffect(() => {
    document.title = "DevBank | Stashs";
    const fetchStash = async () => {
      const stash = await getUserStashs();
      setBoxes(stash!);
    };
    fetchStash();
  }, [update]);
  
  return (
    <>
      <Sidebar>
        <SiteHeader title="Minhas Stashs" context="outher" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <Button
              variant={"outline"}
              className="w-22 h-12 bg-green-800 hover:bg-green-900 rounded-full"
              onClick={() => {
                setMode("create");
                setInitalData(null);
                handleModalCreateOpen();
              }}
            >
              <PlusCircle className="h-12 w-12" />
            </Button>
          </div>

          <div className={`${boxes.length > 0 ? "grid" : "flex"} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <TransferCardSkeleton key={i} />)
            ) : boxes.length > 0 ? (
              boxes.map((box) => (
                <Popover>
                  <Card key={box.id} className="relative bg-zinc-900 border border-zinc-700 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-secundaria font-bold text-white">{box.name}</h2>
                        <PopoverTrigger>
                          <MoreHorizontal className="h-5 w-5 text-zinc-400 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="space-y-4 max-w-50 bg-zinc-800 text-sm">
                          <div className="flex flex-col w-full justify-center space-y-2">
                            <Button
                              variant={"ghost"}
                              onClick={() => {
                                setMode("add-amount");
                                setInitalData(box);
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
                              onClick={() => {
                                setMode("remove-amount");
                                setInitalData(box);
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
                              onClick={() => {
                                setMode("update");
                                setInitalData(box);
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
                              onClick={() => handleModalConfirm()}
                            >
                              <Trash2 className="h-4 w-4" />
                              <p>Deletar Stash</p>
                            </Button>
                          </div>
                        </PopoverContent>
                      </div>
                      <div className="text-green-400 text-2xl font-mono mb-2">R${box.value.toFixed(2)}</div>
                      <div className="text-xs flex flex-col gap-2 text-zinc-400">
                        <p>Guardado em: {format(box.createdAt, "dd/MM/yyyy")}</p>
                        {box.lastMovimentation && (
                          <p>Última Movimentação: {format(box.lastMovimentation, "dd/MM/yyyy")}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
                                onClick={() => removeStash(box.id)}
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
                </Popover>
              ))
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center mx-auto">
                <img src={stashEmpty} alt="Empty Ilustration" className="h-60" />
                <p className="font-secundaria">Nenhuma Stash encontrada</p>
              </div>
            )}
          </div>
        </div>
      </Sidebar>

      {modalCreate && <StashBoxModal useSth={useSth} mode={mode} initialData={initialData ?? undefined} />}
    </>
  );
}

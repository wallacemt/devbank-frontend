import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { Sidebar } from "@/components/Sidebar";
import { StashBoxModal } from "@/components/StashBoxCreateModal";
import { useStash } from "@/hooks/useStash";
import { Stash } from "@/types/stashType";
import { TransferCardSkeleton } from "@/components/Utils/TransferCard/TransferCardSkeleton";
import stashEmpty from "@/assets/images/stashIlustration.svg";
import { StashCard } from "@/components/Utils/StashCard";

interface StashCaixinhaPageProps {
  initialMode?: "create" | "default";
}

export default function StashCaixinhaPage({ initialMode = "default" }: StashCaixinhaPageProps) {
  const [boxes, setBoxes] = useState<Stash[]>([]);
  const useSth = useStash();

  const { modalCreate, handleModalCreateOpen, getUserStashs, loading, update } = useSth;
  const [mode, setMode] = useState<"create" | "update" | "add-amount" | "remove-amount">("create");
  const [initialData, setInitalData] = useState<Stash | null>();
  const handleCreate = () => {
    setMode("create");
    setInitalData(null);
    handleModalCreateOpen();
  };

  useEffect(() => {
    document.title = "DevBank | Stashs";
    const fetchStash = async () => {
      const stash = await getUserStashs();
      console.log(stash);
      setBoxes(stash ?? []);
    };
    fetchStash();

    if (initialMode === "create") handleCreate();
  }, [update]);

  return (
    <>
      <Sidebar>
        <SiteHeader title="Minhas Stashs" context="outher" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-6 hover:scale-110">
            <Button
              variant="outline"
              className="w-auto px-4 py-2 bg-green-700 hover:bg-green-800 rounded-full transition-all duration-300"
              onClick={() => handleCreate()}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold text-sm">Criar Stash</span>
            </Button>
          </div>

          <div className={`${boxes.length > 0 ? "grid" : "flex"} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <TransferCardSkeleton key={i} />)
            ) : boxes.length > 0 ? (
              boxes.map((box) => (
                <StashCard stash={box} setInitalData={setInitalData} useSth={useSth} key={box.id} setMode={setMode} />
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

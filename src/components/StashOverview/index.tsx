import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStash } from "@/hooks/useStash";
import stashEmpty from "@/assets/images/stashIlustration.svg";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Stash } from "@/types/stashType";
import { StashOverviewCard } from "@/components/Utils/StashOverviewCard";
import { Separator } from "@/components/ui/separator";

interface StashOverviewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function StashOverview({ open, setOpen }: StashOverviewProps) {
  const { loading } = useStash();
  const { getUserStashs } = useStash();
  const [stashList, setStashList] = useState<Stash[]>([]);

  useEffect(() => {
    if (open) {
      getUserStashs().then((res) => {
        setStashList(res ?? []);
      });
    }
  }, [open, getUserStashs]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center font-principal text-lg">Suas Stashs</DialogTitle>
          <Separator/>
        </DialogHeader>

        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))
          ) : stashList.length > 0 ? (
            stashList.slice(0, 3).map((stash) => <div className="p-2 "> <StashOverviewCard key={stash.id} stash={stash} /></div>)
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center mx-auto gap-4">
              <img src={stashEmpty} alt="Empty Ilustration" className="h-60" />
              <p className="text-sm text-muted-foreground">Você ainda não tem nenhuma caixinha criada.</p>
              <Link to={"/stashs/new"}>
                <Button>Criar Nova Stash</Button>
              </Link>
            </div>
          )}
        </div>

        {stashList.length > 0 && (
          <div className="mt-4 flex items-center justify-center">
            <Link to="/stashs">
              <Button variant="default" className="w-32">Ver mais</Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

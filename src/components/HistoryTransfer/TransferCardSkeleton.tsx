import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransferCardSkeleton() {
  return (
    <Card className="bg-background/20 shadow-none border border-border transition-all rounded-xl relative">
      <CardContent className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4">
        <div className="flex items-center gap-4 w-full">
          <div className="absolute top-2 right-4">
            <Skeleton className="h-8 w-8 rounded-full bg-white" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32  bg-secundaria"  />
            <Skeleton className="h-4 w-40 bg-secundaria" />
            <Skeleton className="h-3 w-24 bg-secundaria" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

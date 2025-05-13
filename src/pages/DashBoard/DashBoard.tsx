import { SiteHeader } from "@/components/ui/site-header";
import { useUserContext } from "@/hooks/useUserContext";
import { Sidebar } from "@/components/Sidebar";
import { BalanceCard } from "@/components/BalanceCard";
import { SlideOptions } from "@/components/SlideOptions";
export const DashBoard = () => {
  const { user } = useUserContext();
  return (
    <Sidebar>
      <SiteHeader title={`${user?.name.split(" ")[0]}`} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <BalanceCard />
            <SlideOptions/>
            {/* <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div> */}
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

import { SiteHeader } from "@/components/ui/site-header";
import { useUserContext } from "@/hooks/useUserContext";
import { Sidebar } from "@/components/Sidebar";
import { BalanceCard } from "@/components/BalanceCard";
import { SlideOptions } from "@/components/SlideOptions";
import { AnalyticsOverview } from "@/components/AnlysticsOverview";
import { CompleteProfileModal } from "@/components/CompleteProfileModal";
import { BonusModal } from "@/components/CompleteProfileModal/BonusModal";
export const DashBoard = () => {
  const { user, view } = useUserContext();
  return (
    <>
      <Sidebar>
        <SiteHeader title={`${user?.name.split(" ")[0]}`} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
              <BalanceCard />
              <SlideOptions />
              <AnalyticsOverview />
            </div>
          </div>
        </div>
      </Sidebar>
      {!user?.profile && <CompleteProfileModal />}
      {view && <BonusModal />}
      <BonusModal />
    </>
  );
};

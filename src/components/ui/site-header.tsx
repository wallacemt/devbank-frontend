import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/images/logo.png";

interface SiteProps {
  title: string;
}

export function SiteHeader({ title }: SiteProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) p-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className=" font-semibold" style={{ fontSize: "2rem" }}>
          Ola, <span className="text-Destaque/80 font-satoshi">{title}</span>
        </h1>
        <img src={logo} alt="Logo" className="h-20 w-20 self-center absolute right-2 lg:hidden animate-collapsible-up" />
      </div>
    </header>
  );
}

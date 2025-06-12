import { Rnd } from "react-rnd";
import { TerminalWindow } from "@/components/Transfers/TerminalWindow";
import { useEffect, useState } from "react";
import { X, Maximize2, Minimize2, Minus, Plus } from "lucide-react";
import { useUserContext } from "@/hooks/useUserContext";
import { cn } from "@/lib/utils";

export function TransferShell({ terminalVisible }: { terminalVisible: boolean }) {
  const [isFull, setIsFull] = useState(false);
  const { handleTransferTerminal } = useUserContext();
  const [zoomLevel, setZoomLevel] = useState(1);
  useEffect(() => {
    if (isFull) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.overflowX = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFull]);

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(z + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(z - 0.1, 0.5));
  };
  if (!terminalVisible) return;
  return (
    <Rnd
      default={{ x: 0, y: 0, width: 400, height: 400 }}
      minWidth={200}
      minHeight={200}
      enableResizing={!isFull}
      disableDragging={isFull}
      className={cn("z-50", isFull && "fixed inset-0")}
      size={isFull ? { width: "100%", height: "100vh" } : undefined}
      position={isFull ? { x: 0, y: 0 } : undefined}
    >
      <div className="flex flex-col h-full border border-zinc-800 bg-[#2D2A2E] rounded-md overflow-hidden shadow-lg">
        <div
          className="flex items-center justify-between bg-[#1c1c1c] px-3 py-1 text-white text-sm font-mono"
        >
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
          </div>
          <span>TransferShell — terminal</span>
          <div className="flex items-center gap-2">
            <button onClick={handleZoomOut} title="Zoom Out">
              <Minus className="size-3 text-white" />
            </button>
            <button onClick={handleZoomIn} title="Zoom In">
              <Plus className="size-3 text-white" />
            </button>
            <button onClick={() => setIsFull(!isFull)} title="Maximize">
              {isFull ? <Minimize2 className="size-4 text-white" /> : <Maximize2 className="size-4 text-white" />}
            </button>
            <button onClick={handleTransferTerminal} title="Fechar">
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-[#300A24] text-white font-mono overflow-y-auto overflow-x-hidden">
          <TerminalWindow zoomLevel={zoomLevel} />
        </div>
      </div>
    </Rnd>
  );
}

import { motion } from "framer-motion";
import { Copy, Eraser, Pin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FcSimCardChip } from "react-icons/fc";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo.png";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CreditCardProps {
  id: string;
  title: string;
  number: string;
  name: string;
  exp: string;
  cvv: string;
  isDevCard: boolean;
  removeCard: (id: string) => Promise<void>;
}

export const CreditCard = ({ id, title, number, name, exp, cvv, isDevCard, removeCard }: CreditCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [isHoveringCopy, setIsHoveringCopy] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const toggleFlip = () => setFlipped(!flipped);
  const handleCardClick = () => {
    if (!isHoveringCopy && !isHoveringDelete) toggleFlip();
  };
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.message("Cartão copiado!");
    navigator.clipboard.writeText(number);
  };

  const handleDeleteCard = async () => {
    await removeCard(id);
  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={handleCardClick}
        className="relative h-56 cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full h-full font-secundaria transition-transform duration-500 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ userSelect: "none" }}
        >
          <div
            className={cn(
              "absolute w-full h-full rounded-2xl text-white p-6 flex flex-col justify-between shadow-lg backface-hidden",
              isDevCard
                ? "border-1 border-yellow-300 bg-gradient-to-r from-Destaque/60 to-Destaque/40"
                : `bg-gradient-to-r ${
                    Number(number[number.length - 1]) % 2 === 0
                      ? "from-indigo-700 to-purple-800"
                      : "from-amber-900 to-amber-700"
                  }`
            )}
          >
            {!isDevCard && (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    onMouseEnter={() => setIsHoveringDelete(true)}
                    onMouseLeave={() => setIsHoveringDelete(false)}
                    className="absolute right-2 top-0 opacity-50 hover:opacity-100 cursor-pointer"
                  >
                    <Eraser size={20} />
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deletar Cartão</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-500">
                    Tem certeza que deseja deletar esse cartão? Essa ação é irreversível.
                  </p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCard();
                        }}
                      >
                        Confirmar Exclusão
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {isDevCard && (
              <div className="absolute top-2 right-2 text-neutral10/50">
                <Pin />
              </div>
            )}
            {isDevCard && (
              <div className="h-22 flex items-center justify-center">
                <img src={logo} alt="DevBank Badge" className="object-contain scale-200 max-h-full" />
              </div>
            )}
            <div className={`flex justify-between items-start`}>
              <div className="space-y-2">
                {!isDevCard && (
                  <Badge className="text-[0.80rem] font-principal bg-neutral90/80">
                    <span className="text-Destaque">Dev</span>Bank
                  </Badge>
                )}

                {isDevCard ? (
                  <p className="text-xl font-semibold font-principal ">{title.split(" ").join(" ")}</p>
                ) : (
                  <p className="text-xl font-semibold font-principal">{title}</p>
                )}
              </div>
              <div className="chip w-12 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded flex items-center justify-center shadow">
                <FcSimCardChip size={34} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-mono tracking-wider mb-2">{number}</p>
                <Copy
                  size={20}
                  onClick={(e) => copyToClipboard(e)}
                  onMouseEnter={() => setIsHoveringCopy(true)}
                  onMouseLeave={() => setIsHoveringCopy(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-80">Titular</p>
                  <p className="text-sm">{name}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Expira</p>
                  <p className="text-sm">{exp.split("-").slice(0, 2).join("/")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-full rounded-2xl text-white p-6 bg-gradient-to-r from-gray-800 to-gray-900 rotate-y-180 flex flex-col justify-between shadow-lg backface-hidden">
            <div className="h-8 bg-black w-full rounded"></div>
            <div className="flex justify-end">
              <div className="bg-white text-black px-3 py-1 rounded text-sm font-mono">CVV {cvv}</div>
            </div>
            <p className="text-xs mb-2">Para sua segurança, o código CVV não está armazenado em nossos sistemas.</p>
            <p className="text-xs text-center opacity-60">0800 123 4567 • devbank.com.br</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

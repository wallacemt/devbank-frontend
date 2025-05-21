import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { X, CheckCircle, Code2, Rocket, Wallet, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BonusModal() {
  const [open, setOpen] = React.useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        hideClose
        className={cn(
          'bg-secundaria border border-neutral80 rounded-xl p-6 text-neutral10 max-w-md w-full h-[90%] sm:max-w-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-primary80 scrollbar-track-primary90 scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary90 w-10 h-10 rounded-lg flex items-center justify-center">
              <Code2 className="text-white" />
            </div>
            <DialogTitle className="text-xl text-neutral10">DevBank</DialogTitle>
          </div>
          <DialogTrigger asChild>
            <button className="text-neutral10 hover:text-white">
              <X />
            </button>
          </DialogTrigger>
        </DialogHeader>

        <div className="text-center space-y-6">
          <div className="float-animation">
            <div className="bg-gradient-to-br from-primary80 to-primary90 w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold pulse">
              R$200
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Perfil Completo! 🎉</h3>
            <p className="text-neutral10">
              Parabéns, dev! Você acaba de ganhar{' '}
              <span className="font-bold text-primary90">R$200</span> por completar seu perfil na DevBank.
            </p>
          </div>

          <div className="bg-principal rounded-lg p-4 text-left space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary90" size={18} />
              <span>Bônus creditado na sua conta</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="text-primary90" size={18} />
              <span>Disponível para saque ou investimento</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="text-primary90" size={18} />
              <span>Continue explorando nossos produtos dev-friendly</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <button className="bg-primary90 hover:bg-primary80 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2" onClick={() => setOpen(false)}>
              <Wallet size={18} /> Ver Saldo
            </button>
            <button className="border border-neutral80 hover:bg-neutral90 text-neutral10 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2">
              <Terminal size={18} /> Explorar API
            </button>
          </div>

          <p className="text-xs text-neutral10 mt-4">Obrigado por fazer parte da comunidade DevBank</p>
        </div>
        <div className="bg-principal text-xs text-center text-neutral10 mt-6 py-2 rounded">
          {/* Use media queries for responsiveness if needed */}
          <span className="hidden md:inline">/* PS: Você pode usar nosso CLI para gerenciar sua conta */</span>
          <span className="md:hidden">#devfirst</span>
        </div>
      </DialogContent>

      <style>{`
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 47, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 47, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 47, 0, 0);
          }
        }
      `}</style>
    </Dialog>
  );
}

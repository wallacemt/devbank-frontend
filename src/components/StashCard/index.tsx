import { useState } from "react";

import { FaPiggyBank } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

interface StashCardProps {
  title: string;
  value: number;
  goal: number;
  createdAt: string;
  lastMovimentation: string;
  remainingAmount: number;
  description: string;
}

export const StashCard: React.FC<StashCardProps> = ({
  title,
  value,
  goal,
  createdAt,
  lastMovimentation,
  remainingAmount,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = (value / goal) * 100;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-md w-full">
      <div
        className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
        onClick={handleOpenModal}
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-medium opacity-80">Caixinha</span>
              <h2 className="text-2xl font-bold mt-1">{title}</h2>
            </div>
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <FaPiggyBank className="text-2xl" />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm opacity-80">Valor atual</p>
            <p className="text-3xl font-bold mt-1">{`R$ ${value.toFixed(2)}`}</p>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-4">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Meta</p>
              <p className="font-medium">{`R$ ${goal.toFixed(2)}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Criada em</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última movimentação</p>
              <p className="font-medium">{lastMovimentation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Faltam</p>
              <p className="font-medium text-indigo-600">{`R$ ${remainingAmount.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white relative">
            <DialogClose className="absolute top-4 right-4 text-white text-xl">
              <FaPiggyBank className="text-2xl" />
            </DialogClose>
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FaPiggyBank className="text-3xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm opacity-90">Caixinha de investimento</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm opacity-80">Valor acumulado</p>
                  <p className="text-3xl font-bold mt-1">{`R$ ${value.toFixed(2)}`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Meta</p>
                  <p className="text-xl font-bold">{`R$ ${goal.toFixed(2)}`}</p>
                </div>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-4">
                <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span>0%</span>
                <span>{`${Math.round(progress)}%`}</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Descrição</h3>
              <p className="text-gray-600">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Criada em</p>
                <p className="font-medium">{createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última movimentação</p>
                <p className="font-medium">{lastMovimentation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Faltam</p>
                <p className="font-medium text-indigo-600">{`R$ ${remainingAmount.toFixed(2)}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Concluir em</p>
                <p className="font-medium text-indigo-600">~ 3 meses</p>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-3 text-gray-800">Detalhes</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <FaPiggyBank />
                  </div>
                  <div>
                    <p className="font-medium">Depósito inicial</p>
                    <p className="text-sm text-gray-500">{createdAt}</p>
                  </div>
                </div>
                <div className="font-medium text-green-600">{`+ R$ 1.000,00`}</div>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <FaPiggyBank />
                  </div>
                  <div>
                    <p className="font-medium">Depósito mensal</p>
                    <p className="text-sm text-gray-500">{createdAt}</p>
                  </div>
                </div>
                <div className="font-medium text-green-600">{`+ R$ 1.000,00`}</div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg">
                Adicionar valor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

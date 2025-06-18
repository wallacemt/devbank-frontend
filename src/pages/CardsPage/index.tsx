import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { CreditCard as CreditCardComponent } from "@/components/Utils/CreditCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCard } from "@/hooks/useCard";
import { Card } from "@/types/cards";
import { balanceFormater } from "@/utils/balanceFormater";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePicker } from "@/components/ui/date-picker";
import { LoadingBasic } from "@/components/Utils/LoadingBasic";

export const CardsPage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [preAprrovedLimit, setPreApprovedLimit] = useState(0);
  const {
    getCardList,
    getApprovedLimit,
    loading,
    selectedDate,
    setSelectedDate,
    postAdiquireDevCard,
    update,
    features,
    register,
    openAddCard,
    modalAdquireCard,
    setModalAdquireCard,
    setOpenAddCard,
    updateField,
    handleAddCard,
    removeCard,
  } = useCard();
  useEffect(() => {
    const fetchCard = async () => {
      const res = await getCardList();
      setCards(
        res
          ?.filter((card) => card.cardTitle === "DevCard")
          .concat(res?.filter((card) => card.cardTitle !== "DevCard")) ?? []
      );
    };

    const fetchPreLimit = async () => {
      const res = await getApprovedLimit();
      setPreApprovedLimit(res?.limit ?? 0);
    };

    fetchCard();
    fetchPreLimit();
  }, [update]);
  const hasDevCard = !!cards.find((card) => card.cardTitle === "DevCard");

  return (
    <Sidebar>
      <div className="min-h-screen px-4 py-8 container mx-auto">
        {!hasDevCard && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-indigo-700 to-purple-900 text-white rounded-2xl p-6 mb-8 relative shadow-lg overflow-hidden"
          >
            {loading ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 shadow-none">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-96  bg-secundaria" />
                      <Skeleton className="h-4 w-40 bg-secundaria" />
                      <Skeleton className="h-3 w-24 bg-secundaria" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute -top-10 rotate-12 right-0 opacity-20 text-[10rem] pointer-events-none">
                  <CreditCard size={230} className="text-Destaque" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 font-principal">Cartão Pré-Aprovado!</h2>
                  <p className="mb-4 text-md font-secundaria">
                    Você tem um limite pré-aprovado de {balanceFormater(preAprrovedLimit)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-indigo-600 transition"
                      onClick={() => setModalAdquireCard(!modalAdquireCard)}
                    >
                      Adquirir Cartão
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Meus Cartões */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-Destaque/70 font-principal">Meus Cartões</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div
                className={`relative w-full border-2 border-gray-700 rounded-2xl h-full transition-transform duration-500 transform-style-preserve-3d`}
              >
                <div className={`absolute w-full h-full rounded-2xl text-white p-6 bg-gradient-to-r `}>
                  <div className="flex justify-between gap-2 items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40  bg-secundaria" />
                      <Skeleton className="h-4 w-32  bg-secundaria" />
                    </div>
                    <div className="chip w-12 h-8  rounded flex items-center justify-center shadow">
                      <Skeleton className="h-8 w-32  bg-secundaria" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-12">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-52  bg-secundaria" />
                    </div>
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-12  bg-secundaria" />
                        <Skeleton className="h-2 w-24  bg-secundaria" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-12  bg-secundaria" />
                        <Skeleton className="h-2 w-18  bg-secundaria" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              cards.map((card, i) => (
                <CreditCardComponent
                  key={i}
                  id={card.id}
                  title={card.cardTitle}
                  number={card.number}
                  name={card.cardHolderName}
                  exp={card.expiryDate}
                  cvv={"***"}
                  isDevCard={card.cardTitle === "DevCard"}
                  removeCard={removeCard}
                />
              ))
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setOpenAddCard(true)}
              className="border-3 border-dashed border-gray-300 hover:border-Destaque rounded-2xl h-56 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer shadow"
            >
              <div className="text-center">
                <i className="fas fa-plus-circle text-3xl text-gray-400 mb-2" />
                <p className="text-gray-500 ">Adicionar novo cartão</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-principal/80 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-4 font-secundaria">
            Vantagens dos cartões <span className="font-principal text-Destaque">DevBank</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-secundaria">
            {features.map((feature, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="flex items-start space-x-4">
                <div className={`${feature.color} p-3 rounded-lg shadow-sm bg-neutral`}>{feature.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Dialog open={openAddCard} onOpenChange={setOpenAddCard}>
          <DialogContent
            hideClose
            className="rounded-2xl shadow-xl border-none p-6 bg-gradient-to-br from-principal to-neutral90 text-white"
          >
            <DialogHeader>
              <DialogTitle className="font-principal text-lg text-center">
                Adicionar novo <span className="text-Destaque">cartão</span>
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => handleAddCard(e)}>
              <div>
                <Label required className="block text-sm font-medium mb-1" htmlFor="cardName">
                  Nome do Cartão
                </Label>
                <Input
                  type="text"
                  {...register("cardTitle", { required: true })}
                  id="cardName"
                  placeholder="DevCard"
                  onChange={(e) => updateField("cardTitle", e.target.value)}
                  className="bg-gray-900 text-gray-200"
                />
              </div>
              <div>
                <Label required className="block text-sm font-medium mb-1 " htmlFor="cardHolderName">
                  Nome do Titular cartão
                </Label>
                <Input
                  type="text"
                  id="cardHolderName"
                  placeholder="FULANO DA SILVA"
                  {...register("cardHolderName", { required: true })}
                  onChange={(e) => updateField("cardHolderName", e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-gray-900 text-gray-200"
                />
              </div>
              <div>
                <Label required htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                  Numero do Cartão
                </Label>
                <Input
                  type="text"
                  id="cardNumber"
                  max={19}
                  {...register("number", { required: true, pattern: /(\d{4})(?=\d)/g })}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formattedValue = value
                      .replace(/\s+/g, "")
                      .replace(/(\d{4})(?=\d)/g, "$1 ")
                      .substr(0, 19);
                    updateField("number", formattedValue);
                  }}
                  placeholder="•••• •••• •••• 1234"
                  maxLength={19}
                  className="w-full rounded-lg px-4 py-2 bg-gray-900 text-gray-200"
                />
              </div>

              <div>
                <Label required htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                  Data de Validade
                </Label>
                <Input
                  type="month"
                  {...register("expiryDate", { required: true })}
                  onChange={(e) => updateField("expiryDate", e.target.value)}
                  id="expiryDate"
                  placeholder="MM/AAAA"
                  className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 "
                />
              </div>
              <div>
                <Label required className="block text-sm font-medium mb-1" htmlFor="cvv">
                  CVV
                </Label>
                <Input
                  type="password"
                  maxLength={3}
                  {...register("cvv", { required: true })}
                  onChange={(e) => updateField("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))}
                  id="cvv"
                  placeholder="999"
                  className="w-full rounded-lg px-4 py-2 bg-gray-900 text-gray-200"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={() => setOpenAddCard(!openAddCard)}
                  className="text-white border-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Cancelar
                </Button>
                {loading ? (
                  <Button variant={"ghost"} className="shadow-md">
                    <LoadingBasic />
                  </Button>
                ) : (
                  <Button className="bg-Destaque/80 text-white shadow-md hover:brightness-110" type="submit">
                    Adicionar cartão
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={modalAdquireCard} onOpenChange={setModalAdquireCard}>
          <DialogContent
            hideClose
            className="rounded-2xl shadow-2xl border-none p-6 md:p-8 font-secundaria bg-gradient-to-br from-neutral90 to-principal text-white max-w-md w-full"
          >
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold font-principal">Escolha a data de vencimento</h2>
                <p className="text-sm opacity-80 mt-1">
                  Selecione o dia que deseja que a fatura do seu cartão feche todo mês.
                </p>
              </div>

              <div className="w-fit mx-auto mt-4">
                <DatePicker date={selectedDate} setDate={setSelectedDate} />
              </div>

              <div className="border-t border-white/20 mt-6 pt-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setModalAdquireCard(false)}
                  disabled={loading}
                  className="text-white border-white hover:bg-white hover:text-indigo-700 transition-all"
                >
                  Cancelar
                </Button>
                {loading ? (
                  <Button variant={"ghost"} className="shadow-md">
                    <LoadingBasic />
                  </Button>
                ) : (
                  <Button
                    className="bg-Destaque/80 hover:bg-Destaque/90 text-white shadow-md transition-all"
                    onClick={() => postAdiquireDevCard()}
                  >
                    Adquirir Cartão
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Sidebar>
  );
};

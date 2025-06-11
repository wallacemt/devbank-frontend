import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useProfileForm } from "@/hooks/useProfileCompleted";

import { Banknote, Eye, EyeClosed, IdCard, KeyRound, MapPin } from "lucide-react";
import { Stepper } from "../Stepper";

const steps = ["Endereço", "Informações Pessoais", "Vida Financeira", "Transação key"];

export function CompleteProfileModal() {
  const [step, setStep] = useState(0);

  const { register, handleChange, open, handleConpleteProfile, errors, watch, form, visible, setVisible, loading } =
    useProfileForm();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="cep">
                CEP <span className="text-Destaque">*</span>
              </Label>
              <Input
                {...register("cep")}
                required
                onChange={(e) => handleChange("cep", e.target.value)}
                placeholder="Ex.: 12345-678"
                id="cep"
              />
              {errors.cep && <span className="text-red-500 text-sm mb-2">{errors.cep.message}</span>}
            </div>

            <Label htmlFor="street">
              Rua <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("street")} id="street" required placeholder="Ex.: Rua 1" />

            <Label htmlFor="number">
              Número <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("number")} id="number" required type="number" defaultValue={1} placeholder="Ex.: 123" />

            <Label htmlFor="complement">Complemento (opcional)</Label>
            <Input {...register("complement")} id="complement" placeholder="Ex.: Casa 1" />

            <Label htmlFor="city">
              Cidade <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("city")} id="city" required placeholder="Ex.: Sao Paulo" />

            <Label htmlFor="state">
              Estado <span className="text-Destaque">*</span>{" "}
            </Label>
            <Input {...register("state")} id="state" required placeholder="Ex.: SP" />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="socialName">Nome Social (opcional)</Label>
            <Input {...register("socialName")} id="socialName" placeholder="Ex.: João" />
            <div className="flex flex-col gap-4">
              <Label htmlFor="birthDate">
                Data de Nascimento <span className="text-Destaque">*</span>
              </Label>
              <Input
                type="date"
                {...register("birthDate")}
                id="birthDate"
                onChange={(e) => handleChange("birthDate", e.target.value)}
                required
                placeholder="Ex.: 01/01/2000"
              />

              {errors.birthDate && <span className="text-red-500 text-sm mb-2">{errors.birthDate.message}</span>}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="gender">
                Gênero <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("gender", v)}>
                <SelectTrigger className="w-full" id="gender">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="nao-binario">Não-binário</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                  <SelectItem value="prefiro-nao-dizer">Prefiro não dizer</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="maritalStatus">
                Estado Civil <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("maritalStatus", v)}>
                <SelectTrigger className="w-full" id="maritalStatus">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                  <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <Label htmlFor="income">
              Renda Mensal <span className="text-Destaque">*</span>
            </Label>
            <Input
              type="text"
              value={watch("income") || ""}
              required
              id="income"
              placeholder="R$ 0,00"
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const formatted = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(raw) / 100);
                handleChange("income", formatted);
              }}
            />

            <div className="flex flex-col space-y-2">
              <Label htmlFor="employmentStatus">
                Situação de Emprego <span className="text-Destaque">*</span>{" "}
              </Label>
              <Select onValueChange={(v) => handleChange("employmentStatus", v)} required>
                <SelectTrigger className="w-full" id="employmentStatus">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="autonomo">Autônomo</SelectItem>
                  <SelectItem value="desempregado">Desempregado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Label htmlFor="occupation">
              Ocupação <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("occupation")} id="occupation" required placeholder="Ex.: Desenvolvedor" />

            <Label htmlFor="company">
              Empresa <span className="text-Destaque">*</span>{" "}
            </Label>
            <Input {...register("company")} id="company" required placeholder="Ex.: Google" />

            <div className="flex flex-col space-y-2">
              <Label htmlFor="education">
                Escolaridade <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("education", v)} required>
                <SelectTrigger className="w-full" id="education">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundamental-incompleto">Fundamental Incompleto</SelectItem>
                  <SelectItem value="fundamental-completo">Fundamental Completo</SelectItem>
                  <SelectItem value="medio-incompleto">Médio Incompleto</SelectItem>
                  <SelectItem value="medio-completo">Médio Completo</SelectItem>
                  <SelectItem value="superior-incompleto">Superior Incompleto</SelectItem>
                  <SelectItem value="superior-completo">Superior Completo</SelectItem>
                  <SelectItem value="pos-graduacao">Pós-Graduação</SelectItem>
                  <SelectItem value="mestrado">Mestrado</SelectItem>
                  <SelectItem value="doutorado">Doutorado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="transactionPin">
              Senha de Transação <span className="text-Destaque">**</span>
            </Label>
            <div className="relative">
              <Input
                type={visible ? "text" : "password"}
                maxLength={6}
                value={watch("transactionPin") || ""}
                {...register("transactionPin")}
                id="transactionPin"
                placeholder="Apenas números, 6 dígitos"
                required
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-4 bottom-1 text-gray-400 hover:text-white"
              >
                {visible ? <EyeClosed size={25} /> : <Eye size={25} />}
              </button>
            </div>
            {errors.transactionPin && <span className="text-red-500 text-sm">{errors.transactionPin.message}</span>}
            <ul className="text-sm list-disc ml-4 space-y-1">
              <li className={form.watch("transactionPin").length < 6 ? "text-destructive" : "ulPers"}>
                Deve conter exatamente 6 dígitos numéricos
              </li>
              <div className="ulPers">
                <li className="text-shadow-emerald-100">Evite sequências repetidas como 11112222</li>
                <li className="text-shadow-emerald-500">Evite datas de nascimento, CPF, RG ou outros dados pessoais</li>
                <li className="text-shadow-emerald-500">
                  Evite usar senhas fáceis de adivinhar, como 00000000 ou 12345678
                </li>
                <li className="text-shadow-emerald-500">Evite usar senhas que já foram usadas em outros sites</li>
              </div>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };
  const stepsArr = [
    { text: "Endereço", icon: <MapPin size={40} /> },
    { text: "Pessoais", icon: <IdCard size={40} /> },
    { text: "Financeiras", icon: <Banknote size={40} /> },
    { text: "Transação Key", icon: <KeyRound size={40} /> },
  ];

  return (
    <Dialog open={open}>
      <DialogContent fullscreen hideClose className="overflow-y-auto flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-center font-principal text-3xl">
            Complete seu <span className="text-Destaque">perfil</span>
          </DialogTitle>
        </DialogHeader>

        <Stepper steps={stepsArr} currentStep={step}  />

        <div className="flex flex-col gap-4 w-full lg:w-[40%] mx-auto">
          <div className="text-muted-foreground text-sm">
            Etapa {step + 1} de {steps.length}: {steps[step]}
          </div>
          <Separator />
          <form className="flex flex-col gap-4" onSubmit={(e) => handleConpleteProfile(e, form.getValues())}>
            {renderStep()}
            <div className="flex lg:flex-row flex-col space-y-4 mt-4  justify-between">
              <Button variant="outline" disabled={step === 0} onClick={prevStep}>
                Voltar
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={nextStep}>Próximo</Button>
              ) : (
                <Button type="submit" disabled={loading} className="text-neutral10 font-semibold">
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

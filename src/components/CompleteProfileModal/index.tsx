import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StepperProfile } from "./StepperProfile";
import { useProfileForm } from "@/hooks/useProfileCompleted";

import { Eye, EyeClosed } from "lucide-react";

const steps = ["Endereço", "Informações Pessoais", "Vida Financeira", "Transação key"];

export function CompleteProfileModal() {
  const [step, setStep] = useState(0);

  const { register, handleChange, open, handleConpleteProfile, errors, watch, form, visible, setVisible } =
    useProfileForm();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label>
                CEP <span className="text-Destaque">*</span>
              </Label>
              <Input
                {...register("cep")}
                required
                onChange={(e) => handleChange("cep", e.target.value)}
                placeholder="Ex.: 12345-678"
              />
              {errors.cep && <span className="text-red-500 text-sm mb-2">{errors.cep.message}</span>}
            </div>

            <Label>
              Rua <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("street")} required placeholder="Ex.: Rua 1" />

            <Label>
              Número <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("number")} required type="number" defaultValue={1} placeholder="Ex.: 123" />

            <Label>Complemento (opcional)</Label>
            <Input {...register("complement")} placeholder="Ex.: Casa 1" />

            <Label>
              Cidade <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("city")} required placeholder="Ex.: Sao Paulo" />

            <Label>
              Estado <span className="text-Destaque">*</span>{" "}
            </Label>
            <Input {...register("state")} placeholder="Ex.: SP" />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Label>Nome Social (opcional)</Label>
            <Input {...register("socialName")} placeholder="Ex.: João" />
            <div className="flex flex-col gap-4">
              <Label>
                Data de Nascimento <span className="text-Destaque">*</span>
              </Label>
              <Input
                type="date"
                {...register("birthDate")}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                required
                placeholder="Ex.: 01/01/2000"
              />

              {errors.birthDate && <span className="text-red-500 text-sm mb-2">{errors.birthDate.message}</span>}
            </div>

            <div className="flex flex-col gap-4">
              <Label>
                Gênero <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("gender", v)}>
                <SelectTrigger className="w-full">
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

              <Label>
                Estado Civil <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("maritalStatus", v)}>
                <SelectTrigger className="w-full">
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
            <Label>
              Renda Mensal <span className="text-Destaque">*</span>
            </Label>
            <Input
              type="text"
              value={watch("income") || ""}
              required
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
              <Label>
                Situação de Emprego <span className="text-Destaque">*</span>{" "}
              </Label>
              <Select onValueChange={(v) => handleChange("employmentStatus", v)} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="autonomo">Autônomo</SelectItem>
                  <SelectItem value="desempregado">Desempregado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Label>
              Ocupação <span className="text-Destaque">*</span>
            </Label>
            <Input {...register("occupation")} required placeholder="Ex.: Desenvolvedor" />

            <Label>
              Empresa <span className="text-Destaque">*</span>{" "}
            </Label>
            <Input {...register("company")} placeholder="Ex.: Google" />

            <div className="flex flex-col space-y-2">
              <Label>
                Escolaridade <span className="text-Destaque">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("education", v)} required>
                <SelectTrigger className="w-full">
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
            <Label>
              Senha de Transação <span className="text-Destaque">**</span>
            </Label>
            <div className="relative">
              <Input
                type={visible ? "text" : "password"}
                maxLength={6}
                value={watch("transactionPin") || ""}
                {...register("transactionPin")}
                placeholder="Apenas números, 8 dígitos"
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

  return (
    <Dialog open={open}>
      <DialogContent fullscreen hideClose className="overflow-y-auto flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-center font-principal text-3xl">
            Complete seu <span className="text-Destaque">perfil</span>
          </DialogTitle>
        </DialogHeader>

        <StepperProfile currentStep={step} />

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
                <Button type="submit">Finalizar Cadastro</Button>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

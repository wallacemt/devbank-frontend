import { useState } from "react";
import { useTransfer } from "./useTransfer";
import { useUserContext } from "./useUserContext";
import { postPixTransfer } from "@/api/transferApi";

interface TransferStates {
  pixKey: string;
  amount: number;
  method: string;
  step: "idle" | "confirm" | "password" | "processing" | "done";
  recipient?: string;
  transactionId?: string;
}

export const useTerminalWindow = () => {
  const [input, setInput] = useState("");
  const [maskedPassword, setMaskedPassword] = useState("");
  const [awaitPassword, setAwaitPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [transfer, setTransfer] = useState<TransferStates>({
    pixKey: "",
    amount: 0,
    method: "",
    step: "idle",
  });
  const [history, setHistory] = useState<string[]>([
    "Bem-vindo ao TransferShell",
    "Digite `dk -help` para ver os comandos disponíveis.",
  ]);

  const { user } = useUserContext();
  const { fetchUserByKey, getHistoryTrasfer, transferComprovante } = useTransfer();

  const appendToHistory = (msg: string | string[]) => setHistory((prev) => prev.concat(msg));

  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const trimmed = input.trim();
    appendToHistory(`${user?.name.split(" ")[0].toLowerCase()}@devbank:~$ ${trimmed}`);

    if (!trimmed) return setInput("");

    if (awaitPassword && transfer.step === "password") {
      await executeTransfer(passwordInput);
      setMaskedPassword("");
      setPasswordInput("");
      setAwaitPassword(false);
      setInput("");
      return;
    }

    await handleCommand(trimmed);
    setInput("");
  };

  const handleCommand = async (cmd: string) => {
    // Confirmação da transferência
    if (transfer.step === "confirm") {
      if (cmd === "1") {
        appendToHistory("Confirmação recebida. Digite sua senha:");
        setAwaitPassword(true);
        setTransfer((prev) => ({ ...prev, step: "password" }));
      } else {
        appendToHistory("Transferência cancelada.");
        resetTransfer();
      }
      return;
    }

    // Impressão de comprovante
    if (transfer.step === "done" && transfer.transactionId) {
      if (cmd === "1") {
        appendToHistory("Gerando comprovante...");
        try {
          await transferComprovante(transfer.transactionId);
          appendToHistory("Comprovante gerado com sucesso.");
        } catch {
          appendToHistory("Erro ao gerar comprovante.");
        }
      } else {
        appendToHistory("Transferência finalizada sem imprimir comprovante.");
      }
      resetTransfer();
      return;
    }

    // Comando de envio
    if (cmd.startsWith("send")) {
      const [_, amountStr, method, from, pixKey] = cmd.split(" ");

      if (!amountStr || !method || from !== "from" || !pixKey) {
        appendToHistory("Comando inválido. Use: send <valor> <metódo> from <chave>");
        return;
      }

      appendToHistory("Verificando destinatário...");
      try {
        const recipient = await fetchUserByKey(pixKey);
        setTransfer({
          pixKey,
          amount: Number(amountStr),
          method,
          step: "confirm",
          recipient: recipient?.userName,
        });
        appendToHistory([
          `Enviar R$${Number(amountStr).toFixed(2)} via ${method.toUpperCase()} para ${recipient?.userName} — CPF: ${
            recipient?.userCpf
          }`,
          "Confirmar transferência? [1] Sim [2] Não",
        ]);
      } catch {
        appendToHistory("Chave Pix inválida ou não encontrada.");
        resetTransfer();
      }
      return;
    }

    // Histórico
    if (cmd === "get send logs") {
      const data = await getHistoryTrasfer();
      if (!data?.length) {
        appendToHistory("Nenhuma transferência encontrada.");
        return;
      }
      const formatted = data.map(
        (h) => `${h.timestamp} | ${h.outherAccountUsername.split(" ")[0]} → R$${h.amount.toFixed(2)}`
      );
      appendToHistory(formatted);
      return;
    }

    // Ajuda
    if (cmd === "dk -help") {
      appendToHistory(["Comandos disponíveis:", "- send <valor> <método> from <chave>", "- get send logs", "- clear"]);
      return;
    }

    // Limpar
    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    appendToHistory(`Comando não reconhecido: ${cmd}`);
  };

  const executeTransfer = async (password: string) => {
    appendToHistory("Processando transferência...");
    setTransfer((prev) => ({ ...prev, step: "processing" }));
    console.log(password);
    try {
      const res = await postPixTransfer(transfer.amount.toString(), transfer.pixKey, password);

      setTransfer((prev) => ({
        ...prev,
        step: "done",
        transactionId: res.transactionId,
      }));
      appendToHistory(["Transferência realizada com sucesso!", "Deseja imprimir o comprovante? [1] Sim [2] Não"]);
    } catch (err: any) {
      appendToHistory("Erro: " + (err.response?.data?.error || "Erro desconhecido"));
      resetTransfer();
    }
  };

  const resetTransfer = () => setTransfer({ pixKey: "", amount: 0, method: "", step: "idle" });

  return {
    input,
    setInput,
    onKeyDown,
    history,
    user,
    awaitPassword,
    maskedPassword,
    setMaskedPassword,
    setPasswordInput,
  };
};

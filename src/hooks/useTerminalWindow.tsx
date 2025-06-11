import { useRef, useState } from "react";
import { useTransfer } from "./useTransfer";
import { useUserContext } from "./useUserContext";
import { postPixTransfer } from "@/api/transferApi";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

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
  const inputRef = useRef<HTMLInputElement>(null);
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
  const appendError = (msg: string) => setHistory((prev) => prev.concat(`Erro: ${msg}`));
  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const trimmed = input.trim();
    appendToHistory(`${user?.name.split(" ")[0].toLowerCase()}@devbank:~$ ${trimmed}`);

    if (!trimmed) return setInput("");

    if (awaitPassword && transfer.step === "password") {
      if (passwordInput.length === 6) {
        await executeTransfer(passwordInput);
        setMaskedPassword("");
        setPasswordInput("");
        setAwaitPassword(false);
        setInput("");
      } else {
        appendError("Senha deve conter 6 dígitos");
      }
      setInput("");
      return;
    }

    await handleCommand(trimmed);
    setInput("");
  };

  const handleCommand = async (cmd: string) => {
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
        appendError("Chave de pix inválida ou não encontrada.");
        resetTransfer();
      }
      return;
    }

    if (cmd === "get send logs") {
      const data = await getHistoryTrasfer();
      if (!data?.length) {
        appendToHistory("Nenhuma transferência encontrada.");
        return;
      }
      const formatted = data.map(
        (h) =>
          `${format(new Date(h.timestamp), "dd MMM yyyy, HH:mm", {
            locale: ptBR,
          })} | ${h.outherAccountUsername.split(" ")[0]} → R$${h.amount.toFixed(2)}`
      );
      appendToHistory(formatted);
      return;
    }

    if (cmd === "dk -help") {
      appendToHistory(["Comandos disponíveis:", "- send <valor> <método> from <chave>", "- get send logs", "- clear"]);
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    appendToHistory(`Comando não reconhecido: ${cmd}`);
  };

  const executeTransfer = async (password: string) => {
    const loadingSeps = [
      "Iniciando Transferência...",
      "Autenticando...",
      "Verificando saldo...",
      "Enviando para o destinatário...",
      "Finalizando...",
    ];
    setTransfer((prev) => ({ ...prev, step: "processing" }));

    for (const step in loadingSeps) {
      appendToHistory(loadingSeps[step]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
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
  const handleFocus = () => {
    return inputRef.current?.focus();
  };
  return {
    input,
    setInput,
    onKeyDown,
    history,
    handleFocus,
    inputRef,
    user,
    awaitPassword,
    maskedPassword,
    setMaskedPassword: (val: string | ((prev: string) => string)) => {
      setMaskedPassword((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        return next.length > 6 ? prev : next;
      });
    },
    setPasswordInput: (val: string) => {
      setPasswordInput((prev) => {
        const next = val.length > 6 ? prev : val;
        return next;
      });
    },
  };
};

import { useTerminalWindow } from "@/hooks/useTerminalWindow";
import { useEffect, useRef } from "react";

interface TerminalWindowProps {
  zoomLevel: number;
}
export function TerminalWindow({ zoomLevel }: TerminalWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    onKeyDown,
    input,
    setInput,
    history,
    awaitPassword,
    maskedPassword,
    setMaskedPassword,
    user,
    setPasswordInput,
  } = useTerminalWindow();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = document.getElementById("terminal-output");
    el?.scroll({ top: el.scrollHeight, behavior: "smooth" });
  }, [history]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (awaitPassword) {
      setMaskedPassword((prev) => prev + "*");
      setPasswordInput((prev) => prev + value.slice(-1));
      setInput(value);
    } else {
      setInput(value);
    }
  };
  return (
    <div
      className="flex flex-col p-1 h-full overflow-y-auto text-sm leading-relaxed"
      style={{ userSelect: "none", transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {history.map((line, i) => (
        <pre key={i} className="whitespace-pre-wrap text-green-400 mb-1">
          {line}
        </pre>
      ))}
      <div className="flex items-center">
        <span className="text-purple-400 mr-2">{user?.name.split(" ")[0].toLowerCase()}@devbank:~$</span>
        <input
          ref={inputRef}
          className="bg-transparent text-green-100 outline-none flex-1"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          value={awaitPassword ? maskedPassword : input}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}

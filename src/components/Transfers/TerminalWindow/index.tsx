import { useTerminalWindow } from "@/hooks/useTerminalWindow";
import { useEffect } from "react";

interface TerminalWindowProps {
  zoomLevel: number;
}
export function TerminalWindow({ zoomLevel }: TerminalWindowProps) {
  const {
    onKeyDown,
    input,
    setInput,
    history,
    awaitPassword,
    maskedPassword,
    setMaskedPassword,
    user,
    handleFocus,
    inputRef,
    setPasswordInput,
  } = useTerminalWindow();

  useEffect(() => {
    handleFocus();
  }, []);

  useEffect(() => {
    const el = document.getElementById("terminal-output");
    el?.scroll({ top: el.scrollHeight, behavior: "smooth" });
  }, [history]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (awaitPassword) {
      setMaskedPassword((prev) => prev + "*");
      setPasswordInput(value);
      setInput(value);
    } else {
      setInput(value);
    }
  };

  useEffect(() => {
    const el = document.getElementById("terminal-output");
    el?.scroll({ top: el.scrollHeight, behavior: "smooth" });
  }, [history]);

  return (
    <div
      className="flex flex-col text-green-400 font-mono p-2 overflow-hidden"
      style={{ userSelect: "none", transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <div className="overflow-y-auto h-full pr-2 mb-2 scrollbar-thin scrollbar-thumb-green-700" id="terminal-output">
        {history.map((line, i) => (
          <>
            {console.log(line.split(" ")[0])}
            <pre
              key={i}
              className={`whitespace-pre-wrap ${
                line.split(" ")[0] === "Erro:" ? "text-red-400" : "text-green-400"
              } mb-1`}
            >
              {line}
            </pre>
          </>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-purple-400 mr-2">{user?.name.split(" ")[0].toLowerCase()}@devbank:~$</span>
        <input
          ref={inputRef}
          className="bg-transparent text-green-100 outline-none flex-1 caret-green-400"
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

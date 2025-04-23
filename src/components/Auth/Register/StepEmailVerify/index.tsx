import { useEffect, useRef, useState } from "react";

export const StepEmailVerify = ({ data, onChange }) => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [time, setTime] = useState(5);

  useEffect(() => {
    onChange(codes.join(""));
  }, [codes]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const newCodes = [...codes];
      newCodes[index - 1] = "";
      setCodes(newCodes);
      inputsRef.current[index - 1]?.focus();
    }
  };
  const timer = useRef(null);

  useEffect(() => {
    if (time > 0) {
      timer.current = setInterval(() => setTime(time - 1), 1000);
    }
    return () => clearInterval(timer.current);
  }, [time]);

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4 p-6 bg-black/10 rounded-xl shadow-lg text-white"
        data-aos="fade-left"
      >
        <p className="text-center">
          Digite o código enviado para{" "}
          <span className="text-primary60 underline">
            {data.email || "seu e-mail"}
          </span>
        </p>
        <div className="flex justify-center gap-3">
          {codes.map((digit, index) => (
            <>
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center bg-gray-800 border-b border-primary50 rounded-md text-white text-2xl focus:outline-none focus:ring-2 focus:ring-primary60"
              />
              {index === 2 && <span className="text-2xl">-</span>}
            </>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-full hover:bg-primary70"
        >
          Confirmar Código
        </button>
        <div className={`text-center`}>
          {time > 0 ? (
            <>
              Envie novamente em{" "}
              {time < 60 ? (
                <span className="font-bold">{`0${Math.floor(time / 10)}`}</span>
              ) : (
                <span className="font-bold">{`${Math.floor(time / 60)}`}</span>
              )}
              m{time % 60}s
            </>
          ) : (
            <button
              type="button"
              onClick={() => console.log("enviando...")}
              className="font-bold hover:underline"
            >
              Enviar novamente
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

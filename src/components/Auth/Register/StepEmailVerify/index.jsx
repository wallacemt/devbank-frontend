import { useEffect, useRef, useState } from "react";

export const StepEmailVerify = ({ code, onChange, email }) => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

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

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4 p-6 bg-black/10 rounded-xl shadow-lg text-white" data-aos="fade-left">
        <p className="text-center">
          Digite o código enviado para{" "}
          <span className="text-primary60 underline">{email || "seu e-mail"}</span>
        </p>
        <div className="flex justify-center gap-3">
          {codes.map((digit, index) => (
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
          ))}
        </div>
        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-full hover:bg-primary70">
          Confirmar Código
        </button>
      </form>
    </div>
  );
};

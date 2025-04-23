import { IdCard, ScanQrCode, Verified } from "lucide-react";

const steps = [
  { text: "Personal Info", icon: <IdCard size={40} /> },
  { text: "Email Verify", icon: <Verified size={40} /> },
  { text: "Password", icon: <ScanQrCode  size={40} /> },
];

export const Stepper = ({ currentStep }: {currentStep: number}) => {
  return (
    <div className="flex justify-between items-center w-full mb-12">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300
            ${index <= currentStep ? "bg-green-700 text-white" : "bg-gray-500 text-gray-200"}
            `}
          >
            {label.icon}
          </div>
          <span
            className={`text-1xl mt-1 text-center font-secundaria relative
                ${index <= currentStep ? "text-white" : "text-gray-400"}
        `}
          >
            {label.text}
            {index < steps.length && (
              <div className="h-2 w-full absolute bg-gray-300 my-1 rounded-full">
                {index <= currentStep && <div className="h-2 w-full bg-green-700 rounded-full" />}
              </div>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

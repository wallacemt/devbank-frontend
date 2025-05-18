import { IdCard, MapPin, Banknote, UserCircle, Verified, KeyRound } from "lucide-react";

const steps = [
  { text: "Endereço", icon: <MapPin size={40} /> },
  { text: "Pessoais", icon: <IdCard size={40} /> },
  { text: "Financeiras", icon: <Banknote size={40} /> },
  { text: "Transação Key", icon: <KeyRound size={40} /> },
];

export const StepperProfile = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex  justify-between items-center w-full mb-12 max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center relative z-4">
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300
              ${index <= currentStep ? "bg-green-700 text-white" : "bg-gray-500 text-gray-200"}
            `}
          >
            {step.icon}
          </div>
          <span
            className={`text-sm mt-2 text-center font-medium
              ${index <= currentStep ? "text-white" : "text-gray-400"}
            `}
          >
            {step.text}
          </span>
          {index < steps.length - 1 && (
            <div className="absolute top-8 right-[-60%] w-full h-1 bg-gray-400 rounded-full -z-1">
              {index < currentStep && <div className="h-full bg-green-300 rounded-full transition-all duration-300" />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

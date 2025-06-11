import { ReactNode } from "react";

interface Step {
  text: string;
  icon: ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex  justify-between items-center w-full mb-4 max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col w-full mr-2 items-center relative z-4"
        >
          <div
            className={`md:w-16 h-16 flex  items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 p-1
              ${
                index <= currentStep
                  ? "bg-green-700 text-white"
                  : "bg-gray-500 text-gray-200"
              }
            `}
          >
            {step.icon}
          </div>
          <span
            className={`text-xs md:text-sm mt-2 text-center font-medium
              ${index <= currentStep ? "text-white" : "text-gray-400"}
            `}
          >
            {step.text}
          </span>
          {index < steps.length - 1 && (
            <div className="absolute top-8 right-[-40%] w-full h-1 bg-gray-400 rounded-full -z-1">
              {index < currentStep && (
                <div className="h-full bg-green-300 rounded-full transition-all duration-300" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

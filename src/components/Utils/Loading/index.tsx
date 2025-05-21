import React, { useEffect } from 'react';
import { FaBitcoin, FaCodeBranch, FaServer, FaEthereum } from 'react-icons/fa';

export const Loading: React.FC = () => {
  useEffect(() => {
    const binaryElements = document.querySelectorAll('.binary-code');
    binaryElements.forEach(el => {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;

      const duration = 3 + Math.random() * 4;
      (el as HTMLElement).style.animation = `float ${duration}s ease-in-out infinite`;
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background binary code */}
      <div className="binary-code absolute top-[10%] left-[5%]">1010101</div>
      <div className="binary-code absolute top-[30%] right-[15%]">1100110</div>
      <div className="binary-code absolute bottom-[25%] left-[20%]">1001001</div>
      <div className="binary-code absolute bottom-[15%] right-[10%]">1110001</div>
      <div className="binary-code absolute top-[20%] right-[25%]">1011010</div>

      <div className="relative code-bracket flex flex-col items-center justify-center p-12">
        <div className="flex items-center mb-8 floating">
          <h1 className="text-5xl sm:text-6xl font-bold font-principal text-center">
            <span className="text-Destaque">Dev</span>BANK <span className="text-amber-600">$</span>{" "}
          </h1>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-[80%] md:max-w-full mb-8 overflow-hidden">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-gray-400 text-sm">terminal</div>
          </div>
          <div className="font-mono text-green-400 mb-2">$ loading DevBank services...</div>
          <div className="font-mono text-blue-400 mb-2">
            &gt; checking blockchain nodes{' '}
            <span className="inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
          </div>
          <div className="font-mono text-purple-400 mb-2">
            &gt; verifying smart contracts <span className="text-gray-400">[████░░░] 40%</span>
          </div>
          <div className="font-mono text-yellow-400">
            &gt; compiling security protocols <span className="text-gray-400">[███████░] 70%</span>
          </div>
        </div>

        <div className="typing text-xs font-mono mb-8">
          Initializing your developer banking experience...
        </div>

        {/* Crypto icons */}
        <div className="flex space-x-6">
          <FaBitcoin className="text-yellow-500 text-2xl pulse" />
          <FaEthereum className="text-purple-400 text-2xl pulse" />
          <FaCodeBranch className="text-blue-400 text-2xl pulse" />
          <FaServer className="text-green-400 text-2xl pulse" />
        </div>
      </div>

      <div className="absolute bottom-6 text-gray-500 text-sm">
        <p>Securely connecting to the DevBank network...</p>
      </div>

      {/* Inline styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #3b82f6 }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .typing {
          overflow: hidden;
          border-right: .15em solid #3b82f6;
          white-space: nowrap;
          animation:
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
        }

        .code-bracket::before, .code-bracket::after {
          content: "{";
          position: absolute;
          color: #3b82f6;
          font-size: 4rem;
          font-weight: bold;
          opacity: 0.2;
        }

        .code-bracket::before {
          left: -2rem;
          top: -1rem;
        }

        .code-bracket::after {
          content: "}";
          right: -2rem;
          bottom: -1rem;
        }

        .binary-code {
          color: rgba(59, 130, 246, 0.1);
          font-family: monospace;
          font-size: 0.8rem;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

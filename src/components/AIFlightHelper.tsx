import React from "react";
import { Send } from "lucide-react";

interface AIFlightHelperProps {
  isOpen: boolean;
  onClose: () => void;
  aiPrompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
}

const AIFlightHelper: React.FC<AIFlightHelperProps> = ({
  isOpen,
  onClose,
  aiPrompt,
  onPromptChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-6 z-50 animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">AI Flight Assistant</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 h-[calc(100%-150px)]">
        <div className="text-center text-gray-500 mt-10">
          Ask me about finding flights!
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Find me a flight to..."
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AIFlightHelper;

import React from "react";
import { DollarSign } from "lucide-react";

interface EnvelopeProps {
  isOpen: boolean;
  userName?: string;
  amount?: number;
  onClick: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, userName, amount, onClick }) => {
  return (
    <div
      onClick={!isOpen ? onClick : undefined}
      className={`
        relative aspect-square w-full max-w-[300px] mx-auto rounded-lg 
        ${!isOpen ? 'cursor-pointer hover:scale-105' : ''} 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'bg-white shadow-lg scale-100' : 'bg-envelope-red shadow-md hover:shadow-lg'}
      `}
    >
      {!isOpen ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-envelope-gold transform transition-transform hover:scale-110">
            <DollarSign size={64} />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 animate-envelope-open">
          <p className="text-3xl font-bold text-envelope-red mb-3">
            {amount?.toLocaleString()}đ
          </p>
          <p className="text-gray-600 text-lg mt-2">{userName}</p>
        </div>
      )}
    </div>
  );
};

export default Envelope;
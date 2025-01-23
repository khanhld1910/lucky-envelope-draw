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
        relative aspect-square w-full max-w-[200px] rounded-lg 
        ${!isOpen ? 'cursor-pointer hover:scale-105' : ''} 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'bg-white shadow-lg' : 'bg-envelope-red shadow-md hover:shadow-lg'}
      `}
    >
      {!isOpen ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-envelope-gold">
            <DollarSign size={48} />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 animate-envelope-open">
          <p className="text-2xl font-bold text-envelope-red mb-2">
            {amount?.toLocaleString()}đ
          </p>
          <p className="text-gray-600 text-sm mt-2">{userName}</p>
        </div>
      )}
    </div>
  );
};

export default Envelope;
import React from "react";

interface EnvelopeProps {
  isOpen: boolean;
  userName?: string;
  amount?: number;
  onClick: () => void;
}

const SnakeSVG = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-16 h-16 text-envelope-gold transform transition-transform hover:scale-110"
  >
    <path
      d="M30 50C30 40 40 35 50 35C60 35 70 40 70 50C70 60 60 65 50 65C40 65 30 60 30 50Z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M45 45C45 43 47 42 50 42C53 42 55 43 55 45C55 47 53 48 50 48C47 48 45 47 45 45Z"
      fill="#000"
    />
    <path
      d="M50 55C52 55 54 56 54 58C54 60 52 61 50 61C48 61 46 60 46 58C46 56 48 55 50 55Z"
      fill="#FF0000"
    />
    <path
      d="M30 50C30 40 20 35 10 35M70 50C70 40 80 35 90 35"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

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
          <SnakeSVG />
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
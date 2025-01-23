import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import NameInputDialog from "@/components/NameInputDialog";
import { useToast } from "@/components/ui/use-toast";

interface EnvelopeData {
  isOpen: boolean;
  userName?: string;
  amount?: number;
}

const INITIAL_AMOUNTS = [100000, 200000, 200000, 200000, 500000];

const Index = () => {
  const { toast } = useToast();
  const [envelopes, setEnvelopes] = useState<EnvelopeData[]>(
    Array(5).fill({ isOpen: false })
  );
  const [selectedEnvelopeIndex, setSelectedEnvelopeIndex] = useState<number | null>(
    null
  );
  const [remainingAmounts, setRemainingAmounts] = useState([...INITIAL_AMOUNTS]);

  const handleEnvelopeClick = (index: number) => {
    if (!envelopes[index].isOpen) {
      setSelectedEnvelopeIndex(index);
    }
  };

  const handleNameSubmit = (name: string) => {
    if (selectedEnvelopeIndex === null || remainingAmounts.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingAmounts.length);
    const amount = remainingAmounts[randomIndex];

    setEnvelopes((prev) =>
      prev.map((env, i) =>
        i === selectedEnvelopeIndex
          ? { isOpen: true, userName: name, amount }
          : env
      )
    );

    setRemainingAmounts((prev) => [
      ...prev.slice(0, randomIndex),
      ...prev.slice(randomIndex + 1),
    ]);

    setSelectedEnvelopeIndex(null);

    toast({
      title: "Envelope Opened!",
      description: `Congratulations ${name}! You received ${amount.toLocaleString()}đ`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white bg-lucky-pattern">
      <div className="container py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-envelope-red text-center mb-8">
          Lì Xì Lucky Draw
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
          {envelopes.map((envelope, index) => (
            <Envelope
              key={index}
              isOpen={envelope.isOpen}
              userName={envelope.userName}
              amount={envelope.amount}
              onClick={() => handleEnvelopeClick(index)}
            />
          ))}
        </div>
      </div>
      <NameInputDialog
        isOpen={selectedEnvelopeIndex !== null}
        onClose={() => setSelectedEnvelopeIndex(null)}
        onSubmit={handleNameSubmit}
      />
    </div>
  );
};

export default Index;
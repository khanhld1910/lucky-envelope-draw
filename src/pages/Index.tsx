import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import NameInputDialog from "@/components/NameInputDialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnvelopeData {
  isOpen: boolean;
  userName?: string;
  amount?: number;
}

interface CashType {
  amount: number;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [envelopes, setEnvelopes] = useState<EnvelopeData[]>([]);
  const [selectedEnvelopeIndex, setSelectedEnvelopeIndex] = useState<number | null>(
    null
  );
  const [remainingAmounts, setRemainingAmounts] = useState<number[]>([]);
  
  // New state for cash type inputs
  const [cashTypes, setCashTypes] = useState<CashType[]>([]);
  const [newAmount, setNewAmount] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleAddCashType = () => {
    const amount = parseInt(newAmount);
    const quantity = parseInt(newQuantity);
    
    if (isNaN(amount) || isNaN(quantity) || amount <= 0 || quantity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for amount and quantity",
        variant: "destructive",
      });
      return;
    }

    setCashTypes([...cashTypes, { amount, quantity }]);
    setNewAmount("");
    setNewQuantity("");

    // Update envelopes and remaining amounts
    const totalEnvelopes = [...envelopes];
    const newRemainingAmounts = [...remainingAmounts];
    
    for (let i = 0; i < quantity; i++) {
      newRemainingAmounts.push(amount);
      totalEnvelopes.push({ isOpen: false });
    }

    setEnvelopes(totalEnvelopes);
    setRemainingAmounts(newRemainingAmounts);

    toast({
      title: "Cash Type Added",
      description: `Added ${quantity}x ${amount.toLocaleString()}đ to the pool`,
    });
  };

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

        {/* Cash Type Input Section */}
        <div className="max-w-xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Cash Types</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Amount (đ)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                min="1"
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                min="1"
              />
            </div>
            <Button onClick={handleAddCashType}>Add</Button>
          </div>

          {/* Display current cash types */}
          <div className="space-y-2">
            {cashTypes.map((type, index) => (
              <div key={index} className="text-sm text-gray-600">
                {type.quantity}x {type.amount.toLocaleString()}đ
              </div>
            ))}
          </div>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
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
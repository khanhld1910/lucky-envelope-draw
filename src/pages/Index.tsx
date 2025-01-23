import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import NameInputDialog from "@/components/NameInputDialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";

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
  const [selectedEnvelopeIndex, setSelectedEnvelopeIndex] = useState<number | null>(null);
  const [remainingAmounts, setRemainingAmounts] = useState<number[]>([]);
  const [nameList, setNameList] = useState<string>("");
  
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

  const handleNameListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNameList(e.target.value);
  };

  const handleProcessNameList = () => {
    const names = nameList.split('\n').filter(name => name.trim());
    if (names.length === 0) {
      toast({
        title: "No Names Found",
        description: "Please enter at least one name",
        variant: "destructive",
      });
      return;
    }
    setNameList("");
    names.forEach(name => {
      if (remainingAmounts.length > 0) {
        handleNameSubmit(name.trim());
      }
    });
  };

  const exportToCSV = () => {
    // Filter only opened envelopes with names and amounts
    const openedEnvelopes = envelopes.filter(env => env.isOpen && env.userName && env.amount);
    
    if (openedEnvelopes.length === 0) {
      toast({
        title: "No Data to Export",
        description: "There are no opened envelopes to export.",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const csvContent = [
      "Name,Amount (VNĐ)", // Header row
      ...openedEnvelopes.map(env => `${env.userName},${env.amount?.toLocaleString()}`)
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lucky-money-results.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "The results have been exported to CSV",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white bg-lucky-pattern">
      <div className="container py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-envelope-red text-center mb-8">
          Lì Xì Lucky Draw
        </h1>

        <div className="max-w-xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Cash Types</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Amount (VNĐ)"
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

          <div className="space-y-2">
            {cashTypes.map((type, index) => (
              <div key={index} className="text-sm text-gray-600">
                {type.quantity}x {type.amount.toLocaleString()}đ
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Name List</h3>
            <Textarea
              placeholder="Enter names (one per line)"
              value={nameList}
              onChange={handleNameListChange}
              className="mb-2"
            />
            <Button onClick={handleProcessNameList} className="w-full">
              Process Names
            </Button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto envelope-grid">
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

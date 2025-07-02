import { useState } from "react";
import { Button } from "@/components/ui/button";
import { KioskScreen } from "../KioskApp";

interface KioskPaymentProps {
  total: number;
  onNavigate: (screen: KioskScreen) => void;
}

const paymentMethods = [
  {
    id: 'cash',
    name: 'Cash',
    amount: 57.50,
    icon: '💵'
  },
  {
    id: 'credit',
    name: 'Credit',
    amount: 57.50,
    icon: '💳'
  },
  {
    id: 'debit',
    name: 'Debit',
    amount: 57.50,
    icon: '💳'
  },
  {
    id: 'split',
    name: 'Split',
    amount: 57.50,
    icon: '🍴'
  }
];

const KioskPayment = ({ total, onNavigate }: KioskPaymentProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const subtotal = total;
  const dueAmount = total;

  const handlePayment = () => {
    if (selectedPayment) {
      onNavigate('thankyou');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Payment Details</h2>
      </div>

      {/* Bill Summary */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">BILL DETAILS</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sub Total</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due Amount</span>
            <span className="text-foreground">${dueAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        You can choose any payment mode and proceed to pay. You can split the bill using 'Split' mode.
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPayment(method.id)}
            className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
              selectedPayment === method.id
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : 'bg-card text-card-foreground border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium">{method.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">${method.amount.toFixed(2)}</span>
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Pay Button */}
      <Button 
        variant="kiosk-primary" 
        className="w-full py-6 text-lg font-semibold"
        onClick={handlePayment}
        disabled={!selectedPayment}
      >
        PAY ${dueAmount.toFixed(2)}
      </Button>
    </div>
  );
};

export default KioskPayment;
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { KioskScreen } from "../KioskApp";

interface KioskThankYouProps {
  onNavigate: (screen: KioskScreen) => void;
}

const KioskThankYou = ({ onNavigate }: KioskThankYouProps) => {
  useEffect(() => {
    // Auto-redirect to landing after 10 seconds
    const timer = setTimeout(() => {
      onNavigate('landing');
    }, 10000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="w-full max-w-md text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Payment</h2>
      </div>

      {/* Success Message */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-primary">Thank you for your order !</h1>
        <p className="text-lg text-muted-foreground">Your receipt is being printed.....</p>
      </div>

      {/* Receipt Icon */}
      <div className="flex justify-center">
        <div className="w-32 h-40 bg-card rounded-lg border border-border flex items-center justify-center shadow-elegant">
          <div className="w-20 h-28 bg-background rounded border-2 border-dashed border-border flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-1 bg-muted-foreground rounded"></div>
            <div className="w-8 h-1 bg-muted-foreground rounded"></div>
            <div className="w-10 h-1 bg-muted-foreground rounded"></div>
            <div className="w-6 h-1 bg-muted-foreground rounded"></div>
            <div className="text-xs text-primary">🧾</div>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <Button 
        variant="kiosk-primary" 
        className="w-full py-6 text-lg font-semibold"
        onClick={() => onNavigate('landing')}
      >
        Start New Order
      </Button>

      <p className="text-sm text-muted-foreground">
        Redirecting to home page in 10 seconds...
      </p>
    </div>
  );
};

export default KioskThankYou;
import { Button } from "@/components/ui/button";
import { KioskScreen } from "../KioskApp";

interface KioskLandingProps {
  onNavigate: (screen: KioskScreen) => void;
}

const KioskLanding = ({ onNavigate }: KioskLandingProps) => {
  return (
    <div className="w-full max-w-2xl text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-primary mb-2">Kiosk</h1>
        <h2 className="text-4xl font-light text-foreground">Self checkout</h2>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Empower Your Checkout Experience<br />
          Seamless Self-Checkout at Your Fingertip
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Scan Items */}
        <div className="bg-card rounded-xl p-8 border border-border hover:shadow-elegant transition-all duration-300 group cursor-pointer">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary rounded" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Scan Items</h3>
            <p className="text-muted-foreground">
              User scanner to scan and add items to cart
            </p>
            <Button 
              variant="kiosk-primary" 
              className="w-full mt-4"
              onClick={() => onNavigate('menu')}
            >
              Start Scanning
            </Button>
          </div>
        </div>

        {/* Dine In */}
        <div className="bg-card rounded-xl p-8 border border-border hover:shadow-elegant transition-all duration-300 group cursor-pointer">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-full" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Dine In</h3>
            <p className="text-muted-foreground">
              Select items from menu and add to cart
            </p>
            <Button 
              variant="kiosk-primary" 
              className="w-full mt-4"
              onClick={() => onNavigate('menu')}
            >
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskLanding;
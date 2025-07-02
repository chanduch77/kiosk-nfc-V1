import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KioskScreen, CustomerDetails } from "../KioskApp";

interface KioskPersonalDetailsProps {
  customerDetails: CustomerDetails;
  setCustomerDetails: (details: CustomerDetails) => void;
  onNavigate: (screen: KioskScreen) => void;
}

const KioskPersonalDetails = ({ customerDetails, setCustomerDetails, onNavigate }: KioskPersonalDetailsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerDetails.name.trim()) {
      onNavigate('payment');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Personal Details</h2>
        <p className="text-muted-foreground">
          By providing this information you will receive exciting offers & discounts.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Please enter your name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={customerDetails.name}
            onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
            className="bg-card border-border text-foreground"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">Please enter your mobile number</Label>
          <div className="flex">
            <div className="flex items-center px-3 py-2 bg-card border border-r-0 border-border rounded-l-md">
              <span className="text-xs">🇺🇸</span>
              <span className="ml-2 text-sm text-foreground">+1</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="Mobile number"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
              className="bg-card border-border text-foreground rounded-l-none"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Button 
            type="submit"
            variant="kiosk-primary" 
            className="w-full py-6 text-lg font-semibold"
          >
            CONTINUE
          </Button>

          <Button 
            type="button"
            variant="ghost" 
            className="w-full text-primary hover:text-primary-glow"
            onClick={() => onNavigate('payment')}
          >
            SKIP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KioskPersonalDetails;
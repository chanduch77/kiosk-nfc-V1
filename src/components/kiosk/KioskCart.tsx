import { Button } from "@/components/ui/button";
import { KioskScreen, CartItem } from "../KioskApp";

interface KioskCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onNavigate: (screen: KioskScreen) => void;
  total: number;
}

const KioskCart = ({ items, onUpdateQuantity, onNavigate, total }: KioskCartProps) => {
  const subtotal = total;
  const discount = 2.00;
  const taxAndFees = 0.50;
  const finalTotal = subtotal - discount + taxAndFees;

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Cart Details</h2>
        <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mt-4 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Large • Beef • Chilly Sauce x1 • Chilly flakes x1
                  </p>
                  <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  EDIT
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add More Items */}
        <button className="w-full p-4 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          + Add more items
        </button>
      </div>

      {/* Add-ons */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">ADD-ONS</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Pepsi', price: 3.00 },
            { name: 'Fries', price: 5.00 },
            { name: 'Sauce', price: 8.00 },
            { name: 'CocaCola', price: 8.00 }
          ].map((addon) => (
            <div key={addon.name} className="bg-card rounded-lg border border-border p-3 text-center">
              <p className="text-sm font-medium text-foreground">{addon.name}</p>
              <p className="text-lg font-bold text-primary">${addon.price.toFixed(2)}</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Button variant="outline" size="icon" className="w-6 h-6 rounded-full bg-primary text-primary-foreground">-</Button>
                <span className="text-sm">0</span>
                <Button variant="outline" size="icon" className="w-6 h-6 rounded-full bg-primary text-primary-foreground">+</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">BILL DETAILS</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discounts</span>
            <span className="text-green-500">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax and fees</span>
            <span className="text-foreground">${taxAndFees.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">To pay</span>
              <span className="text-primary">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button 
        variant="kiosk-primary" 
        className="w-full py-6 text-lg font-semibold"
        onClick={() => onNavigate('personal')}
      >
        {items.length} ITEMS | ${finalTotal.toFixed(2)} &nbsp;&nbsp;&nbsp; CHECKOUT
      </Button>
    </div>
  );
};

export default KioskCart;
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import KioskLanding from "./kiosk/KioskLanding";
import KioskMenu from "./kiosk/KioskMenu";
import KioskCart from "./kiosk/KioskCart";
import KioskPersonalDetails from "./kiosk/KioskPersonalDetails";
import KioskPayment from "./kiosk/KioskPayment";
import KioskThankYou from "./kiosk/KioskThankYou";
import kioskBg from "@/assets/kiosk-bg.jpg";

export type KioskScreen = 'landing' | 'menu' | 'cart' | 'personal' | 'payment' | 'thankyou';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
}

const KioskApp = () => {
  const [currentScreen, setCurrentScreen] = useState<KioskScreen>('landing');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({ name: '', phone: '' });

  const navigateBack = () => {
    switch (currentScreen) {
      case 'menu':
        setCurrentScreen('landing');
        break;
      case 'cart':
        setCurrentScreen('menu');
        break;
      case 'personal':
        setCurrentScreen('cart');
        break;
      case 'payment':
        setCurrentScreen('personal');
        break;
      case 'thankyou':
        setCurrentScreen('landing');
        setCartItems([]);
        setCustomerDetails({ name: '', phone: '' });
        break;
      default:
        setCurrentScreen('landing');
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <KioskLanding onNavigate={setCurrentScreen} />;
      case 'menu':
        return <KioskMenu onAddToCart={addToCart} cartItems={cartItems} onNavigate={setCurrentScreen} />;
      case 'cart':
        return <KioskCart items={cartItems} onUpdateQuantity={updateQuantity} onNavigate={setCurrentScreen} total={getTotalAmount()} />;
      case 'personal':
        return <KioskPersonalDetails customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} onNavigate={setCurrentScreen} />;
      case 'payment':
        return <KioskPayment total={getTotalAmount()} onNavigate={setCurrentScreen} />;
      case 'thankyou':
        return <KioskThankYou onNavigate={setCurrentScreen} />;
      default:
        return <KioskLanding onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${kioskBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        {currentScreen !== 'landing' && (
          <header className="p-6 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={navigateBack}
              className="text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-primary">Kiosk</h1>
              <p className="text-sm text-muted-foreground">Self checkout</p>
            </div>
          </header>
        )}

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-6">
          {renderCurrentScreen()}
        </main>

        {/* Footer */}
        <footer className="p-4 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Powered by</span>
            <img 
              src="/lovable-uploads/0f314711-ba28-4bd0-8920-bc300fc683df.png" 
              alt="Nova Flare Connect" 
              className="h-6"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KioskApp;
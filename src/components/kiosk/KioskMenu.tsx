import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KioskScreen, CartItem } from "../KioskApp";
import noodlesIcon from "@/assets/noodles-icon.jpg";
import burgerIcon from "@/assets/burger-icon.jpg";
import drinksIcon from "@/assets/drinks-icon.jpg";
import riceIcon from "@/assets/rice-icon.jpg";

interface KioskMenuProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  cartItems: CartItem[];
  onNavigate: (screen: KioskScreen) => void;
}

const menuItems = [
  {
    id: 'udon-1',
    name: 'Udon',
    category: 'Noodles',
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: noodlesIcon
  },
  {
    id: 'ramen-1',
    name: 'Ramen',
    category: 'Noodles', 
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: noodlesIcon
  },
  {
    id: 'pad-thai-1',
    name: 'Pad Thai',
    category: 'Noodles',
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: noodlesIcon
  },
  {
    id: 'spaghetti-1',
    name: 'Spaghetti Bolognese',
    category: 'Noodles',
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: noodlesIcon
  },
  {
    id: 'pho-1',
    name: 'Pho',
    category: 'Noodles',
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: noodlesIcon
  },
  {
    id: 'soba-1',
    name: 'Soba',
    category: 'Rice Bowl',
    price: 13.80,
    description: 'Thick, chewy Japanese wheat noodles often served in a clear broth or stir-fried.',
    image: riceIcon
  }
];

const categories = [
  { name: 'Noodles', icon: noodlesIcon },
  { name: 'Burgers', icon: burgerIcon },
  { name: 'Drinks', icon: drinksIcon },
  { name: 'Rice Bowl', icon: riceIcon }
];

const KioskMenu = ({ onAddToCart, cartItems, onNavigate }: KioskMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Noodles');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => 
    item.category === selectedCategory && 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">What would you like to have today?</h2>
        <Input 
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md mx-auto bg-card border-border"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                selectedCategory === category.name
                  ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                  : 'bg-card text-card-foreground border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img src={category.icon} alt={category.name} className="w-10 h-10 rounded-lg object-cover" />
                <span className="font-medium">{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-3 space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getItemQuantity(item.id) > 0 && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {getItemQuantity(item.id)}
                    </Badge>
                  )}
                  <Button
                    variant="kiosk-primary"
                    size="icon"
                    onClick={() => onAddToCart(item)}
                    className="rounded-full w-10 h-10"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-8 py-4 shadow-glow">
          <button 
            onClick={() => onNavigate('cart')}
            className="flex items-center space-x-4"
          >
            <span className="font-semibold">{totalItems} ITEMS | ${totalAmount.toFixed(2)}</span>
            <span className="font-bold">CHECKOUT</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default KioskMenu;
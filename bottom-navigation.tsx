import { Badge } from "./ui/badge";
import { Home, Coffee, ShoppingCart, Bell, MessageSquare, Gamepad2 } from "lucide-react";

export function BottomNavigation({ 
  activeScreen, 
  onScreenChange, 
  cartItemCount,
  notificationCount 
}: { 
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  cartItemCount: number;
  notificationCount: number;
}) {
  const navItems = [
    {
      id: "home",
      icon: Home,
      label: "Inicio",
      badge: null
    },
    {
      id: "catalog",
      icon: Coffee,
      label: "Menú",
      badge: null
    },
    {
      id: "cart",
      icon: ShoppingCart,
      label: "Carrito",
      badge: cartItemCount > 0 ? cartItemCount : null
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Avisos",
      badge: notificationCount > 0 ? notificationCount : null
    },
    {
      id: "reviews",
      icon: MessageSquare,
      label: "Reseñas",
      badge: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFCF8] border-t border-[#F8F2E8] shadow-2xl rounded-t-3xl z-50">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`relative flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-[#2F1B14] text-white shadow-lg scale-105' 
                  : 'text-[#2F1B14] hover:bg-[#F8F2E8]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${
                  isActive ? 'animate-bounce-subtle' : ''
                }`} />
                
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-[#2F1B14] text-white text-xs min-w-5 h-5 flex items-center justify-center p-0 rounded-full">
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-white' : 'text-[#2F1B14]'
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <div className="absolute -bottom-1 w-8 h-1 bg-[#2F1B14] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* iOS-style home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-[#F8F2E8] rounded-full" />
      </div>
    </div>
  );
}
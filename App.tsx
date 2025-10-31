import { useState } from "react";
import { HomeScreen } from "./components/home-screen";
import { EnhancedHomeScreen } from "./components/enhanced-home-screen";
import { CatalogScreen } from "./components/catalog-screen";
import { CartScreen } from "./components/cart-screen";
import { NotificationsScreen } from "./components/notifications-screen";
import { ReviewsScreen } from "./components/reviews-screen";
import { BottomNavigation } from "./components/bottom-navigation";
import { ProductDetail } from "./components/product-detail";
import { OrderTracking } from "./components/order-tracking";
import { CoffeeGames } from "./components/coffee-games";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(2);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");
  
  // Simple tracking states
  const [beverageCount, setBeverageCount] = useState(3); // User has bought 3 beverages
  const [userPoints, setUserPoints] = useState(125);
  
  // Popular product for quick order
  const mostPopularProduct = {
    id: 1,
    name: "Waffle de avena premium",
    description: "Masa artesanal con ingredientes orgánicos",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1508608120753-d984bc5ecf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZWxnaWFuJTIwd2FmZmxlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc1ODE1Mjc2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "waffles",
    isPopular: true
  };

  const addToCart = (product: any, quantity: number = 1, customizations?: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customizations: customizations || item.customizations }
            : item
        );
      } else {
        toast.success(`${product.name} agregado al carrito`, {
          description: "¡Excelente elección!",
          duration: 2000,
        });
        
        // Update beverage count for donation tracking
        setBeverageCount(prev => prev + quantity);
        
        return [...prev, { ...product, quantity, customizations }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Producto eliminado del carrito");
  };

  const handleCheckout = (paymentMethod: string) => {
    const orderId = `CF${Date.now().toString().slice(-6)}`;
    setCurrentOrderId(orderId);
    
    toast.success("¡Pedido realizado con éxito!", {
      description: `Pago procesado con ${paymentMethod}. Seguimiento iniciado automáticamente 🚀`,
      duration: 4000,
    });
    
    setCartItems([]);
    setNotificationCount(prev => prev + 1);
    setIsTracking(true);
  };

  const handleScreenChange = (screen: string) => {
    setActiveScreen(screen);
    setSelectedProduct(null);
    setIsTracking(false);
    
    // Mark notifications as read when viewing notifications screen
    if (screen === "notifications") {
      setNotificationCount(0);
    }
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleQuickOrder = () => {
    addToCart(mostPopularProduct, 1);
    toast.success("¡Producto agregado al carrito!", {
      description: `${mostPopularProduct.name} - Tu pedido más frecuente`,
      duration: 2000,
    });
  };

  const handleCustomizeOrder = () => {
    setSelectedProduct(mostPopularProduct);
  };

  const handleEarnPoints = (points: number) => {
    setUserPoints(prev => {
      const newPoints = prev + points;
      toast.success(`¡Has ganado ${points} puntos!`, {
        description: `Total: ${newPoints} puntos`,
        duration: 2000,
      });
      
      return newPoints;
    });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderActiveScreen = () => {
    // Product detail view
    if (selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onStartTracking={handleStartTracking}
        />
      );
    }

    // Order tracking view
    if (isTracking && currentOrderId) {
      return (
        <OrderTracking
          orderId={currentOrderId}
          onClose={() => setIsTracking(false)}
        />
      );
    }

    switch (activeScreen) {
      case "home":
        return (
          <div className="space-y-6">
            <EnhancedHomeScreen 
              onViewProduct={handleViewProduct}
              onViewMenu={() => handleScreenChange("catalog")}
              onQuickOrder={handleQuickOrder}
              onCustomizeOrder={handleCustomizeOrder}
              beverageCount={beverageCount}
              userPoints={userPoints}
              mostPopularProduct={mostPopularProduct}
            />
            <div className="px-6 bg-[rgba(207,195,179,0.91)]">
              <CoffeeGames
                onEarnPoints={handleEarnPoints}
                userPoints={userPoints}
              />
            </div>
          </div>
        );
      case "catalog":
        return (
          <CatalogScreen 
            onAddToCart={addToCart}
            onViewProduct={handleViewProduct}
          />
        );
      case "cart":
        return (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        );
      case "notifications":
        return <NotificationsScreen />;
      case "reviews":
        return <ReviewsScreen />;
      default:
        return (
          <div className="space-y-6">
            <EnhancedHomeScreen 
              onViewProduct={handleViewProduct}
              onViewMenu={() => handleScreenChange("catalog")}
              onQuickOrder={handleQuickOrder}
              onCustomizeOrder={handleCustomizeOrder}
              beverageCount={beverageCount}
              userPoints={userPoints}
              mostPopularProduct={mostPopularProduct}
            />
            <div className="px-6">
              <CoffeeGames
                onEarnPoints={handleEarnPoints}
                userPoints={userPoints}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24">
      {renderActiveScreen()}
      
      <BottomNavigation
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
        cartItemCount={cartItemCount}
        notificationCount={notificationCount}
      />
    </div>
  );
}
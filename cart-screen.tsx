import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Smartphone, Banknote, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CartScreen({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: { 
  cartItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: (paymentMethod: string) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const delivery = subtotal > 10 ? 0 : 2.50; // Free delivery over $10
  const total = subtotal + tax + delivery;

  const handleCheckout = () => {
    onCheckout(paymentMethod);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-[var(--coffee-accent)] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-[var(--coffee-primary)]" />
          </div>
          <h2 className="text-2xl text-[var(--coffee-dark)] mb-4">Tu carrito está vacío</h2>
          <p className="text-[var(--coffee-primary)] opacity-80 mb-6">
            Agrega algunos productos deliciosos para comenzar tu pedido
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-[#2F1B14] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Mi Pedido</h1>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <Badge className="bg-[var(--coffee-gold)] text-white">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Estimated Time */}
        <Card className="p-4 bg-[#F5E6D3] mb-6 border-none shadow-lg rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-[var(--coffee-primary)] rounded-full p-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[var(--coffee-dark)]">Tiempo estimado</h3>
              <p className="text-[var(--coffee-primary)] opacity-80">15-20 minutos</p>
            </div>
          </div>
        </Card>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4 bg-white shadow-lg rounded-2xl border-none">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[var(--coffee-dark)] font-semibold">{item.name}</h3>
                  <p className="text-[var(--coffee-gold)] font-bold">${item.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-8 h-8 p-0 rounded-full border-[var(--coffee-primary)] text-[var(--coffee-primary)]"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="w-8 text-center text-[var(--coffee-dark)] font-semibold">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0 rounded-full border-[var(--coffee-primary)] text-[var(--coffee-primary)]"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="w-8 h-8 p-0 text-[var(--coffee-red)] hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none mb-6">
          <h3 className="text-[var(--coffee-dark)] font-semibold mb-4">Resumen del Pedido</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-[var(--coffee-primary)]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-[var(--coffee-primary)]">
              <span>Impuestos</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-[var(--coffee-primary)]">
              <span>Envío</span>
              <span>{delivery === 0 ? 'Gratis' : `$${delivery.toFixed(2)}`}</span>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex justify-between text-[var(--coffee-dark)] font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none mb-6">
          <h3 className="text-[var(--coffee-dark)] font-semibold mb-4">Método de Pago</h3>
          
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Tarjeta de Crédito/Débito</span>
                </div>
              </SelectItem>
              <SelectItem value="digital">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Pago Digital (Apple Pay, Google Pay)</span>
                </div>
              </SelectItem>
              <SelectItem value="cash">
                <div className="flex items-center space-x-2">
                  <Banknote className="w-4 h-4" />
                  <span>Efectivo en Entrega</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Checkout Button */}
        <Button 
          onClick={handleCheckout}
          className="w-full h-14 bg-[#2F1B14] hover:bg-[#1A0F0A] text-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg"
        >
          <CreditCard className="w-6 h-6 mr-3" />
          Proceder al Pago - ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
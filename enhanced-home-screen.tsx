import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Coffee, Star, Clock, Zap, ShoppingBag, Heart, Settings } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function EnhancedHomeScreen({ 
  onViewProduct,
  onViewMenu,
  onQuickOrder,
  onCustomizeOrder,
  beverageCount,
  userPoints,
  mostPopularProduct
}: { 
  onViewProduct: (product: any) => void;
  onViewMenu: () => void;
  onQuickOrder: () => void;
  onCustomizeOrder: () => void;
  beverageCount: number;
  userPoints: number;
  mostPopularProduct: any;
}) {
  const [currentPromo, setCurrentPromo] = useState(0);
  
  const promos = [
    {
      id: 1,
      title: "Happy Hour",
      description: "50% OFF en bebidas frías",
      time: "3PM - 6PM",
      color: "from-[#C49781] to-[#E6D5C3]"
    },
    {
      id: 2,
      title: "Combo Estudiante",
      description: "Waffle + Bebida por $8.99",
      time: "Todo el día",
      color: "from-[#E6D5C3] to-[#F5E6D3]"
    },
    {
      id: 3,
      title: "Especial Miércoles",
      description: "2x1 en smoothies saludables",
      time: "Miércoles",
      color: "from-[#F5E6D3] to-[#FFF8F0]"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Waffle Belga Premium",
      description: "Masa artesanal con ingredientes orgánicos",
      price: 8.50,
      image: "https://images.unsplash.com/photo-1508608120753-d984bc5ecf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZWxnaWFuJTIwd2FmZmxlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc1ODE1Mjc2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPopular: true,
      category: "waffles"
    },
    {
      id: 7,
      name: "Smoothie Sin Azúcar",
      description: "Proteína vegetal y frutas naturales",
      price: 7.20,
      image: "https://images.unsplash.com/photo-1623002071634-54590669fe3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZ3JlZW4lMjBzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc1ODE1Mjc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPopular: false,
      category: "smoothies"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <div className="relative h-80 bg-[#2F1B14] overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 scale-150"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
          {/* Minimalist Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white rounded-2xl p-6 mb-6 shadow-2xl"
          >
            <Coffee className="w-12 h-12 text-[#2F1B14]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl mb-4 drop-shadow-lg"
          >
            Coffee & Cream
          </motion.h1>

          {/* Clean Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/25 backdrop-blur-md rounded-xl p-4 flex items-center justify-around max-w-xs border border-white/20"
          >
            <div className="text-center">
              <div className="text-xl text-white drop-shadow">{userPoints}</div>
              <div className="text-xs text-white/80">Puntos</div>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="text-center">
              <div className="text-xl text-white drop-shadow">{beverageCount}/8</div>
              <div className="text-xs text-white/80">Progreso</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="p-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6 bg-white shadow-xl rounded-2xl border-none mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button 
                onClick={onViewMenu}
                className="h-14 bg-[rgba(43,14,4,0.9)] hover:bg-[#1A0F0A] text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Ver Menú
              </Button>
              <Button 
                onClick={onQuickOrder}
                variant="outline" 
                className="h-14 border-2 border-[#2F1B14] text-[rgba(47,27,20,1)] hover:bg-[#F8F2E8] hover:text-[#1A0F0A] rounded-xl transition-all duration-300 bg-[rgba(118,92,92,0.2)]"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Pedido Rápido
              </Button>
            </div>
            {/* Quick Order Preview */}
            <div className="bg-[#FFFCF8] rounded-xl p-4 border border-[#F8F2E8]">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                  <ImageWithFallback 
                    src={mostPopularProduct.image}
                    alt={mostPopularProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-[#2F1B14]">{mostPopularProduct.name}</h4>
                  <p className="text-xs text-gray-600">Tu pedido más frecuente</p>
                </div>
                <span className="text-[#2F1B14]">${mostPopularProduct.price}</span>
              </div>
              <Button 
                onClick={onCustomizeOrder}
                variant="outline"
                size="sm"
                className="w-full border-[#C49781] text-[rgba(255,251,249,1)] hover:bg-[#C49781] hover:text-white rounded-lg transition-all duration-300 bg-[rgba(59,24,9,0.74)]"
              >
                <Settings className="w-4 h-4 mr-2" />
                Personalizar
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Promociones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-6"
        >
          <h2 className="text-xl text-[#2F1B14] mb-4">
            Promociones Especiales
          </h2>
          <Card className={`p-6 bg-gradient-to-r ${promos[currentPromo].color} rounded-2xl border-none shadow-lg overflow-hidden relative`}>
            <div className="absolute inset-0 bg-[#1A0F0A]/90 bg-[rgba(0,0,0,0.9)]"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-white/95 text-[#2F1B14] backdrop-blur-sm border-white/50">
                  <Clock className="w-4 h-4 mr-1" />
                  {promos[currentPromo].time}
                </Badge>
                <Heart className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-xl mb-2 text-white">{promos[currentPromo].title}</h3>
              <p className="text-white/90 mb-4">{promos[currentPromo].description}</p>
              <Button className="bg-white text-[#2F1B14] hover:bg-white/90 rounded-lg px-6 shadow-lg">
                Aprovechar Oferta
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Productos Destacados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-6"
        >
          <h2 className="text-xl text-[#2F1B14] mb-4">
            Productos Destacados
          </h2>
          <div className="space-y-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Card 
                  className="p-4 bg-white shadow-lg rounded-xl border-none overflow-hidden cursor-pointer hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300"
                  onClick={() => onViewProduct(product)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#FFFCF8] border border-[#F8F2E8]">
                      <ImageWithFallback 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover scale-110"
                      />
                      {product.isPopular && (
                        <Badge className="absolute -top-1 -right-1 bg-[#2F1B14] text-white text-xs px-2 py-1 rounded-md shadow-lg">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[#2F1B14] text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2F1B14] text-xl">
                          ${product.price}
                        </span>
                        
                        <Button 
                          size="sm" 
                          className="bg-[rgba(64,31,17,1)] hover:bg-[#2F1B14] text-white rounded-lg px-4 transition-all duration-300 shadow-md"
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Donation Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-6"
        >
          <Card className="p-6 bg-[rgba(10,38,10,0.53)] text-white rounded-xl border-none shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Programa de Donaciones</h3>
              <Heart className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/90 mb-3">
              Cada 8 menús comprados = 1 alimento donado
            </p>
            <div className="bg-white/20 rounded-full h-4 mb-2 border border-white/30">
              <div 
                className="bg-white rounded-full h-4 transition-all duration-500 shadow-sm"
                style={{ width: `${(beverageCount % 8) * 12.5}%` }}
              />
            </div>
            <p className="text-xs text-white/80">
              {beverageCount % 8}/8 menús hacia la próxima donación
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
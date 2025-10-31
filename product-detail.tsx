import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Plus, Minus, Star, Clock, Flame, Leaf, Heart, Share2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function ProductDetail({ 
  product, 
  onBack, 
  onAddToCart,
  onStartTracking 
}: { 
  product: any;
  onBack: () => void;
  onAddToCart: (product: any, quantity: number, customizations: any) => void;
  onStartTracking: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedMilk, setSelectedMilk] = useState("regular");
  const [selectedSweetness, setSelectedSweetness] = useState("normal");
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = [
    { id: "small", name: "Pequeño", price: 0, ml: "240ml" },
    { id: "medium", name: "Mediano", price: 0.50, ml: "350ml" },
    { id: "large", name: "Grande", price: 1.00, ml: "480ml" }
  ];

  const milkOptions = [
    { id: "regular", name: "Leche Regular", price: 0 },
    { id: "oat", name: "Leche de Avena", price: 0.60 },
    { id: "almond", name: "Leche de Almendra", price: 0.60 },
    { id: "coconut", name: "Leche de Coco", price: 0.60 },
    { id: "soy", name: "Leche de Soja", price: 0.50 }
  ];

  const sweetnessLevels = [
    { id: "none", name: "Sin Azúcar", icon: "🚫" },
    { id: "light", name: "Poco Dulce", icon: "🍯" },
    { id: "normal", name: "Normal", icon: "🍯🍯" },
    { id: "sweet", name: "Muy Dulce", icon: "🍯🍯🍯" }
  ];

  const nutritionInfo = {
    calories: 180,
    protein: 12,
    carbs: 18,
    fat: 7,
    caffeine: 150,
    sugar: 14
  };

  const preparationSteps = [
    "Moler granos de café premium",
    "Extraer espresso perfecto",
    "Vaporizar la leche a temperatura ideal",
    "Crear arte en espuma",
    "Servir en taza precalentada"
  ];

  const calculateTotalPrice = () => {
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    const milkPrice = milkOptions.find(m => m.id === selectedMilk)?.price || 0;
    return (product.price + sizePrice + milkPrice) * quantity;
  };

  const handleAddToCart = () => {
    const customizations = {
      size: selectedSize,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      totalPrice: calculateTotalPrice()
    };
    
    onAddToCart(product, quantity, customizations);
    onStartTracking();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-6 left-6 z-20">
          <Button 
            onClick={onBack} 
            size="sm" 
            className="bg-white/90 text-[var(--coffee-primary)] rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="absolute top-6 right-6 z-20 flex space-x-2">
          <Button 
            onClick={() => setIsFavorite(!isFavorite)}
            size="sm" 
            className="bg-white/90 text-[var(--coffee-red)] rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            size="sm" 
            className="bg-white/90 text-[var(--coffee-primary)] rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm"
          >
            <Share2 className="w-6 h-6" />
          </Button>
        </div>

        {/* Product Image */}
        <div className="h-80 relative overflow-hidden rounded-b-3xl">
          <ImageWithFallback 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Floating Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl text-[var(--coffee-dark)]">{product.name}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-[var(--coffee-gold)] text-[var(--coffee-gold)]" />
                  <span className="font-semibold text-[var(--coffee-dark)]">{product.rating}</span>
                </div>
              </div>
              <p className="text-[var(--coffee-primary)] opacity-80 mb-3">{product.description}</p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-[var(--coffee-accent)] text-[var(--coffee-primary)]">
                  <Clock className="w-4 h-4 mr-1" />
                  5-7 min
                </Badge>
                <Badge className="bg-[var(--coffee-accent)] text-[var(--coffee-primary)]">
                  <Flame className="w-4 h-4 mr-1" />
                  {nutritionInfo.calories} cal
                </Badge>
                <Badge className="bg-[var(--coffee-accent)] text-[var(--coffee-primary)]">
                  <Leaf className="w-4 h-4 mr-1" />
                  Orgánico
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-xl p-1 h-12 mb-6">
            <TabsTrigger 
              value="customize" 
              className="data-[state=active]:bg-[var(--coffee-primary)] data-[state=active]:text-white rounded-lg"
            >
              Personalizar
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition"
              className="data-[state=active]:bg-[var(--coffee-primary)] data-[state=active]:text-white rounded-lg"
            >
              Nutrición
            </TabsTrigger>
            <TabsTrigger 
              value="preparation"
              className="data-[state=active]:bg-[var(--coffee-primary)] data-[state=active]:text-white rounded-lg"
            >
              Preparación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-6">
            {/* Size Selection */}
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
              <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Tamaño</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <motion.div
                    key={size.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedSize === size.id ? "default" : "outline"}
                      onClick={() => setSelectedSize(size.id)}
                      className={`w-full h-auto p-4 flex flex-col ${
                        selectedSize === size.id 
                          ? 'bg-[var(--coffee-primary)] text-white' 
                          : 'border-[var(--coffee-primary)] text-[var(--coffee-primary)]'
                      }`}
                    >
                      <span className="font-semibold">{size.name}</span>
                      <span className="text-sm opacity-80">{size.ml}</span>
                      {size.price > 0 && (
                        <span className="text-xs">+${size.price}</span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Milk Selection */}
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
              <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Tipo de Leche</h3>
              <div className="space-y-2">
                {milkOptions.map((milk) => (
                  <Button
                    key={milk.id}
                    variant={selectedMilk === milk.id ? "default" : "outline"}
                    onClick={() => setSelectedMilk(milk.id)}
                    className={`w-full justify-between ${
                      selectedMilk === milk.id 
                        ? 'bg-[var(--coffee-primary)] text-white' 
                        : 'border-[var(--coffee-primary)] text-[var(--coffee-primary)]'
                    }`}
                  >
                    <span>{milk.name}</span>
                    {milk.price > 0 && <span>+${milk.price}</span>}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Sweetness Level */}
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
              <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Nivel de Dulzor</h3>
              <div className="grid grid-cols-2 gap-3">
                {sweetnessLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedSweetness === level.id ? "default" : "outline"}
                    onClick={() => setSelectedSweetness(level.id)}
                    className={`h-auto p-4 flex flex-col ${
                      selectedSweetness === level.id 
                        ? 'bg-[var(--coffee-primary)] text-white' 
                        : 'border-[var(--coffee-primary)] text-[var(--coffee-primary)]'
                    }`}
                  >
                    <span className="text-2xl mb-1">{level.icon}</span>
                    <span className="text-sm">{level.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
              <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Información Nutricional</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Calorías</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.calories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Proteína</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Carbohidratos</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Grasa</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.fat}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Cafeína</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.caffeine}mg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--coffee-primary)]">Azúcar</span>
                  <span className="font-semibold text-[var(--coffee-dark)]">{nutritionInfo.sugar}g</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preparation" className="space-y-4">
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
              <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Proceso de Preparación</h3>
              <div className="space-y-4">
                {preparationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-8 h-8 bg-[var(--coffee-primary)] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-[var(--coffee-primary)]">{step}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-semibold text-[var(--coffee-dark)]">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#2F1B14] hover:bg-[#1A0F0A] text-white h-14 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar ${calculateTotalPrice().toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Coffee, Plus, Filter, Star, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import waffleClasico from './Imagenes/Waffle Clasico.jpg';
import waffleFrutal from './Imagenes/Waffle Frutal.jpg';
import crepeNutella from './Imagenes/Crepe_nutella.jpg';
import crepeSalado from './Imagenes/Creppe Salado.jpg';
import heladoVainilla from './Imagenes/Helado_Vainilla.jpg';
import sundaeBrownie from './Imagenes/Brownies.jpg';
import malteadaChocolate from './Imagenes/Malteada de Chocolate.jpg';
import malteadaFresa from './Imagenes/Malteada_fresa.jpg';
import smoothie1 from './Imagenes/Smoothie.jpg';
import smoothie2 from './Imagenes/Smoothie.jpg';

const waffleProducts = [
  {
    id: 1,
    name: "Waffle Belga Clásico",
    description: "Masa artesanal con miel de maple auténtica",
    price: 8.50,
    image: waffleClasico,
    rating: 4.9,
    isPopular: true,
    category: "waffles"
  },
  {
    id: 2,
    name: "Waffle de Frutas",
    description: "Con fresas, arándanos y crema batida",
    price: 9.20,
    image: waffleFrutal,
    rating: 4.7,
    isPopular: true,
    category: "waffles"
  }
];

const crepeProducts = [
  {
    id: 3,
    name: "Crepe Nutella",
    description: "Crepe francés con nutella y banana",
    price: 7.80,
    image: crepeNutella,
    rating: 4.8,
    isPopular: true,
    category: "crepes"
  },
  {
    id: 4,
    name: "Crepe Salado",
    description: "Jamón, queso y champiñones",
    price: 8.90,
    image: crepeSalado,
    rating: 4.6,
    isPopular: false,
    category: "crepes"
  }
];

const iceCreamProducts = [
  {
    id: 5,
    name: "Copa Helado Vainilla",
    description: "Helado artesanal con topping de chocolate",
    price: 6.50,
    image: heladoVainilla,    
    rating: 4.6,
    isPopular: true,
    category: "helados"
  },
  {
    id: 6,
    name: "Sundae de Brownie",
    description: "Helado con brownie y salsa de caramelo",
    price: 7.50,
    image: sundaeBrownie,
    rating: 4.9,
    isPopular: true,
    category: "helados"
  }
];

const milkshakeProducts = [
  {
    id: 7,
    name: "Malteada de Fresa",
    description: "Cremosa malteada con fresas naturales",
    price: 5.20,
    image: malteadaFresa,
    rating: 4.8,
    isPopular: true,
    category: "malteadas"
  },
  {
    id: 8,
    name: "Malteada de Chocolate",
    description: "Chocolate belga con crema batida",
    price: 5.90,
    image: malteadaChocolate,
    rating: 4.7,
    isPopular: false,
    category: "malteadas"
  }
];

const healthySmoothies = [
  {
    id: 9,
    name: "Smoothie Proteico",
    description: "Sin azúcar, con proteína vegetal y espinacas",
    price: 7.20,
    image: smoothie1,
    rating: 4.5,
    isPopular: true,
    category: "smoothies"
  },
  {
    id: 10,
    name: "Smoothie Detox",
    description: "Libre de gluten, con jengibre y cúrcuma",
    price: 6.80,
    image:smoothie2,
    rating: 4.4,
    isPopular: false,
    category: "smoothies"
  }
];

export function CatalogScreen({ 
  onAddToCart, 
  onViewProduct 
}: { 
  onAddToCart: (product: any) => void;
  onViewProduct: (product: any) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<number[]>([]);

  const allProducts = [...waffleProducts, ...crepeProducts, ...iceCreamProducts, ...milkshakeProducts, ...healthySmoothies];
  
  const filteredProducts = allProducts.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.isPopular ? 1 : -1;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-[#2F1B14] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Nuestro Menú</h1>
          <Coffee className="w-6 h-6" />
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Más Populares</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="rating">Mejor Calificados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="p-6">
        <div className="w-full">
          <div className="overflow-x-auto mb-4">
            <div className="flex space-x-2 pb-2">
              {[
                { value: "all", label: "Todo" },
                { value: "waffles", label: "Waffles" },
                { value: "crepes", label: "Crepes" },
                { value: "helados", label: "Helados" },
                { value: "malteadas", label: "Malteadas" },
                { value: "smoothies", label: "Smoothies Saludables" }
              ].map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`rounded-lg px-4 whitespace-nowrap ${
                    selectedCategory === category.value 
                      ? 'bg-[#C49781] text-white shadow-lg' 
                      : 'border-[#C49781] text-[#C49781] hover:bg-[#F5E6D3]'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>


            <div className="grid gap-4">
              {sortedProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="p-4 bg-white shadow-lg rounded-xl border-none overflow-hidden animate-fade-in cursor-pointer hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onViewProduct(product)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover scale-110"
                      />
                      {product.isPopular && (
                        <Badge className="absolute -top-1 -right-1 bg-[#C49781] text-white text-xs px-2 py-1 rounded-md">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-[#C49781]">{product.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className="p-1 h-auto hover:bg-red-50 rounded-full"
                        >
                          <Heart 
                            className={`w-4 h-4 transition-all duration-300 ${
                              favorites.includes(product.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-400 hover:text-red-500'
                            }`} 
                          />
                        </Button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#C49781] text-lg">
                          ${product.price}
                        </span>
                        
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="bg-[#C49781] hover:bg-[#C49781]/90 text-white rounded-lg px-4 py-2 transition-all duration-300"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
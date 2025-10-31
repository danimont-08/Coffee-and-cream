import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Coffee, Star, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--coffee-cream)] to-white">
      {/* Header with Logo */}
      <div className="relative h-80 bg-gradient-to-br from-[var(--coffee-primary)] to-[var(--coffee-dark)] rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4MTA1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Coffee shop interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 mb-4 shadow-lg">
            <Coffee className="w-12 h-12 text-[var(--coffee-primary)]" />
          </div>
          <h1 className="text-white text-3xl mb-2 font-bold">Coffee & Cream</h1>
          <p className="text-[var(--coffee-accent)] text-lg">El sabor perfecto en cada sorbo</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 -mt-8 relative z-20">
        <Card className="p-6 bg-white shadow-2xl rounded-2xl animate-slide-up">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="h-14 bg-[var(--coffee-primary)] hover:bg-[var(--coffee-dark)] text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Ver Menú
            </Button>
            <Button 
              variant="outline" 
              className="h-14 border-2 border-[var(--coffee-primary)] text-[var(--coffee-primary)] hover:bg-[var(--coffee-accent)] rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Clock className="w-5 h-5 mr-2" />
              Pedido Rápido
            </Button>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-gradient-to-br from-[var(--coffee-accent)] to-white border-none shadow-lg rounded-xl">
            <Star className="w-8 h-8 text-[var(--coffee-gold)] mx-auto mb-2" />
            <p className="text-2xl text-[var(--coffee-dark)]">4.9</p>
            <p className="text-sm text-[var(--coffee-primary)] opacity-80">Rating</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-[var(--coffee-accent)] to-white border-none shadow-lg rounded-xl">
            <Clock className="w-8 h-8 text-[var(--coffee-primary)] mx-auto mb-2" />
            <p className="text-2xl text-[var(--coffee-dark)]">15min</p>
            <p className="text-sm text-[var(--coffee-primary)] opacity-80">Tiempo</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-[var(--coffee-accent)] to-white border-none shadow-lg rounded-xl">
            <MapPin className="w-8 h-8 text-[var(--coffee-red)] mx-auto mb-2" />
            <p className="text-2xl text-[var(--coffee-dark)]">2km</p>
            <p className="text-sm text-[var(--coffee-primary)] opacity-80">Distancia</p>
          </Card>
        </div>
      </div>

      {/* Daily Recommendations */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl text-[var(--coffee-dark)] mb-4">Recomendados del Día</h2>
        <div className="space-y-4">
          <Card className="p-4 bg-white shadow-lg rounded-2xl border-none overflow-hidden">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1630040995437-80b01c5dd52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NTgxMDQ3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Latte con arte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--coffee-dark)]">Latte Especial</h3>
                <p className="text-[var(--coffee-primary)] opacity-80">Con arte en espuma</p>
                <p className="text-[var(--coffee-gold)] font-semibold">$4.50</p>
              </div>
              <Button size="sm" className="bg-[var(--coffee-primary)] hover:bg-[var(--coffee-dark)] text-white rounded-full px-6">
                Agregar
              </Button>
            </div>
          </Card>
          
          <Card className="p-4 bg-white shadow-lg rounded-2xl border-none overflow-hidden">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzU4MTA2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Croissant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--coffee-dark)]">Croissant Francés</h3>
                <p className="text-[var(--coffee-primary)] opacity-80">Recién horneado</p>
                <p className="text-[var(--coffee-gold)] font-semibold">$3.20</p>
              </div>
              <Button size="sm" className="bg-[var(--coffee-primary)] hover:bg-[var(--coffee-dark)] text-white rounded-full px-6">
                Agregar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Gift, Coffee, Star, Trophy, Crown, Zap } from "lucide-react";
import { motion } from "motion/react";

export function LoyaltySystem({ 
  beverageCount, 
  onClaimReward,
  userLevel 
}: { 
  beverageCount: number;
  onClaimReward: () => void;
  userLevel: number;
}) {
  const [showCelebration, setShowCelebration] = useState(false);
  const maxBeverages = 8;
  const progress = (beverageCount % maxBeverages) / maxBeverages * 100;
  const freeBevsEarned = Math.floor(beverageCount / maxBeverages);
  const cupsNeeded = maxBeverages - (beverageCount % maxBeverages);

  useEffect(() => {
    if (beverageCount % maxBeverages === 0 && beverageCount > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [beverageCount]);

  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1: return { name: "Novato del Café", icon: Coffee, color: "text-[var(--coffee-primary)]", bgColor: "bg-[var(--coffee-accent)]" };
      case 2: return { name: "Explorador del Sabor", icon: Star, color: "text-blue-600", bgColor: "bg-blue-100" };
      case 3: return { name: "Maestro Barista", icon: Trophy, color: "text-[var(--coffee-gold)]", bgColor: "bg-yellow-100" };
      case 4: return { name: "Leyenda del Café", icon: Crown, color: "text-purple-600", bgColor: "bg-purple-100" };
      default: return { name: "Amante del Café", icon: Coffee, color: "text-[var(--coffee-primary)]", bgColor: "bg-[var(--coffee-accent)]" };
    }
  };

  const levelInfo = getLevelInfo(userLevel);
  const LevelIcon = levelInfo.icon;

  return (
    <div className="space-y-4">
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <Card className="p-8 bg-gradient-to-br from-[var(--coffee-gold)] to-[var(--coffee-primary)] text-white text-center max-w-sm mx-4 border-none shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Gift className="w-16 h-16" />
            </motion.div>
            <h2 className="text-2xl mb-2">¡FELICIDADES!</h2>
            <p className="text-lg opacity-90 mb-4">Has ganado una bebida GRATIS</p>
            <Button 
              onClick={onClaimReward}
              className="bg-white text-[var(--coffee-primary)] hover:bg-gray-100"
            >
              Reclamar Recompensa
            </Button>
          </Card>
        </motion.div>
      )}

      {/* User Level Card */}
      <Card className={`p-4 ${levelInfo.bgColor} border-none shadow-lg rounded-2xl`}>
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${levelInfo.bgColor} rounded-full ${levelInfo.color}`}>
            <LevelIcon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${levelInfo.color}`}>{levelInfo.name}</h3>
            <p className="text-sm opacity-80">Nivel {userLevel}</p>
          </div>
          <Badge className={`${levelInfo.color} bg-white`}>
            <Zap className="w-4 h-4 mr-1" />
            VIP
          </Badge>
        </div>
      </Card>

      {/* Loyalty Progress */}
      <Card className="p-6 bg-gradient-to-br from-[var(--coffee-cream)] via-white to-[var(--coffee-accent)] border-none shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-[var(--coffee-primary)] rounded-full flex items-center justify-center">
                <Coffee className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-[var(--coffee-gold)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {beverageCount % maxBeverages}
              </div>
            </div>
          </div>
          
          <h3 className="text-xl text-[var(--coffee-dark)] mb-2">Programa de Fidelidad</h3>
          <p className="text-[var(--coffee-primary)] opacity-80">
            {cupsNeeded === maxBeverages 
              ? "¡Comienza tu primera taza!"
              : `Te faltan ${cupsNeeded} ${cupsNeeded === 1 ? 'taza' : 'tazas'} para una bebida GRATIS`
            }
          </p>
        </div>

        {/* Progress Circles */}
        <div className="flex justify-center space-x-3 mb-6">
          {Array.from({ length: maxBeverages }, (_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < (beverageCount % maxBeverages)
                  ? 'bg-[var(--coffee-primary)] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Coffee className="w-4 h-4" />
            </motion.div>
          ))}
        </div>

        <Progress 
          value={progress} 
          className="h-4 mb-4 bg-gray-200 rounded-full overflow-hidden"
        />

        {/* Rewards Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--coffee-primary)]">Bebidas gratis ganadas:</span>
            <Badge className="bg-[var(--coffee-gold)] text-white">
              <Gift className="w-4 h-4 mr-1" />
              {freeBevsEarned}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--coffee-primary)]">Total de compras:</span>
            <span className="font-semibold text-[var(--coffee-dark)]">{beverageCount}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Coffee, Clock, CheckCircle, Truck, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function OrderTracking({ 
  orderId, 
  onClose 
}: { 
  orderId: string;
  onClose: () => void;
}) {
  const [orderStatus, setOrderStatus] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [baristaName] = useState("Carlos");
  
  const orderSteps = [
    { 
      id: 0, 
      title: "Pedido Confirmado", 
      description: "Tu pedido ha sido recibido y confirmado",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    { 
      id: 1, 
      title: "Preparando Ingredientes", 
      description: "Seleccionando los mejores granos",
      icon: Coffee,
      color: "text-[var(--coffee-primary)]",
      bgColor: "bg-[var(--coffee-accent)]"
    },
    { 
      id: 2, 
      title: "Moliendo y Extrayendo", 
      description: "Creando el espresso perfecto",
      icon: Coffee,
      color: "text-[var(--coffee-primary)]",
      bgColor: "bg-[var(--coffee-accent)]"
    },
    { 
      id: 3, 
      title: "Finalizando", 
      description: "Arte en espuma y toques finales",
      icon: Coffee,
      color: "text-[var(--coffee-primary)]",
      bgColor: "bg-[var(--coffee-accent)]"
    },
    { 
      id: 4, 
      title: "¡Listo para Recoger!", 
      description: "Tu pedido está esperándote",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100"
    }
  ];

  const funFacts = [
    "¿Sabías que utilizamos granos tostados hace menos de 7 días?",
    "Nuestro agua está filtrada con triple sistema para el mejor sabor",
    "Cada taza de espresso se extrae en exactamente 25-30 segundos",
    "El arte en espuma requiere leche vaporizada a exactamente 65°C",
    "Limpiamos nuestras máquinas cada 30 minutos para mantener la calidad"
  ];

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    // Simular progreso del pedido
    const timer = setInterval(() => {
      setOrderStatus(prev => {
        if (prev < 4) {
          setEstimatedTime(prevTime => Math.max(0, prevTime - 3));
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    // Cambiar datos curiosos cada 5 segundos
    const factTimer = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(factTimer);
    };
  }, []);

  const getProgressPercentage = () => {
    return ((orderStatus + 1) / orderSteps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-[#2F1B14] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Seguimiento del Pedido</h1>
          <Button 
            onClick={onClose}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            ✕
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg opacity-90">Pedido #{orderId}</p>
            <p className="text-sm opacity-80">Preparado por {baristaName}</p>
          </div>
          <Badge className="bg-white text-[var(--coffee-primary)] text-lg px-4 py-2">
            <Clock className="w-5 h-5 mr-2" />
            {estimatedTime} min
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Overview */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">
              {orderStatus === 4 ? "🎉" : "☕"}
            </div>
            <h2 className="text-xl text-[var(--coffee-dark)] mb-2">
              {orderSteps[orderStatus].title}
            </h2>
            <p className="text-[var(--coffee-primary)] opacity-80">
              {orderSteps[orderStatus].description}
            </p>
          </div>
          
          <Progress 
            value={getProgressPercentage()} 
            className="h-4 mb-4 bg-gray-200 rounded-full overflow-hidden"
          />
          
          <div className="text-center">
            <span className="text-sm text-[var(--coffee-primary)]">
              {Math.round(getProgressPercentage())}% Completado
            </span>
          </div>
        </Card>

        {/* Order Steps */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
          <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Proceso de Preparación</h3>
          <div className="space-y-4">
            {orderSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= orderStatus;
              const isCurrent = index === orderStatus;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 ${
                    isCurrent ? 'bg-[var(--coffee-accent)] scale-105' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`p-3 rounded-full ${
                    isCompleted ? step.bgColor : 'bg-gray-200'
                  }`}>
                    <StepIcon className={`w-6 h-6 ${
                      isCompleted ? step.color : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      isCompleted ? 'text-[var(--coffee-dark)]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${
                      isCompleted ? 'text-[var(--coffee-primary)]' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Fun Facts */}
        <Card className="p-6 bg-[#F5E6D3] border-none shadow-lg rounded-2xl">
          <div className="text-center">
            <h3 className="text-lg text-[var(--coffee-dark)] mb-4">💡 ¿Sabías que...?</h3>
            <motion.p
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-[var(--coffee-primary)] text-sm leading-relaxed"
            >
              {funFacts[currentFact]}
            </motion.p>
          </div>
        </Card>

        {/* Live Updates */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none">
          <h3 className="text-lg text-[var(--coffee-dark)] mb-4">Actualizaciones en Vivo</h3>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 p-3 bg-[var(--coffee-accent)] rounded-xl"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="flex-1">
                <p className="text-sm text-[var(--coffee-primary)]">
                  <span className="font-semibold">{baristaName}</span> está trabajando en tu pedido
                </p>
                <p className="text-xs text-[var(--coffee-primary)] opacity-60">Hace 2 minutos</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-[var(--coffee-primary)]">
                  Ingredientes premium seleccionados
                </p>
                <p className="text-xs text-[var(--coffee-primary)] opacity-60">Hace 5 minutos</p>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-14 border-[var(--coffee-primary)] text-[var(--coffee-primary)] rounded-xl"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Ver Ubicación
          </Button>
          <Button 
            variant="outline" 
            className="h-14 border-[var(--coffee-primary)] text-[var(--coffee-primary)] rounded-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Llamar Cafetería
          </Button>
        </div>

        {/* Chat with Barista */}
        <Card className="p-6 bg-[#2F1B14] text-white border-none shadow-lg rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Chatea con {baristaName}</h3>
              <p className="text-sm opacity-90">¿Tienes alguna pregunta sobre tu pedido?</p>
            </div>
            <Button 
              className="bg-white text-[var(--coffee-primary)] hover:bg-gray-100 rounded-full w-14 h-14 p-0"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </Card>

        {orderStatus === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 bg-green-500 text-white text-center border-none shadow-2xl rounded-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <CheckCircle className="w-16 h-16" />
              </motion.div>
              <h2 className="text-2xl mb-2">¡Tu pedido está listo!</h2>
              <p className="text-lg opacity-90 mb-6">Dirígete al mostrador para recogerlo</p>
              <Button 
                onClick={onClose}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
              >
                Entendido
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
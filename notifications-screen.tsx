import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Bell, Coffee, Clock, CheckCircle, MapPin, Phone } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "order_confirmed",
    title: "¡Pedido Confirmado!",
    message: "Tu pedido #1234 ha sido confirmado y está siendo preparado.",
    time: "Hace 2 minutos",
    isRead: false,
    status: "confirmed",
    progress: 25
  },
  {
    id: 2,
    type: "order_preparing",
    title: "Preparando tu pedido",
    message: "Nuestros baristas están preparando tu Latte Especial con mucho cariño.",
    time: "Hace 8 minutos",
    isRead: false,
    status: "preparing",
    progress: 75
  },
  {
    id: 3,
    type: "order_ready",
    title: "¡Tu pedido está listo!",
    message: "Pedido #1233 listo para recoger. Te esperamos en el mostrador.",
    time: "Hace 15 minutos",
    isRead: true,
    status: "ready",
    progress: 100
  },
  {
    id: 4,
    type: "promotion",
    title: "¡Oferta especial!",
    message: "20% de descuento en todos los postres. Válido hasta las 6PM.",
    time: "Hace 1 hora",
    isRead: true,
    status: "promotion",
    progress: 0
  }
];

export function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentOrder, setCurrentOrder] = useState({
    id: "1234",
    status: "preparing",
    progress: 75,
    estimatedTime: "5-8 minutos",
    items: ["Latte Especial", "Croissant Francés"]
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const getStatusIcon = (type: string, status: string) => {
    switch (type) {
      case "order_confirmed":
      case "order_preparing":
        return <Coffee className="w-6 h-6 text-[var(--coffee-primary)]" />;
      case "order_ready":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "promotion":
        return <Bell className="w-6 h-6 text-[var(--coffee-gold)]" />;
      default:
        return <Bell className="w-6 h-6 text-[var(--coffee-primary)]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500";
      case "preparing":
        return "bg-[var(--coffee-primary)]";
      case "ready":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-[#2F1B14] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Notificaciones</h1>
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <Badge className="bg-[var(--coffee-red)] text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Order Status */}
        {currentOrder && (
          <Card className="p-6 bg-[#F5E6D3] mb-6 border-none shadow-lg rounded-2xl animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--coffee-dark)] font-semibold">Pedido Actual #{currentOrder.id}</h3>
              <Badge className={`${getStatusColor(currentOrder.status)} text-white`}>
                {currentOrder.status === "preparing" ? "Preparando" : "Confirmado"}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[var(--coffee-primary)] text-sm">Progreso del pedido</span>
                  <span className="text-[var(--coffee-dark)] font-semibold">{currentOrder.progress}%</span>
                </div>
                <Progress 
                  value={currentOrder.progress} 
                  className="h-3 bg-gray-200"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[var(--coffee-primary)]" />
                  <span className="text-[var(--coffee-primary)]">
                    Tiempo estimado: {currentOrder.estimatedTime}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="text-[var(--coffee-dark)] font-semibold mb-2">Productos:</h4>
                <ul className="space-y-1">
                  {currentOrder.items.map((item, index) => (
                    <li key={index} className="text-[var(--coffee-primary)] flex items-center">
                      <Coffee className="w-4 h-4 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-[var(--coffee-primary)] text-[var(--coffee-primary)] hover:bg-[var(--coffee-accent)]"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver Ubicación
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-[var(--coffee-primary)] text-[var(--coffee-primary)] hover:bg-[var(--coffee-accent)]"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* All Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl text-[var(--coffee-dark)]">Todas las Notificaciones</h2>
          
          {notifications.map((notification, index) => (
            <Card 
              key={notification.id}
              className={`p-4 bg-white shadow-lg rounded-2xl border-none cursor-pointer transition-all duration-300 hover:shadow-xl ${
                !notification.isRead ? 'ring-2 ring-[var(--coffee-primary)]/20' : ''
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${
                  !notification.isRead ? 'bg-[var(--coffee-accent)]' : 'bg-gray-100'
                }`}>
                  {getStatusIcon(notification.type, notification.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`${
                      !notification.isRead ? 'text-[var(--coffee-dark)] font-semibold' : 'text-[var(--coffee-primary)]'
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-sm text-[var(--coffee-primary)] opacity-60">
                      {notification.time}
                    </span>
                  </div>
                  
                  <p className="text-[var(--coffee-primary)] opacity-80 text-sm mb-3">
                    {notification.message}
                  </p>
                  
                  {notification.progress > 0 && notification.progress < 100 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[var(--coffee-primary)]">Progreso</span>
                        <span className="text-xs text-[var(--coffee-dark)] font-semibold">
                          {notification.progress}%
                        </span>
                      </div>
                      <Progress value={notification.progress} className="h-2" />
                    </div>
                  )}
                  
                  {!notification.isRead && (
                    <Badge className="bg-[var(--coffee-primary)] text-white text-xs mt-2">
                      Nuevo
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Info */}
        <Card className="p-6 bg-[#2F1B14] text-white mt-6 rounded-2xl border-none">
          <div className="text-center">
            <Coffee className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <h3 className="text-lg font-semibold mb-2">¿Necesitas ayuda?</h3>
            <p className="opacity-90 mb-4">
              Nuestro equipo está aquí para ayudarte con cualquier consulta sobre tu pedido.
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-[var(--coffee-primary)] hover:bg-[var(--coffee-accent)]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contactar Soporte
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
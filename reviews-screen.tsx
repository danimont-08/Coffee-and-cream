import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, MessageSquare, ThumbsUp, Calendar, Coffee } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    userName: "María González",
    userAvatar: "",
    rating: 5,
    date: "2024-01-15",
    comment: "¡Increíble experiencia! El latte tenía un arte hermoso y el sabor era excepcional. El ambiente es muy acogedor y el servicio es rápido. Definitivamente volveré.",
    product: "Latte Especial",
    likes: 1223,
    isHelpful: false
  },
  {
    id: 2,
    userName: "Carlos Ruiz",
    userAvatar: "",
    rating: 4,
    date: "2024-01-14",
    comment: "Muy buen café, aunque esperaba un poco más de sabor en el espresso. Los postres están deliciosos, especialmente el croissant. El precio es justo.",
    product: "Espresso Doble",
    likes: 10256,
    isHelpful: true
  },
  {
    id: 3,
    userName: "Ana Sofía López",
    userAvatar: "",
    rating: 5,
    date: "2024-01-13",
    comment: "¡Perfecta para estudiar! WiFi rápido, ambiente tranquilo y el cappuccino estaba perfecto. Los baristas son muy amables y conocen bien su trabajo.",
    product: "Cappuccino Premium",
    likes: 15,
    isHelpful: false
  },
  {
    id: 4,
    userName: "Diego Martínez",
    userAvatar: "",
    rating: 5,
    date: "2024-01-12",
    comment: "La mejor cafetería de la zona. Siempre consistente en calidad, los granos se nota que son premium. La torta de chocolate es un pecado delicioso.",
    product: "Torta de Chocolate",
    likes: 20,
    isHelpful: false
  }
];

export function ReviewsScreen() {
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    product: ""
  });
  const [filter, setFilter] = useState("all");

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const handleLike = (reviewId: number) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              likes: review.isHelpful ? review.likes - 1 : review.likes + 1,
              isHelpful: !review.isHelpful 
            }
          : review
      )
    );
  };

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const submitReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        userName: "Usuario Actual",
        userAvatar: "",
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment,
        product: newReview.product || "Producto General",
        likes: 0,
        isHelpful: false
      };
      
      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 0, comment: "", product: "" });
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === "all") return true;
    return review.rating === parseInt(filter);
  });

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-[#2F1B14] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Reseñas</h1>
          <MessageSquare className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6">
        {/* Overall Rating Summary */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[var(--coffee-dark)] mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(averageRating)
                      ? 'fill-[var(--coffee-gold)] text-[var(--coffee-gold)]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-[var(--coffee-primary)] opacity-80">
              Basado en {reviews.length} reseñas
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-[var(--coffee-dark)] w-8">{rating}★</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--coffee-gold)] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-[var(--coffee-primary)] w-8">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Write New Review */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border-none mb-6">
          <h3 className="text-[var(--coffee-dark)] font-semibold mb-4">Escribe una Reseña</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[var(--coffee-primary)] text-sm mb-2">
                Calificación
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newReview.rating
                          ? 'fill-[var(--coffee-gold)] text-[var(--coffee-gold)]'
                          : 'text-gray-300 hover:text-[var(--coffee-gold)]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[var(--coffee-primary)] text-sm mb-2">
                Producto (Opcional)
              </label>
              <input
                type="text"
                value={newReview.product}
                onChange={(e) => setNewReview(prev => ({ ...prev, product: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--coffee-primary)] focus:border-transparent"
                placeholder="¿Qué producto probaste?"
              />
            </div>

            <div>
              <label className="block text-[var(--coffee-primary)] text-sm mb-2">
                Tu Comentario
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full min-h-24 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--coffee-primary)] focus:border-transparent resize-none"
                placeholder="Comparte tu experiencia con nosotros..."
              />
            </div>

            <Button 
              onClick={submitReview}
              disabled={newReview.rating === 0 || !newReview.comment.trim()}
              className="w-full bg-[var(--coffee-primary)] hover:bg-[var(--coffee-dark)] text-white rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Publicar Reseña
            </Button>
          </div>
        </Card>

        {/* Filter Options */}
        <div className="flex space-x-3 mb-6 overflow-x-auto">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={`rounded-full px-6 whitespace-nowrap ${
              filter === "all" 
                ? 'bg-[var(--coffee-primary)] text-white' 
                : 'border-[var(--coffee-primary)] text-[var(--coffee-primary)]'
            }`}
          >
            Todas
          </Button>
          {[5, 4, 3, 2, 1].map(rating => (
            <Button
              key={rating}
              variant={filter === rating.toString() ? "default" : "outline"}
              onClick={() => setFilter(rating.toString())}
              className={`rounded-full px-6 whitespace-nowrap ${
                filter === rating.toString()
                  ? 'bg-[var(--coffee-primary)] text-white' 
                  : 'border-[var(--coffee-primary)] text-[var(--coffee-primary)]'
              }`}
            >
              {rating}★
            </Button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="p-6 bg-white shadow-lg rounded-2xl border-none animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback className="bg-[var(--coffee-accent)] text-[var(--coffee-primary)]">
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[var(--coffee-dark)] font-semibold">
                        {review.userName}
                      </h4>
                      {review.product && (
                        <Badge className="bg-[var(--coffee-accent)] text-[var(--coffee-primary)] text-xs">
                          <Coffee className="w-3 h-3 mr-1" />
                          {review.product}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-[var(--coffee-gold)] text-[var(--coffee-gold)]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-[var(--coffee-primary)] opacity-60 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(review.date).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>

                  <p className="text-[var(--coffee-primary)] opacity-90 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(review.id)}
                      className={`${
                        review.isHelpful 
                          ? 'text-[var(--coffee-primary)] bg-[var(--coffee-accent)]' 
                          : 'text-[var(--coffee-primary)] opacity-60'
                      } rounded-full`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Útil ({review.likes})
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-[var(--coffee-primary)] opacity-30 mx-auto mb-4" />
            <h3 className="text-xl text-[var(--coffee-dark)] mb-2">
              No hay reseñas para este filtro
            </h3>
            <p className="text-[var(--coffee-primary)] opacity-80">
              Sé el primero en dejar una reseña
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
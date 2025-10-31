import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Coffee, Target, Zap, Gift, Clock, Trophy } from "lucide-react";
import { motion } from "motion/react";

export function CoffeeGames({ 
  onEarnPoints,
  userPoints 
}: { 
  onEarnPoints: (points: number) => void;
  userPoints: number;
}) {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [memoryGame, setMemoryGame] = useState<{
    cards: number[];
    flipped: number[];
    matched: number[];
    score: number;
    isComplete: boolean;
  }>({
    cards: [],
    flipped: [],
    matched: [],
    score: 0,
    isComplete: false
  });

  const [triviaGame, setTriviaGame] = useState<{
    currentQuestion: number;
    score: number;
    isComplete: boolean;
  }>({
    currentQuestion: 0,
    score: 0,
    isComplete: false
  });

  const [quickTapGame, setQuickTapGame] = useState<{
    timeLeft: number;
    score: number;
    isActive: boolean;
    targetPosition: { x: number; y: number };
  }>({
    timeLeft: 10,
    score: 0,
    isActive: false,
    targetPosition: { x: 50, y: 50 }
  });

  const coffeeTrivia = [
    {
      question: "¿Cuál es el país de origen del café?",
      options: ["Brasil", "Colombia", "Etiopía", "Italia"],
      correct: 2
    },
    {
      question: "¿Qué significa 'espresso' en italiano?",
      options: ["Rápido", "Presionado", "Fuerte", "Negro"],
      correct: 1
    },
    {
      question: "¿Cuántos granos de café hay aproximadamente en una taza?",
      options: ["50-70", "70-100", "100-150", "150-200"],
      correct: 1
    }
  ];

  // Memory Game
  const initializeMemoryGame = () => {
    const icons = [1, 2, 3, 4, 5, 6];
    const gameCards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setMemoryGame({
      cards: gameCards,
      flipped: [],
      matched: [],
      score: 0,
      isComplete: false
    });
    setActiveGame("memory");
  };

  const flipCard = (index: number) => {
    if (memoryGame.flipped.length === 2 || memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) {
      return;
    }

    const newFlipped = [...memoryGame.flipped, index];
    setMemoryGame(prev => ({ ...prev, flipped: newFlipped }));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryGame.cards[first] === memoryGame.cards[second]) {
        // Match found
        const newMatched = [...memoryGame.matched, first, second];
        const newScore = memoryGame.score + 10;
        setMemoryGame(prev => ({
          ...prev,
          matched: newMatched,
          flipped: [],
          score: newScore,
          isComplete: newMatched.length === memoryGame.cards.length
        }));
        
        if (newMatched.length === memoryGame.cards.length) {
          onEarnPoints(10); // Fixed 10 points for completing the game
        }
      } else {
        // No match
        setTimeout(() => {
          setMemoryGame(prev => ({ ...prev, flipped: [] }));
        }, 1000);
      }
    }
  };

  // Trivia Game
  const initializeTriviaGame = () => {
    setTriviaGame({
      currentQuestion: 0,
      score: 0,
      isComplete: false
    });
    setActiveGame("trivia");
  };

  const answerTrivia = (answerIndex: number) => {
    const correct = coffeeTrivia[triviaGame.currentQuestion].correct === answerIndex;
    
    if (triviaGame.currentQuestion === coffeeTrivia.length - 1) {
      setTriviaGame(prev => ({ ...prev, isComplete: true }));
      onEarnPoints(10); // Fixed 10 points for completing the game
    } else {
      setTriviaGame(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  // Quick Tap Game
  const initializeQuickTapGame = () => {
    setQuickTapGame({
      timeLeft: 10,
      score: 0,
      isActive: true,
      targetPosition: { x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }
    });
    setActiveGame("quicktap");

    const timer = setInterval(() => {
      setQuickTapGame(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          onEarnPoints(10); // Fixed 10 points for completing the game
          return { ...prev, timeLeft: 0, isActive: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const tapTarget = () => {
    if (!quickTapGame.isActive) return;
    
    setQuickTapGame(prev => ({
      ...prev,
      score: prev.score + 1,
      targetPosition: { x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }
    }));
  };

  const getCardIcon = (cardValue: number) => {
    const icons = [Coffee, Target, Zap, Gift, Clock, Trophy];
    const IconComponent = icons[cardValue - 1];
    return <IconComponent className="w-8 h-8" />;
  };

  // Calculate discount availability
  const pointsToNextDiscount = 100 - (userPoints % 100);
  const availableDiscounts = Math.floor(userPoints / 100);

  return (
    <div className="space-y-4">
      {/* Points Display with Discount Info */}
      <Card className="p-4 bg-[rgba(49,13,3,0.99)] text-white border-none shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6" />
            <div>
              <h3 className="text-sm">Tus Puntos</h3>
              <p className="text-xs opacity-90">Gana puntos jugando</p>
            </div>
          </div>
          <Badge className="bg-white text-[rgba(23,8,0,1)] text-lg px-3 py-1">
            {userPoints}
          </Badge>
        </div>
        
        {/* Discount Progress */}
        <div className="bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${((userPoints % 100) / 100) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs opacity-90">
          <span>{pointsToNextDiscount} puntos para descuento</span>
          <span>{availableDiscounts} descuentos disponibles</span>
        </div>
      </Card>

      {!activeGame && (
        <div className="grid gap-3">
          <h2 className="text-lg text-[rgba(64,31,17,1)] text-center mb-2 text-[32px] font-[ABeeZee]">Mini Juegos</h2>
          
          {/* Memory Game */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-4 bg-gradient-to-br from-[#F5E6D3] to-[#E6D5C3] border-none shadow-lg rounded-xl cursor-pointer bg-[rgba(255,255,255,1)]" 
                  onClick={initializeMemoryGame}>
              <div className="flex items-center space-x-3">
                <div className="bg-[rgba(64,31,17,1)] p-3 rounded-full">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-[rgba(64,31,17,1)] mb-1 font-[Diphylleia] text-[20px]">Memoria del Café</h3>
                  <p className="text-xs text-[#C49781]/70 mb-2 text-[rgba(64,31,17,1)]">Encuentra las parejas de iconos</p>
                  <Badge className="bg-[#C49781] text-white text-xs">+10 puntos</Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Trivia Game */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-4 bg-gradient-to-br from-[#F5E6D3] to-[#E6D5C3] border-none shadow-lg rounded-xl cursor-pointer bg-[rgba(254,255,253,1)]" 
                  onClick={initializeTriviaGame}>
              <div className="flex items-center space-x-3">
                <div className="bg-[rgba(19,54,9,1)] p-3 rounded-full">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-[rgba(64,31,17,1)] mb-1 font-[Diphylleia] text-[20px]">Trivia Cafetera</h3>
                  <p className="text-xs text-[#C49781]/70 mb-2 text-[rgba(64,31,17,1)]">Demuestra tu conocimiento</p>
                  <Badge className="bg-[#C49781] text-[rgba(255,255,255,0.99)] text-xs">+10 puntos</Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Tap Game */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-4 bg-gradient-to-br from-[#F5E6D3] to-[#E6D5C3] border-none shadow-lg rounded-xl cursor-pointer bg-[rgba(255,255,255,1)]" 
                  onClick={initializeQuickTapGame}>
              <div className="flex items-center space-x-3">
                <div className="bg-[rgba(98,23,23,0.99)] p-3 rounded-full">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-[rgba(64,31,17,1)] mb-1 font-[Diphylleia] text-[20px] font-bold">Toque Rápido</h3>
                  <p className="text-xs text-[#C49781]/70 mb-2 text-[rgba(64,31,17,1)]">Toca los objetivos lo más rápido posible</p>
                  <Badge className="bg-[#C49781] text-white text-xs">+10 puntos</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Memory Game */}
      {activeGame === "memory" && (
        <Card className="p-4 bg-white border-none shadow-lg rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-[#C49781]">Memoria del Café</h3>
            <Button onClick={() => setActiveGame(null)} variant="outline" size="sm" className="text-xs px-2 py-1">
              Salir
            </Button>
          </div>

          {memoryGame.isComplete ? (
            <div className="text-center py-6">
              <Trophy className="w-12 h-12 text-[#C49781] mx-auto mb-3" />
              <h3 className="text-lg text-[#C49781] mb-2">¡Felicidades!</h3>
              <p className="text-sm text-[#C49781]/70 mb-3">Has ganado 10 puntos</p>
              <Button onClick={() => setActiveGame(null)} className="bg-[#C49781] text-white text-sm px-4 py-2">
                Continuar
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {memoryGame.cards.map((cardValue, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-lg flex items-center justify-center cursor-pointer ${
                    memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)
                      ? 'bg-[#C49781] text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  onClick={() => flipCard(index)}
                >
                  {(memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) && 
                    getCardIcon(cardValue)}
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Trivia Game */}
      {activeGame === "trivia" && (
        <Card className="p-4 bg-white border-none shadow-lg rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-[#C49781]">Trivia Cafetera</h3>
            <Button onClick={() => setActiveGame(null)} variant="outline" size="sm" className="text-xs px-2 py-1">
              Salir
            </Button>
          </div>

          {triviaGame.isComplete ? (
            <div className="text-center py-6">
              <Trophy className="w-12 h-12 text-[#C49781] mx-auto mb-3" />
              <h3 className="text-lg text-[#C49781] mb-2">¡Completado!</h3>
              <p className="text-sm text-[#C49781]/70 mb-3">Has ganado 10 puntos</p>
              <Button onClick={() => setActiveGame(null)} className="bg-[#C49781] text-white text-sm px-4 py-2">
                Continuar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-sm text-[#C49781] mb-3">
                  {coffeeTrivia[triviaGame.currentQuestion].question}
                </h4>
                <div className="grid gap-2">
                  {coffeeTrivia[triviaGame.currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => answerTrivia(index)}
                      variant="outline"
                      className="p-3 text-left justify-start hover:bg-[#F5E6D3] text-xs"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Quick Tap Game */}
      {activeGame === "quicktap" && (
        <Card className="p-4 bg-white border-none shadow-lg rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-[#C49781]">Toque Rápido</h3>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-500 text-white text-xs">Tiempo: {quickTapGame.timeLeft}s</Badge>
              <Badge className="bg-[#C49781] text-white text-xs">Toques: {quickTapGame.score}</Badge>
              <Button onClick={() => setActiveGame(null)} variant="outline" size="sm" className="text-xs px-2 py-1">
                Salir
              </Button>
            </div>
          </div>

          {!quickTapGame.isActive && quickTapGame.timeLeft === 0 ? (
            <div className="text-center py-6">
              <Trophy className="w-12 h-12 text-[#C49781] mx-auto mb-3" />
              <h3 className="text-lg text-[#C49781] mb-2">¡Tiempo agotado!</h3>
              <p className="text-sm text-[#C49781]/70 mb-3">Has ganado 10 puntos</p>
              <Button onClick={() => setActiveGame(null)} className="bg-[#C49781] text-white text-sm px-4 py-2">
                Continuar
              </Button>
            </div>
          ) : (
            <div className="relative h-60 bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] rounded-lg overflow-hidden">
              <motion.div
                className="absolute w-12 h-12 bg-[#C49781] rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                style={{
                  left: `${quickTapGame.targetPosition.x}%`,
                  top: `${quickTapGame.targetPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                onClick={tapTarget}
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
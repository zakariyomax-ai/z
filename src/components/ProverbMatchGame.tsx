import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, Award, Lightbulb, Zap } from 'lucide-react';
import { PROVERB_PAIRS } from '../data/novelData';
import { ProverbPair } from '../types';
import { sounds } from '../utils/sound';

interface ProverbMatchGameProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const ProverbMatchGame: React.FC<ProverbMatchGameProps> = ({ onEarnPoints }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledRights, setShuffledRights] = useState<ProverbPair[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastMatchedPair, setLastMatchedPair] = useState<ProverbPair | null>(null);

  // Shuffle right items on load or reset
  const initGame = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setGameScore(0);
    setIsCompleted(false);
    setLastMatchedPair(null);

    // Shuffle the right side items
    const shuffled = [...PROVERB_PAIRS].sort(() => Math.random() - 0.5);
    setShuffledRights(shuffled);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleLeftClick = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    sounds.playClick();
    setSelectedLeft(pairId);

    // If right already selected, check match
    if (selectedRight) {
      checkMatch(pairId, selectedRight);
    }
  };

  const handleRightClick = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    sounds.playClick();
    setSelectedRight(pairId);

    // If left already selected, check match
    if (selectedLeft) {
      checkMatch(selectedLeft, pairId);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct Match!
      sounds.playCorrect();
      const pair = PROVERB_PAIRS.find((p) => p.id === leftId);
      if (pair) setLastMatchedPair(pair);

      const nextMatched = [...matchedIds, leftId];
      setMatchedIds(nextMatched);
      setSelectedLeft(null);
      setSelectedRight(null);

      const earned = 25;
      setGameScore((prev) => prev + earned);
      onEarnPoints(earned, `Maqol juftligi topildi: "${pair?.firstPart}"`);

      // Check if all completed
      if (nextMatched.length === PROVERB_PAIRS.length) {
        setIsCompleted(true);
        sounds.playVictory();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      // Wrong Match
      sounds.playWrong();
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  return (
    <section id="maqollar" className="py-12 md:py-16 bg-stone-900 border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              Interaktiv Adabiy O'yin
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Maqol va Hikmatlarni Moslashtiring
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Chap tomondagi maqolning boshlanishini o'ng tomondagi unga mos mantiqiy davomi bilan birlashtiring.
              Har bir to'g'ri juftlik uchun avtomatik +25 ball beriladi!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700/80 text-xs font-mono text-stone-300">
              Juftliklar: <span className="font-bold text-amber-400">{matchedIds.length} / {PROVERB_PAIRS.length}</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                initGame();
              }}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 border border-stone-700 transition-colors cursor-pointer"
              title="O'yinni qaytadan boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: First Half */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-1 flex items-center justify-between">
              <span>1. Maqol yoki Hikmat Boshlanishi</span>
              <span className="text-[11px] text-stone-400">Tanlang</span>
            </div>

            <div className="space-y-2.5">
              {PROVERB_PAIRS.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedLeft === pair.id;

                let cardClass = 'bg-stone-950/70 border-stone-800 text-stone-200 hover:border-stone-700 hover:bg-stone-950';

                if (isMatched) {
                  cardClass = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-80 cursor-default';
                } else if (isSelected) {
                  cardClass = 'bg-amber-500/20 border-amber-500 text-amber-200 ring-2 ring-amber-500/30';
                }

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleLeftClick(pair.id)}
                    disabled={isMatched}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${cardClass}`}
                  >
                    <span className="leading-snug">{pair.firstPart}</span>
                    {isMatched && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column B: Second Half (Shuffled) */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-1 flex items-center justify-between">
              <span>2. Mos Keluvchi Davomi</span>
              <span className="text-[11px] text-stone-400">Juftini toping</span>
            </div>

            <div className="space-y-2.5">
              {shuffledRights.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedRight === pair.id;

                let cardClass = 'bg-stone-950/70 border-stone-800 text-stone-200 hover:border-stone-700 hover:bg-stone-950';

                if (isMatched) {
                  cardClass = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-80 cursor-default';
                } else if (isSelected) {
                  cardClass = 'bg-amber-500/20 border-amber-500 text-amber-200 ring-2 ring-amber-500/30';
                }

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleRightClick(pair.id)}
                    disabled={isMatched}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${cardClass}`}
                  >
                    <span className="leading-snug">{pair.secondPart}</span>
                    {isMatched && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Meaning Callout for Last Matched Pair */}
        {lastMatchedPair && !isCompleted && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-stone-200 flex items-start gap-3 animate-in fade-in duration-300">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-300">
                To'g'ri topildi: "{lastMatchedPair.firstPart} {lastMatchedPair.secondPart}"
              </div>
              <p className="text-stone-300 leading-relaxed">
                <span className="text-stone-400">Falsafiy ma'nosi:</span> {lastMatchedPair.meaning}
              </p>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {isCompleted && (
          <div className="bg-stone-950 rounded-2xl border border-stone-800 p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Award className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-stone-100">
                Barcha Maqol va Hikmatlar Muvaffaqiyatli Moslashtirildi!
              </h3>
              <p className="text-sm text-stone-400">
                Siz jami <span className="font-bold text-amber-400 font-mono">+{gameScore} ball</span> ishlab oldingiz va axloqiy ibratlarni o'rgandingiz.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  initGame();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan O'ynash</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

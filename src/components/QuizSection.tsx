import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Flame, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/novelData';
import { QuizQuestion } from '../types';
import { sounds } from '../utils/sound';

interface QuizSectionProps {
  onEarnPoints: (points: number, reason: string) => void;
  onCompleteQuiz: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onEarnPoints, onCompleteQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreEarnedInSession, setScoreEarnedInSession] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswerIndex;
    if (isCorrect) {
      sounds.playCorrect();
      const streakBonus = streak >= 2 ? 5 : 0;
      const pointsToAdd = currentQ.points + streakBonus;
      setStreak((s) => s + 1);
      setCorrectCount((c) => c + 1);
      setScoreEarnedInSession((prev) => prev + pointsToAdd);
      onEarnPoints(pointsToAdd, `Savol #${currentIdx + 1} to'g'ri javobi${streakBonus > 0 ? " (ketma-ketlik bonusi bilan!)" : ""}`);
    } else {
      sounds.playWrong();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      sounds.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onCompleteQuiz();
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreEarnedInSession(0);
    setCorrectCount(0);
    setStreak(0);
    setIsFinished(false);
  };

  return (
    <section id="test" className="py-12 md:py-16 bg-stone-950 border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bilimni Sinash va Mustahkamlash</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
            "Mungli Ko'zlar" Interaktiv Testi
          </h2>
          <p className="text-sm text-stone-400 max-w-xl mx-auto">
            Asar qahramonlari taqdiri, fojia sabablari va mumtoz so'zlar ma'nosi bo'yicha maxsus tuzilgan 
            savollarga javob bering va avtomatik ball to'plang!
          </p>
        </div>

        {!isFinished ? (
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 md:p-8 space-y-6 shadow-xl">
            {/* Top Bar: Progress & Streak */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-400">Savol:</span>
                <span className="font-mono font-bold text-stone-100 text-sm">
                  {currentIdx + 1} / {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {streak > 1 && (
                <div className="flex items-center gap-1 text-orange-400 font-semibold animate-bounce">
                  <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>{streak}x ketma-ket to'g'ri! (+5 bonus)</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold">
                <Award className="w-4 h-4" />
                <span>+{currentQ.points} ball</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              {currentQ.context && (
                <div className="text-xs text-stone-400 italic">
                  Kontekst: {currentQ.context}
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-stone-100 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;

                let btnStyle = 'bg-stone-800/80 hover:bg-stone-800 border-stone-700/80 text-stone-200';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-stone-900 border-stone-800/60 text-stone-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-stone-700/50 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Button */}
            {isAnswered && (
              <div className="pt-4 border-t border-stone-800 space-y-4 animate-in fade-in duration-200">
                <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                  selectedOption === currentQ.correctAnswerIndex
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Izoh va tahlil:</span>
                  </div>
                  {currentQ.explanation}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? "Natijani Ko'rish" : "Keyingi Savol"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-stone-100">
                Test Yakunlandi!
              </h3>
              <p className="text-sm text-stone-400 max-w-md mx-auto">
                "Mungli ko'zlar" asari bo'yicha bilimlaringiz muvaffaqiyatli sinovdan o'tdi va ballaringiz avtomatik hisoblandi!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-3">
              <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl font-bold font-mono text-amber-400">+{scoreEarnedInSession}</div>
                <div className="text-xs text-stone-400">To'plangan ball</div>
              </div>
              <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {correctCount} / {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-xs text-stone-400">To'g'ri javoblar</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)}%
                </div>
                <div className="text-xs text-stone-400">O'zlashtirish</div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan Yechish</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

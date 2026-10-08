import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  Sparkles,
  BookOpen,
  Layers
} from 'lucide-react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { VocabWord } from '../types';
import { sounds } from '../utils/sound';

interface VocabGameProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const VocabGame: React.FC<VocabGameProps> = ({ onEarnPoints }) => {
  const [activeTab, setActiveTab] = useState<'blitz' | 'flashcards'>('blitz');

  // Blitz State
  const [currentWord, setCurrentWord] = useState<VocabWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [blitzScore, setBlitzScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Flashcards State
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Generate a random blitz question from VOCABULARY_LIST
  const generateBlitzQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    // Pick a random target word
    const targetIdx = Math.floor(Math.random() * VOCABULARY_LIST.length);
    const target = VOCABULARY_LIST[targetIdx];
    setCurrentWord(target);

    // Pick 3 distractor definitions
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const randIdx = Math.floor(Math.random() * VOCABULARY_LIST.length);
      const randWord = VOCABULARY_LIST[randIdx];
      if (randWord.id !== target.id && !distractors.includes(randWord.definition)) {
        distractors.push(randWord.definition);
      }
    }

    const allOptions = [target.definition, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  useEffect(() => {
    generateBlitzQuestion();
  }, []);

  const handleSelectDefinition = (def: string) => {
    if (isAnswered || !currentWord) return;
    setSelectedOption(def);
    setIsAnswered(true);

    const isCorrect = def === currentWord.definition;
    if (isCorrect) {
      sounds.playCorrect();
      const points = 15 + (streak >= 3 ? 5 : 0);
      setStreak((s) => s + 1);
      setBlitzScore((prev) => prev + points);
      onEarnPoints(points, `Lug'at blitsida "${currentWord.word}" so'zini to'g'ri topgani uchun`);
    } else {
      sounds.playWrong();
      setStreak(0);
    }
  };

  const handleNextWord = () => {
    sounds.playClick();
    generateBlitzQuestion();
  };

  // Flashcards navigation
  const currentCard = VOCABULARY_LIST[flashcardIdx];

  const nextFlashcard = () => {
    sounds.playClick();
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev + 1) % VOCABULARY_LIST.length);
  };

  const prevFlashcard = () => {
    sounds.playClick();
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev - 1 + VOCABULARY_LIST.length) % VOCABULARY_LIST.length);
  };

  return (
    <section id="lugat-oyin" className="py-12 md:py-16 bg-stone-950 border-b border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              So'z Boyligini Oshirish
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Mumtoz Lug'at Blits O'yini
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-lg">
              Kitobdagi va mumtoz asarlardagi 275+ so'zlarning ma'nosini tezkorlik bilan toping.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-xl">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('blitz');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'blitz'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Tezkor Blits (+15 ball)</span>
              </span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('flashcards');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Yodlash Kartochkalari</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Blitz Mode */}
        {activeTab === 'blitz' && currentWord && (
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 md:p-8 space-y-6 shadow-xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-400">Blits Ball:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">+{blitzScore} ball</span>
              </div>

              {streak > 1 ? (
                <div className="text-orange-400 font-semibold font-mono animate-pulse">
                  🔥 {streak} ta ketma-ket to'g'ri!
                </div>
              ) : (
                <div className="text-stone-500 text-[11px]">4 ta variantdan tanlang</div>
              )}
            </div>

            {/* Target Word Big Display */}
            <div className="text-center py-6 bg-stone-950/60 rounded-xl border border-stone-800/80 space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-amber-500/80">
                Ushbu mumtoz so'z ma'nosini toping:
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-stone-100 tracking-wide">
                "{currentWord.word}"
              </h3>
              {currentWord.exampleInBook && (
                <p className="text-xs italic text-stone-400 max-w-md mx-auto pt-1">
                  Asardagi qo'llanishi: "{currentWord.exampleInBook}"
                </p>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentWord.definition;

                let cardClass = 'bg-stone-800/70 hover:bg-stone-800 border-stone-700/80 text-stone-200';

                if (isAnswered) {
                  if (isCorrect) {
                    cardClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    cardClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    cardClass = 'bg-stone-900 border-stone-800 text-stone-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectDefinition(opt)}
                    disabled={isAnswered}
                    className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${cardClass}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-stone-700/50 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Word Action */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextWord}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Keyingi So'z</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Flashcards Mode */}
        {activeTab === 'flashcards' && currentCard && (
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs text-stone-400">
              <span>Kartochka: {flashcardIdx + 1} / {VOCABULARY_LIST.length}</span>
              <span className="text-amber-400">Harf guruhi: [{currentCard.letter}]</span>
            </div>

            {/* Flip Card Container */}
            <div
              onClick={() => {
                sounds.playClick();
                setIsFlipped(!isFlipped);
              }}
              className="relative min-h-[220px] rounded-2xl bg-gradient-to-br from-stone-950 to-stone-900 border border-stone-800 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500/40 transition-all select-none group"
            >
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs uppercase font-mono tracking-widest text-stone-400">
                    Mumtoz So'z (bosing va aylantiring)
                  </span>
                  <h3 className="font-display text-4xl font-bold text-amber-300">
                    {currentCard.word}
                  </h3>
                  <div className="text-xs text-stone-400 flex items-center justify-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Ma'nosini ko'rish uchun kartani bosing</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                    Izohi va Ma'nosi
                  </span>
                  <p className="text-xl sm:text-2xl font-semibold text-stone-100 max-w-lg">
                    {currentCard.definition}
                  </p>
                  {currentCard.exampleInBook && (
                    <p className="text-xs italic text-stone-400 max-w-md pt-2">
                      Misol: "{currentCard.exampleInBook}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={prevFlashcard}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
              >
                Oldingisi
              </button>

              <span className="text-xs text-stone-500">Kartani bosib ma'nosini oching</span>

              <button
                onClick={nextFlashcard}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                Keyingisi
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

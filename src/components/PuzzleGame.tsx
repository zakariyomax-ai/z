import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Puzzle, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Clock, 
  Flame,
  HelpCircle
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface PuzzleGameProps {
  onEarnPoints: (points: number, reason: string) => void;
}

const PUZZLE_IMAGE = '/src/assets/images/sahna_ona_aka_ziddiyat_1791286836805.jpg';

export const PuzzleGame: React.FC<PuzzleGameProps> = ({ onEarnPoints }) => {
  const [gridSize, setGridSize] = useState<3 | 4>(3); // 3x3 or 4x4
  const totalTiles = gridSize * gridSize;

  // array representing current tile at each slot: index is slot, value is original tile index
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  // Initialize or shuffle
  const initPuzzle = (size: 3 | 4 = gridSize) => {
    setGridSize(size);
    const count = size * size;
    const initial = Array.from({ length: count }, (_, i) => i);
    
    // Shuffle ensuring it's not already solved
    let shuffled = [...initial].sort(() => Math.random() - 0.5);
    while (shuffled.every((v, i) => v === i)) {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
    }

    setTiles(shuffled);
    setSelectedSlot(null);
    setMovesCount(0);
    setIsSolved(false);
    setSeconds(0);
    setIsActive(true);
  };

  useEffect(() => {
    initPuzzle();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isSolved) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isSolved]);

  const handleTileClick = (slotIdx: number) => {
    if (isSolved) return;
    sounds.playClick();

    if (selectedSlot === null) {
      setSelectedSlot(slotIdx);
    } else if (selectedSlot === slotIdx) {
      setSelectedSlot(null);
    } else {
      // Swap tiles at selectedSlot and slotIdx
      const newTiles = [...tiles];
      const temp = newTiles[selectedSlot];
      newTiles[selectedSlot] = newTiles[slotIdx];
      newTiles[slotIdx] = temp;

      setTiles(newTiles);
      setSelectedSlot(null);
      setMovesCount((m) => m + 1);

      // Check if solved
      const solved = newTiles.every((val, idx) => val === idx);
      if (solved) {
        setIsSolved(true);
        setIsActive(false);
        sounds.playVictory();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        const points = gridSize === 3 ? 30 : 50;
        onEarnPoints(points, `Onaning faryodi lavhasi pazlini (${gridSize}x${gridSize}) to'liq yig'gani uchun`);
      }
    }
  };

  const correctPlacementsCount = tiles.filter((val, idx) => val === idx).length;
  const progressPercent = Math.round((correctPlacementsCount / totalTiles) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <section id="pazl" className="py-12 md:py-16 bg-stone-900 border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-1">
              <Puzzle className="w-3.5 h-3.5" />
              <span>Badiiy Lavha Pazl O'yini</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Onaning Faryodi — Badiiy Pazlni Yig'ing
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Asardagi eng ta'sirchan sahna: onaning katta o'g'liga alam va sarzanish bilan baqirgan lavhasi bo'laklarga ajratilgan. 
              Bo'laklarni to'g'ri o'rniga joylashtirib rasmni to'liq tiklang!
            </p>
          </div>

          {/* Controls: Difficulty & Reset */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  initPuzzle(3);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  gridSize === 3
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                3x3 (Oson)
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  initPuzzle(4);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  gridSize === 4
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                4x4 (Zukko)
              </button>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setShowPreview(!showPreview);
              }}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{showPreview ? "Pazlga qaytish" : "Asl rasm"}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                initPuzzle();
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 border border-stone-700 transition-colors cursor-pointer"
              title="Qaytadan aralashtirish"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Puzzle Board and Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Board */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* Top Stat Pills */}
            <div className="w-full max-w-lg flex items-center justify-between text-xs text-stone-400 pb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono tabular-nums">{formatTime(seconds)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Harakatlar:</span>
                <span className="font-mono font-bold text-amber-400">{movesCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>To'g'ri o'rinda:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {correctPlacementsCount} / {totalTiles} ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Puzzle Grid Canvas */}
            <div className="relative w-full max-w-lg aspect-[4/3] bg-stone-950 rounded-2xl border-2 border-stone-800 overflow-hidden shadow-2xl p-1.5">
              {!showPreview ? (
                <div
                  className="w-full h-full grid gap-1 select-none"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
                  }}
                >
                  {tiles.map((tileIndex, slotIndex) => {
                    const isSelected = selectedSlot === slotIndex;
                    const isCorrect = tileIndex === slotIndex;

                    // Calculate original position for background positioning
                    const col = tileIndex % gridSize;
                    const row = Math.floor(tileIndex / gridSize);
                    const posX = (col / (gridSize - 1)) * 100;
                    const posY = (row / (gridSize - 1)) * 100;

                    return (
                      <button
                        key={slotIndex}
                        onClick={() => handleTileClick(slotIndex)}
                        className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'ring-4 ring-amber-400 scale-[0.98] z-20 shadow-lg'
                            : isCorrect && !isSolved
                            ? 'ring-1 ring-emerald-500/40'
                            : 'hover:brightness-110'
                        }`}
                        style={{
                          backgroundImage: `url(${PUZZLE_IMAGE})`,
                          backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                          backgroundPosition: `${posX}% ${posY}%`,
                        }}
                      >
                        {/* Position badge / indicator */}
                        {isCorrect && !isSolved && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500/80 text-white flex items-center justify-center pointer-events-none">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="relative w-full h-full rounded-xl overflow-hidden animate-in fade-in">
                  <img
                    src={PUZZLE_IMAGE}
                    alt="Onaning faryodi asl lavhasi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 inset-x-2 p-2 bg-black/70 backdrop-blur-sm rounded-lg text-center text-xs text-stone-200">
                    Asl nusxa: O'g'liga alam bilan sarzanish qilayotgan ona lavhasi
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-500 pt-3 text-center">
              💡 Maslahat: Almashtirmoqchi bo'lgan 1-bo'lakni bosing, so'ngra 2-bo'lakni tanlang. Yashil belgi to'g'ri o'rnini bildiradi.
            </p>
          </div>

          {/* Right Column: Scene Description & Victory Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                Sahna Mohiyati
              </span>
              <h3 className="font-display text-lg font-bold text-stone-100">
                Ona va Katta O'g'il Ziddiyati
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Asarning eng keskin nuqtasi: onaning to'ng'ich o'g'il Zafarga alam, ko'z yosh va nafrat bilan baqirgan,
                "Biz sen uchun yashamaganmidik, uying kuysin nodon!" deb faryod chekkan onlaridir.
              </p>

              <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 space-y-1">
                <div>🎯 <strong>3x3 rejim:</strong> +30 ball</div>
                <div>⚡ <strong>4x4 rejim:</strong> +50 ball</div>
              </div>
            </div>

            {/* Solved celebration banner */}
            {isSolved && (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>Tabriklaymiz, Pazl Yig'ildi!</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Siz rasm bo'laklarini to'g'ri joylashtirdingiz va <strong>+{gridSize === 3 ? 30 : 50} ball</strong> ishlab oldingiz!
                </p>
                <div className="text-xs font-mono text-stone-300">
                  Sarflangan vaqt: <strong>{formatTime(seconds)}</strong> | Harakatlar: <strong>{movesCount} ta</strong>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    initPuzzle();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Qaytadan O'ynash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, Bookmark, BookmarkCheck, BookOpen, Filter, X } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { VocabWord } from '../types';
import { sounds } from '../utils/sound';

interface DictionarySectionProps {
  bookmarkedIds: string[];
  onToggleBookmark: (wordId: string) => void;
}

const LETTERS = [
  'BARCHASI', 'A', 'B', 'V', 'G', 'D', 'Z', 'J', 'I', 'K', 'L', 'M', 'N', 'O', 'R', 'S', 'T', 'U', 'F', 'X', 'CH', 'SH', 'Q', 'H'
];

export const DictionarySection: React.FC<DictionarySectionProps> = ({
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('BARCHASI');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      // Bookmark filter
      if (onlyBookmarks && !bookmarkedIds.includes(item.id)) {
        return false;
      }

      // Letter filter
      if (selectedLetter !== 'BARCHASI' && item.letter !== selectedLetter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(query);
        const matchDef = item.definition.toLowerCase().includes(query);
        return matchWord || matchDef;
      }

      return true;
    });
  }, [searchQuery, selectedLetter, onlyBookmarks, bookmarkedIds]);

  return (
    <section id="lugat" className="py-12 md:py-16 bg-stone-900 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              Mumtoz va Badiiy Lug'at
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              "Mungli Ko'zlar" va Axloq Durlari Lug'ati
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Asarda va mumtoz ma'rifiy adabiyotlarda uchraydigan 275+ qadimiy, ma'nodor so'zlarning to'liq izohli lug'ati.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setOnlyBookmarks(!onlyBookmarks);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                onlyBookmarks
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-semibold'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-stone-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saqlanganlar ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 bg-stone-950/70 rounded-2xl border border-stone-800 p-4 md:p-5">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="So'z yoki uning ma'nosi bo'yicha qidiring (masalan: 'Nadomat', 'axloq', 'soflik')..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Letter selector */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {LETTERS.map((letter) => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedLetter(letter);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 px-1 pt-1">
            <span>
              Topildi: <strong className="text-amber-400 font-mono font-semibold">{filteredWords.length}</strong> ta so'z
            </span>
            {searchQuery && (
              <span>Qidiruv bo'yicha saralandi</span>
            )}
          </div>
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.slice(0, 75).map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                        {item.letter}
                      </span>
                      <h4 className="font-display text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {item.word}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          onToggleBookmark(item.id);
                        }}
                        className="p-1 rounded text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
                        title={isBookmarked ? "Saqlangandan o'chirish" : "Saqlab qo'yish"}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                {item.exampleInBook && (
                  <div className="pt-2 border-t border-stone-900 text-[11px] text-stone-400 italic">
                    "{item.exampleInBook}"
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredWords.length > 75 && (
          <div className="text-center pt-2">
            <span className="text-xs text-stone-400">
              Qidiruv aniqligini oshirish uchun yuqoridagi harf filtrlaridan yoki qidiruv satridan foydalaning (jami {filteredWords.length} ta).
            </span>
          </div>
        )}

        {filteredWords.length === 0 && (
          <div className="text-center py-12 bg-stone-950/40 rounded-2xl border border-stone-800 space-y-2">
            <BookOpen className="w-8 h-8 text-stone-600 mx-auto" />
            <div className="text-sm font-semibold text-stone-300">
              Hech qanday so'z topilmadi
            </div>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Boshqa so'z qidirib ko'ring yoki filtrlarni tozalang.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

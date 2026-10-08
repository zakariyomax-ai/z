import React from 'react';
import { ArrowRight, BookOpen, BrainCircuit, Trophy, Sparkles, HelpCircle, ExternalLink, Puzzle, Search } from 'lucide-react';
import { sounds } from '../utils/sound';

export const SCRIBD_BOOK_URL = "https://www.scribd.com/document/841473929/xrpt-xavsnys382z53v35mmrptbxoppg0v75i7o3kdjcba364nxx20ehtf59vjev7bof968i9gl0he6a";

interface HeroSectionProps {
  onStartQuiz: () => void;
  onStartProverbs: () => void;
  onExploreVocab: () => void;
  onStartPuzzle?: () => void;
  onExploreBooks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onStartProverbs,
  onExploreVocab,
  onStartPuzzle,
  onExploreBooks,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>O'zbek Adabiyoti Durlaridan Biri</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400">Xudoyberdi To'xtaboyev</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-100 leading-[1.15] text-balance">
              "Mungli Ko'zlar" — Ma'rifat, Ibrat va Interaktiv Ta'lim Platformasi
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Boylik ortidan quvib barbod bo'lgan oila, mehrga tashna bolalarning mungli nigohlari 
              va kechikkan nadomat saboqlari. Asar mazmunini chuqur o'rganing, testlar yeching, 
              maqollarni moslashtiring va 270 dan ziyod mumtoz lug'at so'zlarini o'zlashtiring!
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-stone-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400">275+</div>
                <div className="text-xs text-stone-400">Mumtoz lug'at so'zlari</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-stone-200">12 ta</div>
                <div className="text-xs text-stone-400">Chuqur tahlil testlari</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">Pazl & O'yin</div>
                <div className="text-xs text-stone-400">Interaktiv ta'lim</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onStartQuiz();
                }}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2 group cursor-pointer"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Test va Savollar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onStartPuzzle?.();
                }}
                className="px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Puzzle className="w-4 h-4 text-amber-400" />
                <span>Rasm Pazl O'yini</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onExploreBooks?.();
                }}
                className="px-4 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold text-sm border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Kitoblar & YouTube Audio</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onStartProverbs();
                }}
                className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Maqollar O'yini</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onExploreVocab();
                }}
                className="px-4 py-3 rounded-xl hover:bg-stone-800/60 text-stone-400 hover:text-stone-200 font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lug'at</span>
              </button>

              <a
                href={SCRIBD_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-4 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 font-medium text-sm border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
                title="Scribd orqali kitobning to'liq hujjatini o'qish"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Kitobni O'qish (Scribd)</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl group">
              <img
                src="/src/assets/images/mungli_kozlar_hero_1791286822170.jpg"
                alt="Mungli Ko'zlar - Badiiy qahramonlar tasviri"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  Asar ruhiyati
                </span>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  "Ular bolalikdan mahrum bo'lgan mungli ko'zlar edi..."
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">
                  Zafar va Nigoraning nigohlarida ota-ona talashuvlari oqibatida so'ngan beg'uborlik aks etgan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

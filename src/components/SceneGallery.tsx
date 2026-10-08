import React, { useState } from 'react';
import { Sparkles, AlertCircle, Quote, CheckCircle2, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { DRAMATIC_SCENES } from '../data/novelData';
import { DramaticScene } from '../types';
import { sounds } from '../utils/sound';

export const SCRIBD_BOOK_URL = "https://www.scribd.com/document/841473929/xrpt-xavsnys382z53v35mmrptbxoppg0v75i7o3kdjcba364nxx20ehtf59vjev7bof968i9gl0he6a";

interface SceneGalleryProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const SceneGallery: React.FC<SceneGalleryProps> = ({ onEarnPoints }) => {
  const [selectedScene, setSelectedScene] = useState<DramaticScene>(DRAMATIC_SCENES[0]);
  const [completedReflections, setCompletedReflections] = useState<Record<string, boolean>>({});

  const handleReflect = (sceneId: string) => {
    if (completedReflections[sceneId]) return;
    sounds.playCorrect();
    setCompletedReflections((prev) => ({ ...prev, [sceneId]: true }));
    onEarnPoints(15, `"${selectedScene.title}" sahnasini tahlil qilgani uchun`);
  };

  return (
    <section id="sahnalar" className="py-12 md:py-16 bg-stone-900 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              Badiiy Lavhalar & Dramatik Sahnalar
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              "Mungli Ko'zlar"ning Eng Kuchli Sahnalari
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Asardagi fojiali voqealar, onaning akasiga baqirib faryod urgani va bolalar qalbidagi shikastlangan umidlar lavhasi.
            </p>
          </div>

          {/* Scene selector tabs and book link */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={SCRIBD_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Scribd orqali kitobning to'liq nusxasini o'qish"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Kitobni O'qish (Scribd)</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <div className="flex items-center gap-1.5 p-1 bg-stone-800/80 rounded-xl border border-stone-700/60 overflow-x-auto">
              {DRAMATIC_SCENES.map((scene, idx) => {
                const isActive = selectedScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedScene(scene);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 shadow-md font-semibold'
                        : 'text-stone-300 hover:text-stone-100 hover:bg-stone-700/50'
                    }`}
                  >
                    <span>{idx + 1}-Lavha: </span>
                    <span className="truncate max-w-[130px] inline-block align-bottom">{scene.title.split(' ')[0]}...</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Scene Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-950/60 rounded-2xl border border-stone-800 p-6 md:p-8">
          {/* Visual Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-stone-800 group aspect-[4/3]">
              <img
                src={selectedScene.imageSrc}
                alt={selectedScene.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm border border-stone-700/60 text-amber-400 text-xs px-2.5 py-1 rounded-md font-medium">
                Kitobdagi Dramatik Epizod
              </div>
            </div>

            {/* Moral lesson callout */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-stone-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Sahna Sabog'i & Axloqiy Xulosa:</span>
              </div>
              <p className="leading-relaxed text-stone-300">{selectedScene.moralLesson}</p>
            </div>
          </div>

          {/* Narrative & Excerpt Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  {selectedScene.subtitle}
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-100 mt-1">
                  {selectedScene.title}
                </h3>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedScene.description}
              </p>

              {/* Book Excerpt Box */}
              <div className="relative p-5 rounded-xl bg-stone-900/90 border border-stone-800/80 text-stone-200">
                <Quote className="w-8 h-8 text-amber-500/20 absolute top-3 right-3 pointer-events-none" />
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-amber-400">
                    Kitobdan Badiiy Iqtibos:
                  </span>
                  <a
                    href={SCRIBD_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans transition-colors"
                    title="Ushbu sahna va kitobning to'liq nusxasini Scribd'da o'qish"
                  >
                    <span>Asl kitobni o'qish (Scribd)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <blockquote className="text-sm sm:text-base italic font-serif leading-relaxed text-stone-200">
                  {selectedScene.bookExcerpt}
                </blockquote>
              </div>
            </div>

            {/* Student Reflection & Point Grant */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-4">
              <div className="text-xs text-stone-400">
                Ushbu sahna mohiyatini o'rganib, tahlil qiling:
              </div>

              <button
                onClick={() => handleReflect(selectedScene.id)}
                disabled={completedReflections[selectedScene.id]}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  completedReflections[selectedScene.id]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                }`}
              >
                {completedReflections[selectedScene.id] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tahlil qilindi (+15 ball)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sahna tahlilini tasdiqlash (+15 ball)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 py-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-stone-100 font-display font-bold text-base">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Mungli Ko'zlar — Interaktiv Adabiy Platforma</span>
            </div>
            <p className="text-stone-400 max-w-md">
              O'zbek adabiyotining durdona asari va mumtoz axloqiy manbalar asosida o'quvchilar tafakkurini boyitish uchun yaratilgan ta'lim loyihasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-400 font-medium">
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('sahnalar');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Sahnalar
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('pazl');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Rasm Pazl
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('test');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Testlar
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('maqollar');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Maqollar O'yini
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('kitoblar');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Kitoblar & Audio
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('lugat');
              }}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Lug'at
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400">
          <div>
            © {new Date().getFullYear()} Mungli Ko'zlar Ma'rifiy Dasturi. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span>Tuzuvchi: <strong className="text-stone-300 font-semibold">Zakariyo Husanov</strong></span>
            <span className="text-stone-600">·</span>
            <span>Kitobxon yoshlar ta'limi uchun</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>bilan ishlab chiqildi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

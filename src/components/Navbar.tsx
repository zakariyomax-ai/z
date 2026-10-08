import React from 'react';
import { Volume2, VolumeX, Award, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isMuted, setIsMuted] = React.useState(sounds.getMuted());

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  const navLinks = [
    { id: 'sahnalar', label: 'Sahnalar' },
    { id: 'pazl', label: "Rasm Pazl" },
    { id: 'test', label: 'Test & Savollar' },
    { id: 'maqollar', label: "Maqollar" },
    { id: 'kitoblar', label: "Kitoblar & Audio" },
    { id: 'lugat', label: "Lug'at" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('hero');
          }}
          className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors block leading-tight">
              Mungli Ko'zlar
            </span>
            <span className="text-[11px] text-stone-400 tracking-wide block">
              Adabiy-Ma'rifiy Platforma
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`text-sm font-medium transition-colors relative py-1 focus-visible:outline-none ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-stone-300 hover:text-stone-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('kitoblar');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            Kitoblar & Audio
          </button>
        </div>
      </div>

      {/* Mobile Submenu bar for quick thumb access */}
      <div className="lg:hidden border-t border-stone-800/80 bg-stone-900/95 overflow-x-auto scrollbar-none py-2 px-4 flex items-center gap-2">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              sounds.playClick();
              onNavigate(link.id);
            }}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded-md transition-colors ${
              activeSection === link.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 bg-stone-800/50'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};

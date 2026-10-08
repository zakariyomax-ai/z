import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SceneGallery } from './components/SceneGallery';
import { PuzzleGame } from './components/PuzzleGame';
import { QuizSection } from './components/QuizSection';
import { ProverbMatchGame } from './components/ProverbMatchGame';
import { VocabGame } from './components/VocabGame';
import { BooksLibrarySection } from './components/BooksLibrarySection';
import { DictionarySection } from './components/DictionarySection';
import { Footer } from './components/Footer';

const BOOKMARKS_STORAGE_KEY = 'mungli_kozlar_bookmarks';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Bookmarked dictionary words
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return ['v-160', 'v-263', 'v-60']; // Nadomat, Shikasta, Zohirparast
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedWords));
    } catch {
      // Ignored
    }
  }, [bookmarkedWords]);

  const handleEarnPoints = (_points: number, _reason: string) => {
    // Session feedback (sounds & animations handled in game components)
  };

  const handleCompleteQuiz = () => {
    // Quiz completion handled inside QuizSection with celebratory summary
  };

  const handleToggleBookmark = (wordId: string) => {
    setBookmarkedWords((prev) => {
      const exists = prev.includes(wordId);
      return exists ? prev.filter((id) => id !== wordId) : [...prev, wordId];
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        <HeroSection
          onStartQuiz={() => scrollToSection('test')}
          onStartProverbs={() => scrollToSection('maqollar')}
          onExploreVocab={() => scrollToSection('lugat')}
          onStartPuzzle={() => scrollToSection('pazl')}
          onExploreBooks={() => scrollToSection('kitoblar')}
        />

        <SceneGallery onEarnPoints={handleEarnPoints} />

        <PuzzleGame onEarnPoints={handleEarnPoints} />

        <QuizSection
          onEarnPoints={handleEarnPoints}
          onCompleteQuiz={handleCompleteQuiz}
        />

        <ProverbMatchGame onEarnPoints={handleEarnPoints} />

        <VocabGame onEarnPoints={handleEarnPoints} />

        <BooksLibrarySection />

        <DictionarySection
          bookmarkedIds={bookmarkedWords}
          onToggleBookmark={handleToggleBookmark}
        />
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

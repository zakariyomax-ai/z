import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Youtube, 
  Globe, 
  Sparkles, 
  Headphones, 
  Film, 
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface BookItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  year: string;
  googleQuery: string;
  youtubeQuery: string;
  scribdUrl?: string;
  youtubeEmbedUrl?: string;
}

const FEATURED_BOOKS: BookItem[] = [
  {
    id: 'b-mungli-kozlar',
    title: "Mungli Ko'zlar",
    author: "Xudoyberdi To'xtaboyev",
    genre: "Badiiy drama / Ijtimoiy roman",
    year: "1988",
    description: "Mol-dunyo ketidan quvib, oilaviy mehrni unutgan xonadon fojiasi, katta akasining ayanchli qismati va nochor qolgan ma'sum bolalar dardi.",
    googleQuery: "Mungli ko'zlar Xudoyberdi To'xtaboyev kitobi pdf o'qish",
    youtubeQuery: "Mungli ko'zlar audio kitob Xudoyberdi To'xtaboyev",
    scribdUrl: "https://www.scribd.com/document/841473929/xrpt-xavsnys382z53v35mmrptbxoppg0v75i7o3kdjcba364nxx20ehtf59vjev7bof968i9gl0he6a",
  },
  {
    id: 'b-turkiy-guliston',
    title: "Turkiy Guliston Yoxud Axloq",
    author: "Abdulla Avloniy",
    genre: "Axloqiy-falsafiy qo'llanma",
    year: "1913",
    description: "Insoniy fazilatlar, ilm-ma'rifat, tarbiya va millat kamoloti haqidagi mumtoz pandnoma asar.",
    googleQuery: "Turkiy Guliston yoxud axloq Abdulla Avloniy pdf kitob",
    youtubeQuery: "Turkiy Guliston yoxud axloq Abdulla Avloniy audio kitob",
  },
  {
    id: 'b-sariq-dev',
    title: "Sariq Devni Minib",
    author: "Xudoyberdi To'xtaboyev",
    genre: "Sarguzasht qissa",
    year: "1968",
    description: "Hoshimjonning qiziqarli sarguzashtlari, sehrli qalpoqcha va rostgo'ylik, mehnatsevarlik saboqlari.",
    googleQuery: "Sariq devni minib Xudoyberdi To'xtaboyev pdf kitob o'qish",
    youtubeQuery: "Sariq devni minib audio kitob to'liq",
  },
  {
    id: 'b-otkan-kunlar',
    title: "O'tkan Kunlar",
    author: "Abdulla Qodiriy",
    genre: "Tarixiy roman",
    year: "1925",
    description: "Otabek va Kumushbibining sof muhabbati, xonliklar davridagi ijtimoiy muhit va fojiali voqealar tasviri.",
    googleQuery: "O'tkan kunlar Abdulla Qodiriy pdf kitob o'qish",
    youtubeQuery: "O'tkan kunlar audio spektakl to'liq",
  },
  {
    id: 'b-shum-bola',
    title: "Shum Bola",
    author: "G'afur G'ulom",
    genre: "Qissa / Kinoroman",
    year: "1936",
    description: "Zamonaning sinovlariga uchragan o'tkir zehnli, sho'x bolakayning boshidan kechirgan kulgili va ibratli kechinmalari.",
    googleQuery: "Shum bola G'afur G'ulom pdf kitob o'qish",
    youtubeQuery: "Shum bola audio kitob yoki film",
  },
  {
    id: 'b-yulduzli-tunlar',
    title: "Yulduzli Tunlar",
    author: "Pirimqul Qodirov",
    genre: "Tarixiy roman",
    year: "1978",
    description: "Zahiriddin Muhammad Boburning murakkab hayot yo'li, vatan sog'inchi va buyuk saltanat qurilishi tarixi.",
    googleQuery: "Yulduzli tunlar Pirimqul Qodirov pdf kitob o'qish",
    youtubeQuery: "Yulduzli tunlar audio kitob Bobur",
  }
];

export const BooksLibrarySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("Mungli ko'zlar");

  const buildGoogleUrl = (query: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query.trim() + " kitobi pdf mutolaa")}`;
  };

  const buildGoogleBooksUrl = (query: string) => {
    return `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(query.trim())}`;
  };

  const buildYoutubeAudioUrl = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim() + " audio kitob tinglash")}`;
  };

  const buildYoutubeVideoUrl = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim() + " film video tahlil")}`;
  };

  const quickSearch = (title: string) => {
    sounds.playClick();
    setSearchQuery(title);
  };

  return (
    <section id="kitoblar" className="py-12 md:py-16 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Elektron Kutubxona & Media Markaz</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Kitoblar Qidiruvi, Google va YouTube Audio
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-2xl">
              Istalgan kitob nomini kiriting va bitta tugma orqali Google'dan to'liq matnini o'qing yoki YouTube'dan audio va video talqinlarini tinglang!
            </p>
          </div>
        </div>

        {/* Dynamic Search & Instant External Launchpad */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span>Kitob nomini kiriting (masalan: Mungli ko'zlar, Turkiy Guliston, Shum bola):</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kitob nomini yozing..."
                className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-base font-medium focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                >
                  Tozalash
                </button>
              )}
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-stone-500 text-[11px]">Ommabop qidiruvlar:</span>
              {["Mungli ko'zlar", "Turkiy Guliston", "Sariq devni minib", "O'tkan kunlar", "Shum bola"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => quickSearch(tag)}
                  className={`px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Launch Buttons for Current Search */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-xs text-stone-400">Tanlangan qidiruv:</div>
              <div className="text-base font-bold text-amber-400">"{searchQuery || "Mungli ko'zlar"}"</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {/* Google Search Link */}
              <a
                href={buildGoogleUrl(searchQuery || "Mungli ko'zlar")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Google'da Qidirish & O'qish</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>

              {/* YouTube Audio Link */}
              <a
                href={buildYoutubeAudioUrl(searchQuery || "Mungli ko'zlar")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Audio Tinglash</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              </a>

              {/* YouTube Video / Movie link */}
              <a
                href={buildYoutubeVideoUrl(searchQuery || "Mungli ko'zlar")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Video & Tahlil</span>
              </a>
            </div>
          </div>
        </div>

        {/* Curated Book Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-stone-100 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-amber-400" />
              <span>O'zbek Adabiyoti Durlari — To'liq Kitoblar & Audio</span>
            </h3>
            <span className="text-xs text-stone-500">Google va YouTube bilan bog'langan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_BOOKS.map((book) => {
              const isSelected = searchQuery.toLowerCase() === book.title.toLowerCase();

              return (
                <div
                  key={book.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-lg ring-1 ring-amber-500/30'
                      : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                        {book.genre} · {book.year}
                      </span>
                      {book.scribdUrl && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Scribd Mavjud
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {book.title}
                    </h4>
                    <div className="text-xs text-stone-400 font-medium">
                      Muallif: {book.author}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                      {book.description}
                    </p>
                  </div>

                  {/* Actions: Google, YouTube, Scribd */}
                  <div className="pt-3 border-t border-stone-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={buildGoogleUrl(book.googleQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        title="Google orqali matnni qidirish"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate">Google'da O'qish</span>
                      </a>

                      <a
                        href={buildYoutubeAudioUrl(book.youtubeQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        title="YouTube orqali audio eshitish"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="truncate">YouTube Audio</span>
                      </a>
                    </div>

                    {book.scribdUrl && (
                      <a
                        href={book.scribdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Scribd Orqali Asl Nusxani O'qish</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

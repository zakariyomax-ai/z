export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  letter: string;
  exampleInBook?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
  category: 'asar_mazmuni' | 'qahramonlar' | 'fojia_sababi' | 'lugat_hikmat';
}

export interface ProverbPair {
  id: string;
  firstPart: string;
  secondPart: string;
  meaning: string;
  theme: string;
}

export interface DramaticScene {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  description: string;
  bookExcerpt: string;
  moralLesson: string;
}

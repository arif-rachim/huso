// Core lesson types for HUSO prep platform

export type Subject = 'biology' | 'chemistry' | 'earth-science' | 'math';

export interface DiscoveryStory {
  title: string;
  content: string;
  emoji?: string;
}

export interface ConceptBox {
  title: string;
  explanation: string;
  analogy?: {
    type: string; // e.g., "city", "factory", "LEGO"
    description: string;
  };
  mindBlowingFacts?: string[];
  whyYouCare?: string;
}

export interface WorkedExample {
  scenario: string;
  problemSetup: string;
  steps: {
    step: number;
    description: string;
    reasoning: string;
  }[];
  solution: string;
  realWorldApplication?: string;
}

export interface PracticeProblem {
  id: string;
  question: string;
  hints?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  solution?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string; // A, B, C, D, E
    text: string;
  }[];
  correctAnswer: string; // A, B, C, D, or E
  explanation: string;
  storyExplanation?: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
  example?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  whyItMatters?: string;
}

export interface MemoryAid {
  technique: string; // e.g., "Mnemonic", "Acronym", "Rhyme"
  description: string;
  example?: string;
}

export interface QuickReference {
  title: string;
  content: string;
  category?: 'formula' | 'principle' | 'rule' | 'process';
}

export interface VisualAid {
  type: 'diagram' | 'chart' | 'illustration' | 'infographic';
  description: string;
  altText: string;
  imagePath?: string; // optional for future image support
}

export interface LessonConnection {
  type: 'previous' | 'next' | 'related';
  day: number;
  topic: string;
  reason?: string; // why this connection matters
}

export interface Lesson {
  day: number;
  subject: Subject;
  title: string;
  emoji: string;
  learningGoal: string;
  estimatedTime: number; // in minutes

  objectives: string[]; // exactly 3 objectives

  // Core Content
  discoveryStory: DiscoveryStory;
  keyTerms: KeyTerm[]; // NEW: Important vocabulary
  concepts: ConceptBox[];

  // Examples & Practice
  workedExamples: WorkedExample[];
  practiceProblems: PracticeProblem[];

  // Learning Aids (Optional)
  memoryAids?: MemoryAid[]; // NEW: Mnemonics, tricks
  commonMistakes?: CommonMistake[]; // NEW: What to avoid
  quickReference?: QuickReference[]; // NEW: Formulas, key principles
  visualAids?: VisualAid[]; // NEW: Diagrams, charts

  // Assessment & Review
  quiz: QuizQuestion[]; // exactly 5 questions
  summary: string[]; // NEW: Key takeaways (3-5 points)
  selfAssessment: string[];

  // Connections (Optional)
  connections?: LessonConnection[]; // NEW: Link to other lessons
}

export interface CurriculumPlan {
  totalDays: 40;
  subjects: Subject[];
  schedule: {
    day: number;
    subject: Subject;
    topic: string;
    difficulty: 'foundation' | 'intermediate' | 'advanced' | 'competition';
  }[];
}

export interface StudentProgress {
  completedDays: number[];
  quizScores: {
    day: number;
    score: number;
    totalQuestions: number;
    timeSpent: number; // in seconds
  }[];
  lastAccessedDay: number;
  streak: number;
  subjectProgress: {
    [key in Subject]?: {
      averageScore: number;
      daysCompleted: number;
    };
  };
}

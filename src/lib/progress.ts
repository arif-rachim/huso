import type { StudentProgress } from '../types/lesson.types.js';

export class ProgressTracker {
  private static readonly STORAGE_KEY = 'husoProgress';

  static getProgress(): StudentProgress {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    // Initialize default progress
    return {
      completedDays: [],
      quizScores: [],
      lastAccessedDay: 1,
      streak: 0,
      subjectProgress: {}
    };
  }

  static saveProgress(progress: StudentProgress): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  static markDayComplete(day: number): void {
    const progress = this.getProgress();

    if (!progress.completedDays.includes(day)) {
      progress.completedDays.push(day);
      progress.completedDays.sort((a, b) => a - b);
    }

    progress.lastAccessedDay = day;
    this.saveProgress(progress);
  }

  static saveQuizScore(day: number, score: number, totalQuestions: number, timeSpent: number): void {
    const progress = this.getProgress();

    const existingIndex = progress.quizScores.findIndex(s => s.day === day);
    const scoreData = {
      day,
      score,
      totalQuestions,
      timeSpent
    };

    if (existingIndex >= 0) {
      progress.quizScores[existingIndex] = scoreData;
    } else {
      progress.quizScores.push(scoreData);
    }

    this.saveProgress(progress);
  }

  static getAverageScore(): number {
    const progress = this.getProgress();
    if (progress.quizScores.length === 0) return 0;

    const totalPercentage = progress.quizScores.reduce((sum, score) => {
      return sum + (score.score / score.totalQuestions) * 100;
    }, 0);

    return Math.round(totalPercentage / progress.quizScores.length);
  }

  static getSubjectStats(subject: string): { averageScore: number; daysCompleted: number } {
    const progress = this.getProgress();
    const subjectScores = progress.quizScores.filter(score => {
      // Map day to subject based on schedule
      const daySubject = this.getDaySubject(score.day);
      return daySubject === subject;
    });

    if (subjectScores.length === 0) {
      return { averageScore: 0, daysCompleted: 0 };
    }

    const totalPercentage = subjectScores.reduce((sum, score) => {
      return sum + (score.score / score.totalQuestions) * 100;
    }, 0);

    return {
      averageScore: Math.round(totalPercentage / subjectScores.length),
      daysCompleted: subjectScores.length
    };
  }

  static updateStreak(): void {
    const progress = this.getProgress();
    const today = new Date().toDateString();
    const lastAccessed = localStorage.getItem('lastAccessDate');

    if (lastAccessed === today) {
      // Already accessed today, no change
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastAccessed === yesterday.toDateString()) {
      // Consecutive day
      progress.streak += 1;
    } else if (lastAccessed !== today) {
      // Streak broken
      progress.streak = 1;
    }

    localStorage.setItem('lastAccessDate', today);
    this.saveProgress(progress);
  }

  static getDaySubject(day: number): string {
    // 4-day rotation: Biology, Chemistry, Earth Science, Math
    const rotation = ['biology', 'chemistry', 'earth-science', 'math'];
    return rotation[(day - 1) % 4];
  }

  static exportProgress(): string {
    const progress = this.getProgress();
    return JSON.stringify(progress, null, 2);
  }

  static importProgress(jsonData: string): boolean {
    try {
      const progress = JSON.parse(jsonData) as StudentProgress;
      this.saveProgress(progress);
      return true;
    } catch (error) {
      console.error('Invalid progress data:', error);
      return false;
    }
  }

  static resetProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem('lastAccessDate');
  }
}

import { LessonRenderer } from './lib/renderer.js';
import type { Lesson } from './types/lesson.types.js';

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const app = new HusoApp();
  await app.init();
});

class HusoApp {
  private renderer: LessonRenderer;
  private currentDay: number = 1;

  constructor() {
    this.renderer = new LessonRenderer('lesson-container');
  }

  async init(): Promise<void> {
    // Get day from URL or default to 1
    const urlParams = new URLSearchParams(window.location.search);
    this.currentDay = parseInt(urlParams.get('day') || '1', 10);

    // Load and render lesson
    await this.loadLesson(this.currentDay);

    // Setup navigation
    this.setupNavigation();
  }

  private async loadLesson(day: number): Promise<void> {
    try {
      // Dynamically import the lesson module
      const lessonModule = await import(`./lessons/day-${String(day).padStart(2, '0')}.js`);
      const lesson: Lesson = lessonModule.default;
      this.renderer.renderLesson(lesson);

      // Update page title
      document.title = `Day ${day}: ${lesson.title} - HUSO Prep`;

      // Update navigation state
      this.updateNavigation(day);
    } catch (error) {
      console.error('Error loading lesson:', error);
      this.showError(`Could not load Day ${day}. Please check if the lesson exists.`);
    }
  }

  private setupNavigation(): void {
    const prevBtn = document.getElementById('prev-day');
    const nextBtn = document.getElementById('next-day');
    const homeBtn = document.getElementById('home-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentDay > 1) {
          this.navigateToDay(this.currentDay - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentDay < 40) {
          this.navigateToDay(this.currentDay + 1);
        }
      });
    }

    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  }

  private navigateToDay(day: number): void {
    window.location.href = `?day=${day}`;
  }

  private updateNavigation(day: number): void {
    const prevBtn = document.getElementById('prev-day') as HTMLButtonElement;
    const nextBtn = document.getElementById('next-day') as HTMLButtonElement;

    if (prevBtn) {
      prevBtn.disabled = day <= 1;
    }

    if (nextBtn) {
      nextBtn.disabled = day >= 40;
    }

    // Update day indicator
    const dayIndicator = document.getElementById('day-indicator');
    if (dayIndicator) {
      dayIndicator.textContent = `Day ${day} of 40`;
    }
  }

  private showError(message: string): void {
    const container = document.getElementById('lesson-container');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <h2>⚠️ Error</h2>
          <p>${message}</p>
          <button onclick="window.location.href='index.html'">Go to Home</button>
        </div>
      `;
    }
  }
}

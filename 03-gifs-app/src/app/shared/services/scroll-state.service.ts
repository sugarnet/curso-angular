import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private trendingScrollState = signal(0);

  setTrendingScrollState(value: number): void {
    this.trendingScrollState.set(value);
  }
  getTrendingScrollState(): number {
    return this.trendingScrollState();
  }
}

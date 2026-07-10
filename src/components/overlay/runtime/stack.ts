import type { OverlayEntry } from './types.js';

export class OverlayStack {
  private readonly byElement = new Map<HTMLElement, OverlayEntry>();
  private readonly ordered: OverlayEntry[] = [];

  get entries(): readonly OverlayEntry[] {
    return this.ordered;
  }

  add(entry: OverlayEntry) {
    if (this.byElement.has(entry.element)) {
      return false;
    }

    this.byElement.set(entry.element, entry);
    this.ordered.push(entry);
    return true;
  }

  at(index: number) {
    return this.ordered.at(index) ?? null;
  }

  get(element: HTMLElement) {
    return this.byElement.get(element) ?? null;
  }

  remove(entry: OverlayEntry) {
    if (this.byElement.get(entry.element) !== entry) {
      return false;
    }

    this.byElement.delete(entry.element);
    const index = this.ordered.indexOf(entry);
    this.ordered.splice(index, 1);
    return true;
  }

  snapshot() {
    return this.ordered.slice();
  }

  clear() {
    this.byElement.clear();
    this.ordered.length = 0;
  }
}

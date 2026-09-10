import '@testing-library/jest-dom/vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock scrollTo
window.scrollTo = (() => {}) as any;

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly scrollMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Complete Proxy-based mock for HTMLCanvasElement 2D context in JSDOM
const baseCanvasContext: Record<string, any> = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  font: '',
  textAlign: 'center',
  textBaseline: 'middle',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  setLineDash: () => {},
  getLineDash: () => [],
  measureText: () => ({ width: 0 }),
  getImageData: () => ({ data: [] }),
  putImageData: () => {},
  createImageData: () => [],
  createLinearGradient: () => ({ addColorStop: () => {} }),
  createRadialGradient: () => ({ addColorStop: () => {} }),
};

const mockCanvasContext = new Proxy(baseCanvasContext, {
  get: (target, prop: string) => {
    if (prop in target) return target[prop];
    return () => {};
  },
});

HTMLCanvasElement.prototype.getContext = (() => mockCanvasContext) as any;

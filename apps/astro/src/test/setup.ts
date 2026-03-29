import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Astro globals
globalThis.Astro = {
  props: {},
  params: {},
  url: new URL('http://localhost'),
  site: new URL('http://localhost'),
  generator: 'Astro',
  client: 'load',
  request: new Request('http://localhost'),
};

// Mock Cloudflare environment
globalThis.WRANGLER_ENV = 'development';

// Mock fetch if needed
global.fetch = vi.fn();

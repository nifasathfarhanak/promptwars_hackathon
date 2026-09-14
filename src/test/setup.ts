import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas-confetti for headless browser test environments
vi.mock('canvas-confetti', () => {
  return {
    default: vi.fn(),
  };
});

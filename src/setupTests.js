// src/setupTests.js
import '@testing-library/jest-dom';

// Smooth over requestAnimationFrame in framer-motion
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
}

// Mock IntersectionObserver used sometimes by animations
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!global.IntersectionObserver) {
  global.IntersectionObserver = MockIntersectionObserver;
}
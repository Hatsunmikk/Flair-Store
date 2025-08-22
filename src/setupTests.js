import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder / TextDecoder
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// Polyfill IntersectionObserver (used by Framer Motion + animations)
if (!global.IntersectionObserver) {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Polyfill fetch if missing
if (!global.fetch) {
  global.fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
}

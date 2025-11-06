import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    silent: false,
    reporter: 'default',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'build/', '**/*.config.ts'],
    },
    env: {
      VITE_FINNHUB_API_KEY: 'fake-api-key',
    },
  },
});

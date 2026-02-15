import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    root: '.',
    environment: 'jsdom',
    include: [
      'core/**/*.test.{js,jsx}',
      'services/**/*.test.{js,jsx}',
      'src/**/*.test.{js,jsx}',
    ],
    setupFiles: ['./vitest.setup.js'],
  }
});

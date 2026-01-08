import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import { sync } from 'glob';

export default defineConfig({
  build: {
    emptyOutDir: false, // папка dist не блиматиме при кожному оновленні
    minify: false, // вимикає стиснення в один рядок
    rollupOptions: {
      input: sync('./*.html'), // Знаходить усі HTML файли в корені проєкту для збірки
      output: {
        assetFileNames: 'assets/[name][extname]', // прибирає хеш з імен CSS файлів
        chunkFileNames: 'assets/[name].js', // прибирає хеш з імен JS файлів
        entryFileNames: 'assets/[name].js', // прибирає хеш з головного JS файлу
      },
    },
  },
  plugins: [injectHTML()], // Підключаємо плагін для вставки частин HTML (partials)
});

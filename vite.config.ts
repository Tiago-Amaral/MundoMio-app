import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // <-- adiciona essa linha
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

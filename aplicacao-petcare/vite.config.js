import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  base: '/', // Substitua pelo nome do repositório no GitHub
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});



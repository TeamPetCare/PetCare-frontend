import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  base: '/aplicacao-petcare/', // Substitua pelo nome do repositório no GitHub
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});



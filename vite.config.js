import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Caminho do site no GitHub Pages: https://lelokz.github.io/Desafio-02-Github/
  base: '/Desafio-02-Github/',
})

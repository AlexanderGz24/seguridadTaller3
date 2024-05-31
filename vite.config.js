import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"https://AlexanderGz24.github.io/seguridadTaller3",
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'./src')
    }
  },
})

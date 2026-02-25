import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Use VITE_BASE_PATH for deployment: "/" for Railway (root), "/Pokemon-Collector-Front-End/" for GitHub Pages
export default defineConfig({
    base: '/',
    plugins: [react()],
});

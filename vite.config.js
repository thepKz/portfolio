import { defineConfig } from 'vite';

export default defineConfig({
  // Đường base deploy lên GitHub Pages
   base: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/'
});  

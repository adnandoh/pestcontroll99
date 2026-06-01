import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxy = env.VITE_CRM_API_URL || 'http://localhost:8000';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3001,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiProxy,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 3001,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://m1.apifoxmock.com/m1/6120914-5812526-default',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [react()],
});

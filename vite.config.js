import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [mkcert(), react()],
    server: {
        https: true,
        proxy: {
            '/mqtt': {
                target: 'ws://5.189.193.132:9001',
                changeOrigin: true,
                secure: false,
                ws: true
            },
        }
    }
})

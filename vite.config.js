import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '192.168.3.15',
        port: 5000
    },
    base: '/cars-indicators'
})

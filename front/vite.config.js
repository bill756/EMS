import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        //element plus
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [
                //配置ep使用sass样式
                ElementPlusResolver({importStyle: "sass"})
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/css/index.scss" as *;`,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})

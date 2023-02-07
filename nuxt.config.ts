// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        '@vueuse/nuxt',
        'vite-plugin-vue-type-imports/nuxt',
    ],
    typescript: {
        shim: false,
        tsConfig: {
            include: ['~~/types.shim.d.ts'],
        },
    },
    runtimeConfig: {
        STABLE: false,
    },
    routeRules: {
        '/': { redirect: '/info' },
        // Main web page
        '/info/**': { static: true },
        // About
        '/about/**': { static: true },
        // Docs
        '/docs/**': { static: true },
        // User authentication
        '/user/**': { ssr: false },
        // Admin dashboard
        '/admin/**': { ssr: false },
        // App
        '/app/**': { ssr: false },
        // Backend
        '/api/**': {},
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        'github-markdown-css/github-markdown-light.css',
        '~/assets/css/fontfaces.css',
        '~/assets/sass/button.sass',
        '~/assets/sass/ripple.sass',
    ],
    tailwindcss: {
        configPath: './tailwind.config.cjs',
    },
    app: {
        head: {
            meta: [
                {
                    charset: 'utf-16',
                },
            ],
            title: 'Nuxt 3 Template',
            noscript: [{ children: 'Javascript is required' }],
        },
    },
});

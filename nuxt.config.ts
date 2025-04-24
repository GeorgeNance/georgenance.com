import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  site: {
    url: 'https://georgenance.com',
    name: 'George Nance',
    description: 'George Nance is a software engineer, writer, and creator. He writes about software development, productivity, and personal growth.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },

  routeRules: {
    '/delete-untracked-files-git': { redirect: '/articles/delete-untracked-files-git' },
    '/being-productive-programmer-adhd': { redirect: '/articles/being-productive-programmer-adhd', },
    '/latest': { redirect: '/articles' },
    '/contact': { redirect: '/' },
    '/write-more-css': { redirect: '/articles/write-more-css' },
    '/dont-use-frontmatter-markdown-files-gatsby': { redirect: '/articles/dont-use-frontmatter-markdown-files-gatsby' },
  },

  css: ['~/assets/css/main.css'],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    classSuffix: '-mode',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["nuxt-icon", "@nuxtjs/google-fonts", "@nuxtjs/fontaine", "@nuxt/image", '@nuxtjs/seo', '@nuxtjs/color-mode', "@nuxt/content", // "@nuxthq/studio",
    "@vueuse/nuxt", '@vueuse/motion/nuxt', 'nuxt-gtag'],



  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: 'theme-color', content: '#1e293b', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
      htmlAttrs: {
        lang: "en",
        class: "h-full"
      },

      bodyAttrs: {
        class: "antialiased min-h-screen h-full",
      },
    },
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'georgenance.com',
        owner: 'georgenance',
        url: 'https://github.com/georgenance/georgenance.com'
      }
    },
    build: {
      markdown: {
        // toc: {
        //   depth: 3,
        //   searchDepth: 3,
        // },
        remarkPlugins: {
          'remark-reading-time': {}
        },

        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'min-light',
            dark: 'nord',
            // Theme used if `html.sepia`
            sepia: "monokai",
          },
        },
      },
    },

  },

  image: {
    format: ['webp']
  },

  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
      Merriweather: [400, 700],
      'JetBrains Mono': [400, 500, 600, 700, 800, 900],
    },
  },

  compatibilityDate: '2025-02-01',
});
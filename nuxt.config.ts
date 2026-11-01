import { fileURLToPath } from 'node:url';

const processWarnings = process as typeof process & { noDeprecation?: boolean };
const previousNoDeprecation = processWarnings.noDeprecation;

// Tailwind's Node integration still calls module.register() under Node 26 while importing.
processWarnings.noDeprecation = true;
const { default: tailwindcss } = await import('@tailwindcss/vite');
processWarnings.noDeprecation = previousNoDeprecation;

export default defineNuxtConfig({
  site: {
    url: 'https://georgenance.com',
    name: 'George Nance',
    description: 'George Nance is a software engineer, writer, and creator. He writes about software development, productivity, and personal growth.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
    // Cloudflare Pages 308-redirects /about to /about/, so keep canonical URLs and
    // internal links in the same shape to avoid a redirect on every entry.
    trailingSlash: true,
  },

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
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

  devServer: {
    port: 3080,
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

  // Resolve article-local media before Content caches parsed documents.
  modules: ["@nuxt/icon", "@nuxtjs/google-fonts", "@nuxtjs/fontaine", "@nuxt/image", '@nuxtjs/seo', '@nuxtjs/color-mode', 'nuxt-content-assets', "@nuxt/content","nuxt-component-meta", // "@nuxthq/studio",
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

  // Inject intrinsic width/height onto content images so galleries can lay out
  // aspect-correctly on the server without layout shift.
  contentAssets: {
    imageSize: 'attrs',
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
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
          'remark-reading-time': {},
          [fileURLToPath(new URL('./scripts/remark-em-dash-divider.mjs', import.meta.url))]: {},
        },

        highlight: {
          theme: {
            default: 'ayu-mirage',
            dark: 'ayu-mirage',
            sepia: 'ayu-mirage',
          },
        },
      },
    },

  },

  image: {
    format: ['webp']
  },

  // Cloudflare Pages serves the prerendered site as static files.
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  googleFonts: {
    display: "swap",
    families: {
      Outfit: [300, 400, 500, 600, 700],
      Newsreader: {
        wght: [400, 500, 600, 700],
        ital: [400, 500, 600, 700],
      },
      Merriweather: [400, 700],
      'JetBrains Mono': [400, 500, 600, 700, 800, 900],
    },
  },

  compatibilityDate: '2025-02-01',
});

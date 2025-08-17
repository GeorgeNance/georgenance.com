/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'media',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Substack-inspired colors
        text: {
          primary: '#000000',     // Pure black for headlines
          secondary: '#333333',   // Dark gray for body text
          tertiary: '#666666',    // Medium gray for metadata
          muted: '#999999',       // Light gray for subtle text
        },
        border: {
          light: '#e6e6e6',       // Very light gray borders
          medium: '#cccccc',      // Medium borders
        },
        // Keep a single accent for links only
        accent: '#000000',        // Black for focus, pure editorial
      },
      maxWidth: {
        'reading': '680px',       // Substack reading width
        'article': '680px',       // Article content width
      },
      fontSize: {
        // Substack-inspired typography scale
        'article-xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'article-lg': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'article-md': ['24px', { lineHeight: '1.4' }],
        'body-lg': ['20px', { lineHeight: '1.7' }],
        'body': ['18px', { lineHeight: '1.7' }],
        'meta': ['15px', { lineHeight: '1.5' }],
      },
      spacing: {
        'article': '60px',        // Space between articles
        'section': '80px',        // Space between sections
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '680px',
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#333333',
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            h1: {
              fontSize: '36px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              color: '#000000',
              fontWeight: '700',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '48px',
              marginBottom: '24px',
            },
            h2: {
              fontSize: '30px',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              color: '#000000',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '40px',
              marginBottom: '16px',
            },
            h3: {
              fontSize: '24px',
              lineHeight: '1.4',
              color: '#000000',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '32px',
              marginBottom: '12px',
            },
            h4: {
              fontSize: '20px',
              lineHeight: '1.4',
              color: '#000000',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '24px',
              marginBottom: '8px',
            },
            h5: {
              fontSize: '18px',
              lineHeight: '1.4',
              color: '#000000',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '24px',
              marginBottom: '8px',
            },
            h6: {
              fontSize: '16px',
              lineHeight: '1.4',
              color: '#000000',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              marginTop: '24px',
              marginBottom: '8px',
            },
            p: {
              marginBottom: '24px',
              color: '#333333',
              fontSize: '18px',
              lineHeight: '1.7',
            },
            a: {
              color: '#000000',
              textDecoration: 'underline',
              fontWeight: 'inherit',
              '&:hover': {
                opacity: '0.8',
              },
            },
            blockquote: {
              borderLeftColor: '#e6e6e6',
              borderLeftWidth: '4px',
              paddingLeft: '24px',
              fontStyle: 'italic',
              color: '#666666',
              fontSize: '18px',
              lineHeight: '1.7',
            },
            ul: {
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#333333',
            },
            ol: {
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#333333',
            },
            li: {
              marginBottom: '8px',
            },
            code: {
              color: '#000000',
              backgroundColor: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '16px',
              fontFamily: 'JetBrains Mono, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              fontSize: '15px',
              lineHeight: '1.6',
              fontFamily: 'JetBrains Mono, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
            },
          },
        },
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont", 
        '"Segoe UI"',
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        '"Open Sans"',
        '"Helvetica Neue"',
        "sans-serif",
      ],
      serif: [
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
      mono: [
        "JetBrains Mono",
        '"SF Mono"',
        "Monaco",
        "Inconsolata",
        '"Roboto Mono"',
        "monospace",
      ],
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
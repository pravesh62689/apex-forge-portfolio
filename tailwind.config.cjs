/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: 'var(--bg-color)',
          900: 'var(--card-bg)',
          800: 'var(--card-bg-hover)',
          border: 'var(--border-color)',
        },
        brand: {
          primary: 'var(--primary-accent)',
          primaryGlow: 'var(--primary-glow)',
          accent: 'var(--secondary-accent)',
          accentGlow: 'var(--accent-glow)',
        },
        themeText: 'var(--text-color)',
        themeTextMuted: 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--display-font)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.12), 0 1px 4px -1px rgba(0, 0, 0, 0.07)',
        'premium-md': '0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 12px 32px -4px rgba(0, 0, 0, 0.24), 0 4px 12px -2px rgba(0, 0, 0, 0.12)',
        'premium-glow': '0 0 40px -10px var(--primary-glow)',
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
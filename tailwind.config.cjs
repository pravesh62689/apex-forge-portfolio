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
    },
  },
  plugins: [],
}

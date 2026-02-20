import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0A',
        warm: '#F5F0EB',
        accent: '#E85D26',
        teal: '#2DD4A8',
        gold: '#C4A265'
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-clash)', 'ui-serif', 'system-ui'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}

export default config

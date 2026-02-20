import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0A',
        warm: '#F5F0EB',
        accent: '#E85D26',
        teal: '#2DD4A8',
        gold: '#C4A265'
      }
    }
  },
  plugins: []
}

export default config

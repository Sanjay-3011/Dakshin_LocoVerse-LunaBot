/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'isro-blue': '#004C97',
        'isro-orange': '#F36C21',
        'bg-primary': '#F5F6FA',
        'text-primary': '#2D2D2D',
        'card-bg': '#FFFFFF',
        'border-light': '#E1E5E9',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444'
      },
      fontFamily: {
        'sans': ['Poppins', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'glow-blue': '0 0 20px rgba(0, 76, 151, 0.3)',
        'glow-orange': '0 0 20px rgba(243, 108, 33, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

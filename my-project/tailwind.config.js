/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Specify where Tailwind should look for class names
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-360': '0 0 10px 1px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['quicksand', 'sans-serif'],  // Setting Quicksand as the default sans font
      },
      colors: {
        darkNavy2: '#061022',
        darkNavy: '#0B1121',
        lightNavy:"#0a0f1e",
        navy2:"#0B1122", // Custom dark background color
        xoraBlue: '#1F82E3', // Xora logo blue color
        xoraTeal: '#30D1C6', // Secondary Xora teal color
        accentYellow: '#DAF700', // Accent yellow for highlighted text
        white: '#FFFFFF', // Standard white color
        gold: '#FFD700'
      },
      animation: {
        bounce: 'bounce 1s infinite',
        bounce200: 'bounce 1s infinite 0.1s',
        bounce400: 'bounce 1s infinite 0.2s',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [], // No additional plugins at the moment
}

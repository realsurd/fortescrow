/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        avenir: ['Avenir', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #006877, #39693C)',
        'gradient-background': 'linear-gradient(to bottom, #CCE0FF,#E5EFFF)',
        'diagonal-gradient': 'linear-gradient(to right,  #808080, #F7FAFF)',
      },
      boxShadow: {
        'custom-shadow': '0 4px 6px rgba(0, 0, 0, 0.10)',
      },
      borderColor: {
        'custom-orange': '#FF6633',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

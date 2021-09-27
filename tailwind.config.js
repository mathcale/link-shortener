module.exports = {
  purge: {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'bg-green-100',
      'bg-green-200',
      'bg-red-100',
      'bg-red-200',
      'border-green-300',
      'border-green-500',
      'border-red-300',
      'border-red-500',
      'text-green-500',
      'text-green-600',
      'text-green-800',
      'text-red-500',
      'text-red-600',
      'text-red-800',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

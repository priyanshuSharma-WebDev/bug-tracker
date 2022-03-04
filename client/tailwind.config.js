module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
     screens: {
      'tiny': '260px',
      // => @media (min-width: 260px) { ... }

      'normal': '360px',
      // => @media (min-width: 360px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mainBackgroundDarkColor: "#18171F",
      secondaryBackgroundDarkColor: "#1D1C23",
      mainAccentColor: "#FA58B6",
      mainButtonColor: "#F4F4F4",
      mainTextColor: "#F1F0F5",
      secondaryTextColor: "#6E6E79",
      borderColor: "#2D2B35",
      accentDarkBg: "#3A3940",
      success: "#4BCA81",
      danger: "#FF6A6A",
      secondaryDanger: "#FFD8D8"
    },
    extend: {},
  },
  plugins: [],
}

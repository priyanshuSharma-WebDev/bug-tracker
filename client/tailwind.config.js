module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      '20rem': '20rem',
      'charWtiny': '80px',
      'charWnormal': '120px',
      '42rem': '42rem',
      '70rem': '70rem'
    },
    minWidth: {
      '13rem': '13rem',
    },
    minHeight: {
      '20rem': '20rem',
      '30rem': '30rem'
    },
    fontSize: {
      'super-tiny': '.6rem',
      'tiny': '.8rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.3rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '4.6rem',
      '8xl': '6rem',
      '9xl': '8rem',
      'sxxl': '12rem',
      'fulid': '7vw'
    },
    screens: {
      'tiny': '260px',
      // => @media (min-width: 260px) { ... }

      'normal': '360px',
      // => @media (min-width: 360px) { ... }

      'semiNormal': '420px',
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
      secondaryDanger: "#FFD8D8",
      black: "#000"
    },
    extend: {
      fontFamily: {
        bodyText: ['ProximaNova-Bold', 'sans-serif'],
        primaryHeading: ['ProximaNova-Black', 'sans-serif'],
        RegularFont: ['ProximaNova-Regular', 'sans-serif'],
     },
      height: {
        '26rem': '26rem',
        '38rem': '38rem',
        '46rem': '46rem',
        '23rem': '23rem'
      }
    },
  },
  plugins: [],
}

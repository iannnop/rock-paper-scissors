module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'dark-text':'#3B4262',
        'score-text':'hsl(230, 64%, 46%)',
        'score-count':'#565468',
        'header-outline':'hsl(217, 16%, 45%)',
        'paper':'#4664F4',
        'dark-paper':'#2A45C2',
        'scissors':'#EB9F0E',
        'dark-scissors':'#C76C1B',
        'rock':'#DB2E4D',
        'dark-rock':'#9D1634',
      },
      backgroundImage: {
        'bg-radial': 'radial-gradient(134.34% 134.34% at 50% 0%, #1F3757 0%, #131537 100%)',
        'token':'linear-gradient(0deg, #F3F3F3 0%, #DADADA 98.34%)',
      }
    },
  },
  plugins: [],
}
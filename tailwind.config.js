export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: "#000000",
          surface: "#0A1128",
          card: "#001F3F",
          accent: "#560e0e",
          gold: "#F5C518",
          text: "#EBEBEB",
          muted: "#8A8A9A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
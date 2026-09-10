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
       keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.8s ease-out both",
      },
    },
  },
};
  
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ee2b8c",
          light: "rgba(238, 43, 140, 0.1)",
          muted: "rgba(238, 43, 140, 0.6)",
          dark: "#c9186f",
        },
        surface: {
          DEFAULT: "#fdf8fa",
          card: "#ffffff",
          soft: "#fff0f6",
          fertile: "#ffe3ec",
        },
        content: {
          DEFAULT: "#181114",
          secondary: "#8c5f75",
          muted: "rgba(24, 17, 20, 0.5)",
          inverse: "#ffffff",
        },
        line: {
          DEFAULT: "#fce7f3",
          light: "rgba(238, 43, 140, 0.1)",
        },
        mood: {
          happy: "#fbbf24",
          calm: "#34d399",
          anxious: "#a78bfa",
          tired: "#94a3b8",
          sensitive: "#f472b6",
        },
        symptom: {
          cramps: "#ee2b8c",
          headache: "#8b5cf6",
          bloating: "#06b6d4",
          acne: "#f59e0b",
          backache: "#ef4444",
          spotting: "#ec4899",
        },
        accent: {
          blue: "#3b82f6",
          indigo: "#6366f1",
          yellow: "#fbbf24",
          green: "#22c55e",
        },
      },
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};

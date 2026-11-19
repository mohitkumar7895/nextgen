/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0647A5",
          navy: "#082C66",
          bright: "#079BEF",
          orange: "#FF6500",
          yellow: "#FFB900",
          charcoal: "#252B35",
          light: "#F4F8FC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "'Cinzel'", "'Playfair Display'", "Georgia", "serif"],
        serif: ["'Cinzel'", "'Playfair Display'", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "nexgen-gradient": "linear-gradient(135deg, #082C66 0%, #0647A5 50%, #079BEF 100%)",
        "nexgen-hero": "linear-gradient(145deg, #051A3E 0%, #082C66 45%, #0647A5 85%, #079BEF 100%)",
        "nexgen-orange": "linear-gradient(135deg, #FF6500 0%, #FFB900 100%)",
      },
      boxShadow: {
        "premium": "0 20px 40px -15px rgba(6, 71, 165, 0.15)",
        "premium-hover": "0 30px 60px -12px rgba(6, 71, 165, 0.25)",
        "orange-glow": "0 10px 30px -5px rgba(255, 101, 0, 0.35)",
        "blue-glow": "0 10px 30px -5px rgba(7, 155, 239, 0.35)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 12s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(-2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

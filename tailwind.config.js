/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: { emerald: "#00C86F", sapphire: "#0078FF", charcoal: "#001E2F" },
      boxShadow: { glow: "0 0 30px rgba(0,120,255,.45)" }
    }
  },
  plugins: []
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#154016",      // Verde oscuro
        secondary: "#3B3F49",         // Gris oscuro
        accent: "#E6E9ED",    // Azul muy claro
        warning: "#F38675",        // Coral
        neutral: "#F3C6B9",        // Rosa claro
        fondo: "#ECECEC",   // Blanco cremoso
        texto: "#30343D",   // Gris azulado oscuro
        icon: "#59775A",
        "men-icon": "#C4C5C8",
        subText: "#6E7177"
      },
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],

  daisyui: {
    styled: true,
    themes: ["light"]
  }
}


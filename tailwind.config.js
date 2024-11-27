// tailwind.config.js
module.exports = {
  content: [
    "./index.html",  // Asegúrate de incluir los archivos HTML de tu proyecto
    "./src/**/*.{js,jsx,ts,tsx}",  // Asegúrate de que todos los archivos de React estén en la ruta
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),  // Asegúrate de que DaisyUI esté siendo importado correctamente
  ],
  daisyui: {
    themes: ['light', 'dark', 'corporate', 'luxury', 'cupcake'],  // Los temas disponibles
  },
}

import tailwindcss from '@tailwindcss/vite'

export default {
  integrations: [],
  output: 'static',
  vite: { plugins: [tailwindcss()] }
}

import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [image(), react(), tailwind()],
  output: 'server',
  adapter: vercel(),
})

'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import {pageStructure, singletonPlugin} from '@/sanity/plugins/settings'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import app from '@/sanity/schemas/documents/app'
import work from '@/sanity/schemas/documents/work'
import about from '@/sanity/schemas/singletons/about'
import b2b from '@/sanity/schemas/singletons/b2b'
import b2c from '@/sanity/schemas/singletons/b2c'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import works from '@/sanity/schemas/singletons/works'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      b2b,
      b2c,
      about,
      works,
      settings,
      // Documents
      app,
      work,
      // Objects
      duration,
      milestone,
      timeline,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, b2b, b2c, about, works, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}},
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, b2b.name, b2c.name, about.name, works.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

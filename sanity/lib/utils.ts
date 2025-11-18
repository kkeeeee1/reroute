import {dataset, projectId} from '@/sanity/lib/api'
import createImageUrlBuilder from '@sanity/image-url'
import type {Image} from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(documentType?: string): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'b2b':
      return '/b2b'
    case 'b2c':
      return '/b2c'
    case 'about':
      return '/about'
    case 'works':
      return '/works'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

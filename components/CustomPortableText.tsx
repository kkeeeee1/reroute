import {TimelineSection} from '@/components/TimelineSection'
import {urlForImage} from '@/sanity/lib/utils'
import type {PathSegment} from '@sanity/client/csm'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import Image from 'next/image'
import type {Image as SanityImage} from 'sanity'

export function CustomPortableText({
  id,
  type,
  path,
  paragraphClasses,
  value,
}: {
  id: string | null
  type: string | null
  path: PathSegment[]
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => {
        return <p className={paragraphClasses}>{children}</p>
      },
      h1: ({children}) => {
        return <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
      },
      h2: ({children}) => {
        return <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
      },
      h3: ({children}) => {
        return <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>
      },
      blockquote: ({children}) => {
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-600">
            {children}
          </blockquote>
        )
      },
    },
    marks: {
      strong: ({children}) => {
        return <strong className="font-bold">{children}</strong>
      },
      em: ({children}) => {
        return <em className="italic">{children}</em>
      },
      underline: ({children}) => {
        return <u className="underline">{children}</u>
      },
      'strike-through': ({children}) => {
        return <s className="line-through">{children}</s>
      },
      code: ({children}) => {
        return (
          <code className="bg-gray-100 text-red-600 px-2 py-1 rounded font-mono text-sm">
            {children}
          </code>
        )
      },
      link: ({children, value}) => {
        return (
          <a
            className="underline transition hover:opacity-50 text-blue-600"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({children}) => {
        return <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>
      },
      number: ({children}) => {
        return <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>
      },
    },
    listItem: {
      bullet: ({children}) => {
        return <li className="ml-0">{children}</li>
      },
      number: ({children}) => {
        return <li className="ml-0">{children}</li>
      },
    },
    types: {
      image: ({value}: {value: SanityImage & {alt?: string; caption?: string}}) => {
        const imageUrl = value && urlForImage(value)?.auto('format').url()

        // Get image dimensions from asset metadata
        const width = value?.asset?.metadata?.dimensions?.width || 1200
        const height = value?.asset?.metadata?.dimensions?.height || 800
        const aspectRatio = width / height

        return (
          <div className="my-6 space-y-2">
            <div
              className="relative w-full overflow-hidden rounded-lg bg-gray-100"
              style={{aspectRatio: `${aspectRatio}`}}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={value?.alt || 'Image'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                />
              )}
            </div>
            {value?.caption && (
              <div className="text-center font-sans text-sm text-gray-600">{value.caption}</div>
            )}
          </div>
        )
      },
      timeline: ({value}) => {
        const {items, _key} = value || {}
        return (
          <TimelineSection
            key={_key}
            id={id}
            type={type}
            path={[...path, {_key}, 'items']}
            timelines={items}
          />
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}

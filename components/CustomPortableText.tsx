import {urlForImage} from '@/sanity/lib/utils'
import type {PathSegment} from '@sanity/client/csm'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import Image from 'next/image'
import type {Image as SanityImage} from 'sanity'

// Extended type for Sanity Image with metadata
type SanityImageAsset = {
  _ref: string
  _type: 'reference'
  metadata?: {
    dimensions?: {
      width: number
      height: number
    }
  }
}

type SanityImageWithAsset = SanityImage & {
  asset?: SanityImageAsset
}

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
        return <p className={`whitespace-pre-line ${paragraphClasses}`}>{children}</p>
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
      image: ({value}: {value: SanityImageWithAsset & {alt?: string; caption?: string}}) => {
        // hotspot/crop를 고려한 이미지 URL 생성
        const imageUrl = value && urlForImage(value)?.auto('format').url()

        // Get image dimensions from asset metadata
        const width = (value?.asset as SanityImageAsset)?.metadata?.dimensions?.width || 1200
        const height = (value?.asset as SanityImageAsset)?.metadata?.dimensions?.height || 800
        const aspectRatio = width / height

        // B2C 앱 콘텐츠는 깔끔한 이미지 스타일 사용
        const isAppContent = type === 'app' || type === 'work'

        return (
          <figure className={`${isAppContent ? 'my-6' : 'my-8'} space-y-3 max-w-2xl`}>
            {isAppContent ? (
              // 앱/워크 콘텐츠: 원본 비율 유지
              imageUrl && (
                <Image
                  src={imageUrl}
                  alt={value?.alt || 'Image'}
                  width={width}
                  height={height}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 700px"
                />
              )
            ) : (
              // 기타 콘텐츠: 기존 스타일 유지
              <div
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 shadow-sm"
                style={{aspectRatio: `${aspectRatio}`}}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={value?.alt || 'Image'}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 700px"
                  />
                )}
              </div>
            )}
            {value?.caption && (
              <figcaption className="text-center font-sans text-sm text-gray-600 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      imageWithSize: ({value}: {value: SanityImageWithAsset & {alt?: string; caption?: string; size?: string}}) => {
        // hotspot/crop를 고려한 이미지 URL 생성
        const imageUrl = value?.asset && urlForImage(value)?.auto('format').url()

        // Get image dimensions from asset metadata
        const width = (value?.asset as SanityImageAsset)?.metadata?.dimensions?.width || 1200
        const height = (value?.asset as SanityImageAsset)?.metadata?.dimensions?.height || 800
        const aspectRatio = width / height

        // B2C 앱 콘텐츠는 깔끔한 이미지 스타일 사용
        const isAppContent = type === 'app' || type === 'work'

        // 크기에 따른 maxWidth 결정
        const sizeMap: Record<string, string> = {
          small: 'max-w-sm',
          medium: 'max-w-2xl',
          large: 'max-w-4xl',
          full: 'w-full',
        }
        const maxWidthClass = (value?.size && sizeMap[value.size]) || 'max-w-2xl'

        return (
          <figure className={`${isAppContent ? 'my-6' : 'my-8'} space-y-3 ${maxWidthClass}`}>
            {isAppContent ? (
              // 앱/워크 콘텐츠: 원본 비율 유지
              imageUrl && (
                <Image
                  src={imageUrl}
                  alt={value?.alt || 'Image'}
                  width={width}
                  height={height}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 900px"
                />
              )
            ) : (
              // 기타 콘텐츠: 기존 스타일 유지
              <div
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 shadow-sm"
                style={{aspectRatio: `${aspectRatio}`}}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={value?.alt || 'Image'}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 900px"
                  />
                )}
              </div>
            )}
            {value?.caption && (
              <figcaption className="text-center font-sans text-sm text-gray-600 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}

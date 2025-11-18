import {sanityFetch} from '@/sanity/lib/live'
import {appListQuery, b2cPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForImage, urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data: pageData} = await sanityFetch({query: b2cPageQuery})
  const {data: settingsData} = await sanityFetch({query: settingsQuery})

  const defaultSeo = settingsData?.defaultSeo

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || 'B2C Labs',
    description: pageData?.seo?.metaDescription || defaultSeo?.metaDescription || '',
    openGraph: {
      images: pageData?.seo?.ogImage ? [urlForOpenGraphImage(pageData.seo.ogImage)] : settingsData?.ogImage ? [urlForOpenGraphImage(settingsData.ogImage)] : [],
    },
  }
}

export default async function B2CPage() {
  const {data: apps} = await sanityFetch({query: appListQuery})

  const defaultImage = '/images/default_image.png'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps?.map((app: typeof apps[number]) => {
        const imageUrl = app.thumbnail ? urlForImage(app.thumbnail)?.url() : null
        return (
          <Link key={app.appId} href={`/b2c/${app.appId}`}>
            <div className="cursor-pointer">
              <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl || defaultImage}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{app.name}</h3>
              <p className="text-sm text-gray-600">{app.summary}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

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

  const ogImage = pageData?.seo?.ogImage ? urlForOpenGraphImage(pageData.seo.ogImage as any) : settingsData?.ogImage ? urlForOpenGraphImage(settingsData.ogImage as any) : undefined

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || 'B2C Labs',
    description: pageData?.seo?.metaDescription || defaultSeo?.metaDescription || '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function B2CPage() {
  const {data: apps} = await sanityFetch({query: appListQuery})

  const defaultImage = '/images/default_image.png'

  return (
    <div className="space-y-16">
      {/* 페이지 헤더 */}
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-6xl font-bold">B2C Solutions</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          우리의 혁신적인 앱들이 귀사의 비즈니스를 어떻게 변화시킬 수 있는지 살펴보세요
        </p>
      </div>

      {/* 앱 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps?.map((app: typeof apps[number]) => {
          const imageUrl = app.thumbnail ? (urlForImage(app.thumbnail as any)?.url() || defaultImage) : defaultImage
          return (
            <Link key={app.appId} href={`/b2c/${app.appId}`}>
              <div className="group cursor-pointer h-full flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
                {/* 이미지 컨테이너 */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-video">
                  <Image
                    src={imageUrl || defaultImage}
                    alt={app.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex flex-col flex-grow p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                    {app.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                    {app.summary}
                  </p>

                  {/* 링크 표시 */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      자세히 보기
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import {HomePage} from '@/components/HomePage'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data: pageData} = await sanityFetch({query: homePageQuery})
  const {data: settingsData} = await sanityFetch({query: settingsQuery})

  const defaultSeo = settingsData?.defaultSeo

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || 'Home',
    description: pageData?.seo?.metaDescription || defaultSeo?.metaDescription || '',
    openGraph: {
      images: pageData?.seo?.ogImage ? [urlForOpenGraphImage(pageData.seo.ogImage)] : settingsData?.ogImage ? [urlForOpenGraphImage(settingsData.ogImage)] : [],
    },
  }
}

export default async function IndexRoute() {
  const {data} = await sanityFetch({query: homePageQuery})

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <HomePage data={data} />
}

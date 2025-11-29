import { AboutPageContainer } from '@/components/about/AboutPage'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data: pageData} = await sanityFetch({query: aboutPageQuery})
  const {data: settingsData} = await sanityFetch({query: settingsQuery})

  const defaultSeo = settingsData?.defaultSeo

  const ogImage = pageData?.seo?.ogImage
    ? urlForOpenGraphImage(pageData.seo.ogImage as any)
    : settingsData?.ogImage
      ? urlForOpenGraphImage(settingsData.ogImage as any)
      : undefined

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || 'About',
    description: pageData?.seo?.metaDescription || defaultSeo?.metaDescription || '',
    openGraph: {
      images: ogImage ? [{ url: ogImage || "" }] : [],
    },
  }
}

export default function AboutPage() {
  return <AboutPageContainer />;
}

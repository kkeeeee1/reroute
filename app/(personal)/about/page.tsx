import { AboutPageContainer } from '@/components/about/AboutPage'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data: pageData} = await sanityFetch({query: aboutPageQuery})
  const {data: settingsData} = await sanityFetch({query: settingsQuery})

  const defaultSeo = settingsData?.defaultSeo

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || 'About',
    description: pageData?.seo?.metaDescription || defaultSeo?.metaDescription || '',
    openGraph: {
      images: pageData?.seo?.ogImage ? [urlForOpenGraphImage(pageData.seo.ogImage)] : settingsData?.ogImage ? [urlForOpenGraphImage(settingsData.ogImage)] : [],
    },
  }
}

export default async function AboutPage() {
  return <div ><AboutPageContainer/></div>
}

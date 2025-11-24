import '@/styles/index.css'
import {Footer} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'
import {CustomCursor} from '@/components/CustomCursor'
import {IntroAnimation} from '@/components/IntroAnimation'
import {ScrollToTopButton} from '@/components/ScrollToTopButton'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import type {Metadata, Viewport} from 'next'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'
import {SpeedInsights} from '@vercel/speed-insights/next'

export async function generateMetadata(): Promise<Metadata> {
  const {data: homePage} = await sanityFetch({query: homePageQuery, stega: false})

  const ogImage = homePage?.seo?.ogImage ? urlForOpenGraphImage(homePage.seo.ogImage) : undefined

  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage?.seo?.metaTitle || homePage.title || 'Personal website',
        }
      : undefined,
    description:
      homePage?.seo?.metaDescription ||
      (homePage?.overview ? toPlainText(homePage.overview) : undefined),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({children}: {children: React.ReactNode}) {
  return (
    <>
      <CustomCursor />
      <IntroAnimation />
      <ScrollToTopButton />
      <div className="flex min-h-screen flex-col bg-white text-black" style={{ paddingTop: 'var(--navbar-height, 96px)' }}>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  )
}

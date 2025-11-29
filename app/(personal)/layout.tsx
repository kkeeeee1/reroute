import "@/styles/index.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { GSAPScroll } from "@/components/GSAPScroll";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Navbar } from "@/components/Navbar";
import { OverlayScrollbarsWrapper } from "@/components/OverlayScrollbarsWrapper";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { handleError } from "./client-functions";

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePage } = await sanityFetch({ query: homePageQuery, stega: false });

  return {
    title: homePage?.seo?.metaTitle || "Personal website",
    description: homePage?.seo?.metaDescription || "",
    openGraph: {
      images: homePage?.seo?.ogImage ? [{ url: urlForOpenGraphImage(homePage.seo.ogImage as any) || "" }] : [],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function IndexRoute({ children }: { children: React.ReactNode }) {
  return (
    <OverlayScrollbarsWrapper>
      <GSAPScroll>
        <CustomCursor />
        <IntroAnimation />
        <ScrollToTopButton />
        <div className="flex min-h-dvh flex-col bg-white text-black">
          <Navbar />
          <div>{children}</div>
          <Footer />
        </div>
        <Toaster />

        {/* Sanity 스튜디오에 있는 데이터의 실시간 업데이트를 위한 라이브 구독 컴포넌트 */}
        <SanityLive onError={handleError} />
        <SpeedInsights />
      </GSAPScroll>
    </OverlayScrollbarsWrapper>
  );
}

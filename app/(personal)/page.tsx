import { HomePageContainer } from "@/components/home/HomePage";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({ query: homePageQuery });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  const ogImage = pageData?.seo?.ogImage
    ? urlForOpenGraphImage(pageData.seo.ogImage as any)
    : settingsData?.ogImage
      ? urlForOpenGraphImage(settingsData.ogImage as any)
      : undefined;

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "Home",
    description:
      pageData?.seo?.metaDescription || defaultSeo?.metaDescription || "",
    openGraph: {
      images: ogImage ? [{ url: ogImage || "" }] : [],
    },
  };
}

export default async function IndexRoute() {
  return <HomePageContainer />;
}

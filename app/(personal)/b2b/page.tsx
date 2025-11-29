import { B2BPageContainer } from "@/components/b2b/B2BPage";
import { sanityFetch } from "@/sanity/lib/live";
import { b2bPageQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({ query: b2bPageQuery });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  const ogImage = pageData?.seo?.ogImage
    ? urlForOpenGraphImage(pageData.seo.ogImage as any)
    : settingsData?.ogImage
      ? urlForOpenGraphImage(settingsData.ogImage as any)
      : undefined;

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "B2B Solution",
    description:
      pageData?.seo?.metaDescription || defaultSeo?.metaDescription || "",
    openGraph: {
      images: ogImage ? [{ url: ogImage || "" }] : [],
    },
  };
}

export default async function B2BPage() {
  return <B2BPageContainer />
}

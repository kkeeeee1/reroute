import { AppList } from "@/components/b2c/AppList";
import { B2CPageContainer } from "@/components/b2c/B2CPage";
import { sanityFetch } from "@/sanity/lib/live";
import { b2cPageQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({ query: b2cPageQuery });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  const description =
    pageData?.seo?.metaDescription ||
    defaultSeo?.metaDescription ||
    "We don't just solve problems. We Reroute them.";

  const ogImage = pageData?.seo?.ogImage
    ? urlForOpenGraphImage(pageData.seo.ogImage as any)
    : settingsData?.ogImage
      ? urlForOpenGraphImage(settingsData.ogImage as any)
      : undefined;

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "B2C Labs | Reroute",
    description,
    openGraph: {
      title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "B2C Labs | Reroute",
      description,
      images: ogImage ? [{ url: ogImage || "" }] : [],
    },
  };
}

export default async function B2CPage() {
  return <B2CPageContainer />;
}

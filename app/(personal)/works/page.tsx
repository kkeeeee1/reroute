import { WorksPageContainer } from "@/components/works/WorksPage";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery, worksPageQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({ query: worksPageQuery });
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
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "Works | Reroute",
    description,
    openGraph: {
      title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "Works | Reroute",
      description,
      images: ogImage ? [{ url: ogImage || "" }] : [],
    },
  };
}

export default async function WorksPage() {
  // Works 페이지 활성화 여부 확인
  if (process.env.NEXT_PUBLIC_ENABLE_WORKS_PAGE !== "true") {
    notFound();
  }

  return <WorksPageContainer />;
}

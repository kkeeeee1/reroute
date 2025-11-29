import { WorkDetailContainer } from "@/components/works/WorkDetailContainer";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery, workDetailQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface WorkDetailPageProps {
  params: Promise<{ workId: string }>;
}

export async function generateMetadata(props: WorkDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { data: work } = await sanityFetch({
    query: workDetailQuery,
    params: { workId: params.workId },
  });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  return {
    title: `${work?.name} | Reroute` || defaultSeo?.metaTitle || "Work",
    description: work?.summary || defaultSeo?.metaDescription || "",
  };
}

export default async function WorkDetailPage(props: WorkDetailPageProps) {
  // Works 페이지 활성화 여부 확인
  if (process.env.NEXT_PUBLIC_ENABLE_WORKS_PAGE !== "true") {
    notFound();
  }

  const params = await props.params;

  return <WorkDetailContainer workId={params.workId} />;
}

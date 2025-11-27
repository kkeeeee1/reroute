import { WorkDetailContainer } from "@/components/works/WorkDetailContainer";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery, workDetailQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

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
  const params = await props.params;

  return <WorkDetailContainer workId={params.workId} />;
}

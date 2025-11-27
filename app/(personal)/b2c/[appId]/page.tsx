import { AppDetailContainer } from "@/components/b2c/AppDetailContainer";
import { sanityFetch } from "@/sanity/lib/live";
import { appDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

interface AppDetailPageProps {
  params: Promise<{ appId: string }>;
}

export async function generateMetadata(props: AppDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { data: app } = await sanityFetch({
    query: appDetailQuery,
    params: { appId: params.appId },
  });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  return {
    title: `${app?.name} | Reroute` || defaultSeo?.metaTitle || "App",
    description: app?.summary || defaultSeo?.metaDescription || "",
  };
}

export default async function AppDetailPage(props: AppDetailPageProps) {
  const params = await props.params;

  return <AppDetailContainer appId={params.appId} />;
}

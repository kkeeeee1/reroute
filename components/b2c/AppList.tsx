import { sanityFetch } from "@/sanity/lib/live";
import { appListQuery } from "@/sanity/lib/queries";
import { AppListContent } from "./AppListContent";

export async function AppList() {
  const { data: apps } = await sanityFetch({ query: appListQuery });

  return <AppListContent apps={apps || []} />;
}

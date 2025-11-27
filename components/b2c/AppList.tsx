import { sanityFetch } from "@/sanity/lib/live";
import { appListCountQuery, appListQuery } from "@/sanity/lib/queries";
import { AppListContent } from "./AppListContent";

export async function AppList() {
  const [appsResult, countResult] = await Promise.all([
    sanityFetch({ query: appListQuery }),
    sanityFetch({ query: appListCountQuery }),
  ]);

  const apps = appsResult.data || [];
  const totalCount = countResult.data || 0;

  return <AppListContent apps={apps} totalCount={totalCount} />;
}

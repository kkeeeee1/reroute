import { sanityFetch } from "@/sanity/lib/live";
import { workListCountQuery, workListQuery } from "@/sanity/lib/queries";
import { WorkListContent } from "./WorkListContent";

export async function WorkList() {
  const [worksResult, countResult] = await Promise.all([
    sanityFetch({ query: workListQuery }),
    sanityFetch({ query: workListCountQuery }),
  ]);

  const works = worksResult.data || [];
  const totalCount = countResult.data || 0;

  return <WorkListContent works={works} totalCount={totalCount} />;
}

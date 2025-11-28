import { sanityFetch } from "@/sanity/lib/live";
import { workDetailQuery } from "@/sanity/lib/queries";
import { HeroSection } from "./HeroSection";
import { WorkDetailContent } from "./WorkDetailContent";
import NotFound from "@/app/not-found";

interface WorkDetailContainerProps {
  workId: string;
}

export async function WorkDetailContainer({ workId }: WorkDetailContainerProps) {
  const { data: work } = await sanityFetch({
    query: workDetailQuery,
    params: { workId },
  });

  if (!work) {
    return <NotFound />
  }

  return (
    <>
      <HeroSection />
      <WorkDetailContent work={work as any} />
    </>
  );
}

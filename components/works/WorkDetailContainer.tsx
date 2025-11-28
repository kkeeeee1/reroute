import { sanityFetch } from "@/sanity/lib/live";
import { workDetailQuery } from "@/sanity/lib/queries";
import { HeroSection } from "./HeroSection";
import { WorkDetailContent } from "./WorkDetailContent";

interface WorkDetailContainerProps {
  workId: string;
}

export async function WorkDetailContainer({ workId }: WorkDetailContainerProps) {
  const { data: work } = await sanityFetch({
    query: workDetailQuery,
    params: { workId },
  });

  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <>
      <HeroSection />
      <WorkDetailContent work={work as any} />
    </>
  );
}

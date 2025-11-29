import NotFound from "@/app/not-found";
import { sanityFetch } from "@/sanity/lib/live";
import { appDetailQuery } from "@/sanity/lib/queries";
import { AppDetailContent } from "./AppDetailContent";
import { HeroSection } from "./HeroSection";

interface AppDetailContainerProps {
  appId: string;
}

export async function AppDetailContainer({ appId }: AppDetailContainerProps) {
  const { data: app } = await sanityFetch({
    query: appDetailQuery,
    params: { appId },
  });

  if (!app) {
    return <NotFound />;
  }

  return (
    <>
      <HeroSection />
      <AppDetailContent app={app as any} />
    </>
  );
}

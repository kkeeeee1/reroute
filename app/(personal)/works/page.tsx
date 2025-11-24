import { sanityFetch } from "@/sanity/lib/live";
import {
  workListQuery,
  worksPageQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({ query: worksPageQuery });
  const { data: settingsData } = await sanityFetch({ query: settingsQuery });

  const defaultSeo = settingsData?.defaultSeo;

  return {
    title: pageData?.seo?.metaTitle || defaultSeo?.metaTitle || "Works",
    description:
      pageData?.seo?.metaDescription || defaultSeo?.metaDescription || "",
    openGraph: {
      images: pageData?.seo?.ogImage
        ? [urlForOpenGraphImage(pageData.seo.ogImage)]
        : settingsData?.ogImage
          ? [urlForOpenGraphImage(settingsData.ogImage)]
          : [],
    },
  };
}

export default async function WorksPage() {
  const { data: works } = await sanityFetch({ query: workListQuery });

  const defaultImage = "/images/default_image.png";

  return (
    <div className="px-7 md:px-10 lg:px-20">
      <div className="space-y-16">
        {/* 페이지 헤더 */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold lg:text-6xl">Works</h1>
        </div>

        {/* 작업 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works?.map((work: (typeof works)[number]) => {
            const imageUrl = work.thumbnail
              ? urlForImage(work.thumbnail)?.url()
              : null;
            return (
              <Link key={work.workId} href={`/works/${work.workId}`}>
                <div className="cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={imageUrl || defaultImage}
                      alt={work.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{work.name}</h3>
                  <p className="text-sm text-gray-600">{work.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

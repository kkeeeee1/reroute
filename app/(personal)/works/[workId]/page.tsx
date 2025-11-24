import { CustomPortableText } from "@/components/CustomPortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { workDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

interface WorkDetailPageProps {
  params: Promise<{ workId: string }>;
}

export async function generateMetadata(
  props: WorkDetailPageProps,
): Promise<Metadata> {
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
  const { data: work } = await sanityFetch({
    query: workDetailQuery,
    params: { workId: params.workId },
  });

  const defaultImage = "/images/default_image.png";

  if (!work) {
    return <div>Work not found</div>;
  }

  const imageUrl = work.thumbnail ? urlForImage(work.thumbnail)?.url() : null;

  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
  });

  const formatDateRange = () => {
    const parts = [];
    if (work.startDate) {
      parts.push(dateFormatter.format(new Date(work.startDate + "T00:00:00")));
    }
    if (work.endDate) {
      parts.push(dateFormatter.format(new Date(work.endDate + "T00:00:00")));
    }
    return parts.join(" ~ ") || "Date not set";
  };

  return (
    <div>
      <div className="mb-8">
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={imageUrl || defaultImage}
            alt={work.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold">{work.name}</h1>
        <p className="mb-4 text-lg text-gray-600">{work.summary}</p>
        <div className="space-y-2 text-sm text-gray-500">
          {formatDateRange() && (
            <p>
              <span className="font-semibold">기간:</span> {formatDateRange()}
            </p>
          )}
          {work.role && (
            <p>
              <span className="font-semibold">역할:</span> {work.role}
            </p>
          )}
        </div>
      </div>

      {work.content && (
        <div className="max-w-none space-y-4">
          <CustomPortableText
            id={work._id}
            type="work"
            path={[]}
            paragraphClasses="text-base leading-relaxed"
            value={work.content}
          />
        </div>
      )}
    </div>
  );
}

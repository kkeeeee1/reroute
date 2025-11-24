import { CustomPortableText } from "@/components/CustomPortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { workDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

  const imageUrl: string = (work.thumbnail ? (urlForImage(work.thumbnail as any)?.url() ?? null) : null) ?? defaultImage;

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
    <div className="px-7 md:px-10 lg:px-20">
      <div className="space-y-16">
        {/* 뒤로가기 버튼 */}
        <Link href="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-navy transition-colors duration-300 group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </Link>

        {/* 헤더 섹션 */}
        <div className="space-y-8">
          {/* 대표 이미지 - 고급스러운 스타일 */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border border-gray-200 aspect-video max-w-4xl shadow-lg">
            <Image
              src={imageUrl}
              alt={work.name}
              fill
              className="object-cover"
              priority
            />
            {/* 오버레이 그래디언트 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* 타이틀 및 설명 - 이미지 아래 */}
          <div className="space-y-4 max-w-4xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Work</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight tracking-tight">
                {work.name}
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl font-light">
              {work.summary}
            </p>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
              {formatDateRange() && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDateRange()}</span>
                </div>
              )}
              {work.role && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{work.role}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 콘텐츠 섹션 */}
        {work.content && (
          <div className="space-y-8">
            <div className="border-t border-gray-200 pt-12">
              <div className="max-w-3xl">
                <CustomPortableText
                  id={work._id}
                  type="work"
                  path={[]}
                  paragraphClasses="text-base lg:text-lg leading-relaxed text-gray-700"
                  value={work.content as any}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

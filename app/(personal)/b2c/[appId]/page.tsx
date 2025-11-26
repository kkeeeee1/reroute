import { CustomPortableText } from "@/components/CustomPortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { appDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface AppDetailPageProps {
  params: Promise<{ appId: string }>;
}

export async function generateMetadata(
  props: AppDetailPageProps,
): Promise<Metadata> {
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
  const { data: app } = await sanityFetch({
    query: appDetailQuery,
    params: { appId: params.appId },
  });

  const defaultImage = "/images/default_image.png";

  if (!app) {
    return <div>App not found</div>;
  }

  const imageUrl: string = (app.thumbnail ? (urlForImage(app.thumbnail as any)?.url() ?? null) : null) ?? defaultImage;

  return (
    <div className="px-7 md:px-10 lg:px-20">
      <div className="space-y-16">
        {/* 뒤로가기 버튼 */}
        <Link href="/b2c" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors duration-300 group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </Link>

        {/* 헤더 섹션 - 이미지 먼저 배치 */}
        <div className="space-y-8">
          {/* 대표 이미지 - 고급스러운 스타일 */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border border-gray-200 aspect-video max-w-4xl shadow-lg">
            <Image
              src={imageUrl}
              alt={app.name}
              fill
              className="object-cover"
              priority
            />
            {/* 오버레이 그래디언트 - 이미지 위에 선택적 텍스트 강조 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* 타이틀 및 설명 - 이미지 아래 */}
          <div className="space-y-4 max-w-4xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">App Feature</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight">
                {app.name}
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl font-light">
              {app.summary}
            </p>

            {/* 메타 정보 */}
            {app.createdAt && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(app.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 콘텐츠 섹션 */}
        {app.content && (
          <div className="space-y-8">
            <div className="border-t border-gray-200 pt-12">
              <div className="max-w-3xl">
                <CustomPortableText
                  id={app._id}
                  type="app"
                  path={[]}
                  paragraphClasses="text-base lg:text-lg leading-relaxed text-gray-700"
                  value={app.content as any}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

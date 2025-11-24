import { CustomPortableText } from "@/components/CustomPortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { appDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

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

  const imageUrl = app.thumbnail ? urlForImage(app.thumbnail)?.url() : null;

  return (
    <div>
      <div className="mb-8">
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={imageUrl || defaultImage}
            alt={app.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold">{app.name}</h1>
        <p className="mb-6 text-lg text-gray-600">{app.summary}</p>
        {app.createdAt && (
          <p className="text-sm text-gray-500">
            {new Date(app.createdAt).toLocaleDateString("ko-KR")}
          </p>
        )}
      </div>

      {app.content && (
        <div className="max-w-none space-y-4">
          <CustomPortableText
            id={app._id}
            type="app"
            path={[]}
            paragraphClasses="text-base leading-relaxed"
            value={app.content}
          />
        </div>
      )}
    </div>
  );
}

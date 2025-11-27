import { sanityFetch } from "@/sanity/lib/live";
import { workListCountQuery, workListPaginatedQuery } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "12");

  try {
    // 페이지 데이터와 전체 개수 동시에 조회
    const [worksResult, countResult] = await Promise.all([
      sanityFetch({ query: workListPaginatedQuery, params: { skip, limit } }),
      sanityFetch({ query: workListCountQuery }),
    ]);

    const works = worksResult.data || [];
    const totalCount = countResult.data || 0;

    return Response.json({
      success: true,
      data: works,
      totalCount,
      hasMore: skip + limit < totalCount,
    });
  } catch (error) {
    console.error("작업 조회 오류:", error);
    return Response.json(
      { success: false, error: "작업 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

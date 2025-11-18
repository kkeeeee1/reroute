import type {HomePageQueryResult} from '@/sanity.types'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({data}: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {overview = [], title = ''} = data ?? {}

  return <div className="space-y-20">{/* MAIN Page */}</div>
}

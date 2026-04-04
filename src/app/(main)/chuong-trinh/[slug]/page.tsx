import { ChuongTrinhPageContent } from './_page-content'

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ChuongTrinhPageContent slug={slug} />
}

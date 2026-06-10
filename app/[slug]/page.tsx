import { notFound } from "next/navigation";
import { getPageBySlug } from "../../lib/cms/store";
import { PageRenderer } from "../../components/PageRenderer";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page || page.status !== "published") notFound();
  return <PageRenderer page={page} />;
}

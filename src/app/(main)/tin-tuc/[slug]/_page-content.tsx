"use client";

import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { JsonLd } from "@/components/common/JsonLd";

interface Props {
  event: any;
  relatedArticles: any[];
  programs: any[];
  jsonLd: any;
}

export default function DetailPageContent({ event, relatedArticles, programs, jsonLd }: Props) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContentDetailPage
        article={{
          title: event.title,
          date: event.date,
          category: event.category,
          image_url: event.image_url,
          content: event.content,
          description: event.description,
          excerpt: event.excerpt,
        }}
        relatedArticles={relatedArticles || []}
        typeLabel="bài viết"
        programs={programs || []}
      />
    </>
  );
}

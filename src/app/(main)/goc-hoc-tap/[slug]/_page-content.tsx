"use client";

import ContentDetailPage from "@/components/pages/shared/content-detail-page";

interface Props {
  article: any;
  relatedArticles: any[];
  programs: any[];
}

export default function DetailPageContent({ article, relatedArticles, programs }: Props) {
  return (
    <ContentDetailPage
      article={article}
      relatedArticles={relatedArticles || []}
      typeLabel="học tập"
      programs={programs || []}
    />
  );
}

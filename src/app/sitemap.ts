import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mshoajunior.edu.vn';
  
  const routes = [
    '',
    '/ve-chung-toi',
    '/khoa-hoc-tieu-chuan',
    '/tai-lieu',
    '/tin-tuc',
    '/lien-he',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));
}

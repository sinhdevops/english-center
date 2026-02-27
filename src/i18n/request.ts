// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Chờ locale từ middleware (nếu dùng routing)
  let locale = await requestLocale;

  // Nếu không có (fallback), dùng default
  if (!locale) locale = 'vi'; // thay 'vi' bằng defaultLocale của bạn

  return {
    locale,
  };
});
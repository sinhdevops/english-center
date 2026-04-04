import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder',
  api_key: process.env.CLOUDINARY_API_KEY || 'placeholder',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder',
});

export default cloudinary;

export const uploadToCloudinary = async (fileUri: string, folder: string = 'events') => {
  try {
    const res = await cloudinary.uploader.upload(fileUri, {
      folder: `edu-admin/${folder}`,
      resource_type: 'auto',
      format: 'webp',
      transformation: [{ quality: 'auto' }],
    });
    return res.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Thêm f_webp,q_auto vào Cloudinary URL để serve ảnh dạng WebP.
 * Hoạt động với cả URL cũ (jpg/png) và URL mới (webp).
 * Cloudinary xử lý on-the-fly và cache lại sau lần đầu.
 */
export function getCldUrl(url: string): string {
  if (!url || !url.includes('res.cloudinary.com')) return url
  // Tránh duplicate transformation nếu URL đã có f_webp
  if (url.includes('f_webp')) return url
  return url.replace('/upload/', '/upload/f_webp,q_auto/')
}

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
    });
    return res.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

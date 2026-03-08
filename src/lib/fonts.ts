import localFont from 'next/font/local';

export const utmAzuki = localFont({
  src: [
    {
      path: '../fonts/UTM-Azuki.ttf',   // đường dẫn tương đối từ file này
      weight: '400',                    // UTM Azuki chỉ có Regular ~400
      style: 'normal',
    },
  ],
  variable: '--font-utm-azuki',         // để dùng với Tailwind hoặc CSS var
  display: 'swap',                      // tránh FOIT (flash of invisible text)
  fallback: ['cursive', 'sans-serif'],  // fallback khi font load chậm
});
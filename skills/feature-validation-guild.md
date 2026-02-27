"You are an expert Next.js developer specializing in cloning websites with pixel-perfect accuracy. Your task is to clone the entire website https://mshoajunior.edu.vn/ exactly 100%, including UI layout, colors, fonts, spacing, interactive elements like slideshows/carousels, forms, buttons, and mobile responsiveness. Use Next.js 14 (App Router) with TypeScript, Tailwind CSS for styling (to match exact colors like primary blue #007bff, accent orange #ff6600, white background, etc., based on the site's theme), and React components. For data, use mock JSON objects in code (do not fetch real API; simulate all content like courses, news, images). For images, import directly from the original site's URLs (e.g., src="https://mshoajunior.edu.vn/images/logo.png") to keep it identical – do not download or host locally. Use libraries like Swiper for slideshows/carousels, React Hook Form for forms, and Heroicons for icons.
The website is a Vietnamese English education site for kids, with sections like homepage, about us, courses, resources, news, contact. Ensure full mobile layout (use Tailwind's responsive classes like md:, lg:). Fonts: Use Google Fonts like Roboto or similar to match (main font sans-serif, headings bold). Colors: Header blue background, buttons orange, text dark gray. All text content must be copied exactly from the site (use mock data with Vietnamese text as placeholders, e.g., 'Ms Hoa Junior - Tiếng Anh Trẻ Em').
Output the code in steps as specified below. For each step, provide the full code files (e.g., components/Header.tsx, pages/index.tsx) in code blocks, with explanations. After each step, wait for user confirmation before proceeding to the next. If something is dynamic (like slideshow auto-play), implement it identically.
Step 1: Create the shared layout components – Header, Navigation (with search bar), Footer, and mobile menu.

Header: Fixed top bar with logo (src from https://mshoajunior.edu.vn/images/logo.png), nav links (Trang chủ, Về chúng tôi, Khóa học, Tài liệu, Tin tức, Liên hệ), search input (placeholder 'Tìm kiếm khóa học...'), buttons like 'Đăng ký tư vấn' (orange button).
Navigation: Dropdown menus for sub-items (e.g., under Khóa học: Tiêu chuẩn, Chuyên cần chuyên, IELTS Junior, etc.). Use hover effects.
Search: Functional mock search (log to console on submit).
Footer: Bottom section with logo, address (e.g., 'Hệ thống Anh ngữ Ms Hoa'), social links (Facebook, YouTube icons), copyright '© 2023 Ms Hoa Junior', quick links, and contact info. Include map embed if present.
Mobile layout: Hamburger menu that toggles nav on small screens, responsive search bar collapses.
Create files: app/layout.tsx (root layout), components/Header.tsx, components/Footer.tsx, components/MobileMenu.tsx. Use Tailwind for all styling.

Step 2: Clone the UI of the homepage https://mshoajunior.edu.vn/.

Full layout: Hero section with slideshow (use Swiper: auto-play, pagination dots, images from site URLs like https://mshoajunior.edu.vn/images/banner1.jpg, text overlays like 'Tiếng Anh Trẻ Em Chuẩn Cambridge').
Sections:
Giới thiệu: Text about 'Ms Hoa Junior - Hệ thống đào tạo tiếng Anh trẻ em', stats (e.g., '40+ cơ sở', '100.000+ học viên').
Khóa học nổi bật: Carousel of course cards (images, titles like 'Khóa Tiêu Chuẩn', descriptions, buttons 'Tìm hiểu thêm').
Lợi ích: List items with icons (e.g., 'Phát triển 4 kỹ năng', 'Điểm số giỏi trên lớp').
Testimonials: Slider of parent reviews with photos.
News/Events: Grid of recent articles with thumbnails.
Call-to-action: Form for 'Đăng ký tư vấn miễn phí' (fields: Name, Phone, Email, City, submit button).

Use mock data JSON in the page component for all content.
Create file: app/page.tsx. Ensure 100% match to site's spacing, colors, fonts.

Step 3: Clone the UI of the following pages, one by one in sub-steps. For each, use the shared layout from Step 1, mock data for content, import images from site URLs, and match exact UI (headings, paragraphs, images, buttons, forms, lists, accordions if any).

Sub-step 3.1: https://mshoajunior.edu.vn/vct-cau-chuyen-cua-ms-hoa-junior.html (Về chúng tôi: Story section with timeline, images of founder, mission text like 'Câu chuyện Ms Hoa Junior', values list).
Sub-step 3.2: https://mshoajunior.edu.vn/gbm-lop-hoc-bo-tro.html (Lớp học bổ trợ: Description, benefits list, registration form, images of classes).
Sub-step 3.3: https://mshoajunior.edu.vn/gbm-bi-quyet-dong-hanh-cung-con.html (Bí quyết đồng hành cùng con: Tips articles, infographics, parent advice sections).
Sub-step 3.4: https://mshoajunior.edu.vn/khoa-hoc-tieu-chuan.html (Khóa học tiêu chuẩn: Course details, levels (Starters, Movers), syllabus, pricing mock, enrollment button).
Sub-step 3.5: https://mshoajunior.edu.vn/khoa-hoc-chuyen-can-chuyen.html (Khóa chuyên cần chuyên: Advanced course info, targets, mock schedule).
Sub-step 3.6: https://mshoajunior.edu.vn/khoa-hoc-ielts-junior.html (IELTS Junior: Prep course, bands, mock tests links).
Sub-step 3.7: https://mshoajunior.edu.vn/khoa-hoc-1-1-nhom-nho.html (Khóa 1-1/Nhóm nhỏ: Personalized learning, benefits, pricing).
Sub-step 3.8: https://mshoajunior.edu.vn/tieng-anh-tre-em.html (Tiếng Anh trẻ em: General info, age groups, methods).
Sub-step 3.9: https://mshoajunior.edu.vn/tai-lieu.html (Tài liệu: Download list of PDFs/mock files, categories like vocabulary, grammar).
Sub-step 3.10: https://mshoajunior.edu.vn/tin-tuc.html (Tin tức: Blog grid, categories sidebar, pagination).
Sub-step 3.11: https://mshoajunior.edu.vn/tin-tuc/su-kien-c239.html (Sự kiện: Event list with dates, images).
Sub-step 3.12: https://mshoajunior.edu.vn/tin-tuc/hoat-dong-ngoai-khoa-c246.html (Hoạt động ngoại khóa: Activity galleries, descriptions).
Sub-step 3.13: https://mshoajunior.edu.vn/tin-tuc/trai-nghiem-mhj-c247.html (Trải nghiệm MHJ: User stories, videos embed mock).
Sub-step 3.14: https://mshoajunior.edu.vn/tin-tuc/ky-thi-hoc-bong-c245.html (Kỳ thi học bổng: Scholarship info, application form).
Sub-step 3.15: https://mshoajunior.edu.vn/tin-tuc/tuyen-dung-c248.html (Tuyển dụng: Job listings, apply buttons).
Sub-step 3.16: https://mshoajunior.edu.vn/lien-he-dang-ky-nhan-tu-van.html (Liên hệ: Contact form, map, addresses).
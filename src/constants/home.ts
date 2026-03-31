import { HomeImages, imagePrograms } from "../../public/statics/images";

export const HERO_TARGETS = [
  "Toán tư duy – Rèn logic & suy luận nền tảng",
  "Robotics – Lắp ráp, lập trình, phát triển STEM",
  "Tiếng Anh – Nghe nói tự nhiên, tự tin giao tiếp"
];

export const ABOUT_STATS = [
  { label: "Năm hoạt động", value: "1+" },
  { label: "Giáo viên tài năng", value: "300+" },
  { label: "Học viên", value: "50000+" },
  { label: "Đối tác đồng hành", value: "30+" },
  { label: "Cơ sở trên toàn quốc", value: "55+" },
  { label: "Học viên học online", value: "20000+" }
];

export const ABOUT_FEATURES = [
  "Phương pháp truyền cảm hứng R.I.P.L độc quyền",
  "Đội ngũ giáo viên tinh hoa, giàu kinh nghiệm",
  "Chương trình chuẩn Cambridge, sát thực tế",
  "Môi trường học tập năng động, sáng tạo"
];

export const PROGRAMS_DATA = [
  {
    title: "Toán tư duy",
    desc: "Phát triển tư duy logic và khả năng giải quyết vấn đề thông qua toán học, giúp trẻ luyện tư duy phân tích và sáng tạo",
    slug: "toan-tu-duy",
    style: { background: 'linear-gradient(286.12deg, #FFCA74 9.13%, #C80057 86.64%)' },
    img: HomeImages.program
  },
   {
    title: "Tiếng anh",
    desc: "Tiếng anh tư duy phản biện STEMKey English kích thích tư duy toàn diện thông qua giáo dục STEM-STEAM",
    slug: "tieng-anh",
    style: { background: 'linear-gradient(284.83deg, #FFF357 16%, #00771E 96.5%)' },

    img: HomeImages.program1
  },
  {
    title: "Robotics",
    desc: "Làm quen với lập trình và robot, khơi gợi tư duy công nghệ, sáng tạo và kỹ năng giải quyết vấn đề.",
    slug: "robotics",
    style: { background: 'linear-gradient(106.99deg, #211BCF 12.88%, #FF60B2 92.58%)' },
    img: HomeImages.program2
  },
  {
    title: "Tiền tiểu học",
    desc: "Chuẩn bị nền tảng kiến thức và kỹ năng cần thiết. giúp trẻ tự tin sẵn sàng bước vào lớp 1",
    slug: "tieu-hoc",
    style: { background: 'linear-gradient(284.83deg, #7CC9FF 16%, #003777 96.5%)' },
    img: HomeImages.program3
  }
];

export const EXCLUSIVE_MODEL_ITEMS = [
  {
    step: "STEP 01",
    title: "Chuẩn bị kiến thức",
    description: "Xem trước bài giảng và tài liệu trước khi lên lớp để tối ưu hóa thời gian học tập.",
    icon: "BookOpen",
    iconBg: "bg-rose-500",
  },
  {
    step: "STEP 02",
    title: "Tương tác trực tiếp",
    description: "Hỏi đáp và thảo luận sôi nổi cùng giáo viên và bạn bè trong môi trường năng động.",
    icon: "Users",
    iconBg: "bg-orange-500",
  },
  {
    step: "STEP 03",
    title: "Ôn Tập & Luyện Tập",
    description: "Hệ thống bài tập thông minh giúp củng cố kiến thức và phát triển kỹ năng thực hành.",
    icon: "Zap",
    iconBg: "bg-blue-500",
  },
  {
    step: "STEP 04",
    title: "Giải đáp thắc mắc",
    description: "Đội ngũ giáo viên luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của học sinh.",
    icon: "CheckCircle",
    iconBg: "bg-sky-400",
  },
];

export const FLEXIBLE_BENEFITS = [
  {
    title: "Nội dung chương trình học được xây dựng bởi đội ngũ chuyên gia hàng đầu Thế Giới. Học cụ được thiết kế chuyên biệt, tối ưu hóa hiệu quả bài học.",
  },
  {
    title: "Lớp học được thiết kế hiện đại và trang bị màn hình tương tác thông minh, giúp trẻ chủ động và yêu thích việc học hơn",
  },
  {
    title: "Đội ngũ giáo viên nhiệt huyết, yêu trẻ, được đào tạo bài bản",
  },
  {
    title: "Hệ thống trung tâm trải khắp với cam kết về chất lượng đồng bộ trên toàn quốc",
  },
];

export const TEACHERS_DATA = [
  {
    name: "Mr. Trần Thái Quý",
    role: "Nhà sáng lập và hành trình trao giá trị, truyền cảm hứng",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms. Nguyễn Minh Thư",
    role: "Giám đốc đào tạo, chuyên gia ngôn ngữ học",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Mr. Lê Hoàng Nam",
    role: "Chuyên gia Robotics & Công nghệ giáo dục",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms. Phạm Thu Hà",
    role: "Giáo viên Toán tư duy, hơn 10 năm kinh nghiệm",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Mr. Kevin Williams",
    role: "Chuyên gia bản ngữ, cố vấn học thuật quốc tế",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms. Đặng Thu Hà",
    role: "Trưởng phòng Nghiên cứu & Phát triển chương trình",
    img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400"
  }
];

export const TESTIMONIALS_DATA = [
  {
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    title: "Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình",
    desc: "Vinh danh những gương mặt xuất sắc đạt thành tích cao trong kỳ thi Cambridge quốc tế năm 2025, khẳng định chất lượng đào tạo vượt trội của hệ thống STEMKey."
  },
  {
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
    title: "Lễ Trao Giải STEMKey Robotics Championship: Khơi Nguồn Đam Mê Sáng Tạo",
    desc: "Sự kiện vinh danh các kỹ sư nhí tài năng đã xuất sắc vượt qua các vòng thi gay cấn để giành lấy những giải thưởng cao quý nhất tại đấu trường Robotics."
  },
  {
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    title: "Gương Mặt Học Viên Tiêu Biểu: Hành Trình Chinh Phục Học Bổng 40%",
    desc: "Câu chuyện truyền cảm hứng về nỗ lực học tập và hành trình gặt hái thành công của bạn học viên xuất sắc nhất tháng, mở ra cơ hội phát triển tương lai rạng rỡ."
  }
];

export const NEWS_DATA = [
  {
    title: "STEMKey chính thức khai trương cơ sở mới tại Nam An Khánh",
    desc: "Với mong muốn mang giáo dục STEM đến gần hơn với trẻ em Việt Nam, STEMKey tự hào ra mắt cơ sở mới với không gian học tập sáng tạo, trang thiết bị hiện đại bậc nhất.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Workshop: Chế tạo Robot từ vật liệu tái chế cùng STEMKey",
    desc: "Sự kiện cuối tuần thu hút đông đảo phụ huynh và học sinh tham gia, nơi các con được tự tay thiết kế những mô hình robot độc đáo từ những vật dụng quen thuộc hàng ngày.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "STEMKey đồng hành cùng phụ huynh định hướng nghề nghiệp tương lai",
    desc: "Buổi tọa đàm chuyên sâu về tầm quan trọng của kỹ năng công nghệ và tư duy sáng tạo trong kỷ nguyên số, giúp ba mẹ có cái nhìn rõ nét hơn về lộ trình phát triển của con.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
  }
];

export const PARTNERS_DATA = [
  { name: "Partner 1", logo: HomeImages.partner },
  { name: "Partner 2", logo: HomeImages.partner2 },
  { name: "Partner 3", logo: HomeImages.partner },
  { name: "Partner 4", logo: HomeImages.partner2 },
  { name: "Partner 5", logo: HomeImages.partner },
  { name: "Partner 6", logo: HomeImages.partner2 },
  { name: "Partner 7", logo: HomeImages.partner},
  { name: "Partner 8", logo: HomeImages.partner2 },
];

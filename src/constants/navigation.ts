export interface NavItem {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Về chúng tôi",
    href: "/ve-chung-toi",
  },
  {
    label: "Góc ba mẹ",
    href: "/goc-ba-me",
    subItems: [
      {
        label: "Kinh nghiệm nuôi dạy con",
        href: "/goc-ba-me/kinh-nghiem-nuoi-day-con",
      },
      {
        label: "Góc chuyên gia",
        href: "/goc-ba-me/goc-chuyen-gia",
      },
      {
        label: "STEM tại nhà",
        href: "/goc-ba-me/stem-tai-nha",
      },
    ],
  },
  {
    label: "Khóa học",
    href: "/khoa-hoc",
    subItems: [
      {
        label: "Robotics mầm non",
        href: "/khoa-hoc/robotics-mam-non",
      },
      {
        label: "STEM Tiểu học",
        href: "/khoa-hoc/stem-tieu-hoc",
      },
      {
        label: "STEM THCS",
        href: "/khoa-hoc/stem-thcs",
      },
      {
        label: "Lập trình Scratch",
        href: "/khoa-hoc/lap-trinh-scratch",
      },
    ],
  },
  { label: "Lịch khai giảng", href: "/lich-khai-giang" },
  {
    label: "Góc học tập",
    href: "/goc-hoc-tap",
    subItems: [
      {
        label: "Tài liệu học tập",
        href: "/goc-hoc-tap/tai-lieu-hoc-tap",
      },
      {
        label: "Video bài giảng",
        href: "/goc-hoc-tap/video-bai-giang",
      },
      {
        label: "Thử thách tuần",
        href: "/goc-hoc-tap/thu-thach-tuan",
      },
    ],
  },
  { label: "Test online", href: "/kiem-tra-truc-tuyen" },
  {
    label: "Tin tức",
    href: "/tin-tuc",
  },
  { label: "Liên hệ", href: "/lien-he" },
];

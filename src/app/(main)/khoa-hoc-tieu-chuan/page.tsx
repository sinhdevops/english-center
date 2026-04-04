import type { Metadata } from 'next'
import { KhoaHocTieuChuanPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Khóa học tiêu chuẩn',
  description:
    'Khóa học tiêu chuẩn tại STEMKey — lộ trình 3 chặng với phương pháp R.I.P.L độc quyền, giúp học viên bứt phá tư duy và ngôn ngữ.',
}

export default function KhoaHocTieuChuanPage() {
  return <KhoaHocTieuChuanPageContent />
}

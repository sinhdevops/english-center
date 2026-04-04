import type { Metadata } from 'next'
import { DangKyPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản mới và bắt đầu hành trình sáng tạo cùng STEMKey.',
}

export default function RegisterPage() {
  return <DangKyPageContent />
}

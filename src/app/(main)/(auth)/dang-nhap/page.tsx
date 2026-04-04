import type { Metadata } from 'next'
import { DangNhapPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào tài khoản STEMKey của bạn.',
}

export default function LoginPage() {
  return <DangNhapPageContent />
}

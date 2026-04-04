import type { Metadata } from 'next'
import { QuenMatKhauPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Khôi phục mật khẩu tài khoản STEMKey của bạn.',
}

export default function ForgotPasswordPage() {
  return <QuenMatKhauPageContent />
}

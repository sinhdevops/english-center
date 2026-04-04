import type { Metadata } from 'next'
import PageContent from './_page-content'

export const metadata: Metadata = {
  title: 'Kiểm tra trực tuyến',
  description: 'Khám phá hàng ngàn bài test online miễn phí — đánh giá năng lực tư duy STEM & Robotics cho mọi độ tuổi tại STEMKey.',
}

export default function TestOnlinePage() {
  return <PageContent />
}

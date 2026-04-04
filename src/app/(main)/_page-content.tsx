import dynamic from 'next/dynamic'
import BannerSwiper from '@/components/pages/home/banner-swiper'
import ThinkingSection from '@/components/pages/home/thinking-section'
import AboutSection from '@/components/pages/home/about-section'
import Programs from '@/components/pages/home/programs'
import ExclusiveModel from '@/components/pages/home/exclusive-model'
import FlexibleLearning from '@/components/pages/home/flexible-learning'

const Teachers = dynamic(() => import('@/components/pages/home/teachers'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/pages/home/testimonials'), { ssr: true })
const News = dynamic(() => import('@/components/pages/home/news'), { ssr: true })
const Partners = dynamic(() => import('@/components/pages/home/partners'), { ssr: true })
const RegistrationSection = dynamic(
  () => import('@/components/pages/home/registration-section'),
  { ssr: true },
)

interface HomePageContentProps {
  banners: Record<string, unknown>[]
  testimonialItems: Record<string, unknown>[]
  newsItems: Record<string, unknown>[]
}

export function HomePageContent({ banners, testimonialItems, newsItems }: HomePageContentProps) {
  return (
    <main className="overflow-x-hidden">
      <BannerSwiper banners={banners} />
      <ThinkingSection />
      <div className="my-15 lg:my-20 flex flex-col gap-15 lg:gap-20">
        <AboutSection />
        <Programs />
        <FlexibleLearning />
        <Teachers />
        <Testimonials items={testimonialItems} />
        <News initialNews={newsItems} />
        <Partners />
      </div>
    </main>
  )
}

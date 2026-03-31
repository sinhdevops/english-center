"use client"

import { motion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/constants'
import FormRegistration from '@/components/pages/shared/form-registration'

const IconMap: Record<string, React.ReactNode> = {
  phone: <Phone className="h-6 w-6 text-stem-green" />,
  email: <Mail className="h-6 w-6 text-stem-green" />,
  time: <Clock className="h-6 w-6 text-stem-green" />,
}

interface PageContentProps {
  branches: { id: string; name: string }[]
  courses: { id: string; name: string }[]
}

const PageContent = ({ branches, courses }: PageContentProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Green Hero Section */}
      <div className="relative bg-[#00842B] pb-32 pt-16 md:h-[360px]">
        {/* Decorative blobs — dùng clip-path để không lòi ra ngoài */}
        <div className="absolute top-0 left-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#71FF671A]" />
        <div className="absolute top-0 right-0 h-[100px] w-[100px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#71FF671A]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl font-bold uppercase text-white sm:text-4xl lg:text-5xl"
          >
            LIÊN HỆ VỚI CHÚNG TÔI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-white/90"
          >
            Ba mẹ có bất kỳ thắc mắc nào về chương trình học hoặc cần tư vấn lộ trình học tập cho con, đừng ngần
            ngại để lại thông tin nhé!
          </motion.p>
        </div>

        {/* Contact Info Cards — overlapping bottom */}
        <div className="relative z-10 lg:-mt-24 mt-5 px-4 md:absolute md:right-0 md:bottom-0 md:left-0 md:mt-0 md:translate-y-1/2">
            <div className="relative overflow-hidden bg-white pt-6 pb-8 px-6 md:px-15 max-w-7xl mx-auto rounded-[20px] shadow-[0px_4px_4px_0px_#0000001A]">
              {/* Decorative blobs inside box */}
              <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#50FF2980]/30" />
              <div className="absolute right-0 -top-20 h-[275px] w-[275px] translate-x-1/3 rounded-full bg-[#50FF2980]/30" />
            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
              {CONTACT_INFO.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex flex-col items-center rounded-[20px] border border-[#DEDEDE]  px-8 py-8 text-center"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15B24829] text-[#009832]">
                    {IconMap[item.type]}
                  </div>
                  <p className="mb-1 text-xl font-black text-slate-800">{item.detail}</p>
                  <p className="text-sm text-slate-400">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for overlapping cards */}
      <div className="h-0 md:h-[120px]" />

      {/* Form & Map Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* Form Side */}
            <FormRegistration courses={courses} branches={branches} />

            {/* Map Side */}
            <div className="relative min-h-100 w-full lg:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.846513689445!2d105.7112345!3d21.0007654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134539665555555%3A0x5555555555555555!2zTmFtIEFuIEtow6FuaCwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1709100000000!5m2!1svi!2s"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay info */}
              <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 bg-white/90 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stem-blue text-white">
                    <MapPin size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900">STEMKey Nam An Khánh</h4>
                    <p className="text-sm text-slate-600">Khu đô thị Nam An Khánh, Hoài Đức, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PageContent

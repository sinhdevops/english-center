'use client'

import { motion } from 'framer-motion'
import { AuthForm } from '@/components/auth/auth-form'
import Image from 'next/image'
import { IMAGES } from '../../../../../public/statics/images'

export function DangNhapPageContent() {
  return (
    <div className="flex min-h-screen font-montserrat">
      {/* Left Column — Form */}
      <div className="relative flex w-full flex-col bg-white p-6 lg:w-1/2 lg:p-12 xl:p-20">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="mb-2 text-[32px] font-semibold leading-tight tracking-tight">
                CHÀO MỪNG TRỞ LẠI
              </h1>
              <p className="text-slate-500">Đăng nhập để tiếp tục hành trình cùng STEMKey</p>
            </motion.div>

            <AuthForm mode="login" />
          </div>
        </div>
      </div>

      {/* Right Column — Illustration */}
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block lg:w-1/2">
        <Image
          src={IMAGES.login}
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

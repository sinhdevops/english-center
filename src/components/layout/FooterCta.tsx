"use client"

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, User } from 'lucide-react'
import { Button } from '../ui/button'
import { InputValidation } from '@/components/ui/input'
import { usePathname } from 'next/navigation'


const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)').trim(),
  phone: z
    .string()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
})

type FormValues = z.infer<typeof schema>

export const FooterCta: React.FC = () => {
  const methods = useForm<FormValues>({ resolver: zodResolver(schema) })

const pathname = usePathname()
  const onSubmit = (data: FormValues) => {
    window.location.href = `/lien-he?name=${encodeURIComponent(data.name)}&phone=${encodeURIComponent(data.phone)}`
    methods.reset()
  }

  if(pathname === '/kiem-tra-truc-tuyen') return <></>

  return (
    <div className="relative overflow-hidden bg-[#19B24B] px-4 pt-6 pb-8 max-w-7xl mx-auto rounded-[20px]">
      {/* Decorative blobs */}
      <div className="absolute -bottom-4 left-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#50FF2980]/50" />
      <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/2 rounded-full bg-[#50FF2980]/50" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-xl lg:text-[32px] font-semibold uppercase text-white">
          NHẬN TƯ VẤN CHƯƠNG TRÌNH PHÙ HỢP
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <InputValidation name="name" placeholder="Nhập họ tên của bạn" icon={User} />
              <InputValidation name="phone" placeholder="Nhập số điện thoại" type="tel" icon={Phone} />
              <Button
                type="submit"
                size="md"
                className="h-12 w-full shrink-0 rounded-xl bg-stem-blue px-8 text-sm font-black uppercase text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                ĐĂNG KÝ TƯ VẤN
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

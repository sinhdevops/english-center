'use client'

import { useState, useMemo } from 'react'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { InputValidation } from '../ui/input'
import { signIn, signUp, signInWithGoogle } from '@/actions/auth.actions'

interface AuthFormProps {
  mode: 'login' | 'register'
}

function buildSchema(mode: 'login' | 'register') {
  return z
    .object({
      email: z.string().min(1, 'Vui lòng nhập email').email({ message: 'Email không hợp lệ' }),
      password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      fullName:
        mode === 'register'
          ? z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự')
          : z.string().optional(),
      phone:
        mode === 'register'
          ? z
              .string()
              .min(10, 'Số điện thoại không hợp lệ')
              .max(11, 'Số điện thoại không hợp lệ')
          : z.string().optional(),
      confirmPassword:
        mode === 'register'
          ? z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
          : z.string().optional(),
    })
    .refine(
      (data) => {
        if (mode === 'register' && data.password !== data.confirmPassword) return false
        return true
      },
      { message: 'Mật khẩu xác nhận không khớp', path: ['confirmPassword'] },
    )
}

type AuthFormValues = z.infer<ReturnType<typeof buildSchema>>

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const schema = useMemo(() => buildSchema(mode), [mode])

  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', fullName: '', phone: '', confirmPassword: '' },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: AuthFormValues): Promise<void> => {
    if (mode === 'register') {
      // fullName & phone are guaranteed by schema when mode === 'register'
      const result = await signUp(data.email, data.password, data.fullName!, data.phone!)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.')
    } else {
      const result = await signIn(data.email, data.password, redirectTo)
      if (result?.error) {
        toast.error(result.error)
      }
      // signIn redirects on success — code below does not execute
    }
  }

  const handleGoogleLogin = async (): Promise<void> => {
    setIsGoogleLoading(true)
    const result = await signInWithGoogle(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    )
    if (result?.error) {
      toast.error('Có lỗi xảy ra khi đăng nhập bằng Google.')
      setIsGoogleLoading(false)
    }
    // On success: server action redirects, setIsGoogleLoading never runs
  }

  const isLoading = isSubmitting || isGoogleLoading

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {mode === 'register' && (
            <InputValidation name="fullName" placeholder="Nguyễn Văn A" label="Họ và tên" required />
          )}

          <InputValidation
            name="email"
            placeholder="abc@gmail.com"
            label="Email"
            type="email"
            required
          />

          {mode === 'register' && (
            <InputValidation
              name="phone"
              type="tel"
              label="Số điện thoại"
              placeholder="0912345678"
              required
            />
          )}

          <div className="relative">
            <InputValidation
              name="password"
              placeholder="••••••••"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className="absolute right-4 top-12.75 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {mode === 'register' && (
            <InputValidation
              name="confirmPassword"
              type="password"
              label="Nhập lại mật khẩu"
              placeholder="••••••••"
              required
            />
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <Link
                href="/quen-mat-khau"
                className="text-[13px] font-medium text-slate-400 transition-colors hover:text-blue-500"
              >
                Quên mật khẩu?
              </Link>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-stem-blue py-6 text-base font-bold text-white shadow-lg shadow-blue-100 transition-all hover:opacity-90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : mode === 'login' ? (
              'Đăng nhập'
            ) : (
              'Đăng ký'
            )}
          </Button>
        </form>
      </FormProvider>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 font-medium text-slate-400">Hoặc đăng nhập bằng</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E6E6E6] bg-white px-4 py-4 font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isGoogleLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        <span className="text-sm">Đăng nhập bằng Google</span>
      </button>

      <p className="mt-8 text-center text-sm font-medium text-slate-500">
        {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
        <Link
          href={mode === 'login' ? '/dang-ky' : '/dang-nhap'}
          className="font-bold text-stem-blue hover:underline"
        >
          {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
        </Link>
      </p>
    </div>
  )
}

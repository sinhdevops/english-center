"use client"

import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Chrome, Phone, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';


const registerSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Simulate API call
    console.log('Register data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Đăng ký thành công!');
  };


  return (
     <div className="min-h-[90vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 lg:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">Tham gia STEMKey</h2>
          <p className="text-slate-500">Khởi đầu hành trình sáng tạo và phát triển tư duy</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email / Gmail</label>
              <div className="relative">
                <input 
                  {...register('email')}
                  type="email" 
                  placeholder="name@gmail.com" 
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                />
                <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
              </div>
              {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Số điện thoại</label>
              <div className="relative">
                <input 
                  {...register('phone')}
                  type="tel" 
                  placeholder="0912 345 678" 
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                />
                <Phone size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-400' : 'text-slate-400'}`} />
              </div>
              {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Mật khẩu</label>
            <div className="relative">
              <input 
                {...register('password')}
                type="password" 
                placeholder="••••••••" 
                className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
              />
              <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />
            </div>
            {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Nhập lại mật khẩu</label>
            <div className="relative">
              <input 
                {...register('confirmPassword')}
                type="password" 
                placeholder="••••••••" 
                className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
              />
              <UserCheck size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? 'text-red-400' : 'text-slate-400'}`} />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            variant="primary" 
            className="w-full py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng ký tài khoản'} <ArrowRight size={20} />
          </Button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-400">Hoặc đăng ký bằng</span>
          </div>
        </div>

        <button className="w-full py-3 px-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">
          <Chrome size={20} className="text-red-500" />
          Tiếp tục với Google
        </button>

        <p className="mt-10 text-center text-slate-500 text-sm">
          Đã có tài khoản?{' '}
          <Link href={'/dang-nhap'} 
            className="text-stem-blue font-bold hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

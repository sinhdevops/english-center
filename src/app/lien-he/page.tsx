"use client"

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  parentName: z.string().min(1, 'Vui lòng nhập họ tên'),
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  phone: z.string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(11, 'Số điện thoại không quá 11 số')
    .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
  childName: z.string().min(1, 'Vui lòng nhập họ tên của con'),
  childClass: z.string().min(1, 'Vui lòng nhập lớp của con'),
  branch: z.string().min(1, 'Vui lòng chọn cơ sở'),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childClass: '',
      branch: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Contact form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Gửi thông tin thành công! Chúng tôi sẽ liên hệ lại sớm.');
    reset();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-slate-900 mb-4"
          >
            LIÊN HỆ VỚI CHÚNG TÔI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto"
          >
            Ba mẹ có bất kỳ thắc mắc nào về chương trình học hoặc cần tư vấn lộ trình học tập cho con, đừng ngần ngại để lại thông tin nhé!
          </motion.p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Phone className="text-stem-blue" />, title: "Hotline", detail: "0325 610 016", sub: "Hỗ trợ 24/7" },
            { icon: <Mail className="text-stem-green" />, title: "Email", detail: "contact@stemkey.edu.vn", sub: "Phản hồi trong 24h" },
            { icon: <Clock className="text-orange-500" />, title: "Giờ làm việc", detail: "08:00 - 21:00", sub: "Thứ 2 - Chủ Nhật" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xl font-black text-slate-800 mb-1">{item.detail}</p>
              <p className="text-sm text-slate-400">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form & Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Form Side */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <input 
                      {...register('parentName')}
                      type="text" 
                      placeholder="Họ và tên phụ huynh" 
                      className={`w-full px-6 py-4 bg-slate-50 border ${errors.parentName ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                    />
                    {errors.parentName && <p className="text-xs text-red-500 ml-2">{errors.parentName.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <input 
                        {...register('email')}
                        type="email" 
                        placeholder="Email" 
                        className={`w-full px-6 py-4 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                      />
                      {errors.email && <p className="text-xs text-red-500 ml-2">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <input 
                        {...register('phone')}
                        type="tel" 
                        placeholder="Số điện thoại" 
                        className={`w-full px-6 py-4 bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 ml-2">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <input 
                      {...register('childName')}
                      type="text" 
                      placeholder="Họ tên con" 
                      className={`w-full px-6 py-4 bg-slate-50 border ${errors.childName ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                    />
                    {errors.childName && <p className="text-xs text-red-500 ml-2">{errors.childName.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <input 
                        {...register('childClass')}
                        type="text" 
                        placeholder="Con học lớp" 
                        className={`w-full px-6 py-4 bg-slate-50 border ${errors.childClass ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all`}
                      />
                      {errors.childClass && <p className="text-xs text-red-500 ml-2">{errors.childClass.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <select 
                        {...register('branch')}
                        className={`w-full px-6 py-4 bg-slate-50 border ${errors.branch ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all text-slate-500`}
                      >
                        <option value="">Chọn cơ sở</option>
                        <option value="nam-an-khanh">STEMKey Nam An Khánh</option>
                        <option value="ha-dong">STEMKey Hà Đông</option>
                        <option value="cau-giay">STEMKey Cầu Giấy</option>
                      </select>
                      {errors.branch && <p className="text-xs text-red-500 ml-2">{errors.branch.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <textarea 
                      {...register('message')}
                      placeholder="Nhập tin nhắn" 
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stem-blue/20 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
className='w-full'                >
                  {isSubmitting ? 'ĐANG GỬI...' : 'GỬI'} <Send size={20} />
                </Button>
              </form>
            </div>

            {/* Map Side */}
            <div className="w-full lg:w-1/2 min-h-[400px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.846513689445!2d105.7112345!3d21.0007654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134539665555555%3A0x5555555555555555!2zTmFtIEFuIEtow6FuaCwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1709100000000!5m2!1svi!2s" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Overlay info */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-stem-blue rounded-full flex items-center justify-center text-white shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
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
  );
};

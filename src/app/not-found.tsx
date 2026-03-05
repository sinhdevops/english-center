"use client"

import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export default function NotFound () {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-stem-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-stem-green/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Prominent 404 with STEM colors */}
          <div className="relative inline-block mb-6">
            <h1 className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-stem-blue via-blue-600 to-stem-green select-none">
              404
            </h1>
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-stem-green"
            >
              <Search size={24} strokeWidth={2.5} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ối! Trang này không tồn tại
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Có vẻ như đường dẫn bạn đang tìm kiếm đã bị di chuyển hoặc không còn tồn tại trong hệ thống của chúng tôi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={'/'}>
              <Button 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 py-4 font-bold uppercase tracking-wider shadow-lg shadow-blue-200"
            >
              Về trang chủ
            </Button>
            </Link>
          
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              size="lg"
              className="w-full lg:min-w-[200px] sm:w-auto rounded-full px-10 py-4 font-bold uppercase tracking-wider border-2 border-slate-200 hover:bg-slate-100 transition-colors"
            >
              Quay lại
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

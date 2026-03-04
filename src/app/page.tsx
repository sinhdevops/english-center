"use client";

import { motion } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { home, imagePrograms } from "../../public/statics/images";
import { useState } from "react";

const Hero = () => {
	return (
	 <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden">
      {/* Tech/Circuit Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 100 L100 100 L150 150 L300 150 M400 50 L450 100 L600 100 M700 200 L800 200 L850 250 M100 400 L200 400 L250 350 M500 600 L600 600 L650 650 M800 800 L900 800 L950 750" 
            fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>
      
      {/* Background Gradient - Green */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ background: 'linear-gradient(272.97deg, #00BA3D 22.93%, #005C1E 89.95%)' }} 
      />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 py-12 lg:py-0">
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-cursive text-3xl lg:text-5xl text-white mb-2 lg:mb-4"
            >
              Phát triển toàn diện
            </motion.p>
            
            <h2 className="font-azuki text-3xl sm:text-4xl lg:text-6xl text-white mb-8 lg:mb-10 tracking-wide leading-tight uppercase">
              Tư duy – Ngôn ngữ – Công nghệ
            </h2>

            <div className="space-y-4 mb-10 lg:mb-12 inline-block text-left">
              {[
                "Toán tư duy – Rèn logic & suy luận nền tảng",
                "Robotics – Lắp ráp, lập trình, phát triển STEM",
                "Tiếng Anh – Nghe nói tự nhiên, tự tin giao tiếp"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-base lg:text-lg font-medium text-white/90"
                >
                  <CheckCircle2 size={20} className="text-white shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" variant="primary" className="w-full sm:w-auto rounded-full px-10 py-6 text-base font-bold uppercase tracking-wider">
                Đăng ký học thử miễn phí
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-10 py-6 text-base font-bold uppercase tracking-wider border-2">
                Tư vấn lộ trình học
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-2/5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[500px] lg:max-w-none"
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" 
                alt="STEMKey Students" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
	);
};

const AboutSection = () => {
  const stats = [
    { label: "Năm hoạt động", value: "1+" },
    { label: "Giáo viên tài năng", value: "300+" },
    { label: "Học viên", value: "50000+" },
    { label: "Đối tác đồng hành", value: "30+" },
    { label: "Cơ sở trên toàn quốc", value: "55+" },
    { label: "Học viên học online", value: "20000+" }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8"
            >
              Giới thiệu về STEMKey
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg mb-8 leading-relaxed"
            >
              STEMKey Việt Nam. Với sứ mệnh giúp hàng triệu trẻ em Việt Nam yêu tiếng Anh, robotics, toán tư duy giúp các em chinh phục từ nhỏ.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-12"
            >
              {[
                "Phương pháp truyền cảm hứng R.I.P.L độc quyền",
                "Đội ngũ giáo viên tinh hoa, giàu kinh nghiệm",
                "Chương trình chuẩn Cambridge, sát thực tế",
                "Môi trường học tập năng động, sáng tạo"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-medium leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" 
                alt="STEMKey Introduction" 
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto"
                referrerPolicy="no-referrer"
              />
              {/* Overlay for branding feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent" />
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-stem-blue/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "Toán tư duy",
      desc: "Phát triển tư duy - Vững nền tảng",
      style: { background: 'linear-gradient(286.12deg, #FFCA74 9.13%, #C80057 86.64%)' },
      img: imagePrograms.program1
    },
    {
      title: "Robotics",
      desc: "Lắp ráp & lập trình - Tư duy Stem",
      style: { background: 'linear-gradient(106.99deg, #211BCF 12.88%, #FF60B2 92.58%)' },
      img:  imagePrograms.program1
    },
    {
      title: "Tiếng anh",
      desc: "Nghe nói tự nhiên - Tự tin giao tiếp",
      style: { background: 'linear-gradient(284.83deg, #FFF357 16%, #00771E 96.5%)' },
      img:  imagePrograms.program1
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 lg:mb-6">
            Các chương trình học tại STEMKey
          </h2>
          <p className="text-slate-500 text-base lg:text-lg max-w-3xl mx-auto font-medium">
            Hệ thống giáo dục dành cho trẻ 4-10 tuổi, phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-[12px] p-6 text-white min-h-[220px] flex flex-col justify-between shadow-2xl group"
              style={p.style}
            >
              <div className="relative z-10 w-full sm:w-1/2">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-sm lg:text-base opacity-90 mb-10 leading-relaxed font-medium">
                  {p.desc}
                </p>
                <button className="px-8 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-sm font-bold transition-all hover:bg-white/30 active:scale-95">
                  Xem chi tiết
                </button>
              </div>
              
              {/* Image positioning to match Figma */}
              <div className="absolute right-0 bottom-0 w-[60%] h-full flex items-end justify-end pointer-events-none overflow-hidden">
                <Image 
                  src={p.img} 
                  alt={p.title} 
				  width={234}
				  height={220}
                  className="w-full h-full object-contain object-right-bottom transform group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExclusiveModel = () => {
  const items = [
    { id: "4H", text: "Xem trước bài giảng" },
    { id: "3H", text: "Học trên lớp cùng giáo viên" },
    { id: "1H", text: "Ba mẹ đồng hành cùng con học tập" },
    { id: "6H", text: "Trợ giảng hỗ trợ học tập của con" }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Mô hình lớp học độc quyền
          </h2>
          <p className="text-slate-500 text-base lg:text-lg max-w-4xl mx-auto font-medium leading-relaxed">
            Lớp học đảo ngược thúc đẩy khả năng tự học, tính chủ động và tích cực trong học tập ở học trò, các con không phụ thuộc, chờ thầy cô đưa kiến thức.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 text-[#1890FF] flex items-center justify-center rounded-xl text-lg font-bold shrink-0">
                  {item.id}
                </div>
                <span className="text-slate-700 text-base lg:text-lg font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" 
                alt="Mô hình lớp học" 
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Info Badge */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-2xl border border-slate-100 min-w-[200px]">
                  <h4 className="text-slate-500 font-bold text-sm lg:text-base mb-1">Mô hình lớp học</h4>
                  <div className="text-2xl lg:text-4xl font-black text-slate-900 tracking-wider">4 - 3 - 1 - 6</div>
                </div>
              </div>

              {/* Orange Icon Badge */}
              <div className="absolute bottom-6 right-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#FF9500] rounded-full flex items-center justify-center text-white shadow-xl">
                  <Zap size={32} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FlexibleLearning = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const benefits = [
    {
      title: "Trải nghiệm môi trường học tiếng Anh truyền cảm hứng",
      content: "Nhờ phương pháp P&A độc quyền giúp các con chinh phục mục tiêu kép hiệu quả là sử dụng thành thạo tiếng Anh và đạt điểm giỏi trên trường. Học viên Online được nghe giảng, làm bài, trao đổi tài liệu và thảo luận trực tiếp với giáo viên, bạn bè như đến tận lớp học Offline."
    },
    {
      title: "Đội ngũ tư vấn 24/7",
      content: "Chúng tôi luôn sẵn sàng hỗ trợ phụ huynh và học sinh mọi lúc, mọi nơi để đảm bảo quá trình học tập diễn ra thông suốt."
    },
    {
      title: "Tiết kiệm chi phí và thời gian",
      content: "Học tập linh hoạt giúp giảm bớt gánh nặng di chuyển, tối ưu hóa thời gian và chi phí cho gia đình."
    },
    {
      title: "Lịch học linh hoạt",
      content: "Học sinh có thể lựa chọn ca học phù hợp với lịch trình cá nhân, dễ dàng sắp xếp việc học và chơi."
    },
    {
      title: "Freeship giáo trình và học liệu",
      content: "Tất cả giáo trình và học liệu cần thiết sẽ được gửi tận tay học viên hoàn toàn miễn phí."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600" 
                alt="Online Learning" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[500px] mt-8"
            >
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
                alt="Offline Learning" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right: Content & Accordion */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
                Học linh hoạt giữa Online và Offline
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Tham gia Lớp học Offline và Online tại STEMKey bạn sẽ được:
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div 
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    openIndex === i 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${openIndex === i ? 'bg-blue-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <Sparkles size={20} />
                      </div>
                      <span className={`font-bold text-base lg:text-lg ${openIndex === i ? 'text-slate-900' : 'text-slate-600'}`}>
                        {benefit.title}
                      </span>
                    </div>
                    <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                      {openIndex === i ? <motion.span className="text-2xl">—</motion.span> : <motion.span className="text-2xl">+</motion.span>}
                    </div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-slate-500 leading-relaxed font-medium pl-[68px]">
                      {benefit.content}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Teachers = () => {
  const teachers = [
    {
      name: "Mr. Trần Thái Quý",
      role: "Nhà sáng lập và hành trình trao giá trị, truyền cảm hứng",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Ms. Nguyễn Minh Thư",
      role: "Giám đốc đào tạo, chuyên gia ngôn ngữ học",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Mr. Lê Hoàng Nam",
      role: "Chuyên gia Robotics & Công nghệ giáo dục",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Ms. Phạm Thu Hà",
      role: "Giáo viên Toán tư duy, hơn 10 năm kinh nghiệm",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="py-24 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            300+ giáo viên truyền cảm hứng
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Tài năng, cá tính và tâm huyết trong từng bài giảng
          </p>
        </div>

        <div className="relative group">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm mb-6 aspect-[4/5]">
                  <img 
                    src={t.img} 
                    alt={t.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {t.role}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows (Visual only for now as requested by image) */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors hidden lg:flex">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors hidden lg:flex">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const awards = [
    {
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      title: "Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình – TP. Hồ Chí Minh -"
    },
    {
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
      title: "Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình – TP. Hồ Chí Minh -"
    },
    {
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      title: "Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình – TP. Hồ Chí Minh -"
    }
  ];

  return (
    <section className="pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-5xl font-bold text-slate-900 mb-12 lg:mb-16"
        >
          Cảm nhận của học viên và phụ huynh
        </motion.h2>
        
        {/* Featured Award */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative rounded-[2.5rem] overflow-hidden aspect-[21/9] shadow-2xl group"
        >
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200" 
            alt="Featured Award" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 lg:p-12">
            <p className="text-white text-base lg:text-xl font-medium max-w-4xl leading-relaxed">
              Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình – TP. Hồ Chí Minh -
            </p>
          </div>
        </motion.div>

        {/* Award Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {awards.map((award, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6 group"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] shadow-xl relative">
                <img 
                  src={award.img} 
                  alt={award.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <p className="text-slate-700 font-semibold leading-relaxed text-base lg:text-lg">
                {award.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const posts = [
    {
      title: "STEMKey chính thức khai trương cơ sở mới tại Nam An Khánh",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Workshop: Chế tạo Robot từ vật liệu tái chế cùng STEMKey",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "STEMKey đồng hành cùng phụ huynh định hướng nghề nghiệp tương lai",
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900">
            Loạt sự kiện HOT - đừng vội lướt qua!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/10] mb-6 shadow-lg">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-sm xl:text-[18px] text-slate-900 group-hover:text-stem-blue transition-colors leading-tight">
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    { name: "Partner 1", logo: "https://picsum.photos/seed/p1/200/100" },
    { name: "Partner 2", logo: "https://picsum.photos/seed/p2/200/100" },
    { name: "Partner 3", logo: "https://picsum.photos/seed/p3/200/100" },
    { name: "Partner 4", logo: "https://picsum.photos/seed/p4/200/100" },
    { name: "Partner 5", logo: "https://picsum.photos/seed/p5/200/100" },
    { name: "Partner 6", logo: "https://picsum.photos/seed/p6/200/100" },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-16"
        >
          Đối tác của STEMKey
        </motion.h2>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((p, i) => (
            <motion.img
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              src={p.logo}
              alt={p.name}
              className="h-10 lg:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RegistrationSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#00BA3D] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center p-8 lg:p-16 gap-12 lg:gap-20 relative">
          {/* Left: Content & Image */}
          <div className="w-full lg:w-1/2 text-white z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[36px] mb-6 tracking-tight"
            >
              QUÀ TẶNG HẤP DẪN
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg lg:text-xl font-medium mb-12 opacity-90 max-w-md"
            >
              Cơ hội nhận học bổng lên tới 40% và các phần quà hấp dẫn khác đang chờ bạn
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative"
            >
              <Image 
                src={home.register}
                alt="Gifts" 
                className="w-full h-auto drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-[18px] bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
          >
            <h3 className="text-xlfont-bold text-slate-900 mb-8 flex items-center gap-2">
              Tư vấn lộ trình học và ưu đãi → Đăng ký giữ chỗ ngay
            </h3>
            
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Nhập họ tên của bạn" 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="Nhập email" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Nhập số điện thoại" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <input 
                type="text" 
                placeholder="Nhập họ tên của con" 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nhập lớp con học" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Nhập khóa học" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-500 appearance-none">
                <option>Chọn cơ sở gần bạn</option>
                <option>Cơ sở Nam An Khánh</option>
                <option>Cơ sở Quận 7</option>
              </select>
              
              <button className="w-full py-5 bg-[#1890FF] hover:bg-blue-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 uppercase tracking-wider">
                GIỮ CHỖ NGAY
              </button>
              
              <p className="text-center text-slate-400 text-sm mt-6 font-medium">
                * Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ bạn sớm (trong vòng 24h)
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
	return (
		<div className="bg-white">
			<Hero />
			<AboutSection />
			<Programs />
			<ExclusiveModel />
			<FlexibleLearning />
			<Teachers />
			<Testimonials />
			<News />
			<Partners />
			<RegistrationSection />
		</div>
	);
}

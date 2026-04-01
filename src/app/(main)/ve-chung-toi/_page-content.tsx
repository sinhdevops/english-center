import { Target, Eye, Zap } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage";
import Programs from "@/components/pages/home/programs";
import dynamic from "next/dynamic";
const Teachers = dynamic(() => import("@/components/pages/home/teachers"), { ssr: true });

export default function PageContent() {
	const videoId = "xhdN5fJ1Dxc";

	return (
		<>
			<HeaderPage title="Về chúng tôi" />

			<div className="space-y-20 py-20 lg:space-y-25">
				{/* Intro Section */}
				<div className="mx-auto max-w-7xl px-4 lg:px-0">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
						{/* Left: Content */}
						<div className="text-left md:text-left">
							<h2 className="mb-6 text-2xl leading-tight font-semibold tracking-tight uppercase lg:text-[32px]">
								KHƠI NGUỒN ĐAM MÊ - ĐỊNH HÌNH TƯƠNG LAI
							</h2>
							<div className="space-y-6 leading-relaxed font-medium text-[#4E4E4E]">
								<p>
									STEMKey là hệ thống trung tâm phát triển tư duy và sáng tạo cho trẻ từ{" "}
									<span className="font-bold text-slate-900">3–16 tuổi</span>, tập trung xây dựng{" "}
									<strong className="font-bold text-slate-900">tư duy – ngôn ngữ – kỹ năng</strong> học
									tập ngay từ gốc. Chúng tôi không chỉ dạy kiến thức, mà giúp trẻ hiểu – tự tin – chủ động
									học tập lâu dài.
								</p>
								<ul className="space-y-4 pl-4 text-sm font-medium lg:text-[15px]">
									<li className="flex items-center gap-3">
										Toán tư duy – phát triển logic & khả năng giải quyết vấn đề
									</li>
									<li className="flex items-center gap-3">
										Tiếng Anh – phản xạ tự nhiên, tự tin giao tiếp
									</li>
									<li className="flex items-center gap-3">
										Robotics – khơi gợi sáng tạo & tư duy công nghệ
									</li>
									<li className="flex items-center gap-3">
										Tiền tiểu học – sẵn sàng vững vàng trước khi vào lớp 1
									</li>
								</ul>
							</div>
						</div>

						{/* Right: Video Placeholder (Inline Play Logic) */}
						<div className="group relative aspect-[588/362] overflow-hidden rounded-[20px] bg-black">
							<iframe
								src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
								title="STEMKey Intro Video"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="h-full w-full"
							/>
						</div>
					</div>
				</div>

				{/* Mission Section */}
				<section className="mx-auto max-w-7xl px-4 lg:px-0">
					<h2 className="mb-6 text-left text-[32px] font-semibold tracking-tight text-slate-900 uppercase md:text-center">
						SỨ MỆNH - TẦM NHÌN - GIÁ TRỊ CỐT LÕI
					</h2>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{/* Sứ mệnh */}
						<div className="relative overflow-hidden rounded-[20px] bg-[#E3F2E4] p-5 transition-transform hover:-translate-y-2">
							<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#98D8A3]/30" />
							<div className="absolute top-10 -right-20 h-48 w-48 rounded-full bg-[#98D8A3]/20" />
							<div className="relative z-10">
								<div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#98D8A3] text-[#008A4D]">
									<Target size={40} />
								</div>
								<h3 className="mb-2 text-2xl leading-tight font-semibold text-slate-900">Sứ mệnh</h3>
								<p className="leading-relaxed font-medium text-[#4E4E4E]">
									STEMKey cam kết mang đến môi trường giáo dục sáng tạo, nơi trẻ em được tự do khám
									phá, trải nghiệm và phát triển tư duy logic, kỹ năng giải quyết vấn đề thông qua
									Robotics, Toán tư duy và Tiếng Anh.
								</p>
							</div>
						</div>

						{/* Tầm nhìn */}
						<div className="relative overflow-hidden rounded-[20px] bg-[#E5F1FF] p-5 transition-transform hover:-translate-y-2">
							<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#ADCFFF]/30" />
							<div className="absolute top-10 -right-20 h-48 w-48 rounded-full bg-[#ADCFFF]/20" />
							<div className="relative z-10">
								<div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#ADCFFF] text-[#1D7AFC]">
									<Eye size={40} />
								</div>
								<h3 className="mb-2 text-2xl leading-tight font-semibold text-slate-900">Tầm nhìn</h3>
								<p className="leading-relaxed font-medium text-[#4E4E4E]">
									Trở thành hệ thống giáo dục STEM tiêu chuẩn quốc tế hàng đầu tại Việt Nam, góp phần
									đào tạo nên những thế hệ công dân toàn cầu bản lĩnh, sáng tạo và làm chủ công nghệ.
								</p>
							</div>
						</div>

						{/* Giá trị cốt lõi */}
						<div className="relative overflow-hidden rounded-[20px] bg-[#FFE9E5] p-5 transition-transform hover:-translate-y-2">
							<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#FFB9B1]/30" />
							<div className="absolute top-10 -right-20 h-48 w-48 rounded-full bg-[#FFB9B1]/20" />
							<div className="relative z-10">
								<div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#FFB9B1] text-[#E54D42]">
									<Zap size={40} />
								</div>
								<h3 className="mb-2 text-2xl leading-tight font-semibold text-slate-900">
									Giá trị cốt lõi
								</h3>
								<p className="leading-relaxed font-medium text-[#4E4E4E]">
									Giúp trẻ phát triển nền tảng tư duy logic công nghệ và kỹ năng học tập hiệu quả,
									tăng sự tự tin học hỏi trong giao tiếp và học tập, khơi dậy niềm yêu thích với công
									nghệ và sáng tạo.
								</p>
							</div>
						</div>
					</div>
				</section>

				<Programs />
				<Teachers />
			</div>
		</>
	);
}

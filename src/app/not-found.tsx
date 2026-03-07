"use client";

import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-20 text-center">
			{/* Subtle Background Decorations */}
			<div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-40">
				<div className="bg-stem-blue/10 absolute top-[-10%] left-[-5%] h-64 w-64 rounded-full blur-3xl" />
				<div className="bg-stem-green/10 absolute right-[-5%] bottom-[-10%] h-96 w-96 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-xl text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					{/* Prominent 404 with STEM colors */}
					<div className="relative mb-6 inline-block">
						<h1 className="from-stem-blue to-stem-green bg-linear-to-br via-blue-600 bg-clip-text text-[120px] leading-none font-black tracking-tighter text-transparent select-none sm:text-[180px]">
							404
						</h1>
						<motion.div
							animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							className="text-stem-green absolute -top-4 -right-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl"
						>
							<Search size={24} strokeWidth={2.5} />
						</motion.div>
					</div>

					<h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">Ối! Trang này không tồn tại</h2>
					<p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-slate-500">
						Có vẻ như đường dẫn bạn đang tìm kiếm đã bị di chuyển hoặc không còn tồn tại trong hệ thống của
						chúng tôi.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link href={"/"} className="w-full sm:w-auto">
							<Button variant="primary" size="lg" className="w-full shadow-lg shadow-blue-200 sm:w-auto">
								Về trang chủ
							</Button>
						</Link>

						<Button
							onClick={() => window.history.back()}
							variant="outline"
							size="lg"
							className="w-full border-2 border-slate-200 transition-colors hover:bg-slate-100 sm:w-auto"
						>
							Quay lại
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

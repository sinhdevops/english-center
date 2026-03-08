"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../../public/statics/images";

export default function NotFound() {
	return (
		<div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-20 text-center">
			{/* Subtle Background Decorations */}
			<div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-40">
				<div className="bg-stem-blue/10 absolute top-[-10%] left-[-5%] h-64 w-64 rounded-full blur-3xl" />
				<div className="bg-stem-green/10 absolute right-[-5%] bottom-[-10%] h-96 w-96 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-xl text-center">
				<Image src={IMAGES.notFound} alt="404" />

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					{/* Prominent 404 with STEM colors */}

					<h2 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
						Ối! Trang này không tồn tại
					</h2>
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

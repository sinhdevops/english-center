"use client";

import { motion } from "framer-motion";
import { AuthForm } from "@/components/auth/auth-form";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../../../../../public/statics/images";

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen">
			{/* Left Column — Form */}
			<div className="relative flex w-full flex-col bg-white p-6 lg:w-1/2 lg:p-12 xl:p-20">
				<div className="flex-1 flex flex-col justify-center">
					<div className="mx-auto w-full max-w-md">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-8"
						>
							<h1 className="mb-2 text-[32px] font-bold tracking-tight text-slate-900 leading-tight">
								TẠO TÀI KHOẢN MỚI
							</h1>
							<p className="text-slate-500 font-medium">
								Bắt đầu hành trình sáng tạo và phát triển tư duy
							</p>
						</motion.div>

						<AuthForm mode="register" />
					</div>
				</div>


			</div>

			{/* Right Column — Illustration Background */}
			<div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden aspect-721/1024">
				<Image
					src={IMAGES.login}
					alt="Registration Illustration"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</div>
	);
}

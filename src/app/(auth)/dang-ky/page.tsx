"use client";

import { motion } from "framer-motion";
import { AuthForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
	return (
		<div className="flex min-h-[90vh] items-center justify-center bg-slate-50 px-4 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl lg:p-12"
			>
				<div className="mb-12 text-center">
					<h2 className="mb-3 text-3xl font-bold text-slate-900 lg:text-4xl">Tham gia STEMKey</h2>
					<p className="text-slate-500">Khởi đầu hành trình sáng tạo và phát triển tư duy</p>
				</div>

				<AuthForm mode="register" />
			</motion.div>
		</div>
	);
}
